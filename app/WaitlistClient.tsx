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

<<<<<<< HEAD
      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        // not JSON (shouldn't happen now, but prevents ugly crashes)
      }

      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status}).`);
      }

      setStatus("success");
      setMessage("You're on the waitlist. We'll reach out soon.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Something went wrong.");
=======
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");

      setStatus("success");
      setMessage("You’re on the waitlist. 🎉");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Error.");
>>>>>>> d288090 (Initial Smoothr landing page)
    }
  }

  return (
<<<<<<< HEAD
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
=======
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
>>>>>>> d288090 (Initial Smoothr landing page)
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
      />
<<<<<<< HEAD

=======
>>>>>>> d288090 (Initial Smoothr landing page)
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {status === "loading" ? "Joining..." : "Get Early Access"}
      </button>

      {message ? (
<<<<<<< HEAD
        <p className={`text-sm ${status === "success" ? "text-green-700" : "text-red-600"}`}>
=======
        <p
          className={`text-sm ${
            status === "success" ? "text-green-700" : status === "error" ? "text-red-600" : "text-zinc-600"
          }`}
        >
>>>>>>> d288090 (Initial Smoothr landing page)
          {message}
        </p>
      ) : null}
    </form>
  );
}
