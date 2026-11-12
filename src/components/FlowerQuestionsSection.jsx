import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, RotateCcw } from "lucide-react";
import { FLOWER_STEPS, TRIP_META } from "../data/expeditionData";
import TeddyRoseBuddy from "./TeddyRoseBuddy";

function FlowerIcon({ color, bloomed, size = 38 }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      animate={{
        scale: bloomed ? 1 : 0.78,
        rotate: bloomed ? 0 : -18,
        opacity: bloomed ? 1 : 0.35,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      aria-hidden="true"
    >
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="24"
          cy="13"
          rx="5.5"
          ry="9.5"
          fill={color}
          fillOpacity={bloomed ? 0.92 : 0.45}
          transform={`rotate(${angle} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="5.5" fill="#FFF6EE" />
      <circle cx="24" cy="24" r="3" fill="#F4C07A" />
    </motion.svg>
  );
}

export default function FlowerQuestionsSection({ onCompleteBouquet }) {
  const [step, setStep] = useState(0);
  const [selectedReply, setSelectedReply] = useState("");
  const [completed, setCompleted] = useState(false);

  const current = FLOWER_STEPS[step];

  const handleChoose = (option) => {
    setSelectedReply(option.reply);
  };

  const handleNextStep = () => {
    setSelectedReply("");
    if (step < FLOWER_STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setCompleted(true);
      onCompleteBouquet?.();
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedReply("");
    setCompleted(false);
  };

  return (
    <section
      id="flowers"
      className="relative z-20 mx-auto max-w-4xl px-5 py-14 sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-7 text-center"
      >
        <p className="font-script text-3xl text-[#F4C07A]">
          One flower per answer
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold text-[#FFF6EE] sm:text-5xl">
          Four Flirty Questions for {TRIP_META.friendName}
        </h2>
        <div className="mt-5 flex justify-center">
          <TeddyRoseBuddy compact />
        </div>
      </motion.div>

      <div className="romantic-glass rounded-3xl p-6 sm:p-9">
        {/* Blooming 4-Flower Bouquet Progress Strip */}
        <div
          aria-label="Flower bouquet progress"
          className="mb-7 flex items-center justify-center gap-3 sm:gap-5"
        >
          {FLOWER_STEPS.map((item, idx) => {
            const bloomed = completed || idx < step || (idx === step && Boolean(selectedReply));
            const isCurrent = !completed && idx === step;
            return (
              <div key={item.id} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                    isCurrent
                      ? "border-[#F4C07A] bg-[#F4C07A]/15 shadow-[0_0_20px_-4px_rgba(244,192,122,0.7)]"
                      : bloomed
                        ? "border-[#F2A68D]/60 bg-[#F2A68D]/15"
                        : "border-[#FFF6EE]/10 bg-[#161015]/45"
                  }`}
                >
                  <FlowerIcon color={item.color} bloomed={bloomed} size={34} />
                </div>
                <span className="text-[10px] font-medium tracking-wider uppercase text-[#DFD0CA]">
                  0{idx + 1}
                </span>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <span className="inline-block rounded-full border border-[#F2A68D]/40 bg-[#F2A68D]/10 px-3 py-1 text-xs font-medium text-[#F2A68D]">
                Step {step + 1} of {FLOWER_STEPS.length} · {current.flowerName}
              </span>

              <h3 className="font-display mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-snug text-[#FFF6EE] sm:text-3xl">
                {current.question}
              </h3>

              <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
                {current.options.map((opt) => {
                  const chosen = selectedReply === opt.reply;
                  return (
                    <motion.button
                      key={opt.label}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleChoose(opt)}
                      className={`min-h-[52px] cursor-pointer rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                        chosen
                          ? "border-[#F4C07A] bg-[#F4C07A]/20 text-[#FFF6EE] shadow-lg"
                          : "border-[#FFF6EE]/15 bg-[#161015]/60 text-[#F5EAE2] hover:border-[#F2A68D]/60"
                      }`}
                    >
                      {opt.label}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedReply && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mx-auto mt-6 max-w-lg space-y-4"
                  >
                    <p className="font-hand text-2xl text-[#F4C07A]">
                      &ldquo;{selectedReply}&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex min-h-[46px] cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#E58D73] to-[#F4C07A] px-6 py-2.5 text-xs font-semibold text-[#161015] shadow-lg transition hover:brightness-105"
                    >
                      <span>
                        {step === FLOWER_STEPS.length - 1
                          ? "Receive Your Bouquet 💐"
                          : "Next Flower"}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="bouquet"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-3 text-center"
            >
              <div className="mx-auto flex max-w-xs items-center justify-center -space-x-2">
                {FLOWER_STEPS.map((f, i) => (
                  <motion.div
                    key={f.id}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: (i - 1.5) * 10 }}
                    transition={{ delay: i * 0.08, type: "spring" }}
                  >
                    <FlowerIcon color={f.color} bloomed size={52} />
                  </motion.div>
                ))}
              </div>

              <p className="font-script mt-4 text-4xl text-[#F4C07A]">
                A bouquet for you, {TRIP_META.friendName}
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#F5EAE2]/90">
                Four flowers bloomed, zero doubts left — now all that&apos;s missing
                is picking our date below.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#date-planner"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-gradient-to-r from-[#E58D73] to-[#F4C07A] px-6 py-3 text-sm font-semibold text-[#161015] shadow-lg transition hover:brightness-105"
                >
                  <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
                  Pick Our Date Together ❤️
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-[46px] cursor-pointer items-center gap-1.5 rounded-full border border-[#FFF6EE]/20 bg-[#161015]/60 px-4 py-2.5 text-xs font-medium text-[#DFD0CA] transition hover:text-[#FFF6EE]"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Replay
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
