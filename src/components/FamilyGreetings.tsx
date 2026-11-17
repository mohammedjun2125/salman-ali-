import React from 'react';
import {motion} from 'motion/react';
import {weddingData} from '../config/weddingData';
import {MughalArchBorder, MughalDivider} from './MughalOrnaments';

export const FamilyGreetings: React.FC = () => {
  return (
    <section
      id="family"
      className="py-12 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto"
      aria-label="Family Greetings and Compliments"
    >
      <motion.div
        initial={{opacity: 0, y: 22}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.85, ease: [0.22, 1, 0.36, 1]}}
      >
        <MughalArchBorder className="text-center marble-surface">
          <p className="font-royal text-xs sm:text-sm tracking-[0.24em] text-[#A88952]">
            {weddingData.familyGreetings.heading}
          </p>

          <MughalDivider className="my-5" />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 max-w-xl mx-auto mt-6">
            {weddingData.familyGreetings.names.map((name) => {
              const isNearAndDear = name === 'NEAR & DEAR';
              return (
                <li
                  key={name}
                  className={
                    isNearAndDear
                      ? 'sm:col-span-2 pt-3 mt-1 border-t border-[#C5A46D]/35 font-royal text-xs tracking-[0.26em] text-[#A88952]'
                      : 'font-display text-xl sm:text-2xl font-medium text-[#51402F]'
                  }
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </MughalArchBorder>
      </motion.div>
    </section>
  );
};
