"use client";

import React from 'react';
import Link from 'next/link';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  subtitle?: string;
  variant?: 'light' | 'dark'; // 'light' is for light background (landing page), 'dark' is for dark background (sidebar)
  href?: string;
  className?: string;
}

export function LogoIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="logo-wire-grad" x1="4" y1="18" x2="32" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#5EEAD4" />
        </linearGradient>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Apple-style Squircle Glass Container */}
      <rect x="1.5" y="1.5" width="33" height="33" rx="9.5" fill="url(#logo-bg-grad)" />
      <rect x="2" y="2" width="32" height="32" rx="9" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />

      {/* Stylized Molar Crown with Roots */}
      <path 
        d="M11 9.5 C8.2 9.5 7 13 7.6 17.5 C8.2 22 9.5 27 12.2 27 C13.8 27 14.5 24 16 24 C17.5 24 18.2 27 19.8 27 C22.5 27 23.8 22 24.4 17.5 C25 13 23.8 9.5 21 9.5 C18.8 9.5 18.2 11.5 16 11.5 C13.8 11.5 13.2 9.5 11 9.5 Z" 
        fill="#FFFFFF" 
        fillOpacity="0.95"
        transform="translate(2, 0)"
      />

      {/* Precision Orthodontic Archwire */}
      <path 
        d="M6.5 18.5 Q 18 22 29.5 18.5" 
        stroke="url(#logo-wire-grad)" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        filter="url(#logo-glow)" 
      />

      {/* Orthodontic Bracket Nodes */}
      <rect x="12.5" y="16.5" width="3.5" height="3.5" rx="1" fill="#1E3A8A" stroke="#93C5FD" strokeWidth="0.8" />
      <rect x="20" y="16.5" width="3.5" height="3.5" rx="1" fill="#1E3A8A" stroke="#5EEAD4" strokeWidth="0.8" />

      {/* AI Intelligence Sparkle */}
      <path 
        d="M26.5 7 L27.5 9.5 L30 10.5 L27.5 11.5 L26.5 14 L25.5 11.5 L23 10.5 L25.5 9.5 Z" 
        fill="#FDE047" 
        opacity="0.95" 
      />
    </svg>
  );
}

export function Logo({
  size = 'md',
  showWordmark = true,
  subtitle = 'Orthodontic & Implant SaaS',
  variant = 'light',
  href,
  className = ''
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', sub: 'text-xs' },
    xl: { icon: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' }
  };

  const currentSize = sizeMap[size];
  const isLight = variant === 'light';

  const content = (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      <div className="shrink-0 drop-shadow-sm">
        <LogoIcon className={currentSize.icon} />
      </div>
      {showWordmark && (
        <div>
          <span className={`font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'} ${currentSize.text} block leading-tight`}>
            Odonto <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-teal-500">AI</span>
          </span>
          {subtitle && (
            <span className={`block font-semibold uppercase tracking-wider ${isLight ? 'text-teal-700' : 'text-teal-400'} ${currentSize.sub}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
