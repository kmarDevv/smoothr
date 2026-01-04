"use client";

import { useState } from "react";

export default function WaitlistClient() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      let data: { error?: string } = {};
      try {
        const parsed = text ? JSON.parse(text) : {};
        if (parsed && typeof parsed === "object") {
          data = parsed as { error?: string };
        }
      } catch {
        // not JSON (shouldn't happen now, but prevents ugly crashes)
      }

      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status}).`);
      }

      setStatus("success");
      setMessage("You're on the waitlist. We'll reach out soon.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Something went wrong.");
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/50 focus:ring-2 focus:ring-[#2AFF7A]/60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-[#2AFF7A] px-5 py-3 text-sm font-medium text-black hover:bg-[#5CFF99] disabled:opacity-60"
      >
        {status === "loading" ? "Joining..." : "Get Early Access"}
      </button>

      {message ? (
        <p className={`text-sm ${status === "success" ? "text-[#2AFF7A]" : "text-[#F97316]"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
