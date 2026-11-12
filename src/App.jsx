import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import StarlightCanvas from "./components/StarlightCanvas";
import FlowerCursorTrail from "./components/FlowerCursorTrail";
import FloatingNav from "./components/FloatingNav";
import HeroSection from "./components/HeroSection";
import HerSpotlightSection from "./components/HerSpotlightSection";
import BikeExpeditionSection from "./components/BikeExpeditionSection";
import FlowerQuestionsSection from "./components/FlowerQuestionsSection";
import FlirtDeckSection from "./components/FlirtDeckSection";
import TeddyRoseTree from "./components/TeddyRoseTree";
import SealedLetterSection from "./components/SealedLetterSection";
import DatePickerSection from "./components/DatePickerSection";
import { TRIP_META } from "./data/expeditionData";

const ROMANTIC_CONFETTI_COLORS = [
  "#F2A68D",
  "#F4C07A",
  "#E58D73",
  "#FFF6EE",
];

export default function App() {
  const [approved, setApproved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Lock-screen / notification tray metadata for iPhone & Android
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Leh-Ladakh With You",
        artist: `For ${TRIP_META.friendName} ❤️`,
        album: "Our Mountain Escape",
        artwork: [
          { src: "/photos/photo-1.jpg", sizes: "512x512", type: "image/jpeg" },
        ],
      });
    }
  }, []);

  // Keep state synced if iOS/Android pauses audio from Control Center / Lock Screen
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio.volume = 0.72;
    audio.play().catch(() => {
      // Blocked until direct user tap on iOS/Android
    });
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.72;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const triggerCelebration = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.65 },
      colors: ROMANTIC_CONFETTI_COLORS,
    });
  }, []);

  const handleSayYesFromHero = () => {
    setApproved(true);
    startMusic();
    triggerCelebration();
    const target = document.getElementById("date-planner");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#161015] text-[#FFF6EE]">
      {/* Native mobile-compatible audio track (iOS Safari + Android Chrome) */}
      <audio
        ref={audioRef}
        src="/audio/soundtrack.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Real Leh-Ladakh scenery layered across the entire page (100lvh avoids iOS address-bar jump) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[100lvh]"
      >
        <img
          src="/scenery/pangong-tso.jpg"
          alt=""
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161015]/55 via-[#1A1117]/65 to-[#120D14]/88" />
      </div>

      <StarlightCanvas />
      <FlowerCursorTrail />
      <FloatingNav isPlaying={isPlaying} onToggleMusic={toggleMusic} />

      <main className="relative z-20">
        <HeroSection
          approved={approved}
          onSayYes={handleSayYesFromHero}
          isPlaying={isPlaying}
          onToggleMusic={toggleMusic}
        />

        {/* Transition into Nubra Valley sunset backdrop */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <img
              src="/scenery/nubra-valley.jpg"
              alt=""
              className="h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#161015] via-[#161015]/55 to-[#161015]" />
          </div>
          <HerSpotlightSection />
          <BikeExpeditionSection />
          <FlowerQuestionsSection
            onCompleteBouquet={() => {
              startMusic();
              triggerCelebration();
            }}
          />
          <FlirtDeckSection onSayYes={handleSayYesFromHero} />
        </div>

        {/* Transition into Hanle Milky Way backdrop */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <img
              src="/scenery/hanle-stars.jpg"
              alt=""
              className="h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#161015] via-[#161015]/50 to-[#120C11]" />
          </div>
          <SealedLetterSection />
          <TeddyRoseTree />
          <DatePickerSection
            approved={approved}
            onLockInDates={() => {
              setApproved(true);
              startMusic();
              triggerCelebration();
            }}
          />
        </div>
      </main>

      <footer className="relative z-20 border-t border-[#FFF6EE]/10 bg-[#120C11]/85 px-5 py-7 text-center backdrop-blur-md">
        <p className="font-script text-3xl text-[#F4C07A]">
          For {TRIP_META.friendName}, with all my heart · Leh-Ladakh ❤️
        </p>
      </footer>
    </div>
  );
}
