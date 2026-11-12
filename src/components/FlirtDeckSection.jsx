import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { DODGE_LINES, FLIRT_CARDS, TRIP_META } from "../data/expeditionData";

export default function FlirtDeckSection({ onSayYes }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [blushCount, setBlushCount] = useState(0);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });

  const currentCard = FLIRT_CARDS[cardIndex];
  const dodgeMessage =
    dodgeCount > 0
      ? DODGE_LINES[(dodgeCount - 1) % DODGE_LINES.length]
      : `Be honest, ${TRIP_META.friendName} — how could you resist?`;

  const nextCard = () => {
    setCardIndex((prev) => (prev + 1) % FLIRT_CARDS.length);
  };

  const moveNoButton = () => {
    const x = (Math.random() > 0.5 ? 1 : -1) * (28 + Math.random() * 42);
    const y = (Math.random() > 0.5 ? 1 : -1) * (14 + Math.random() * 24);
    setDodgeOffset({ x, y });
    setDodgeCount((c) => c + 1);
  };

  return (
    <section
      id="flirt-deck"
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
          Fair warning before we pack
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold text-[#FFF6EE] sm:text-5xl">
          Little Things I&apos;m Trying on You
        </h2>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Interactive Flirt & Confession Deck */}
        <div className="lg:col-span-7">
          <div className="romantic-glass flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
            <div>
              <div className="mb-4 flex items-center justify-between text-xs font-medium text-[#F4C07A]">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {currentCard.tag}
                </span>
                <span className="text-[#DFD0CA]">
                  {cardIndex + 1} / {FLIRT_CARDS.length}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={cardIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  onClick={nextCard}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      nextCard();
                    }
                  }}
                  className="cursor-pointer rounded-2xl border border-[#FFF6EE]/15 bg-[#161015]/60 p-6 transition hover:border-[#F2A68D]/50"
                >
                  <p className="font-display text-2xl leading-snug italic text-[#FFF6EE] sm:text-3xl">
                    &ldquo;{currentCard.line}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={nextCard}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#FFF6EE] px-5 py-2.5 text-xs font-semibold text-[#161015] transition hover:bg-[#F4C07A]"
              >
                <span>Next Line</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setBlushCount((c) => c + 1)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#F2A68D]/50 bg-[#F2A68D]/15 px-4 py-2.5 text-xs font-medium text-[#FFF6EE] transition hover:bg-[#F2A68D]/25"
              >
                <Heart
                  className={`h-3.5 w-3.5 ${
                    blushCount > 0 ? "fill-[#F2A68D] text-[#F2A68D]" : "text-[#F2A68D]"
                  }`}
                  aria-hidden="true"
                />
                <span>
                  {blushCount > 0
                    ? `Made You Smile ×${blushCount}`
                    : "Did That Work? 😊"}
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Playful Dodging "No" Tease Card */}
        <div className="lg:col-span-5">
          <div className="romantic-glass flex h-full flex-col items-center justify-between rounded-3xl p-6 text-center sm:p-8">
            <div>
              <p className="font-script text-3xl text-[#F2A68D]">
                Quick question...
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold text-[#FFF6EE] sm:text-3xl">
                One bike, Ladakh &amp; me. Are you coming?
              </h3>
              <p className="font-hand mt-3 text-xl text-[#F4C07A]">
                {dodgeMessage}
              </p>
            </div>

            <div className="relative mt-7 flex min-h-[96px] w-full flex-wrap items-center justify-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={onSayYes}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#E58D73] to-[#F4C07A] px-6 py-3 text-sm font-semibold text-[#161015] shadow-lg"
              >
                <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
                Yes, Take Me ❤️
              </motion.button>

              <motion.button
                type="button"
                animate={{ x: dodgeOffset.x, y: dodgeOffset.y }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="cursor-pointer rounded-full border border-[#FFF6EE]/20 bg-[#161015]/70 px-5 py-3 text-xs font-medium text-[#DFD0CA]"
              >
                No 🙈
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
