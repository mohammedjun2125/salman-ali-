import React from 'react';
import {motion} from 'motion/react';
import {weddingData} from '../config/weddingData';
import {MughalArchBorder, MughalDivider} from './MughalOrnaments';

export const RoyalStageSection: React.FC = () => {
  return (
    <section
      className="py-8 sm:py-12 px-4 sm:px-6 max-w-3xl mx-auto"
      aria-label="Bride and Groom"
    >
      <motion.div
        initial={{opacity: 0, y: 24}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.85, ease: [0.22, 1, 0.36, 1]}}
      >
        <MughalArchBorder className="text-center marble-surface">
          <p className="font-royal text-xs tracking-[0.28em] text-[#A88952]">
            {weddingData.couple.groomLabel}
          </p>
          <p className="font-script text-4xl sm:text-6xl text-[#51402F] mt-2">
            Syed Salman Ali
          </p>
          <p className="font-royal text-sm sm:text-base tracking-[0.22em] text-[#A88952] mt-1">
            {weddingData.couple.groomName}
          </p>

          <MughalDivider className="my-6" />

          <p className="font-royal text-xs tracking-[0.3em] text-[#92957B]">
            {weddingData.couple.connector}
          </p>

          <p className="font-royal text-xs tracking-[0.26em] text-[#A88952] mt-4">
            {weddingData.couple.brideRelationLabel}
          </p>
          <p className="font-display text-2xl sm:text-3xl font-semibold tracking-[0.06em] text-[#51402F] mt-2">
            {weddingData.couple.brideParents}
          </p>
        </MughalArchBorder>
      </motion.div>
    </section>
  );
};
