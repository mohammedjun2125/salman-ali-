import React from 'react';

export function MughalDivider({className = ''}: {className?: string}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 my-4 ${className}`}
      aria-hidden="true"
    >
      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A46D]" />
      <svg
        width="32"
        height="16"
        viewBox="0 0 32 16"
        fill="none"
        className="text-[#A88952] shrink-0"
      >
        <path
          d="M16 1C18.5 5 22 7.2 28 8C22 8.8 18.5 11 16 15C13.5 11 10 8.8 4 8C10 7.2 13.5 5 16 1Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="#C5A46D"
          fillOpacity="0.22"
        />
        <circle cx="16" cy="8" r="2" fill="currentColor" />
      </svg>
      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A46D]" />
    </div>
  );
}

export function MughalCornerOrnament({
  position,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br';
}) {
  const transforms: Record<'tl' | 'tr' | 'bl' | 'br', string> = {
    tl: '',
    tr: 'scaleX(-1)',
    bl: 'scaleY(-1)',
    br: 'scale(-1, -1)',
  };

  const placements: Record<'tl' | 'tr' | 'bl' | 'br', string> = {
    tl: 'top-3 left-3',
    tr: 'top-3 right-3',
    bl: 'bottom-3 left-3',
    br: 'bottom-3 right-3',
  };

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      style={{transform: transforms[position]}}
      className={`pointer-events-none absolute ${placements[position]} text-[#C5A46D]/70`}
    >
      <path
        d="M2 24V8C2 4.686 4.686 2 8 2H24"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M7 20V10C7 8.343 8.343 7 10 7H20"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M4 4C8 4 11 7 11 11C7 11 4 8 4 4Z"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="24" cy="2" r="1.5" fill="currentColor" />
      <circle cx="2" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function MughalArchBorder({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative border border-[#C5A46D]/55 bg-[#FFFDF8]/90 px-6 py-10 sm:px-10 sm:py-12 shadow-[0_18px_50px_-24px_rgba(81,64,47,0.22)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-2 border border-[#C5A46D]/30" />
      <MughalCornerOrnament position="tl" />
      <MughalCornerOrnament position="tr" />
      <MughalCornerOrnament position="bl" />
      <MughalCornerOrnament position="br" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
