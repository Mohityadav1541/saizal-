import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MailOpen, RotateCw } from "lucide-react";
import { PRAYER_WISHES, TRIP_META } from "../data/expeditionData";

export default function SealedLetterSection() {
  const [opened, setOpened] = useState(false);
  const [spins, setSpins] = useState(0);
  const audioCtxRef = useRef(null);

  const wish = PRAYER_WISHES[spins % PRAYER_WISHES.length];

  const handleSpinWish = () => {
    setSpins((s) => s + 1);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(528, ctx.currentTime);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0008, ctx.currentTime + 1.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.05);
    } catch {
      // ignore if audio blocked
    }
  };

  return (
    <section
      id="letter"
      className="relative z-20 mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:px-12"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-7">
          <div className="romantic-glass flex h-full flex-col justify-center rounded-3xl p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {!opened ? (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F2A68D]/50 bg-[#F2A68D]/15 text-[#F2A68D]"
                  >
                    <MailOpen className="h-7 w-7" aria-hidden="true" />
                  </motion.div>
                  <h2 className="font-display mt-4 text-3xl italic text-[#FFF6EE]">
                    From My Heart to {TRIP_META.friendName}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setOpened(true)}
                    className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#E58D73] to-[#F4C07A] px-6 py-3 text-sm font-semibold text-[#161015] shadow-lg transition hover:brightness-105"
                  >
                    <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
                    Open This Letter ❤️
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="space-y-4"
                >
                  <p className="font-script text-4xl text-[#F4C07A]">
                    Dear {TRIP_META.friendName},
                  </p>
                  <p className="text-base leading-relaxed text-[#FFF6EE]/90">
                    I don&apos;t just want to see Leh-Ladakh — I want to feel every
                    sunrise, every freezing pass, and every quiet starry night
                    with your hand in mine.
                  </p>
                  <p className="text-base leading-relaxed text-[#FFF6EE]/90">
                    When you&apos;re next to me, even silence feels warm. Say yes to
                    this escape, and let&apos;s turn the Himalayas into a memory
                    only the two of us know.
                  </p>
                  <p className="font-hand pt-1 text-2xl text-[#F2A68D]">
                    Yours, waiting for your date. ❤️
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="romantic-glass flex h-full flex-col items-center justify-between rounded-3xl p-6 text-center sm:p-8">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#F4C07A]">
              Spin a Mountain Wish
            </p>

            <motion.button
              type="button"
              onClick={handleSpinWish}
              animate={{ rotate: spins * 360 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              aria-label="Spin the Ladakh prayer wheel"
              className="my-5 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-[#F2A68D]/50 bg-[#161015]/75 shadow-[0_0_28px_-8px_rgba(242,166,141,0.55)] transition hover:border-[#F4C07A]"
            >
              <svg width="58" height="58" viewBox="0 0 68 68" aria-hidden="true">
                <circle
                  cx="34"
                  cy="34"
                  r="26"
                  stroke="#F4C07A"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  fill="none"
                />
                <circle cx="34" cy="34" r="16" stroke="#F2A68D" strokeWidth="1.5" fill="none" />
                <circle cx="34" cy="34" r="5" fill="#F4C07A" />
              </svg>
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.p
                key={spins}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="font-hand text-2xl leading-snug text-[#FFF6EE]"
              >
                &ldquo;{wish}&rdquo;
              </motion.p>
            </AnimatePresence>

            <button
              type="button"
              onClick={handleSpinWish}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#F2A68D]/40 bg-[#F2A68D]/15 px-4 py-2 text-xs font-medium text-[#FFF6EE] transition hover:bg-[#F2A68D]/25"
            >
              <RotateCw className="h-3.5 w-3.5 text-[#F4C07A]" aria-hidden="true" />
              Spin Again
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
