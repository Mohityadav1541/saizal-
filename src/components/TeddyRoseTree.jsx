import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TRIP_META } from "../data/expeditionData";

const TREE_MESSAGES = [
  `Clinging to this rose tree like I'll hold onto you in Ladakh, ${TRIP_META.friendName} 🌹`,
  "Every rose on these branches bloomed just to make you smile ❤️",
  "Warning: tapping this teddy comes with a real hug in Leh 🧸",
  "One rose for every mountain pass we're going to cross together ✨",
];

const TREE_ROSES = [
  { cx: 112, cy: 62, r: 12, color: "#E63946", inner: "#FF758F" },
  { cx: 152, cy: 48, r: 14, color: "#D62839", inner: "#F28B82" },
  { cx: 196, cy: 56, r: 13, color: "#E63946", inner: "#FF8FA3" },
  { cx: 88, cy: 96, r: 11, color: "#F28B82", inner: "#FFF0F3" },
  { cx: 174, cy: 92, r: 12, color: "#E63946", inner: "#FF758F" },
  { cx: 222, cy: 94, r: 11, color: "#D62839", inner: "#F2A68D" },
  { cx: 132, cy: 86, r: 10, color: "#FF758F", inner: "#FFF0F3" },
  { cx: 204, cy: 122, r: 10, color: "#E63946", inner: "#FF758F" },
];

/**
 * Interactive Rose Tree with an adorable Teddy Bear hugging/hanging onto the branch.
 */
