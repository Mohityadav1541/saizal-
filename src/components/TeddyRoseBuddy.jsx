import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TRIP_META } from "../data/expeditionData";

const TEDDY_LINES = [
  `Hi ${TRIP_META.friendName}, I brought you a rose 🌹`,
  "Sending a warm teddy hug for Khardung La 🧸",
  "Say yes to Ladakh & I get the front basket ❤️",
  "P.S. You look extra cute smiling right now ✨",
];

/**
 * Interactive adorable Teddy Bear holding a crimson rose & cozy scarf.
 */
export default function TeddyRoseBuddy({ compact = false }) {
  const [tapCount, setTapCount] = useState(0);
  const message = TEDDY_LINES[tapCount % TEDDY_LINES.length];

  return (
    <div className="flex flex-col items-center">
      <motion.button
        type="button"
        onClick={() => setTapCount((c) => c + 1)}
        whileHover={{ scale: 1.05, rotate: [-1, 2, -1] }}
        whileTap={{ scale: 0.94 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { repeat: Infinity, duration: 2.8, ease: "easeInOut" } }}
        aria-label="Tap teddy bear holding a rose"
        className="group relative cursor-pointer focus-visible:outline-none"
      >
        <svg
          width={compact ? 86 : 112}
          height={compact ? 86 : 112}
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
          className="drop-shadow-[0_12px_22px_rgba(0,0,0,0.45)]"
        >
          {/* Ears */}
          <circle cx="34" cy="30" r="13" fill="#B67E59" />
          <circle cx="34" cy="30" r="7.5" fill="#F2A68D" />
          <circle cx="86" cy="30" r="13" fill="#B67E59" />
          <circle cx="86" cy="30" r="7.5" fill="#F2A68D" />

          {/* Body */}
          <ellipse cx="60" cy="86" rx="26" ry="24" fill="#C98F67" />
          <ellipse cx="60" cy="88" rx="16" ry="15" fill="#EAC3A3" />

          {/* Cozy Mountain Scarf */}
          <path
            d="M39 67 Q60 76 81 67 Q79 75 60 79 Q41 75 39 67 Z"
            fill="#E56B6F"
          />
          <rect x="65" y="71" width="9" height="16" rx="4" fill="#D45B60" />

          {/* Head */}
          <ellipse cx="60" cy="48" rx="28" ry="25" fill="#C98F67" />
          {/* Muzzle */}
          <ellipse cx="60" cy="54" rx="12" ry="9.5" fill="#F4D7BF" />
          <ellipse cx="60" cy="50" rx="4.2" ry="3" fill="#3B251E" />
          <path
            d="M55.5 56 Q60 60 64.5 56"
            stroke="#3B251E"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Eyes & Rosy Cheeks */}
          <circle cx="48" cy="44" r="3.4" fill="#2A1A15" />
          <circle cx="47" cy="42.8" r="1.1" fill="#FFF6EE" />
          <circle cx="72" cy="44" r="3.4" fill="#2A1A15" />
          <circle cx="71" cy="42.8" r="1.1" fill="#FFF6EE" />
          <ellipse cx="42" cy="52" rx="4.8" ry="2.8" fill="#F28B82" fillOpacity="0.65" />
          <ellipse cx="78" cy="52" rx="4.8" ry="2.8" fill="#F28B82" fillOpacity="0.65" />

          {/* Left Arm */}
          <ellipse
            cx="34"
            cy="83"
            rx="9"
            ry="13"
            transform="rotate(24 34 83)"
            fill="#B67E59"
          />
          {/* Right Arm Holding Rose */}
          <ellipse
            cx="84"
            cy="81"
            rx="9"
            ry="13"
            transform="rotate(-28 84 81)"
            fill="#B67E59"
          />

          {/* Rose Stem & Leaves */}
          <path
            d="M89 79 L98 46"
            stroke="#59A96A"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <ellipse
            cx="91"
            cy="64"
            rx="4.5"
            ry="2.2"
            transform="rotate(-35 91 64)"
            fill="#69B578"
          />
          {/* Rose Blossom */}
          <circle cx="99" cy="43" r="8.5" fill="#E63946" />
          <path
            d="M95 42 Q99 37 103 42 Q101 47 96 45 Z"
            fill="#FF758F"
            fillOpacity="0.7"
          />
          <circle cx="99" cy="43" r="3.5" fill="#B5172E" />
        </svg>

        {/* Little floating heart on tap */}
        <AnimatePresence>
          {tapCount > 0 && (
            <motion.span
              key={tapCount}
              initial={{ opacity: 1, y: 0, scale: 0.7 }}
              animate={{ opacity: 0, y: -26, scale: 1.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute -top-1 right-2 text-lg"
            >
              ❤️
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.p
          key={tapCount}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1 rounded-full border border-[#F2A68D]/35 bg-[#161015]/70 px-3.5 py-1 text-center font-hand text-xl text-[#F4C07A] backdrop-blur-sm"
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

