import { motion } from "framer-motion";
import { ArrowDown, Heart, Music, Pause } from "lucide-react";
import { TRIP_META } from "../data/expeditionData";

export default function HeroSection({
  onSayYes,
  approved,
  isPlaying,
  onToggleMusic,
}) {
  return (
    <section
      id="hero"
      className="relative z-20 flex min-h-[100dvh] flex-col justify-center px-5 pt-24 pb-14 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          className="lg:col-span-7"
        >
          <p className="font-script text-4xl text-[#F4C07A] sm:text-5xl">
            For {TRIP_META.friendName}...
          </p>

          <h1 className="font-display mt-2.5 text-4xl leading-[1.06] font-semibold tracking-tight text-[#FFF6EE] drop-shadow-lg sm:text-6xl">
            Let me steal you away to{" "}
            <span className="italic text-[#F2A68D]">Leh-Ladakh</span> with me.
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#F5EAE2]/90 drop-shadow sm:mt-5 sm:text-lg">
            One motorcycle, your arms wrapped around me against the mountain wind,
            golden mornings beside Pangong, and falling asleep beneath a billion
            stars in Hanle.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={onSayYes}
              className="inline-flex min-h-[46px] cursor-pointer items-center gap-2.5 rounded-full bg-gradient-to-r from-[#E58D73] via-[#F2A68D] to-[#F4C07A] px-6 py-3 text-sm font-semibold text-[#1B1217] shadow-[0_14px_40px_-8px_rgba(242,166,141,0.75)] transition hover:brightness-105"
            >
              <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
              {approved ? "Pick Our Date Together ❤️" : "Say Yes to Ladakh ❤️"}
            </motion.button>

            <button
              type="button"
              onClick={onToggleMusic}
              className="inline-flex min-h-[46px] cursor-pointer items-center gap-2 rounded-full border border-[#F4C07A]/45 bg-[#161015]/55 px-5 py-3 text-sm font-medium text-[#FFF6EE] backdrop-blur-md transition active:scale-95 hover:bg-[#F4C07A]/20"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-[#F2A68D]" aria-hidden="true" />
              ) : (
                <Music className="h-4 w-4 text-[#F4C07A]" aria-hidden="true" />
              )}
              <span>{isPlaying ? "Pause Song" : "Play Our Song"}</span>
            </button>
          </div>

          <a
            href="#spotlight"
            className="mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#F5EAE2]/80 transition hover:text-[#FFF6EE]"
          >
            <span>Scroll down for you</span>
            <ArrowDown className="h-3.5 w-3.5 text-[#F4C07A]" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <div className="romantic-glass overflow-hidden rounded-3xl p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src="/photos/photo-1.jpg"
                alt={TRIP_META.friendName}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161015]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-script text-3xl text-[#F4C07A]">
                  My favorite view
                </p>
                <p className="mt-0.5 text-xs text-[#FFF6EE]/85">
                  Pangong · Nubra · Khardung La · Hanle
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
