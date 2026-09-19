'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Lightbulb, 
  Check, 
  Stethoscope, 
  HelpCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TourStep {
  id: string;
  targetSelector: string;
  title: string;
  subtitle: string;
  description: string;
  tip?: string;
  action?: () => void;
}

export const DEFAULT_TOUR_STEPS: TourStep[] = [
  {
    id: 'patient-input',
    targetSelector: '#tour-patient-section',
    title: '١. اختيار أو إدخال بيانات المريض',
    subtitle: 'Patient Intake & Case Selection',
    description: 'أهلاً بك يا دكتور! من هنا تقدر تختار حالة مريض مسجل عندك في العيادة، أو تضغط على "Custom Patient Form" وتكتب الشكوى الأساسية للمريض (زي عضة معكوسة أو تزاحم شديد) وسنه ونوعه.',
    tip: '💡 تقدر تجرب الحالات الجاهزة (Class II / Class III) بضغطة زرار واحدة للاختبار السريع.'
  },
  {
    id: 'clinical-measurements',
    targetSelector: '#tour-clinical-measurements',
    title: '٢. الفحص الإكلينيكي وتصنيف أنجل',
    subtitle: 'Angle Class, Overjet & Overbite',
    description: 'هنا بتحدد تصنيف الحالة (Angle Class I, II, III)، وقيم الـ Overjet والـ Overbite بالمليمتر، ومقدار التزاحم (Crowding). القيم دي هي الأساس الرياضي اللي المحرك بيبني عليه قرارات الخلع ومسافات الرص.',
    tip: '📐 الـ Overjet بالسالب للعضة المعكوسة (Underbite) وبالموجب في حالات البروز.'
  },
  {
    id: 'diagnostic-hub',
    targetSelector: '#tour-diagnostic-hub',
    title: '٣. مركز الأشعة والتشخيص الذكي',
    subtitle: 'Diagnostic Records & 3D WebGL Cast',
    description: 'ده مركز الأشعات والتحاليل المتكامل؛ بيعرضلك التريسينج الآلي للسيفالومتريكس (ANB و Wits)، شارت الأسنان FDI، البانوراما، تحليل بولتون، وكمان كاست 3D تفاعلي متزامن لحظياً مع بيانات المريض.',
    tip: '🦷 دوس على التابات المختلفة فوق عشان تستعرض كل وسيلة تشخيصية بالتفصيل.'
  },
  {
    id: 'modality-level',
    targetSelector: '#tour-modality-level',
    title: '٤. نوع جهاز التقويم ومستوى الشرح',
    subtitle: 'Appliance Modality & Clinician Level',
    description: 'اختر نوع الجهاز اللي هتشتغل بيه في العيادة (تقويم ثابت MBT 0.022، تقويم شفاف Aligners، وظيفي، أو جراحي). كمان تقدر تختار بين شرح بيوميكانيكي مفصل للمبتدئين أو ملخص إكلينيكي سريع للاستشاريين.',
    tip: '⚙️ تسلسل الأسلاك وقوى المطاط بتتفصل أوتوماتيكياً على حسب اختيارك هنا.'
  },
  {
    id: 'generate-btn',
    targetSelector: '#tour-generate-btn',
    title: '٥. توليد الخطة البيوميكانيكية فورياً',
    subtitle: '7-Layer AI Biomechanical Engine',
    description: 'بضغطة واحدة هنا على "Synthesize Plan with AI"، المحرك الذكي هيشغل الـ 7 طبقات ويطلعلك خطة علاجية متكاملة بتسلسل الأسلاك، قوى ومقاسات المطاط، والـ Anchorage، وكل قرار مدعوم بدراسات منشورة.',
    tip: '🚀 جاهز تبدأ؟ دوس على الزرار ده دلوقتي وشوف سحر التحليل البيوميكانيكي!'
  }
];

