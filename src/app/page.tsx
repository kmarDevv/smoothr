import Image from "next/image";
import Link from "next/link";
import WaitlistClient from "./WaitlistClient";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#2AFF7A]/10 blur-3xl" />
          <div className="absolute -bottom-48 right-[-120px] h-[560px] w-[560px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">Smoothr</div>
              <p className="mt-2 text-sm text-white/70">
                The first navigation app designed with car care in mind.
              </p>
            </div>
            {/* FOMO badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90">
              <span className="inline-block h-2 w-2 rounded-full bg-[#2AFF7A]" />
              Currently in private early access
            </div>
          </div>

          <div className="mt-10 grid items-center gap-12 md:grid-cols-2">
            {/* Left column */}
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Navigation that cares about your car.
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-white/80">
                Avoid rough roads, dirt routes, and car-unfriendly paths &mdash; automatically.
                <span className="mt-2 block text-white/70">
                  Smart navigation designed to protect your car's suspension, paint, tires, and ride
                  quality.
                </span>
              </p>

              {/* Value bullets */}
              <ul className="mt-8 space-y-3 text-white/85">
                {[
                  "Avoid dirt roads & poorly maintained streets",
                  "Routes optimized for smooth, paved driving",
                  "Built for sports cars, lowered cars, and daily drivers",
                  "Drive with confidence - not regret",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2AFF7A]/15 text-xs font-semibold text-[#2AFF7A]">
                      &#10003;
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#waitlist"
                  className="group inline-flex items-center justify-center rounded-xl bg-[#2AFF7A] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#2AFF7A]/20 transition hover:-translate-y-0.5 hover:shadow-[#2AFF7A]/30 focus:outline-none focus:ring-2 focus:ring-[#2AFF7A]/60"
                >
                  Get Early Access
                  <span className="ml-2 transition group-hover:translate-x-0.5">&rarr;</span>
                </Link>

                <a
                  href="/join"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Join the waitlist
                </a>
              </div>

              {/* CTA helper / FOMO copy */}
              <div className="mt-4 space-y-1 text-sm text-white/60">
                <p>
                  <span className="font-medium text-white/80">Limited early users.</span> Features
                  shaped by the community.
                </p>
                <p>Launching soon. No spam. No ads. Just better roads.</p>
              </div>
            </div>

            {/* Right column (visual preview) */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">Preview</p>
                    <p className="mt-1 text-base font-semibold">Car-friendly route scoring</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    Beta
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Map preview */}
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src="/route-preview.png"
                      alt="Navigation UI"
                      width={1200}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ width: "100%", height: "auto" }}
                      priority
                    />
                  </div>

                  {/* Route cards */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-white/60">Recommended</p>
                      <p className="mt-1 text-sm font-semibold">Smooth / Paved Route</p>
                      <p className="mt-2 text-xs text-white/60">
                        Lower bumps &bull; Cleaner roads &bull; Less wear
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#2AFF7A]/15 px-3 py-1 text-xs text-[#2AFF7A]">
                        Score: 92
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs text-white/60">Alternative</p>
                      <p className="mt-1 text-sm font-semibold">Fastest (Not Ideal)</p>
                      <p className="mt-2 text-xs text-white/60">
                        Rough patches &bull; Dirt shortcut risk
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                        Score: 63
                      </div>
                    </div>
                  </div>

                  {/* Mini stats */}
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Road Quality Filter</span>
                      <span className="font-semibold text-white/90">ON</span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                      <div className="h-2 w-[78%] rounded-full bg-[#2AFF7A]" />
                    </div>
                    <p className="mt-2 text-xs text-white/60">
                      Prioritizing smooth, paved roads whenever possible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Small floating label */}
              <div className="pointer-events-none absolute -bottom-6 left-6 hidden rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur md:block">
                Built for sports cars, daily drivers, and everything in between.
              </div>
            </div>
          </div>

          {/* Anchor targets (for CTA links) */}
          <section className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#2AFF7A]/15 text-sm font-semibold text-[#2AFF7A]">
                PS
              </span>
              <h2 className="text-2xl font-semibold">We understand</h2>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <p className="text-sm font-semibold text-white/80">Problems</p>
                <ul className="mt-4 space-y-3 text-white/75">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white/40" />
                    <span>Google Maps only prioritizes speed and not the quality of your ride.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white/40" />
                    <span>Construction zones ruin rides.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white/40" />
                    <span>Sports & luxury cars need routes tailored for them.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#2AFF7A]/30 bg-[#2AFF7A]/10 p-6">
                <p className="text-sm font-semibold text-[#2AFF7A]">Solutions</p>
                <ul className="mt-4 space-y-3 text-white/85">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2AFF7A]/15 text-xs font-semibold text-[#2AFF7A]">
                      &#10003;
                    </span>
                    <span>Prioritizes paved roads.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2AFF7A]/15 text-xs font-semibold text-[#2AFF7A]">
                      &#10003;
                    </span>
                    <span>Smart routing for car types.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2AFF7A]/15 text-xs font-semibold text-[#2AFF7A]">
                      &#10003;
                    </span>
                    <span>Cleaner, smoother navigation.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div
            id="waitlist"
            className="mt-24 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-xl font-semibold">Get Early Access</h2>
            <p className="mt-2 text-white/70">
              Early users get priority access and founder pricing. No spam.
            </p>
            <WaitlistClient />
            <p className="mt-3 text-xs text-white/60">We'll never share your info with anyone.</p>
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <Link
          href="#waitlist"
          className="flex items-center justify-center rounded-full bg-[#2AFF7A] px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-[#2AFF7A]/30"
        >
          Get Early Access
        </Link>
      </div>
    </main>
  );
}
