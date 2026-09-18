import https from 'https';
import { EVIDENCE_BASE } from './evidence-base';

export interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  pubdate: string;
  doi?: string;
  url: string;
  source: 'NCBI PubMed (Live)' | 'Curated Landmark Evidence Base';
}

interface CacheEntry {
  timestamp: number;
  data: PubMedArticle[];
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache
const memoryCache = new Map<string, CacheEntry>();

async function fetchJsonResilient(url: string): Promise<any> {
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback to node https.get
  }

  return new Promise((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false, headers: { 'Accept': 'application/json', 'User-Agent': 'OdontoAI/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Searches PubMed via NCBI E-utilities with automatic fallback to curated landmark evidence.
 */
export async function searchPubMedOrthodontics(query: string, limit = 8): Promise<{ articles: PubMedArticle[]; totalCount: number; source: string }> {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return {
      articles: getCuratedFallback('orthodontics', limit),
      totalCount: EVIDENCE_BASE.length,
      source: 'Curated Landmark Evidence Base'
    };
  }

  const cacheKey = `${cleanQuery.toLowerCase()}_${limit}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return {
      articles: cached.data,
      totalCount: cached.data.length,
      source: 'NCBI PubMed (Cached)'
    };
  }

  try {
    // Augment search query with orthodontic mesh context if not already present
    const isOrthoSpecific = cleanQuery.toLowerCase().includes('orthodont') || cleanQuery.toLowerCase().includes('tooth');
    const term = isOrthoSpecific 
      ? encodeURIComponent(cleanQuery)
      : encodeURIComponent(`(${cleanQuery}) AND (orthodontic OR malocclusion OR cephalometric)`);

    // Step 1: E-Search for PMIDs
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${term}&retmode=json&retmax=${limit}&sort=pub_date`;
    const searchData = await fetchJsonResilient(searchUrl);
    const idList: string[] = searchData?.esearchresult?.idlist || [];
    const totalCount = Number(searchData?.esearchresult?.count || idList.length);

    if (idList.length === 0) {
      // Fall back to matching curated evidence
      const fallback = getCuratedFallback(cleanQuery, limit);
      return {
        articles: fallback,
        totalCount: fallback.length,
        source: 'Curated Landmark Evidence Base (No live match)'
      };
    }

    // Step 2: E-Summary to retrieve article metadata
    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idList.join(',')}&retmode=json`;
    const summaryData = await fetchJsonResilient(summaryUrl);
    const resultObj = summaryData?.result || {};

    const articles: PubMedArticle[] = idList.map(pmid => {
      const item = resultObj[pmid];
      if (!item) {
        return {
          pmid,
          title: `PubMed Document ${pmid}`,
          authors: 'Orthodontic Research Investigators',
          journal: 'Orthodontic Literature',
          pubdate: new Date().getFullYear().toString(),
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
          source: 'NCBI PubMed (Live)'
        };
      }

      const authorsStr = (item.authors || [])
        .map((a: any) => a.name)
        .slice(0, 4)
        .join(', ') + (item.authors?.length > 4 ? ' et al.' : '');

      const doiArticleId = item.articleids?.find((aid: any) => aid.idtype === 'doi');

      return {
        pmid,
        title: cleanHtmlEntities(item.title || 'Untitled Orthodontic Publication'),
        authors: authorsStr || 'Orthodontic Investigators',
        journal: item.source || item.fulljournalname || 'Orthodontic Journal',
        pubdate: item.pubdate || item.sortpubdate?.slice(0, 4) || 'Recent',
        doi: doiArticleId?.value,
        url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        source: 'NCBI PubMed (Live)'
      };
    });

    memoryCache.set(cacheKey, { timestamp: Date.now(), data: articles });

    return {
      articles,
      totalCount,
      source: 'NCBI PubMed (Live)'
    };
  } catch (err: any) {
    console.warn('NCBI PubMed search failed, falling back to curated evidence base:', err.message);
    const fallback = getCuratedFallback(cleanQuery, limit);
    return {
      articles: fallback,
      totalCount: fallback.length,
      source: 'Curated Landmark Evidence Base (Offline Fallback)'
    };
  }
}

function getCuratedFallback(query: string, limit: number): PubMedArticle[] {
  const q = query.toLowerCase();
  const matched = EVIDENCE_BASE.filter(e => 
    e.title.toLowerCase().includes(q) ||
    e.authors.toLowerCase().includes(q) ||
    e.clinicalKeyFinding.toLowerCase().includes(q) ||
    e.topic.toLowerCase().includes(q)
  );

  const pool = matched.length > 0 ? matched : EVIDENCE_BASE;

  return pool.slice(0, limit).map(e => ({
    pmid: e.pmid || 'Ref',
    title: e.title,
    authors: e.authors,
    journal: e.journal,
    pubdate: String(e.year),
    doi: e.doi,
    url: e.url,
    source: 'Curated Landmark Evidence Base'
  }));
}

function cleanHtmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
