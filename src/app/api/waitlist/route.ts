import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_TIMEOUT_MS = 6000;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function withTimeout<T>(promise: PromiseLike<T>, ms = SUPABASE_TIMEOUT_MS): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Supabase request timed out.")), ms);
  });

  try {
    return await Promise.race([Promise.resolve(promise), timeout]);
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

  try {
    const { error: supabaseError } = await withTimeout(
      client.from("waitlist").select("email", { count: "exact", head: true })
    );

    if (supabaseError) {
      console.error("Waitlist health check failed:", {
        code: supabaseError.code,
        message: supabaseError.message,
        details: supabaseError.details,
      });

      const message =
        process.env.NODE_ENV === "production"
          ? "Supabase error."
          : supabaseError.message || "Supabase error.";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Supabase request failed.";
    console.error("Waitlist health check failed:", err);
    return NextResponse.json({ error: message }, { status: 504 });
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

    let supabaseError: { code?: string; message: string; details?: string } | null;
    try {
      ({ error: supabaseError } = await withTimeout(client.from("waitlist").insert([{ email }])));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Supabase request failed.";
      console.error("Waitlist insert failed:", err);
      return NextResponse.json({ error: message }, { status: 504 });
    }

    // If email already exists, treat as success (nice UX)
    if (supabaseError?.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    if (supabaseError) {
      console.error("Waitlist insert failed:", {
        code: supabaseError.code,
        message: supabaseError.message,
        details: supabaseError.details,
      });
      const message =
        process.env.NODE_ENV === "production"
          ? "Could not save email. Try again."
          : supabaseError.message || "Could not save email. Try again.";
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
