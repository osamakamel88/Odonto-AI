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
  bracketSystems, 
  wireSequences, 
  elasticProtocols 
} from '@/lib/orthodontics/knowledge-base';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  Info, 
  Calculator, 
  Compass, 
  Database, 
  ExternalLink 
} from 'lucide-react';
import { KnowledgeCalculators } from '@/components/clinical/knowledge-calculators';
import { PubMedSearchHub } from '@/components/clinical/pubmed-search-hub';
import { useLanguage } from '@/lib/i18n/language-context';
import { APP_DICTIONARY } from '@/lib/i18n/app-dictionary';

type CategoryFilter = 'all' | 'treatment' | 'functional' | 'expansion' | 'surgical' | 'anchorage' | 'retention' | 'brackets' | 'wires' | 'elastics';

export default function KnowledgeBasePage() {
  const [viewMode, setViewMode] = useState<'library' | 'calculators' | 'pubmed'>('library');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<any | null>(null);

  const { lang, isAr } = useLanguage();
  const t = APP_DICTIONARY[lang] || APP_DICTIONARY.en;

  // Normalize all items into a unified searchable array
  const allItems = [
    ...Object.values(treatmentTypes).map(tr => ({
      ...tr,
      type: 'treatment',
      categoryLabelEn: 'Treatment Modality',
      categoryLabelAr: 'نظام علاجي تقويمي',
      details: tr.description
    })),
    ...Object.values(functionalAppliances).map(f => ({
      ...f,
      type: 'functional',
      categoryLabelEn: 'Functional Appliance',
      categoryLabelAr: 'جهاز وظيفي لنمو الفك',
      typicalDuration: f.wearSchedule,
      details: f.description,
      advantages: [f.mechanism, `Mandibular Advancement: ${f.mandibularAdvancement}`],
      disadvantages: [`Adjustment: ${f.adjustmentProtocol}`],
      indications: [`Expected Overjet Reduction: ${f.expectedOverjetReduction}`, `Ideal Age: ${f.idealAge}`]
    })),
    ...Object.values(expansionDevices).map(e => ({
      ...e,
      type: 'expansion',
      categoryLabelEn: 'Rapid Expansion Device',
      categoryLabelAr: 'جهاز توسيع الفك السريع',
      typicalDuration: e.retentionPeriod,
      details: e.description,
      advantages: [e.skeletalVsDental, `Expansion rate: ${e.expectedExpansion}`],
      disadvantages: [`Age limit: ${e.ageLimit}`],
      indications: [`Activation: ${e.activationProtocol}`]
    })),
    ...Object.values(surgicalProtocols).map(s => ({
      ...s,
      type: 'surgical',
      categoryLabelEn: 'Orthognathic Surgery',
      categoryLabelAr: 'جراحة الفكين التقويمية',
      typicalDuration: `Pre-Op: ${s.typicalPreOpDuration} / Post-Op: ${s.typicalPostOpDuration}`,
      details: s.indications.join(', '),
      advantages: s.preOpOrthoGoals,
      disadvantages: s.risks,
      indications: s.indications
    })),
    ...Object.values(anchorageDevices).map(a => ({
      ...a,
      type: 'anchorage',
      categoryLabelEn: 'Anchorage Device / TAD',
      categoryLabelAr: 'مرسى عظمي / زرعات TADs',
      typicalDuration: a.loadingProtocol,
      details: `Insertion Site: ${a.insertionSite} (Success Rate: ${a.successRate})`,
      advantages: [`Type: ${a.anchorageType}`],
      disadvantages: [`Loading: ${a.loadingProtocol}`],
      indications: a.indications
    })),
    ...Object.values(retentionProtocols).map(r => ({
      ...r,
      type: 'retention',
      categoryLabelEn: 'Retention Protocol',
      categoryLabelAr: 'بروتوكول تثبيت الأسنان',
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
      categoryLabelEn: 'Bracket Prescription',
      categoryLabelAr: 'وصفة وعزم حاصرات التقويم',
      typicalDuration: isAr ? 'طوال مدة العلاج' : 'Full Treatment',
      details: b.description,
      advantages: [b.description],
      disadvantages: [isAr ? 'يتطلب تطابق قياس الشق (0.018 أو 0.022)' : 'Requires matching slot size'],
      indications: [isAr ? 'الميكانيكا الشاملة القياسية' : 'Standard comprehensive mechanics']
    })),
    ...Object.values(wireSequences).map(w => ({
      id: w.name.toLowerCase().replace(/\s+/g, '-'),
      name: w.name,
      type: 'wires',
      categoryLabelEn: 'Archwire Progression',
      categoryLabelAr: 'تسلسل أسلاك التقويم',
      typicalDuration: isAr ? '18–24 شهراً' : '18–24 Months',
      details: `${isAr ? 'تدرج الأسلاك' : 'Archwire progression'} (${w.slotSize} slot): ${w.steps.map((x: any) => x.dimension).join(' → ')}`,
      advantages: w.steps.map((x: any) => `${x.phase}: ${x.dimension} ${x.material} (${x.purpose})`),
      disadvantages: [isAr ? 'يجب إتمام التسلسل بالترتيب دون تخطي مرحلة' : 'Sequence must be completed sequentially'],
      indications: [isAr ? 'الرصف، التسوية، تقليل البروز، والإنهاء' : 'Alignment, Leveling, Overjet reduction, Finishing']
    })),
    ...Object.values(elasticProtocols).map(el => ({
      id: el.name.toLowerCase().replace(/\s+/g, '-'),
      name: el.name,
      type: 'elastics',
      categoryLabelEn: 'Intermaxillary Elastics',
      categoryLabelAr: 'مطاط بين الفكين',
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
                          (item.categoryLabelEn && item.categoryLabelEn.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories: { id: CategoryFilter; labelEn: string; labelAr: string; count: number }[] = [
    { id: 'all', labelEn: 'All Protocols', labelAr: 'كل البروتوكولات', count: allItems.length },
    { id: 'treatment', labelEn: 'Treatment Modalities', labelAr: 'أنظمة العلاج التقويمي', count: Object.keys(treatmentTypes).length },
    { id: 'functional', labelEn: 'Functional Appliances', labelAr: 'الأجهزة الوظيفية للفكين', count: Object.keys(functionalAppliances).length },
    { id: 'expansion', labelEn: 'Rapid Palatal Expansion', labelAr: 'أجهزة توسيع الفك السريع', count: Object.keys(expansionDevices).length },
    { id: 'surgical', labelEn: 'Orthognathic Surgery', labelAr: 'جراحة الفكين التقويمية', count: Object.keys(surgicalProtocols).length },
    { id: 'anchorage', labelEn: 'Anchorage & TADs', labelAr: 'المرسى وزرعات TADs', count: Object.keys(anchorageDevices).length },
    { id: 'retention', labelEn: 'Retention Protocols', labelAr: 'بروتوكولات التثبيت', count: Object.keys(retentionProtocols).length },
    { id: 'brackets', labelEn: 'Bracket Prescriptions', labelAr: 'وصفات عزم البراكتات', count: Object.keys(bracketSystems).length },
    { id: 'wires', labelEn: 'Archwire Sequences', labelAr: 'تسلسل وتدرج الأسلاك', count: Object.keys(wireSequences).length },
    { id: 'elastics', labelEn: 'Intermaxillary Elastics', labelAr: 'مطاط بين الفكين', count: Object.keys(elasticProtocols).length },
  ];

  return (
    <div className="space-y-6 select-none" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 rounded-xl text-white shadow-sm flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{t.knowledgePage.title}</h1>
            <Badge className="bg-blue-500/30 text-blue-200 border-none font-semibold">
              {allItems.length} {isAr ? 'بروتوكولاً سريرياً' : 'Clinical Protocols'}
            </Badge>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            {t.knowledgePage.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ${isAr ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            placeholder={t.knowledgePage.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-white/10 border border-white/20 rounded-lg py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isAr ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
            }`}
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
            <span>
              {isAr ? `مكتبة البروتوكولات السريرية (${allItems.length})` : `Clinical Protocols Library (${allItems.length})`}
            </span>
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
            <span>
              {isAr ? 'الحاسبات التفاعلية (4)' : 'Interactive Calculators (4)'}
            </span>
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
            <span>
              {isAr ? 'أبحاث PubMed المحكمة لحظياً' : 'PubMed Live RAG Literature'}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-1">
          <a
            href="/resources.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200 hover:border-teal-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>{isAr ? 'المراجع والأبحاث المحكمة 🔬' : 'Resources & References 🔬'}</span>
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === c.id 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isAr ? c.labelAr : c.labelEn} ({c.count})
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
                      {isAr ? item.categoryLabelAr : item.categoryLabelEn}
                    </span>
                    {item.typicalDuration && (
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
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
                  {isAr ? activeItem.categoryLabelAr : activeItem.categoryLabelEn}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{activeItem.name}</h2>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setActiveItem(null)} className="cursor-pointer">
                ✕
              </Button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border">
              {activeItem.details}
            </p>

            {activeItem.indications && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
                  {isAr ? 'دواعي الاستخدام السريري' : 'Clinical Indications'}
                </h4>
                <ul className={`list-disc ${isAr ? 'pr-5' : 'pl-5'} text-slate-700 space-y-0.5`}>
                  {activeItem.indications.map((ind: string, i: number) => (
                    <li key={i}>{ind}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeItem.contraindications && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-rose-900 uppercase text-[11px] tracking-wider">
                  {isAr ? 'موانع الاستخدام والمحاذير' : 'Contraindications'}
                </h4>
                <ul className={`list-disc ${isAr ? 'pr-5' : 'pl-5'} text-rose-800 space-y-0.5`}>
                  {activeItem.contraindications.map((c: string, i: number) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeItem.advantages && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-emerald-900 uppercase text-[11px] tracking-wider">
                  {isAr ? 'المزايا والميكانيكا الحركية' : 'Advantages & Biomechanics'}
                </h4>
                <ul className={`list-disc ${isAr ? 'pr-5' : 'pl-5'} text-emerald-800 space-y-0.5`}>
                  {activeItem.advantages.map((adv: string, i: number) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeItem.disadvantages && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">
                  {isAr ? 'الملاحظات والقيود السريرية' : 'Considerations & Limitations'}
                </h4>
                <ul className={`list-disc ${isAr ? 'pr-5' : 'pl-5'} text-slate-600 space-y-0.5`}>
                  {activeItem.disadvantages.map((dis: string, i: number) => (
                    <li key={i}>{dis}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t pt-4 flex justify-end">
              <Button size="sm" onClick={() => setActiveItem(null)} className="cursor-pointer">
                {isAr ? 'إغلاق التفاصيل' : 'Close Protocol'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}