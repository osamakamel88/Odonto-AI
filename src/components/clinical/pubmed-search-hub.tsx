'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ExternalLink, 
  BookOpen, 
  Copy, 
  Check, 
  Sparkles, 
  Filter, 
  Database, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/lib/i18n/language-context';


interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  pubdate: string;
  doi?: string;
  url: string;
  source: string;
}

const PRESET_TOPICS = [
  { labelEn: 'Adult MARPE / MSE', labelAr: 'توسيع الفك للبالغين (Adult MARPE / MSE)', query: 'maxillary skeletal expander adult midpalatal suture' },
  { labelEn: 'Canine Impaction Traction', labelAr: 'سحب الأنياب المطمورة (Canine Impaction)', query: 'palatally impacted maxillary canine surgical exposure' },
  { labelEn: 'Class III Alt-RAMEC', labelAr: 'بروتوكول الصنف الثالث (Class III Alt-RAMEC)', query: 'alternate rapid maxillary expansion and constriction Alt-RAMEC' },
  { labelEn: 'Aligner Predictability', labelAr: 'دقة التقويم الشفاف (Aligner Predictability)', query: 'clear aligners orthodontic tooth movement predictability' },
  { labelEn: 'TAD Anchorage Safe Zones', labelAr: 'مناطق أمان زرعات التثبيت (TAD Safe Zones)', query: 'temporary anchorage devices mini-implants orthodontic' },
  { labelEn: 'Open Bite TAD Intrusion', labelAr: 'غرس الأضراس للعضة المفتوحة (Open Bite Intrusion)', query: 'anterior open bite molar intrusion skeletal anchorage' },
  { labelEn: 'Root Resorption Risks', labelAr: 'مخاطر امتصاص الجذور (Root Resorption)', query: 'orthodontic apical root resorption risk factors' },
  { labelEn: 'Pharyngeal Airway & Expansion', labelAr: 'مجرى التنفس وتوسيع الفك (Pharyngeal Airway)', query: 'rapid palatal expansion pharyngeal airway volume' }
];

