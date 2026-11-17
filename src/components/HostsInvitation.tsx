import React from 'react';
import {motion} from 'motion/react';
import {weddingData} from '../config/weddingData';
import {MughalArchBorder, MughalDivider} from './MughalOrnaments';

export const HostsInvitation: React.FC = () => {
  return (
    <section
      className="py-8 sm:py-12 px-4 sm:px-6 max-w-3xl mx-auto"
      aria-label="Hosts and Family Invitation"
    >
      <motion.div
        initial={{opacity: 0, y: 24}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.85, ease: [0.22, 1, 0.36, 1]}}
      >
        <MughalArchBorder className="text-center bg-[#F3EADB]/85">
          <p className="font-royal text-xs tracking-[0.26em] text-[#A88952]">
            {weddingData.hosts.heading}
          </p>

          <p className="font-display text-xl sm:text-2xl font-semibold text-[#51402F] mt-4">
            {weddingData.hosts.blessingsElder}
          </p>

          <MughalDivider className="my-5" />

          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#51402F] text-balance">
            {weddingData.hosts.parents}
          </h2>

          <p className="font-editorial text-base sm:text-lg text-[#555442] mt-4 max-w-lg mx-auto leading-relaxed">
            {weddingData.hosts.requestLine}
          </p>
        </MughalArchBorder>
      </motion.div>
    </section>
  );
};
