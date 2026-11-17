import React, {useState} from 'react';
import {motion} from 'motion/react';
import {weddingData} from '../config/weddingData';
import {MughalArchBorder, MughalDivider} from './MughalOrnaments';

export const IslamicWelcome: React.FC = () => {
  const [crestError, setCrestError] = useState(false);

  return (
    <section
      id="blessings"
      className="py-14 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto"
      aria-label="Islamic Welcome and Quranic Verse"
    >
      <motion.div
        initial={{opacity: 0, y: 24}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.85, ease: [0.22, 1, 0.36, 1]}}
      >
        <MughalArchBorder className="text-center marble-surface">
          {!crestError && (
            <div className="mx-auto w-40 sm:w-48 mb-6 overflow-hidden">
              <img
                src={weddingData.assets.floralCrest}
                alt="Botanical white rose and antique gold Mughal crest"
                referrerPolicy="no-referrer"
                onError={() => setCrestError(true)}
                className="w-full h-auto object-contain mix-blend-multiply"
              />
            </div>
          )}

          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-3xl sm:text-4xl text-[#A88952] leading-relaxed"
          >
            {weddingData.islamicWelcome.bismillahArabic}
          </p>
          <p className="font-editorial italic text-sm sm:text-base text-[#555442] mt-3 max-w-md mx-auto">
            {weddingData.islamicWelcome.bismillahTranslation}
          </p>

          <MughalDivider className="my-7" />

          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-3xl sm:text-5xl text-[#51402F] leading-loose"
          >
            {weddingData.islamicWelcome.quranArabic}
          </p>
          <p className="font-display text-xl sm:text-2xl font-medium text-[#51402F] mt-3">
            {weddingData.islamicWelcome.quranTranslation}
          </p>
          <p className="font-royal text-xs tracking-[0.24em] text-[#A88952] mt-2">
            {weddingData.islamicWelcome.quranReference}
          </p>
        </MughalArchBorder>
      </motion.div>
    </section>
  );
};
