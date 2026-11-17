import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {weddingData} from '../config/weddingData';
import {MughalDivider} from './MughalOrnaments';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function getISTTargetEpoch(): number {
  return new Date(weddingData.countdown.targetIso).getTime();
}

function computeRemaining(): TimeRemaining {
  // Compute current time aligned against the Asia/Kolkata offset target timestamp
  const targetMs = getISTTargetEpoch();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (diff <= 0) {
    return {days: 0, hours: 0, minutes: 0, seconds: 0, expired: true};
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {days, hours, minutes, seconds, expired: false};
}

export const WeddingCountdown: React.FC = () => {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    computeRemaining()
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining(computeRemaining());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const units = [
    {label: 'DAYS', value: remaining.days},
    {label: 'HOURS', value: remaining.hours},
    {label: 'MINUTES', value: remaining.minutes},
    {label: 'SECONDS', value: remaining.seconds},
  ];

  return (
    <section
      className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto"
      aria-label="Countdown to the Valima"
    >
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
        className="border border-[#C5A46D]/60 bg-[#F3EADB]/90 px-5 py-10 sm:px-10 sm:py-12 text-center shadow-[0_18px_45px_-24px_rgba(81,64,47,0.22)]"
      >
        <p className="font-royal text-xs tracking-[0.26em] text-[#A88952]">
          {weddingData.countdown.heading}
        </p>
        <p className="font-editorial text-sm sm:text-base text-[#555442] mt-1.5">
          {weddingData.countdown.subheading} · Asia/Kolkata
        </p>

        <MughalDivider className="my-6" />

        {remaining.expired ? (
          <div className="py-4">
            <p className="font-script text-4xl sm:text-5xl text-[#A88952]">
              {weddingData.countdown.completedTitle}
            </p>
            <p className="font-editorial text-base sm:text-lg text-[#51402F] mt-2 max-w-md mx-auto">
              {weddingData.countdown.completedMessage}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-2xl mx-auto">
            {units.map((unit) => {
              const formatted = String(unit.value).padStart(2, '0');
              return (
                <div
                  key={unit.label}
                  className="border border-[#C5A46D]/70 bg-[#FFFDF8] py-5 px-3 shadow-sm"
                >
                  <div className="h-11 sm:h-14 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={formatted}
                        initial={{y: 8, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: -8, opacity: 0}}
                        transition={{duration: 0.22, ease: 'easeOut'}}
                        className="font-display text-4xl sm:text-5xl font-semibold text-[#51402F] tabular-nums"
                      >
                        {formatted}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className="font-royal text-[11px] tracking-[0.22em] text-[#A88952] mt-1">
                    {unit.label}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
};