export const DEFAULT_IMPLANT_TOUR_STEPS: TourStep[] = [
  {
    id: 'implant-fdi',
    targetSelector: '#tour-implant-fdi',
    title: '١. تحديد موضع السن والزرعة (FDI Chart)',
    subtitle: 'Missing Tooth & Implant Site Selection',
    description: 'أهلاً بك يا دكتور في استوديو تخطيط الزراعة! من الشارت التفاعلي ده بتختار رقم السن المفقود (زي #11 في المنطقة الجمالية أو #16 و #36 في المولارز). الاختيار هنا بيحدد تلقائياً اعتبارات الجيب الأنفي (Sinus) أو عصب الفك (IAN).',
    tip: '🦷 دوس على أي سنة في الفك العلوي أو السفلي وهيتحول التخطيط لموضعها فوراً.'
  },
  {
    id: 'implant-bone',
    targetSelector: '#tour-implant-bone',
    title: '٢. قياسات العظم وكثافة Misch (D1 - D4)',
    subtitle: 'Bone Width, Height & Density Assessment',
    description: 'هنا بتحدد العرض (Width) والارتفاع (Height) المتاحين للعظم بالمليمتر من واقع الـ CBCT، وبتحدد كثافة العظم (D1 عظم كثيف لحد D4 عظم إسفنجي). لو الحالة خلع فوري تقدر تفعل "Immediate Socket" وتحدد الـ Type.',
    tip: '📐 النظام بيحسب هوامش الأمان الحيوية أوتوماتيكياً (1.5mm بين الزرعات و 2mm فوق العصب).'
  },
  {
    id: 'implant-medical',
    targetSelector: '#tour-implant-medical',
    title: '٣. الفحص الطبي وعوامل الخطورة البيولوجية',
    subtitle: 'Medical Risk Screening & Complication Scoring',
    description: 'تقدر تفحص موانع وعوامل فشل الاندماج العظمي: التدخين، سكر الدم التراكمي (HbA1c)، أمراض اللثة، والجز على الأسنان (Bruxism) وأدوية السيولة والـ Bisphosphonates، عشان المحرك يحدد نسبة نجاح الزرعة بدقة.',
    tip: '🛡️ أي عامل خطورة بيغير تلقائياً بروتوكول الشفاء (Healing Period) وعزم الربط الأولي المطلوب.'
  },
  {
    id: 'implant-system',
    targetSelector: '#tour-implant-system',
    title: '٤. اختيار نظام وماركة الزرعة المفضلة',
    subtitle: 'Implant System & Brand Catalog',
    description: 'اختر الماركة والنظام اللي شغال بيه في عيادتك (Straumann, Nobel Biocare, Zimmer Biomet, Dentsply Astra, Osstem, MegaGen). المحرك مربوط بكتالوجات الشركات دي وبيختارلك الفيكستشر المناسبة بالضبط.',
    tip: '⚙️ كل ماركة مدعومة بمواصفات الكونكشن (Conical / Internal Hex) ونوع السطح (SLActive / TiUnite).'
  },
  {
    id: 'implant-generate-btn',
    targetSelector: '#tour-implant-generate-btn',
    title: '٥. توليد الخطة الجراحية ومواصفات المسامير',
    subtitle: 'AI Biomechanical Surgical Plan Synthesis',
    description: 'بضغطة واحدة على "Generate Surgical Plan"، المحرك بيحلل الـ 5 طبقات ويحددلك قطر وطول الفيكستشر، بروتوكول الدريل وسرعات الحفر وعزم التثبيت (Torque N.cm)، ونوع الأباتمنت ومقاسات مسمار الربط.',
    tip: '🚀 دوس على الزرار ده دلوقتي وجرب الخطة الجراحية المتكاملة مع الأبحاث المعتمدة!'
  }
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  steps?: TourStep[];
  onFinish?: () => void;
  storageKey?: string;
}

