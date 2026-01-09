"use client";

import { useMemo, useState } from "react";

export default function ThankYouPage() {
  const reasons = useMemo(
    () => [
      "I hate dirt roads",
      "I drive a lowered / sporty car",
      "I want smoother rides",
      "I want EV efficient roads",
      "I want to keep my car clean",
    ],
    []
  );
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState("");

  function toggleReason(reason: string) {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((item) => item !== reason) : [...prev, reason]
    );
  }

  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#2AFF7A]/10 blur-3xl" />
          <div className="absolute -bottom-48 right-[-120px] h-[560px] w-[560px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-lg font-semibold tracking-tight sm:text-2xl">Smoothr</div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Thank you for being a part of the first 250 who want to optimize their ride!
            </h1>
            <p className="mt-3 text-white/70">
              Your feedback helps shape smoother, car-friendly navigation.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#2AFF7A]/15 text-sm font-semibold text-[#2AFF7A]">
                Q
              </span>
              <h2 className="text-xl font-semibold sm:text-2xl">Why did you sign up?</h2>
            </div>
            <p className="mt-2 text-sm text-white/70">Select all that apply.</p>

            <div className="mt-5 flex flex-wrap gap-3">
              {reasons.map((reason) => {
                const isSelected = selectedReasons.includes(reason);
                return (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => toggleReason(reason)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      isSelected
                        ? "border-[#2AFF7A]/50 bg-[#2AFF7A]/15 text-[#2AFF7A]"
                        : "border-white/10 bg-white/5 text-white/80 hover:border-white/25"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {reason}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <label htmlFor="other-reason" className="text-sm font-semibold text-white/80">
                Other
              </label>
              <textarea
                id="other-reason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Tell us what else matters to you"
                className="mt-2 h-28 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-[#2AFF7A]/60"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-[#2AFF7A] px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-[#2AFF7A]/30"
              >
                Submit
              </button>
              <span className="text-xs text-white/60">Responses are saved locally for now.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