export function PubMedSearchHub() {
  const [query, setQuery] = useState('maxillary skeletal expander adult');
  const [activeQuery, setActiveQuery] = useState('maxillary skeletal expander adult');
  const [articles, setArticles] = useState<PubMedArticle[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [source, setSource] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedPmid, setCopiedPmid] = useState<string | null>(null);
  const { isAr } = useLanguage();

  const fetchArticles = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/ai/pubmed-search?q=${encodeURIComponent(searchQuery)}&limit=10`);
      const data = await res.json();
      if (data.success && data.articles) {
        setArticles(data.articles);
        setTotalCount(data.totalCount || data.articles.length);
        setSource(data.source || 'NCBI PubMed');
        setActiveQuery(searchQuery);
      } else {
        setError(data.error || (isAr ? 'تعذر جلب الأبحاث الطبية' : 'Failed to fetch citations'));
      }
    } catch (err: any) {
      setError(isAr ? 'فشل الاتصال بالشبكة. يرجى التحقق من اتصال الإنترنت.' : 'Network communication failed. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(query);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles(query);
  };

  const handleTopicClick = (topicQuery: string) => {
    setQuery(topicQuery);
    fetchArticles(topicQuery);
  };

  const copyCitation = (art: PubMedArticle) => {
    const text = `${art.authors}. ${art.title} ${art.journal}. ${art.pubdate}. PMID: ${art.pmid}.`;
    navigator.clipboard.writeText(text);
    setCopiedPmid(art.pmid);
    setTimeout(() => setCopiedPmid(null), 2500);
  };

  return (
    <div className="space-y-6 select-none" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 border border-indigo-500/30">
                <Database className="h-5 w-5" />
              </span>
              <span className="text-xs font-mono tracking-wider text-indigo-300 uppercase font-semibold">
                {isAr ? 'محرك استرجاع الأبحاث الطبية المباشر' : 'Live Biomedical RAG Literature Explorer'}
              </span>
              <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                NCBI E-Utilities v2.0
              </Badge>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              {isAr ? 'استرجاع الأدلة السريرية المحكمة لحظياً من PubMed' : 'Peer-Reviewed Orthodontic Evidence Retrieval'}
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              {isAr 
                ? 'بحث فوري في أكثر من 36 مليون دراسة منشورة بالمكتبة الوطنية للطب (NLM). استند في خططك التقويمية وقرارات الخلع على أحدث الأبحاث السريرية.' 
                : 'Live querying of 36+ million National Library of Medicine records. Ground clinical diagnosis and biomechanical planning directly in verified literature.'
              }
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`hidden sm:block ${isAr ? 'text-left' : 'text-right'}`}>
              <div className="text-xs text-slate-400">{isAr ? 'المجلات المفهرسة' : 'Indexed Sources'}</div>
              <div className="text-sm font-semibold text-indigo-200">AJO-DO • Angle • EJO • Cochrane</div>
            </div>
          </div>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2 relative z-10">
          <div className="relative flex-1">
            <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 ${isAr ? 'right-3.5' : 'left-3.5'}`} />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isAr
                  ? 'ابحث في موضوعات التقويم السريرية (مثل: MARPE، سحب الأنياب، علاج الصنف الثالث)...'
                  : 'Search clinical topics (e.g., MARPE adult, canine impaction, Class III Alt-RAMEC)...'
              }
              className={`bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-400 h-11 focus-visible:ring-indigo-500 ${
                isAr ? 'pr-10 pl-3 text-right' : 'pl-10 pr-3 text-left'
              }`}
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 h-11 gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                {isAr ? 'جاري الاتصال بـ PubMed...' : 'Querying PubMed...'}
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                {isAr ? 'بحث في الأبحاث' : 'Search Literature'}
              </>
            )}
          </Button>
        </form>

        {/* Topic Filter Chips */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="flex items-center gap-1 font-medium text-slate-300 shrink-0">
            <Filter className="h-3 w-3 text-indigo-400" /> 
            {isAr ? 'موضوعات شائعة:' : 'Quick Topics:'}
          </span>
          {PRESET_TOPICS.map((topic, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleTopicClick(topic.query)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-indigo-900/60 hover:text-indigo-200 hover:border-indigo-500/40 border border-slate-700 text-slate-300 transition-all cursor-pointer"
            >
              {isAr ? topic.labelAr : topic.labelEn}
            </button>
          ))}
        </div>
      </div>


      {/* Results Metadata Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>{isAr ? 'نتائج البحث عن:' : 'Results for:'} <strong className="text-foreground">"{activeQuery}"</strong></span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span>{isAr ? 'المصدر:' : 'Source:'} <strong className="text-indigo-600 dark:text-indigo-400">{source}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-[10px]">
            {isAr ? `عرض ${articles.length} دراسة سريرية` : `Showing ${articles.length} publications`}
          </Badge>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900 text-red-700 dark:text-red-300 text-sm flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-100 dark:bg-slate-850 rounded w-1/2" />
              <div className="h-3 bg-slate-100 dark:bg-slate-850 rounded w-1/4" />
            </div>
          ))}
        </div>
      )}

      {/* Articles Cards Grid */}
      {!loading && articles.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {articles.map((art) => (
            <Card 
              key={art.pmid} 
              className="border border-slate-200 dark:border-slate-800 hover:border-indigo-400/50 dark:hover:border-indigo-500/40 hover:shadow-md transition-all group overflow-hidden"
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="font-mono text-[10px] bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        PMID: {art.pmid}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                        {art.journal}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        ({art.pubdate})
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-base font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                      {art.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{isAr ? 'الباحثون (Authors):' : 'Authors:'}</span> {art.authors}
                    </p>
                  </div>

                  {/* Actions Right Side */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8 px-3 gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>{isAr ? 'عرض في PubMed' : 'PubMed'}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyCitation(art)}
                      className="text-xs h-8 gap-1 border-slate-300 dark:border-slate-700 cursor-pointer"
                    >
                      {copiedPmid === art.pmid ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            {isAr ? 'تم النسخ' : 'Copied'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{isAr ? 'توثيق' : 'Cite'}</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && !error && (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <BookOpen className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h4 className="text-base font-semibold text-foreground">
            {isAr ? 'لم يتم العثور على أبحاث مطابقة' : 'No literature found'}
          </h4>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
            {isAr
              ? 'جرّب البحث بكلمات تقويمية بالإنجليزية مثل "clear aligner" أو "rapid palatal expansion" أو "canine impaction".'
              : 'Try searching for common orthodontic keywords such as "clear aligner", "rapid palatal expansion", or "canine impaction".'
            }
          </p>
        </div>
      )}
    </div>
  );
}

