import React, {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {Sparkles} from 'lucide-react';
import {weddingData} from '../config/weddingData';
import {EntranceFloralPops} from './EntranceFloralPops';

interface PalaceEntranceProps {
  onEnterComplete: () => void;
}

export const PalaceEntrance: React.FC<PalaceEntranceProps> = ({
  onEnterComplete,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [archImageFailed, setArchImageFailed] = useState(false);
  const [doorImageFailed, setDoorImageFailed] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(() => {
      onEnterComplete();
    }, 2450);
  };

  return (
    <motion.section
      key="palace-entrance"
      initial={{opacity: 1}}
      exit={{opacity: 0, transition: {duration: 0.75, ease: [0.22, 1, 0.36, 1]}}}
      className="relative w-full min-h-[100dvh] bg-[#1F170F] overflow-hidden flex items-center justify-center select-none"
      aria-label="Royal Mughal Palace Entrance"
    >
      {/* Ambient outer ivory-marble frame on wide desktop screens */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 45%, rgba(197,164,109,0.28) 0%, rgba(31,23,15,0.96) 72%)',
        }}
      />

      {/* Centered Palace Portal Container (full-screen mobile, tall luxury portal on desktop) */}
      <motion.div
        animate={isOpening ? {scale: 1.07} : {scale: 1}}
        transition={{duration: 2.5, ease: [0.22, 1, 0.36, 1]}}
        className="relative w-full max-w-[540px] sm:max-w-[600px] lg:max-w-[640px] h-[100dvh] max-h-[1120px] overflow-hidden shadow-[0_0_90px_rgba(197,164,109,0.25)] bg-[#F8F3E9]"
      >
        {/* LAYER 1: Interior Golden Light Glow (revealed behind opening doors) */}
        <motion.div
          animate={
            isOpening
              ? {opacity: 1, scale: 1.15}
              : {opacity: 0.45, scale: 1}
          }
          transition={{duration: 2.1, ease: [0.22, 1, 0.36, 1]}}
          className="absolute inset-x-[22%] top-[24%] bottom-[12%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 55%, #FFFDF8 0%, #F4D89D 38%, #C5A46D 74%, rgba(81,64,47,0.4) 100%)',
          }}
        />

        {/* LAYER 2: Static Palace Architecture & Rose Arch Surround */}
        {!archImageFailed ? (
          <img
            src={weddingData.assets.palaceArch}
            alt="Ivory Mughal palace entrance arch framed by white roses and antique gold lanterns"
            referrerPolicy="no-referrer"
            onError={() => setArchImageFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F3E9] via-[#E8DDCB] to-[#C5A46D]/40" />
        )}

        {/* LAYER 3: Independently Animated 3D Left & Right Mughal Doors inside the Archway */}
        <div
          className="absolute left-[25.5%] right-[25.5%] top-[29%] bottom-[13.5%] z-10 flex overflow-visible"
          style={{
            perspective: '1600px',
            perspectiveOrigin: '50% 50%',
            clipPath: 'inset(0% 0% 0% 0% round 46% 46% 0 0)',
          }}
        >
          {/* Expanding interior golden burst behind doors */}
          <motion.div
            initial={{opacity: 0}}
            animate={isOpening ? {opacity: 0.95} : {opacity: 0}}
            transition={{duration: 1.8, delay: 0.25, ease: 'easeOut'}}
            className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center px-4 text-center"
            style={{
              background:
                'radial-gradient(circle at 50% 48%, rgba(255,253,248,0.98) 0%, rgba(243,234,219,0.92) 48%, rgba(197,164,109,0.55) 100%)',
            }}
          >
            <p className="font-arabic text-2xl sm:text-3xl text-[#A88952] mb-1">
              {weddingData.entrance.bismillahArabic}
            </p>
            <p className="font-royal text-xs tracking-[0.22em] text-[#51402F]">
              WELCOME TO THE CELEBRATION
            </p>
          </motion.div>

          {/* Left Palace Door */}
          <motion.div
            initial={{rotateY: 0}}
            animate={isOpening ? {rotateY: -108} : {rotateY: 0}}
            transition={{duration: 2.35, ease: [0.22, 1, 0.36, 1]}}
            style={{
              transformOrigin: '0% 50%',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-1/2 h-full overflow-hidden border-r border-[#8E6E3B]/70 shadow-[inset_-8px_0_18px_rgba(81,64,47,0.28)] bg-[#F3EADB]"
          >
            {!doorImageFailed ? (
              <img
                src={weddingData.assets.palaceDoor}
                alt="Left carved ivory and gold Mughal palace door"
                referrerPolicy="no-referrer"
                onError={() => setDoorImageFailed(true)}
                className="w-full h-full object-cover object-center scale-[1.16]"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#FFFDF8] to-[#E8DDCB] border-2 border-[#C5A46D]" />
            )}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-[#A88952]/70 to-transparent" />
          </motion.div>

          {/* Right Palace Door (horizontally mirrored for symmetrical brass knockers) */}
          <motion.div
            initial={{rotateY: 0}}
            animate={isOpening ? {rotateY: 108} : {rotateY: 0}}
            transition={{duration: 2.35, ease: [0.22, 1, 0.36, 1]}}
            style={{
              transformOrigin: '100% 50%',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-1/2 h-full overflow-hidden border-l border-[#8E6E3B]/70 shadow-[inset_8px_0_18px_rgba(81,64,47,0.28)] bg-[#F3EADB]"
          >
            {!doorImageFailed ? (
              <div className="w-full h-full -scale-x-100">
                <img
                  src={weddingData.assets.palaceDoor}
                  alt="Right carved ivory and gold Mughal palace door"
                  referrerPolicy="no-referrer"
                  onError={() => setDoorImageFailed(true)}
                  className="w-full h-full object-cover object-center scale-[1.16]"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-bl from-[#FFFDF8] to-[#E8DDCB] border-2 border-[#C5A46D]" />
            )}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-[#A88952]/70 to-transparent" />
          </motion.div>
        </div>

        {/* LAYER 3.5: Popping Floral Blossoms & Drifting Rose Petals */}
        <EntranceFloralPops isOpening={isOpening} />

        {/* LAYER 4: Soft Top & Bottom Scrims + Subtle Opening Greeting & Controls */}
        <AnimatePresence>
          {!isOpening && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0, transition: {duration: 0.45}}}
              className="relative z-20 h-full w-full flex flex-col justify-between pointer-events-none"
            >
              {/* Upper Arch Greeting */}
              <div className="pt-5 px-4 sm:pt-6 sm:px-6 bg-gradient-to-b from-[#2A1F14]/75 via-[#2A1F14]/45 to-transparent pb-8 pointer-events-auto">
                <div className="text-center">
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-2xl sm:text-3xl text-[#FFFDF8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
                  >
                    {weddingData.entrance.bismillahArabic}
                  </p>
                  <p className="font-royal text-[10px] sm:text-xs tracking-[0.26em] text-[#F3EADB] mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.75)]">
                    {weddingData.entrance.inTheName}
                  </p>
                </div>
              </div>

              {/* Lower Scrim Invitation Text & Primary CTA — kept compact so doors & arch shine */}
              <div className="px-5 pt-12 pb-6 sm:pb-8 bg-gradient-to-t from-[#241B12]/95 via-[#241B12]/82 to-transparent text-center pointer-events-auto">
                <p className="font-display italic text-sm sm:text-base text-[#E8DDCB] tracking-wide">
                  {weddingData.entrance.blessingLead}
                </p>
                <p className="font-royal text-[10px] sm:text-xs tracking-[0.2em] text-[#F3EADB] mt-1">
                  {weddingData.entrance.cordiallyInvited}
                </p>
                <p className="font-royal text-[10px] sm:text-xs tracking-[0.22em] text-[#C5A46D] mt-0.5">
                  {weddingData.entrance.theWeddingOf}
                </p>
                <h1 className="font-script text-4xl sm:text-5xl text-[#FFFDF8] mt-1 mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                  {weddingData.entrance.groomName}
                </h1>

                <button
                  type="button"
                  onClick={handleOpenInvitation}
                  className="gold-shimmer-btn inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] border border-[#EBD4A4]/80 text-[#FFFDF8] font-royal text-xs sm:text-sm tracking-[0.2em] transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-[#FFFDF8]" />
                  {weddingData.entrance.openButtonLabel}
                </button>

                <p className="mt-4 font-royal text-[10px] tracking-[0.22em] text-[#E8DDCB]/70">
                  {weddingData.studioCredit.madeBy}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};
