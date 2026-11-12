import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, Volume2 } from "lucide-react";
import { BIKE_RIDE_STOPS, TRIP_META } from "../data/expeditionData";

export default function BikeExpeditionSection() {
  const [stageIndex, setStageIndex] = useState(0);
  const [revving, setRevving] = useState(false);
  const audioCtxRef = useRef(null);

  const stop = BIKE_RIDE_STOPS[stageIndex];

  const handleNext = () => {
    setStageIndex((prev) => (prev + 1) % BIKE_RIDE_STOPS.length);
  };

  const playBikeThump = () => {
    setRevving(true);
    setTimeout(() => setRevving(false), 1100);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      for (let i = 0; i < 7; i++) {
        const t = now + i * 0.13;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(66, t);
        osc.frequency.exponentialRampToValueAtTime(36, t + 0.09);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(200, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.12);
      }
    } catch {
      // ignore if audio blocked
    }
  };

  return (
    <section
      id="bike-ride"
      className="relative z-20 mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-8 text-center"
      >
        <p className="font-script text-3xl text-[#F4C07A]">
          Just the two of us on two wheels
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold text-[#FFF6EE] sm:text-5xl">
          Riding Across Ladakh With You
        </h2>
      </motion.div>

      <div className="romantic-glass relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={stop.scenery}
            src={stop.scenery}
            alt={stop.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.34 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#161015]/60 via-[#161015]/50 to-[#161015]/90"
        />

        <div className="relative z-10 p-5 sm:p-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium tracking-widest uppercase text-[#F4C07A]">
              {stop.name} · {stop.altitude}
            </span>
            <button
              type="button"
              onClick={playBikeThump}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#F2A68D]/45 bg-[#161015]/55 px-3 py-1 text-xs text-[#F2A68D] backdrop-blur-md transition hover:bg-[#F2A68D]/20"
            >
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              {revving ? "Dug-Dug-Dug..." : "Start Bike"}
            </button>
          </div>

          <div className="relative h-52 w-full sm:h-60">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="h-full w-full"
            >
              <path
                d="M 10 74 C 22 68, 26 32, 34 26 C 43 20, 48 62, 56 62 C 65 62, 68 48, 76 46 C 84 44, 86 28, 91 24"
                fill="none"
                stroke="rgba(255, 246, 238, 0.22)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M 10 74 C 22 68, 26 32, 34 26 C 43 20, 48 62, 56 62 C 65 62, 68 48, 76 46 C 84 44, 86 28, 91 24"
                fill="none"
                stroke="#F2A68D"
                strokeWidth="0.7"
                strokeDasharray="1.8 1.8"
                strokeLinecap="round"
              />
            </svg>

            {BIKE_RIDE_STOPS.map((item, idx) => {
              const isCurrent = idx === stageIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStageIndex(idx)}
                  aria-label={`Ride to ${item.name}`}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <span
                    className={`block h-3.5 w-3.5 rounded-full border-2 transition ${
                      isCurrent
                        ? "scale-125 border-[#FFF6EE] bg-[#F2A68D] shadow-[0_0_16px_rgba(242,166,141,0.95)]"
                        : "border-[#F4C07A] bg-[#161015] group-hover:scale-110"
                    }`}
                  />
                  <span
                    className={`pointer-events-none absolute left-1/2 -top-7 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                      isCurrent
                        ? "bg-[#F2A68D] text-[#161015] font-semibold"
                        : "bg-[#161015]/75 text-[#FFF6EE]/85"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}

            <motion.div
              animate={{
                left: `${stop.x}%`,
                top: `${stop.y}%`,
                y: revving ? [0, -2, 0, -2, 0] : 0,
              }}
              transition={{
                left: { type: "spring", stiffness: 85, damping: 15 },
                top: { type: "spring", stiffness: 85, damping: 15 },
                y: { duration: 0.35, repeat: revving ? 3 : 0 },
              }}
              aria-hidden="true"
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-[82%]"
            >
              <svg width="68" height="44" viewBox="0 0 68 44" fill="none">
                <path
                  d="M12 15 Q5 12 1 16 Q6 19 12 17"
                  stroke="#F2A68D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="15" cy="34" r="7" stroke="#FFF6EE" strokeWidth="2.4" fill="#161015" />
                <circle cx="15" cy="34" r="2" fill="#F4C07A" />
                <circle cx="53" cy="34" r="7" stroke="#FFF6EE" strokeWidth="2.4" fill="#161015" />
                <circle cx="53" cy="34" r="2" fill="#F4C07A" />
                <path
                  d="M15 34 L27 23 L42 22 L53 34 M27 23 L22 33 L38 33 L42 22"
                  stroke="#F4C07A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M51 20 L65 16 L65 25 Z" fill="#F4C07A" fillOpacity="0.28" />
                <circle cx="49" cy="20" r="2.2" fill="#FFF6EE" />
                <circle cx="22" cy="11" r="3.6" fill="#F2A68D" />
                <path
                  d="M22 15 L20 24 L27 24"
                  stroke="#F2A68D"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="35" cy="10" r="3.8" fill="#FFF6EE" />
                <path
                  d="M35 14 L34 23 L45 19"
                  stroke="#FFF6EE"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-[#FFF6EE]/15 pt-5 sm:flex-row">
            <AnimatePresence mode="wait">
              <motion.p
                key={stop.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-start gap-2.5 font-hand text-2xl leading-snug text-[#FFF6EE] max-w-xl"
              >
                <Heart className="mt-1.5 h-4 w-4 shrink-0 fill-[#F2A68D] text-[#F2A68D]" aria-hidden="true" />
                <span>{stop.line}</span>
              </motion.p>
            </AnimatePresence>

            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={handleNext}
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#E58D73] to-[#F4C07A] px-5 py-2.5 text-xs font-semibold text-[#161015] shadow-lg transition hover:brightness-105"
            >
              <span>
                {stageIndex === BIKE_RIDE_STOPS.length - 1
                  ? `Ride Again With ${TRIP_META.friendName}`
                  : "Ride Further Together"}
              </span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
