import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_TIMEOUT_MS = 6000;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function withTimeout<T>(promise: Promise<T>, ms = SUPABASE_TIMEOUT_MS): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Supabase request timed out.")), ms);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return { client: null, error: "Server not configured." };
  }

  return { client: createClient(url, key), error: null };
}

export async function GET() {
  const { client, error } = getSupabaseClient();
  if (!client) {
    return NextResponse.json({ error }, { status: 500 });
  }

  let response: { error: { code?: string; message: string; details?: string } | null };
  try {
    response = await withTimeout(
      client.from("waitlist").select("email", { count: "exact", head: true })
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Supabase request failed.";
    console.error("Waitlist health check failed:", err);
    return NextResponse.json({ error: message }, { status: 504 });
  }

  if (response.error) {
    console.error("Waitlist health check failed:", {
      code: response.error.code,
      message: response.error.message,
      details: response.error.details,
    });

    const message =
      process.env.NODE_ENV === "production"
        ? "Supabase error."
        : response.error.message || "Supabase error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, route: "waitlist" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toString().trim().toLowerCase();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    const { client, error } = getSupabaseClient();
    if (!client) {
      return NextResponse.json({ error }, { status: 500 });
    }

    let response: { error: { code?: string; message: string; details?: string } | null };
    try {
      response = await withTimeout(client.from("waitlist").insert([{ email }]));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Supabase request failed.";
      console.error("Waitlist insert failed:", err);
      return NextResponse.json({ error: message }, { status: 504 });
    }

    // If email already exists, treat as success (nice UX)
    if (response.error?.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    if (response.error) {
      console.error("Waitlist insert failed:", {
        code: response.error.code,
        message: response.error.message,
        details: response.error.details,
      });
      const message =
        process.env.NODE_ENV === "production"
          ? "Could not save email. Try again."
          : response.error.message || "Could not save email. Try again.";
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
