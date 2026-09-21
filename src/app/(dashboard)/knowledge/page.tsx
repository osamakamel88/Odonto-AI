"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  treatmentTypes, 
  functionalAppliances, 
  expansionDevices, 
  surgicalProtocols, 
  retentionProtocols, 
  anchorageDevices, 
  interceptiveTreatments,
  bracketSystems,
  wireSequences,
  elasticProtocols
} from '@/lib/orthodontics/knowledge-base';
import { 
  BookOpen, 
  Search, 
  SlidersHorizontal, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Info,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  Calculator,
  Compass,
  Database,
  ExternalLink
} from 'lucide-react';
import { KnowledgeCalculators } from '@/components/clinical/knowledge-calculators';
import { PubMedSearchHub } from '@/components/clinical/pubmed-search-hub';

type CategoryFilter = 'all' | 'treatment' | 'functional' | 'expansion' | 'surgical' | 'anchorage' | 'retention' | 'brackets' | 'wires' | 'elastics';

export default function KnowledgeBasePage() {
  const [viewMode, setViewMode] = useState<'library' | 'calculators' | 'pubmed'>('library');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<any | null>(null);

  // Normalize all items into a unified searchable array
  const allItems = [
    ...Object.values(treatmentTypes).map(t => ({
      ...t,
      type: 'treatment',
      categoryLabel: 'Treatment Modality',
      details: t.description
    })),
    ...Object.values(functionalAppliances).map(f => ({
      ...f,
      type: 'functional',
      categoryLabel: 'Functional Appliance',
      typicalDuration: f.wearSchedule,
      details: f.description,
      advantages: [f.mechanism, `Mandibular Advancement: ${f.mandibularAdvancement}`],
      disadvantages: [`Adjustment: ${f.adjustmentProtocol}`],
      indications: [`Expected Overjet Reduction: ${f.expectedOverjetReduction}`, `Ideal Age: ${f.idealAge}`]
    })),
    ...Object.values(expansionDevices).map(e => ({
      ...e,
      type: 'expansion',
      categoryLabel: 'Rapid Expansion Device',
      typicalDuration: e.retentionPeriod,
      details: e.description,
      advantages: [e.skeletalVsDental, `Expansion rate: ${e.expectedExpansion}`],
      disadvantages: [`Age limit: ${e.ageLimit}`],
      indications: [`Activation: ${e.activationProtocol}`]
    })),
    ...Object.values(surgicalProtocols).map(s => ({
      ...s,
      type: 'surgical',
      categoryLabel: 'Orthognathic Surgery',
      typicalDuration: `Pre-Op: ${s.typicalPreOpDuration} / Post-Op: ${s.typicalPostOpDuration}`,
      details: s.indications.join(', '),
      advantages: s.preOpOrthoGoals,
      disadvantages: s.risks,
      indications: s.indications
    })),
    ...Object.values(anchorageDevices).map(a => ({
      ...a,
      type: 'anchorage',
      categoryLabel: 'Anchorage Device / TAD',
      typicalDuration: a.loadingProtocol,
      details: `Insertion Site: ${a.insertionSite} (Success Rate: ${a.successRate})`,
      advantages: [`Type: ${a.anchorageType}`],
      disadvantages: [`Loading: ${a.loadingProtocol}`],
      indications: a.indications
    })),
    ...Object.values(retentionProtocols).map(r => ({
      ...r,
      type: 'retention',
      categoryLabel: 'Retention Protocol',
      typicalDuration: r.wearSchedule,
      details: `Durability: ${r.durability} | Maintenance: ${r.maintenance}`,
      advantages: [r.wearSchedule, `Best for: ${r.bestFor.join(', ')}`],
      disadvantages: [`Maintenance: ${r.maintenance}`],
      indications: r.bestFor
    })),
    ...Object.values(bracketSystems).map(b => ({
      id: b.name.toLowerCase().replace(/\s+/g, '-'),
      name: b.name,
      type: 'brackets',
      categoryLabel: 'Bracket Prescription',
      typicalDuration: 'Full Treatment',
      details: b.description,
      advantages: [b.description],
      disadvantages: ['Requires matching slot size'],
      indications: ['Standard comprehensive mechanics']
    })),
    ...Object.values(wireSequences).map(w => ({
      id: w.name.toLowerCase().replace(/\s+/g, '-'),
      name: w.name,
      type: 'wires',
      categoryLabel: 'Archwire Progression',
      typicalDuration: '18–24 Months',
      details: `Archwire progression (${w.slotSize} slot): ${w.steps.map((x: any) => x.dimension).join(' → ')}`,
      advantages: w.steps.map((x: any) => `${x.phase}: ${x.dimension} ${x.material} (${x.purpose})`),
      disadvantages: ['Sequence must be completed sequentially'],
      indications: ['Alignment, Leveling, Overjet reduction, Finishing']
    })),
    ...Object.values(elasticProtocols).map(el => ({
      id: el.name.toLowerCase().replace(/\s+/g, '-'),
      name: el.name,
      type: 'elastics',
      categoryLabel: 'Intermaxillary Elastics',
      typicalDuration: el.wearSchedule,
      details: `${el.indication} (Force: ${el.forceOz} oz, Diameter: ${el.diameterInches}")`,
      advantages: [`Points: ${el.attachmentPoints}`, `Force: ${el.forceOz} oz (${el.diameterInches}")`],
      disadvantages: [`Wear: ${el.wearSchedule}`],
      indications: [el.indication]
    }))
  ];

  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.details && item.details.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.categoryLabel && item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories: { id: CategoryFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All Protocols', count: allItems.length },
    { id: 'treatment', label: 'Treatment Modalities', count: Object.keys(treatmentTypes).length },
    { id: 'functional', label: 'Functional Appliances', count: Object.keys(functionalAppliances).length },
    { id: 'expansion', label: 'Rapid Palatal Expansion', count: Object.keys(expansionDevices).length },
    { id: 'surgical', label: 'Orthognathic Surgery', count: Object.keys(surgicalProtocols).length },
    { id: 'anchorage', label: 'Anchorage & TADs', count: Object.keys(anchorageDevices).length },
    { id: 'retention', label: 'Retention Protocols', count: Object.keys(retentionProtocols).length },
    { id: 'brackets', label: 'Bracket Prescriptions', count: Object.keys(bracketSystems).length },
    { id: 'wires', label: 'Archwire Sequences', count: Object.keys(wireSequences).length },
    { id: 'elastics', label: 'Intermaxillary Elastics', count: Object.keys(elasticProtocols).length },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 rounded-xl text-white shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Orthodontic Clinical Knowledge Base</h1>
            <Badge className="bg-blue-500/30 text-blue-200 border-none">
              {allItems.length} Clinical Protocols
            </Badge>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Evidence-based references for fixed appliances, aligners, TADs, surgical pathways, and biomechanics
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search protocols, wires, brackets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Knowledge Hub Primary View Switcher */}
      <div className="flex flex-wrap items-center justify-between p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setViewMode('library')}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'library'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Clinical Protocols Library ({allItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('calculators')}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'calculators'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Calculators (4)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('pubmed')}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'pubmed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>PubMed Live RAG Literature</span>
          </button>
        </div>

        <div className="flex items-center gap-2 pr-1">
          <a
            href="/resources.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200 hover:border-teal-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Resources &amp; References 🔬</span>
            <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
          </a>
        </div>
      </div>

      {viewMode === 'pubmed' ? (
        <PubMedSearchHub />
      ) : viewMode === 'calculators' ? (
        <KnowledgeCalculators />
      ) : (
        <>
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === c.id 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {c.label} ({c.count})
              </button>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredItems.map((item, idx) => (
              <Card 
                key={`${item.id}-${idx}`} 
                className="hover:shadow-md transition-all cursor-pointer border-slate-200 flex flex-col justify-between"
                onClick={() => setActiveItem(item)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.categoryLabel}
                    </span>
                    {item.typicalDuration && (
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {item.typicalDuration}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-base font-bold text-slate-900 mt-2">
                    {item.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 pt-0 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.details}
                  </p>

                  <div className="border-t pt-2 space-y-1 text-xs">
                    {item.advantages && item.advantages[0] && (
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium truncate">
                        <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{item.advantages[0]}</span>
                      </div>
                    )}
                    {item.disadvantages && item.disadvantages[0] && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                        <Info className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{item.disadvantages[0]}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Protocol Detail Drawer / Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {activeItem.categoryLabel}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{activeItem.name}</h2>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setActiveItem(null)}>
                ✕
              </Button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border">
              {activeItem.details}
            </p>

            {activeItem.indications && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Clinical Indications</h4>
                <ul className="list-disc pl-5 text-slate-700 space-y-0.5">
                  {activeItem.indications.map((ind: string, i: number) => (
                    <li key={i}>{ind}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeItem.contraindications && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-rose-900 uppercase text-[11px] tracking-wider">Contraindications</h4>
                <ul className="list-disc pl-5 text-rose-800 space-y-0.5">
                  {activeItem.contraindications.map((c: string, i: number) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeItem.advantages && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-emerald-900 uppercase text-[11px] tracking-wider">Advantages & Biomechanics</h4>
                <ul className="list-disc pl-5 text-emerald-800 space-y-0.5">
                  {activeItem.advantages.map((adv: string, i: number) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeItem.disadvantages && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">Considerations & Limitations</h4>
                <ul className="list-disc pl-5 text-slate-600 space-y-0.5">
                  {activeItem.disadvantages.map((dis: string, i: number) => (
                    <li key={i}>{dis}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t pt-4 flex justify-end">
              <Button size="sm" onClick={() => setActiveItem(null)}>
                Close Protocol
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}