export default function TeddyRoseTree() {
  const [hugs, setHugs] = useState(0);
  const currentMessage = TREE_MESSAGES[hugs % TREE_MESSAGES.length];

  return (
    <section
      id="rose-tree"
      className="relative z-20 mx-auto max-w-4xl px-5 py-12 sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="romantic-glass flex flex-col items-center rounded-3xl px-6 py-8 text-center sm:px-10"
      >
        <p className="font-script text-3xl text-[#F4C07A]">
          Tap the teddy on the rose tree
        </p>

        <motion.button
          type="button"
          onClick={() => setHugs((h) => h + 1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Tap the teddy bear hugging the rose tree"
          className="relative mt-3 cursor-pointer focus-visible:outline-none"
        >
          <svg
            width="280"
            height="245"
            viewBox="0 0 280 245"
            fill="none"
            aria-hidden="true"
            className="mx-auto max-w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Soft ground moss glow */}
            <ellipse
              cx="148"
              cy="226"
              rx="88"
              ry="12"
              fill="#2B4235"
              fillOpacity="0.6"
            />

            {/* Rose Tree Trunk & Curved Branches */}
            <path
              d="M142 225 C140 190, 146 160, 144 128 C142 104, 128 84, 112 66"
              stroke="#6F4E37"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M144 136 C158 112, 180 96, 206 94"
              stroke="#6F4E37"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M140 120 C122 108, 102 102, 88 96"
              stroke="#6F4E37"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M146 104 C150 80, 152 64, 152 48"
              stroke="#6F4E37"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M156 88 C176 74, 188 64, 196 56"
              stroke="#6F4E37"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Lush Foliage Canopy */}
            <ellipse cx="116" cy="76" rx="44" ry="30" fill="#2D5A3F" fillOpacity="0.88" />
            <ellipse cx="164" cy="64" rx="52" ry="34" fill="#376E4E" fillOpacity="0.9" />
            <ellipse cx="196" cy="96" rx="42" ry="28" fill="#2D5A3F" fillOpacity="0.88" />
            <ellipse cx="96" cy="100" rx="32" ry="22" fill="#376E4E" fillOpacity="0.85" />

            {/* Blooming Roses on Tree */}
            {TREE_ROSES.map((rose, idx) => (
              <g key={idx}>
                <circle cx={rose.cx} cy={rose.cy} r={rose.r} fill={rose.color} />
                <circle
                  cx={rose.cx - 2}
                  cy={rose.cy - 2}
                  r={rose.r * 0.58}
                  fill={rose.inner}
                  fillOpacity="0.72"
                />
                <circle
                  cx={rose.cx}
                  cy={rose.cy}
                  r={rose.r * 0.28}
                  fill="#9E192B"
                />
              </g>
            ))}

            {/* Cute Teddy Bear Hugging / Hanging onto the Rose Tree Trunk */}
            <motion.g
              animate={{
                rotate: hugs > 0 ? [0, -3, 3, 0] : [0, 1.5, 0, -1.5, 0],
              }}
              transition={{
                duration: hugs > 0 ? 0.55 : 3.4,
                repeat: hugs > 0 ? 0 : Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "130px 160px" }}
            >
              {/* Hanging Legs */}
              <ellipse
                cx="109"
                cy="198"
                rx="8"
                ry="13"
                transform="rotate(14 109 198)"
                fill="#B67E59"
              />
              <ellipse
                cx="127"
                cy="200"
                rx="8"
                ry="13"
                transform="rotate(-10 127 200)"
                fill="#B67E59"
              />
              <circle cx="108" cy="207" r="4.5" fill="#F4D7BF" />
              <circle cx="128" cy="209" r="4.5" fill="#F4D7BF" />

              {/* Body clinging beside trunk */}
              <ellipse cx="117" cy="172" rx="22" ry="23" fill="#C98F67" />
              <ellipse cx="118" cy="174" rx="13" ry="14" fill="#EAC3A3" />

              {/* Back Arm hugging behind the tree trunk */}
              <ellipse
                cx="143"
                cy="163"
                rx="14"
                ry="7.5"
                transform="rotate(-14 143 163)"
                fill="#B67E59"
              />

              {/* Cozy Red Scarf */}
              <path
                d="M100 153 Q118 161 135 153 Q133 160 118 163 Q102 160 100 153 Z"
                fill="#E56B6F"
              />

              {/* Head tilted lovingly toward tree */}
              <circle cx="96" cy="122" r="10.5" fill="#B67E59" />
              <circle cx="96" cy="122" r="6" fill="#F2A68D" />
              <circle cx="136" cy="120" r="10.5" fill="#B67E59" />
              <circle cx="136" cy="120" r="6" fill="#F2A68D" />
              <ellipse cx="116" cy="136" rx="23" ry="21" fill="#C98F67" />

              {/* Muzzle & Smile */}
              <ellipse cx="118" cy="142" rx="10" ry="8" fill="#F4D7BF" />
              <ellipse cx="118" cy="139" rx="3.6" ry="2.6" fill="#3B251E" />
              <path
                d="M114 144 Q118 148 122 144"
                stroke="#3B251E"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* Happy Eyes & Blushing Cheeks */}
              <circle cx="107" cy="133" r="2.9" fill="#2A1A15" />
              <circle cx="106" cy="132" r="1" fill="#FFF6EE" />
              <circle cx="127" cy="133" r="2.9" fill="#2A1A15" />
              <circle cx="126" cy="132" r="1" fill="#FFF6EE" />
              <ellipse cx="101" cy="140" rx="4.2" ry="2.4" fill="#F28B82" fillOpacity="0.7" />
              <ellipse cx="132" cy="140" rx="4.2" ry="2.4" fill="#F28B82" fillOpacity="0.7" />

              {/* Front Paw hugging right around the trunk */}
              <ellipse
                cx="137"
                cy="172"
                rx="15"
                ry="8"
                transform="rotate(-8 137 172)"
                fill="#C98F67"
              />
              <circle cx="149" cy="170" r="4.5" fill="#F4D7BF" />
            </motion.g>
          </svg>

          {/* Floating petals + heart burst on tap */}
          <AnimatePresence>
            {hugs > 0 && (
              <motion.div
                key={hugs}
                initial={{ opacity: 1, y: 0, scale: 0.7 }}
                animate={{ opacity: 0, y: -42, scale: 1.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 text-2xl"
              >
                🌹❤️🌸
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.p
            key={hugs}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 max-w-md font-hand text-2xl leading-snug text-[#FFF6EE]"
          >
            &ldquo;{currentMessage}&rdquo;
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
