import { Music, Pause } from "lucide-react";

const NAV_LINKS = [
  { href: "#hero", label: "Start" },
  { href: "#spotlight", label: "You" },
  { href: "#bike-ride", label: "Our Ride" },
  { href: "#flirt-deck", label: "Confessions" },
  { href: "#letter", label: "Note" },
  { href: "#date-planner", label: "Pick Date" },
];

export default function FloatingNav({ isPlaying, onToggleMusic }) {
  return (
    <header
      style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
      className="fixed inset-x-0 z-40 flex justify-center px-3 pointer-events-none"
    >
      <nav
        aria-label="Page sections"
        className="no-scrollbar pointer-events-auto flex items-center gap-1 rounded-full border border-[#FFF6EE]/15 bg-[#1B1217]/80 px-2.5 py-1.5 shadow-2xl backdrop-blur-md max-w-full overflow-x-auto"
      >
        <div className="flex items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium text-[#FFF6EE]/85 transition active:scale-95 hover:bg-[#FFF6EE]/10 hover:text-[#FFF6EE]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={onToggleMusic}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause our song" : "Play our song"}
          className={`ml-1 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
            isPlaying
              ? "border-[#F2A68D]/70 bg-[#F2A68D]/25 text-[#FFF6EE]"
              : "border-[#F4C07A]/50 bg-[#F4C07A]/15 text-[#F4C07A] hover:bg-[#F4C07A]/25"
          }`}
        >
          {isPlaying ? (
            <Pause className="h-3.5 w-3.5 text-[#F2A68D]" aria-hidden="true" />
          ) : (
            <Music className="h-3.5 w-3.5 text-[#F4C07A]" aria-hidden="true" />
          )}
          <span>{isPlaying ? "Playing" : "Song"}</span>
        </button>
      </nav>
    </header>
  );
}
