import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────────────────────
// 1. SUPABASE CLIENT — always uses the real Supabase project
//    Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
//    are set in .env.local
// ─────────────────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    "[Waram] Supabase is NOT configured. " +
    "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

// Real Supabase client — used for ALL data operations (properties, events, enquiries, storage)
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. SIMPLE ADMIN AUTH — does NOT use Supabase Auth
//    Validates hardcoded credentials and stores a session flag in sessionStorage.
//    This avoids needing to set up a Supabase Auth user.
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_EMAIL    = "notaryrajasekar@gmail.com";
const ADMIN_PASSWORD = "notary@waram";
const SESSION_KEY    = "waram_admin_session";

export const adminAuth = {
  /** Returns true if admin session is active */
  isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) === "active";
  },

  /** Validates credentials and sets session. Returns error string or null. */
  signIn(email: string, password: string): string | null {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEY, "active");
      }
      return null; // success
    }
    return "Invalid email or password.";
  },

  /** Clears the admin session */
  signOut(): void {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_KEY);
    }
  },
};
