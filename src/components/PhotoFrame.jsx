import { useEffect, useState } from "react";
import { Camera, Mountain } from "lucide-react";

/**
 * Renders a photo cleanly, falling back to an artistic Himalayan frame
 * until the user's photo file is added or previewed locally.
 */
export default function PhotoFrame({
  src,
  alt,
  fallbackTitle,
  fallbackHint = "Ready for her photo",
  className = "",
  onUploadPreview,
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const activeSrc = src;

  return (
    <div className={`relative overflow-hidden bg-[#131F2B] ${className}`}>
      {!failed && activeSrc ? (
        <img
          src={activeSrc}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition duration-700"
        />
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#172838] via-[#101B26] to-[#1E2B38]">
          {/* Decorative mountain ridge silhouette */}
          <svg
            viewBox="0 0 400 180"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 inset-x-0 w-full opacity-35"
          >
            <path
              d="M0 180 L0 120 L65 72 L120 112 L195 36 L275 102 L335 64 L400 115 L400 180 Z"
              fill="#3BA5B5"
              fillOpacity="0.28"
            />
            <path
              d="M0 180 L0 140 L90 95 L155 130 L240 62 L320 125 L400 92 L400 180 Z"
              fill="#0B1219"
              fillOpacity="0.65"
            />
          </svg>

          <div className="relative z-10 flex flex-col items-center gap-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E89B48]/40 bg-[#E89B48]/10 text-[#E89B48]">
              <Mountain className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="font-display text-xl italic text-[#F5F0E6]">
              {fallbackTitle || alt}
            </p>
            <p className="max-w-[22ch] text-xs leading-relaxed text-[#A9B3BD]">
              {fallbackHint}
            </p>

            {onUploadPreview && (
              <label className="mt-1 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#3BA5B5]/40 bg-[#3BA5B5]/15 px-3 py-1.5 text-xs font-medium text-[#7DD3E0] transition hover:bg-[#3BA5B5]/25">
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Preview Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFailed(false);
                      onUploadPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
