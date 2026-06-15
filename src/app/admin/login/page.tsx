"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Compass, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { adminAuth } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect straight to dashboard
    if (adminAuth.isLoggedIn()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const err = adminAuth.signIn(email, password);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      router.replace("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900 relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-slate-200/60 rounded-2xl p-8 shadow-md relative z-10 space-y-6 gold-glow">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gold-500/10 text-gold-600 rounded-2xl border border-gold-500/20 mb-2">
            <Compass className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Waram Documentation
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Admin Portal Secure Login
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex gap-2.5 items-start bg-rose-50 border border-rose-100 p-4 rounded-xl text-rose-800 text-xs sm:text-sm font-semibold">
            <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
            <div className="space-y-0.5">
              <span className="block font-bold">Authentication Failed</span>
              <span className="text-rose-600 font-normal leading-normal">{error}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email input */}
          <div className="space-y-1">
            <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="notaryrajasekar@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-xs"
            />
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-slate-400" />
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 text-sm font-semibold transition-all shadow-xs"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-bold rounded-xl active:scale-[0.98] transition-all text-sm shadow-xs cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4.5 w-4.5" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
