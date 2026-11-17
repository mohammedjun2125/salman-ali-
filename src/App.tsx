import React, {useEffect, useState} from 'react';
import {AnimatePresence, MotionConfig, motion} from 'motion/react';
import {ArrowUp, RotateCcw} from 'lucide-react';
import {PalaceEntrance} from './components/PalaceEntrance';
import {IslamicWelcome} from './components/IslamicWelcome';
import {HostsInvitation} from './components/HostsInvitation';
import {RoyalStageSection} from './components/RoyalStageSection';
import {EventsSection} from './components/EventsSection';
import {VenueGoogleMap} from './components/VenueGoogleMap';
import {WeddingCountdown} from './components/WeddingCountdown';
import {FamilyGreetings} from './components/FamilyGreetings';
import {FinalGreeting} from './components/FinalGreeting';
import {LiveCelebrationBackdrop} from './components/LiveCelebrationBackdrop';

const INTRO_SESSION_KEY = 'syed_salman_palace_intro_seen_v1';

export default function App() {
  const [introOpen, setIntroOpen] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(INTRO_SESSION_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const [selectedVenueId, setSelectedVenueId] = useState<'nikah' | 'valima'>(
    'nikah'
  );
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleEnterComplete = () => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // ignore storage errors
    }
    setIntroOpen(false);
    window.scrollTo({top: 0, behavior: 'instant' as ScrollBehavior});
  };

  const handleReplayEntrance = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    setIntroOpen(true);
  };

  const handleViewVenueOnMap = (venueId: 'nikah' | 'valima') => {
    setSelectedVenueId(venueId);
    const el = document.getElementById('venues');
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-[100dvh] bg-[#F8F3E9] text-[#51402F]">
        {/* Google Maps Platform Client-Side Quota Banner (Tier 1 & 2) */}
        {mapsQuotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {introOpen ? (
            <PalaceEntrance
              key="entrance"
              onEnterComplete={handleEnterComplete}
            />
          ) : (
            <motion.div
              key="invitation-content"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.9, ease: [0.22, 1, 0.36, 1]}}
              className="relative"
            >
              <LiveCelebrationBackdrop />
              {/* Clean 3-Zone Top Bar Contract (compact mobile height <= 56px) */}
              <header className="sticky top-0 z-40 h-14 bg-[#FFFDF8]/95 border-b border-[#C5A46D]/45 px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-8">
                <a
                  href="#blessings"
                  className="font-script text-2xl sm:text-3xl text-[#51402F] whitespace-nowrap shrink-0"
                >
                  Syed Salman Ali
                </a>

                <nav
                  aria-label="Invitation sections"
                  className="hidden md:flex items-center gap-6 text-xs font-royal tracking-[0.16em] text-[#555442]"
                >
                  <a
                    href="#blessings"
                    className="hover:text-[#A88952] transition-colors whitespace-nowrap shrink-0"
                  >
                    Blessings
                  </a>
                  <a
                    href="#events"
                    className="hover:text-[#A88952] transition-colors whitespace-nowrap shrink-0"
                  >
                    Ceremonies
                  </a>
                  <a
                    href="#venues"
                    className="hover:text-[#A88952] transition-colors whitespace-nowrap shrink-0"
                  >
                    Venues
                  </a>
                  <a
                    href="#family"
                    className="hover:text-[#A88952] transition-colors whitespace-nowrap shrink-0"
                  >
                    Family
                  </a>
                </nav>

                <button
                  type="button"
                  onClick={handleReplayEntrance}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] border border-[#C5A46D]/70 bg-[#F3EADB] hover:bg-[#E8DDCB] text-[#51402F] text-[11px] font-royal tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#A88952]" />
                  Replay Entrance
                </button>
              </header>

              {/* Main Invitation Flow */}
              <main className="relative z-10">
                <IslamicWelcome />
                <HostsInvitation />
                <RoyalStageSection />
                <EventsSection onViewVenueOnMap={handleViewVenueOnMap} />
                <WeddingCountdown />
                <VenueGoogleMap
                  selectedVenueId={selectedVenueId}
                  onSelectVenue={setSelectedVenueId}
                />
                <FamilyGreetings />
              </main>

              <div className="relative z-10">
                <FinalGreeting onReplayEntrance={handleReplayEntrance} />
              </div>

              {/* Floating Back-to-Top Control */}
              {showBackToTop && (
                <div className="fixed bottom-4 right-4 z-40">
                  <button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    className="inline-flex items-center justify-center w-11 h-11 bg-[#FFFDF8]/95 border border-[#C5A46D] text-[#51402F] shadow-md hover:bg-[#F3EADB] transition-colors cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4 text-[#A88952]" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
