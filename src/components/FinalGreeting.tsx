import React, {useState} from 'react';
import {motion} from 'motion/react';
import {Share2, Copy, Check, RotateCcw, Instagram, ArrowUpRight} from 'lucide-react';
import {weddingData} from '../config/weddingData';
import {MughalDivider} from './MughalOrnaments';

interface FinalGreetingProps {
  onReplayEntrance: () => void;
}

export const FinalGreeting: React.FC<FinalGreetingProps> = ({
  onReplayEntrance,
}) => {
  const [copied, setCopied] = useState(false);

  const getInvitationUrl = () => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `${weddingData.sharing.whatsappMessage} ${getInvitationUrl()}`
  )}`;

  const handleCopyLink = async () => {
    const url = getInvitationUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      // Fallback copy method if clipboard API is restricted
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    }
  };

  return (
    <footer
      className="pt-10 pb-24 sm:pb-20 px-4 sm:px-6 max-w-3xl mx-auto text-center"
      aria-label="Final Greeting and Invitation Sharing"
    >
      <motion.div
        initial={{opacity: 0, y: 22}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.85, ease: [0.22, 1, 0.36, 1]}}
        className="border border-[#C5A46D]/60 bg-[#FFFDF8] px-6 py-12 sm:px-10 sm:py-14 shadow-[0_20px_50px_-24px_rgba(81,64,47,0.24)]"
      >
        <p className="font-royal text-lg sm:text-2xl tracking-[0.24em] text-[#A88952]">
          {weddingData.finalGreeting.heading}
        </p>

        <MughalDivider className="my-5" />

        <p className="font-display text-xl sm:text-2xl font-medium text-[#51402F] max-w-lg mx-auto">
          {weddingData.finalGreeting.line1}
        </p>
        <p className="font-editorial italic text-base sm:text-lg text-[#555442] mt-3 max-w-lg mx-auto leading-relaxed">
          {weddingData.finalGreeting.line2}
        </p>

        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-4xl sm:text-5xl text-[#A88952] mt-6"
        >
          {weddingData.finalGreeting.ameenArabic}
        </p>

        <MughalDivider className="my-8" />

        {/* WhatsApp Sharing & Copy Link Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-shimmer-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] text-xs font-royal tracking-[0.16em] text-[#FFFDF8] whitespace-nowrap"
          >
            <Share2 className="w-4 h-4" />
            SHARE ON WHATSAPP
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] border border-[#C5A46D] bg-[#F3EADB] text-[#51402F] hover:bg-[#E8DDCB] text-xs font-royal tracking-[0.16em] transition-colors cursor-pointer whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#555442]" />
                LINK COPIED
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#A88952]" />
                COPY INVITATION LINK
              </>
            )}
          </button>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={onReplayEntrance}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[42px] text-xs font-ui font-medium text-[#A88952] hover:text-[#51402F] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Replay Palace Entrance
          </button>
        </div>
      </motion.div>

      {/* Discreet Luxury Studio Colophon */}
      <div className="mt-10 pt-8 border-t border-[#C5A46D]/35 flex flex-col items-center text-center px-4">
        <p className="font-royal text-[11px] tracking-[0.24em] text-[#A88952]">
          {weddingData.studioCredit.madeBy}
        </p>
        <p className="font-editorial italic text-sm text-[#555442] mt-1.5 max-w-md">
          {weddingData.studioCredit.subtitle}
        </p>
        <a
          href={weddingData.studioCredit.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] border border-[#C5A46D]/60 bg-[#FFFDF8]/90 hover:bg-[#F3EADB] text-[#51402F] text-xs font-ui font-medium transition-colors shadow-sm"
        >
          <Instagram className="w-4 h-4 text-[#A88952]" />
          <span>{weddingData.studioCredit.instagramHandle}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#A88952]" />
        </a>
      </div>
    </footer>
  );
};
