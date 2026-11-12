import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { HER_SPOTLIGHT_PHOTOS, TRIP_META } from "../data/expeditionData";
import PhotoFrame from "./PhotoFrame";

export default function HerSpotlightSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealWhisper, setRevealWhisper] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const active = HER_SPOTLIGHT_PHOTOS[activeIndex];

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <section
      id="spotlight"
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
          Even the Himalayas can&apos;t compete
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold text-[#FFF6EE] sm:text-5xl">
          Every Frame of You, {TRIP_META.friendName}
        </h2>
      </motion.div>

      <div className="romantic-glass rounded-3xl p-5 sm:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.button
                key={active.id}
                type="button"
                onClick={() => setLightboxOpen(true)}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                aria-label={`Open ${active.title} larger`}
                className="block w-full cursor-pointer overflow-hidden rounded-2xl border border-[#FFF6EE]/20 shadow-2xl"
              >
                <PhotoFrame
                  src={active.src}
                  alt={`${TRIP_META.friendName} — ${active.title}`}
                  className="aspect-[4/5] w-full"
                />
              </motion.button>
            </AnimatePresence>

            <div className="mt-3.5 grid grid-cols-4 gap-2.5">
              {HER_SPOTLIGHT_PHOTOS.map((item, idx) => {
                const selected = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(idx);
                      setRevealWhisper(false);
                    }}
                    aria-label={`View ${item.label}`}
                    className={`cursor-pointer overflow-hidden rounded-xl border-2 transition ${
                      selected
                        ? "border-[#F2A68D] scale-[1.03]"
                        : "border-transparent opacity-65 hover:opacity-100"
                    }`}
                  >
                    <PhotoFrame
                      src={item.src}
                      alt={item.label}
                      className="aspect-square w-full"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#F2A68D]">
                  0{activeIndex + 1} / 0{HER_SPOTLIGHT_PHOTOS.length}
                </p>
                <h3 className="font-display mt-2 text-3xl font-semibold text-[#FFF6EE] sm:text-4xl">
                  {active.title}
                </h3>

                <button
                  type="button"
                  onClick={() => setRevealWhisper((prev) => !prev)}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#F2A68D]/55 bg-[#F2A68D]/15 px-5 py-2.5 text-sm font-medium text-[#FFF6EE] transition hover:bg-[#F2A68D]/25"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      revealWhisper ? "fill-[#F2A68D] text-[#F2A68D]" : "text-[#F2A68D]"
                    }`}
                    aria-hidden="true"
                  />
                  {revealWhisper ? "Close My Secret Line" : "Tap for What I Mean ❤️"}
                </button>

                <AnimatePresence>
                  {revealWhisper && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-5 rounded-2xl border-l-2 border-[#F4C07A] bg-[#161015]/75 px-5 py-4"
                    >
                      <p className="font-hand text-2xl leading-snug text-[#FFF6EE]">
                        &ldquo;{active.whisper}&rdquo;
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0A0D]/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-[#FFF6EE]/20 bg-[#1B1217] p-3 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close photo"
                className="absolute -top-3 -right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#F2A68D] text-[#161015] shadow-lg"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <PhotoFrame
                src={active.src}
                alt={active.title}
                className="aspect-[4/5] w-full rounded-xl"
              />
              <p className="font-hand px-2 pt-3 pb-1 text-2xl text-[#F4C07A]">
                {active.whisper}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