export function OnboardingTour({
  isOpen,
  onClose,
  steps = DEFAULT_TOUR_STEPS,
  onFinish,
  storageKey = 'odonto_onboarding_completed'
}: OnboardingTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [arrowPosition, setArrowPosition] = useState<'top' | 'bottom'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[currentStepIndex];

  // Update position of spotlight and tooltip
  const updatePosition = useCallback(() => {
    if (!isOpen || !currentStep) return;

    const element = document.querySelector(currentStep.targetSelector);
    if (!element) {
      setTargetRect(null);
      // Fallback: center in viewport
      setTooltipStyle({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 60,
      });
      return;
    }

    const rect = element.getBoundingClientRect();
    setTargetRect(rect);

    const tooltipWidth = 420;
    const tooltipEstimatedHeight = 320;
    const gap = 16;
    const padding = 16;

    let top = 0;
    let arrow: 'top' | 'bottom' = 'top';

    // Check if there is enough space below the element
    if (rect.bottom + tooltipEstimatedHeight + gap < window.innerHeight) {
      top = rect.bottom + gap;
      arrow = 'top';
    } else if (rect.top - tooltipEstimatedHeight - gap > 0) {
      top = rect.top - tooltipEstimatedHeight - gap;
      arrow = 'bottom';
    } else {
      // Fit in viewport vertically
      top = Math.max(padding, window.innerHeight - tooltipEstimatedHeight - padding);
      arrow = 'top';
    }

    // Horizontally center with target element, clamped inside viewport
    const targetCenterX = rect.left + rect.width / 2;
    let left = targetCenterX - tooltipWidth / 2;
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));

    setArrowPosition(arrow);
    setTooltipStyle({
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `min(${tooltipWidth}px, calc(100vw - ${padding * 2}px))`,
      zIndex: 60,
    });
  }, [isOpen, currentStep]);

  // When step changes, smooth scroll and execute action if needed
  useEffect(() => {
    if (!isOpen || !currentStep) return;

    if (currentStep.action) {
      currentStep.action();
    }

    const element = document.querySelector(currentStep.targetSelector);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }

    // Slight delay to allow smooth scroll before measuring
    const timer = setTimeout(() => {
      updatePosition();
    }, 350);

    return () => clearTimeout(timer);
  }, [isOpen, currentStepIndex, currentStep, updatePosition]);

  // Handle resize and scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      window.requestAnimationFrame(updatePosition);
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [isOpen, updatePosition]);

  // Handle keyboard navigation (Escape to close, Arrows to navigate)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'ArrowLeft') {
        // In RTL, left arrow moves forward (Next)
        handleNext();
      } else if (e.key === 'ArrowRight') {
        // In RTL, right arrow moves backward (Prev)
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, 'true');
    }
    onClose();
  };

  const handleComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, 'true');
    }
    if (onFinish) {
      onFinish();
    }
    onClose();
  };

  if (!isOpen || !currentStep) return null;

  return (
    <>
      {/* SVG Backdrop Overlay with dynamic spotlight cutout */}
      <svg 
        className="fixed inset-0 w-full h-full pointer-events-none z-50 transition-opacity duration-300"
        aria-hidden="true"
      >
        <defs>
          <mask id="odonto-tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - 6}
                y={targetRect.top - 6}
                width={targetRect.width + 12}
                height={targetRect.height + 12}
                rx="14"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(15, 23, 42, 0.52)"
          mask="url(#odonto-tour-mask)"
        />
      </svg>

      {/* Pulsing Highlight Halo around the targeted element */}
      {targetRect && (
        <div
          style={{
            position: 'fixed',
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
            borderRadius: '14px',
          }}
          className="pointer-events-none z-50 border-2 border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.3),0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 animate-pulse"
        />
      )}

      {/* Floating Interactive Tooltip Card */}
      <div
        ref={tooltipRef}
        style={tooltipStyle}
        dir="rtl"
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 p-5 text-slate-900 transition-all duration-300 animate-in fade-in zoom-in-95"
      >
        {/* Pointer Arrow indicator */}
        {targetRect && (
          <div
            className={`absolute w-3.5 h-3.5 bg-white border-slate-200 rotate-45 pointer-events-none ${
              arrowPosition === 'top'
                ? '-top-2 right-12 border-t border-r'
                : '-bottom-2 right-12 border-b border-l'
            }`}
          />
        )}

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
              جولة توضيحية • خطوة {currentStepIndex + 1} من {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSkip}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="تخطي الجولة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Title & Subtitle */}
        <div className="mb-2.5">
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {currentStep.title}
          </h3>
          <p className="text-[11px] font-semibold text-blue-600 tracking-wide uppercase mt-0.5">
            {currentStep.subtitle}
          </p>
        </div>

        {/* Main Step Description in Professional Egyptian Arabic */}
        <p className="text-xs text-slate-600 leading-relaxed mb-3 font-normal">
          {currentStep.description}
        </p>

        {/* Clinical Tip Box */}
        {currentStep.tip && (
          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-xs flex items-start gap-2 mb-4 leading-normal">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="font-medium">{currentStep.tip}</span>
          </div>
        )}

        {/* Footer with Progress Dots and Navigation Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex
                    ? 'w-6 bg-blue-600'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`انتقل للخطوة ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrev}
                className="text-xs font-semibold h-8 px-3 border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer gap-1"
              >
                السابق
                <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              </Button>
            )}

            {currentStepIndex < steps.length - 1 ? (
              <Button
                type="button"
                size="sm"
                onClick={handleNext}
                className="text-xs font-bold h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer gap-1.5"
              >
                التالي
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={handleComplete}
                className="text-xs font-bold h-8 px-4 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                ابدأ التوليد الآن
              </Button>
            )}
          </div>
        </div>

        {/* Skip Tour text button */}
        <div className="text-center mt-2.5">
          <button
            type="button"
            onClick={handleSkip}
            className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors underline cursor-pointer"
          >
            تخطي الجولة التوضيحية
          </button>
        </div>
      </div>
    </>
  );
}
