import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Check, Copy, Heart, Plane, Send } from "lucide-react";
import { TRIP_META } from "../data/expeditionData";

const DURATIONS = [6, 8, 10];

function formatReadableDate(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function addDays(isoDate, daysToAdd) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d + daysToAdd);
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function DatePickerSection({ approved, onLockInDates }) {
  const todayIso = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [selectedDate, setSelectedDate] = useState("2027-05-22");
  const [durationDays, setDurationDays] = useState(8);
  const [dateError, setDateError] = useState("");
  const [lockedIn, setLockedIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    if (!selectedDate) return;
    const compute = () => {
      const [y, m, d] = selectedDate.split("-").map(Number);
      const target = new Date(y, m - 1, d, 6, 0, 0).getTime();
      const diff = target - Date.now();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      });
    };
    compute();
    const timer = setInterval(compute, 1000);
    return () => clearInterval(timer);
  }, [selectedDate]);

  const returnDate = addDays(selectedDate, durationDays - 1);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!selectedDate || selectedDate < todayIso) {
      setDateError("Pick a future date for our mountain escape ❤️");
      return;
    }
    setDateError("");
    setLockedIn(true);
    onLockInDates?.();
  };

  const summaryText = `YES to Leh-Ladakh with you! 🏔️❤️\nWhen we go: ${formatReadableDate(
    selectedDate
  )} → ${formatReadableDate(returnDate)} (${durationDays} Days)\nJust us, one bike, Pangong sunrise & Hanle stars!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(summaryText)}`;

  return (
    <section
      id="date-planner"
      style={{ paddingBottom: "max(5.5rem, calc(env(safe-area-inset-bottom) + 4rem))" }}
      className="relative z-20 mx-auto max-w-3xl px-5 pt-12 sm:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="romantic-glass relative overflow-hidden rounded-3xl p-6 sm:p-10 text-center"
      >
        <p className="font-script text-3xl text-[#F4C07A]">
          Just say when, {TRIP_META.friendName}...
        </p>
        <h2 className="font-display mt-1 text-3xl font-semibold text-[#FFF6EE] sm:text-5xl">
          {approved || lockedIn
            ? "When Do We Leave Together?"
            : "Pick Our Date for Ladakh ❤️"}
        </h2>

        <form onSubmit={handleConfirm} className="mt-8 space-y-6">
          <div className="mx-auto grid max-w-xl gap-4 sm:grid-cols-2 text-left">
            <div>
              <label
                htmlFor="departure-date"
                className="mb-2 flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-[#F2A68D]"
              >
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Departure Date
              </label>
              <input
                id="departure-date"
                type="date"
                min={todayIso}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setDateError("");
                }}
                className="w-full min-h-[48px] rounded-xl border border-[#FFF6EE]/20 bg-[#161015]/80 px-4 py-3 text-base text-[#FFF6EE] outline-none transition focus:border-[#F2A68D] [color-scheme:dark]"
              />
            </div>

            <div>
              <span className="mb-2 block text-xs font-medium tracking-wider uppercase text-[#F2A68D]">
                How Many Days?
              </span>
              <div className="grid grid-cols-3 gap-2">
                {DURATIONS.map((days) => {
                  const active = durationDays === days;
                  return (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setDurationDays(days)}
                      aria-pressed={active}
                      className={`cursor-pointer rounded-xl border py-3 text-xs font-semibold transition ${
                        active
                          ? "border-[#F2A68D] bg-[#F2A68D]/20 text-[#FFF6EE]"
                          : "border-[#FFF6EE]/15 bg-[#161015]/55 text-[#DFD0CA] hover:text-[#FFF6EE]"
                      }`}
                    >
                      {days} Days
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {dateError && (
            <p role="alert" className="text-xs text-[#F4C07A]">
              {dateError}
            </p>
          )}

          {selectedDate && !countdown.expired && (
            <div className="mx-auto grid max-w-md grid-cols-4 gap-2.5 pt-1">
              {[
                { val: countdown.days, label: "Days" },
                { val: countdown.hours, label: "Hours" },
                { val: countdown.minutes, label: "Mins" },
                { val: countdown.seconds, label: "Secs" },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-xl border border-[#FFF6EE]/10 bg-[#161015]/60 py-2.5"
                >
                  <p className="font-display text-2xl font-bold text-[#F4C07A]">
                    {String(unit.val).padStart(2, "0")}
                  </p>
                  <p className="text-[10px] tracking-wider uppercase text-[#DFD0CA]">
                    {unit.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-gradient-to-r from-[#E58D73] via-[#F2A68D] to-[#F4C07A] px-8 py-4 text-sm font-semibold text-[#161015] shadow-[0_14px_38px_-10px_rgba(242,166,141,0.75)] transition hover:brightness-105"
          >
            <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
            {lockedIn ? "Update Our Ladakh Date ❤️" : "Yes, Lock In Our Date ❤️"}
          </motion.button>
        </form>

        {lockedIn && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 overflow-hidden rounded-2xl border border-[#F2A68D]/45 bg-[#161015]/80 text-left"
          >
            <div className="flex items-center justify-between border-b border-dashed border-[#FFF6EE]/15 bg-[#F2A68D]/15 px-5 py-3 text-xs font-semibold text-[#F4C07A]">
              <span className="inline-flex items-center gap-1.5">
                <Plane className="h-3.5 w-3.5" aria-hidden="true" />
                {TRIP_META.friendName} &amp; Me · Ladakh Escape
              </span>
              <span className="text-[#F2A68D]">DEL → IXL</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-display text-2xl font-semibold text-[#FFF6EE]">
                  {formatReadableDate(selectedDate)} → {formatReadableDate(returnDate)}
                </p>
                <p className="font-hand text-xl text-[#F4C07A]">
                  {durationDays} days of mountains, stars &amp; us. Send this to me ❤️
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#FFF6EE]/20 bg-[#FFF6EE]/10 px-4 py-2 text-xs font-medium text-[#FFF6EE] transition hover:bg-[#FFF6EE]/20"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-[#F4C07A]" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {copied ? "Copied!" : "Copy Date"}
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F2A68D] px-4 py-2 text-xs font-semibold text-[#161015] transition hover:bg-[#F4C07A]"
                >
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  Send on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
