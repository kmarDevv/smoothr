import Link from "next/link";
import WaitlistClient from "../WaitlistClient";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[#0F1115] text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#2AFF7A]/10 blur-3xl" />
          <div className="absolute -bottom-48 right-[-120px] h-[560px] w-[560px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight sm:text-2xl">Smoothr</div>
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Join to get early access and be part of the first 250.
            </h1>
            <p className="mt-3 text-white/70">
              Sign up to shape the product and get early access benefits.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#2AFF7A]/15 text-[10px] font-semibold text-[#2AFF7A]">
                  &#10003;
                </span>
                <span>Priority access to the beta.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#2AFF7A]/15 text-[10px] font-semibold text-[#2AFF7A]">
                  &#10003;
                </span>
                <span>Founder pricing when we launch.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#2AFF7A]/15 text-[10px] font-semibold text-[#2AFF7A]">
                  &#10003;
                </span>
                <span>Get updates on app progression and founder pricing.</span>
              </li>
            </ul>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-8">
            <h2 className="text-lg font-semibold">Join the waitlist</h2>
            <p className="mt-2 text-sm text-white/70">
              Early users get priority access and founder pricing. No spam.
            </p>
            <WaitlistClient />
            <p className="mt-3 text-xs text-white/60">We'll never share your info with anyone.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
