import React, {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {MapPin, Calendar, Clock, ExternalLink, Sparkles} from 'lucide-react';
import {weddingData, type WeddingEventVenue} from '../config/weddingData';
import {MughalCornerOrnament, MughalDivider} from './MughalOrnaments';

interface EventsSectionProps {
  onViewVenueOnMap: (venueId: 'nikah' | 'valima') => void;
}

interface SparkleParticle {
  id: number;
  dx: number;
  dy: number;
  rotate: number;
  scale: number;
  color: string;
  shape: 'star' | 'diamond' | 'dot';
  delay: number;
}

const SPARKLE_COLORS = [
  '#C5A46D',
  '#EBD4A4',
  '#A88952',
  '#D98A6C',
  '#92957B',
  '#FFFDF8',
];

const SPARKLE_PARTICLES: SparkleParticle[] = Array.from(
  {length: 26},
  (_, i) => {
    const angle = (i / 26) * Math.PI * 2 + (i % 3) * 0.14;
    const distance = 58 + (i % 5) * 26;
    const shapes: SparkleParticle['shape'][] = ['star', 'diamond', 'dot'];
    return {
      id: i,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance - 12,
      rotate: ((i * 53) % 360) - 180,
      scale: 0.7 + (i % 4) * 0.25,
      color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
      shape: shapes[i % shapes.length],
      delay: (i % 4) * 0.035,
    };
  }
);

const PartySparklesBurst: React.FC<{burstKey: number}> = ({burstKey}) => {
  if (burstKey === 0) return null;
  return (
    <div
      key={burstKey}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible z-20"
    >
      {SPARKLE_PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          initial={{x: 0, y: 0, scale: 0.2, opacity: 1, rotate: 0}}
          animate={{
            x: p.dx,
            y: p.dy,
            scale: [0.2, p.scale * 1.25, p.scale * 0.6],
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{
            duration: 1.15,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute flex items-center justify-center"
        >
          {p.shape === 'star' ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill={p.color}>
              <path d="M8 0L9.9 6.1L16 8L9.9 9.9L8 16L6.1 9.9L0 8L6.1 6.1L8 0Z" />
            </svg>
          ) : p.shape === 'diamond' ? (
            <span
              className="block w-2.5 h-2.5 rotate-45"
              style={{backgroundColor: p.color}}
            />
          ) : (
            <span
              className="block w-2 h-2 rounded-full"
              style={{backgroundColor: p.color}}
            />
          )}
        </motion.span>
      ))}
    </div>
  );
};

const EventArchCard: React.FC<{
  event: WeddingEventVenue;
  delay?: number;
  onViewVenueOnMap: (venueId: 'nikah' | 'valima') => void;
}> = ({event, delay = 0, onViewVenueOnMap}) => {
  const [phase, setPhase] = useState<'sealed' | 'suspense' | 'revealed'>(
    'sealed'
  );
  const [burstCount, setBurstCount] = useState(0);

  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.mapsQuery
  )}`;

  const handleRevealClick = () => {
    if (phase === 'suspense') return;
    if (phase === 'revealed') {
      setBurstCount((c) => c + 1);
      window.dispatchEvent(new CustomEvent('royal-party-pop'));
      return;
    }
    setPhase('suspense');
    window.setTimeout(() => {
      setBurstCount((c) => c + 1);
      setPhase('revealed');
      window.dispatchEvent(new CustomEvent('royal-party-pop'));
    }, 450);
  };

  return (
    <motion.article
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.2}}
      transition={{duration: 0.8, delay, ease: [0.22, 1, 0.36, 1]}}
      className="relative flex flex-col justify-between border border-[#C5A46D]/60 bg-[#FFFDF8] px-6 py-10 sm:px-9 sm:py-12 text-center shadow-[0_18px_50px_-24px_rgba(81,64,47,0.22)] mughal-arch-clip"
    >
      <div className="pointer-events-none absolute inset-2.5 border border-[#C5A46D]/30 mughal-arch-clip" />
      <MughalCornerOrnament position="bl" />
      <MughalCornerOrnament position="br" />

      <div className="relative z-10">
        {/* Top Floral Finial Accent */}
        <div className="mx-auto mb-3 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-[#A88952]" aria-hidden="true" />
        </div>

        <h3 className="font-royal text-xl sm:text-2xl tracking-[0.2em] text-[#51402F]">
          {event.title}
        </h3>

        <MughalDivider className="my-4" />

        {/* Suspenseful Click-to-Reveal Date Zone with Party Sparkles */}
        <div className="relative min-h-[156px] flex flex-col items-center justify-center py-2">
          <PartySparklesBurst burstKey={burstCount} />

          <AnimatePresence mode="wait">
            {phase !== 'revealed' ? (
              <motion.div
                key="sealed"
                initial={{opacity: 0, scale: 0.96}}
                animate={
                  phase === 'suspense'
                    ? {
                        opacity: 1,
                        scale: [1, 1.04, 0.97, 1.03, 1],
                        rotate: [0, -1.5, 1.5, -1, 0],
                      }
                    : {opacity: 1, scale: 1}
                }
                exit={{opacity: 0, scale: 1.08}}
                transition={{duration: 0.42}}
                className="flex flex-col items-center"
              >
                <p className="font-editorial italic text-sm text-[#92957B] mb-3">
                  {phase === 'suspense'
                    ? 'Unveiling the blessed date...'
                    : 'A cherished date awaits'}
                </p>
                <button
                  type="button"
                  onClick={handleRevealClick}
                  className="gold-shimmer-btn inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] border border-[#EBD4A4]/80 text-xs font-royal tracking-[0.18em] text-[#FFFDF8] shadow-md transition-transform active:scale-[0.97] cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-[#FFFDF8]" />
                  {phase === 'suspense'
                    ? 'REVEALING...'
                    : 'TAP TO REVEAL DATE'}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{opacity: 0, scale: 0.85, y: 8}}
                animate={{opacity: 1, scale: 1, y: 0}}
                transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
                onClick={handleRevealClick}
                className="cursor-pointer"
                title="Tap for sparkles"
              >
                <p className="font-royal text-xs tracking-[0.26em] text-[#A88952]">
                  {event.day}
                </p>
                <p className="font-display text-2xl sm:text-3xl font-semibold text-[#51402F] mt-1 tabular-nums">
                  {event.date}
                </p>

                {event.hijriDate && (
                  <p className="font-editorial italic text-sm text-[#92957B] mt-1">
                    {event.hijriDate}
                  </p>
                )}

                <div className="mt-4 space-y-1.5 text-sm sm:text-base font-editorial text-[#555442]">
                  {event.schedule.map((line) => (
                    <p
                      key={line}
                      className="flex items-center justify-center gap-2"
                    >
                      <Clock
                        className="w-3.5 h-3.5 text-[#A88952] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{line}</span>
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MughalDivider className="my-6" />

        <p className="font-royal text-[11px] tracking-[0.26em] text-[#A88952]">
          VENUE
        </p>
        <h4 className="font-royal text-base sm:text-lg tracking-[0.1em] text-[#51402F] mt-2">
          {event.venueTitle}
        </h4>
        <div className="font-editorial text-sm sm:text-base text-[#555442] mt-1.5 leading-relaxed">
          {event.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8 flex flex-col items-center gap-2.5">
        <button
          type="button"
          onClick={() => onViewVenueOnMap(event.id)}
          className="gold-shimmer-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] text-xs font-royal tracking-[0.16em] text-[#FFFDF8] transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap"
        >
          <MapPin className="w-4 h-4" />
          {event.buttonLabel}
        </button>

        <a
          href={externalMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 min-h-[40px] text-xs font-ui font-medium text-[#A88952] hover:text-[#51402F] underline underline-offset-4 transition-colors"
        >
          Open directly in Google Maps
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.article>
  );
};

export const EventsSection: React.FC<EventsSectionProps> = ({
  onViewVenueOnMap,
}) => {
  return (
    <section
      id="events"
      className="py-10 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto"
      aria-label="Nikah and Valima Celebrations"
    >
      <div className="text-center mb-10">
        <p className="font-royal text-xs tracking-[0.26em] text-[#A88952]">
          WEDDING CEREMONIES
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#51402F] mt-2 text-balance">
          Auspicious Gatherings
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <EventArchCard
          event={weddingData.events.nikah}
          onViewVenueOnMap={onViewVenueOnMap}
        />
        <EventArchCard
          event={weddingData.events.valima}
          delay={0.12}
          onViewVenueOnMap={onViewVenueOnMap}
        />
      </div>

      <p className="mt-7 text-center font-royal text-[10px] tracking-[0.24em] text-[#92957B]">
        {weddingData.studioCredit.madeBy}
      </p>
    </section>
  );
};
