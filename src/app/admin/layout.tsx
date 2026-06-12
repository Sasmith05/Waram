"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  Inbox, 
  LogOut, 
  Menu, 
  X,
  Compass,
  Calendar
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      // Don't guard `/admin/login` page
      if (pathname === "/admin/login") {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      
      if (mounted) {
        if (!data.session) {
          router.replace("/admin/login");
        } else {
          setSession(data.session);
        }
        setLoading(false);
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // If loading and not on login page, show loader
  if (loading && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-gold-500 animate-spin"></div>
          </div>
          <p className="text-sm font-semibold text-slate-500 tracking-wider">Verifying Session...</p>
        </div>
      </div>
    );
  }

  // If on login page, render child without layout shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Enquiries", href: "/admin/enquiries", icon: Inbox }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Mobile Top Bar */}
      <header className="md:hidden bg-white border-b border-slate-200/80 px-4 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-gold-600" />
          <span className="font-serif font-extrabold text-sm tracking-wide text-slate-900">
            RAJASEKAR | ADMIN
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-gold-600" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sidebar - Desktop Layout */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/80 sticky top-0 h-screen z-20">
        {/* Brand */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <Compass className="h-7 w-7 text-gold-600" />
          <div>
            <span className="block font-serif font-extrabold text-base text-slate-900 tracking-wide leading-tight">
              RAJASEKAR
            </span>
            <span className="block text-[10px] uppercase text-gold-600 font-bold tracking-widest leading-none mt-0.5">
              ADMIN PANEL
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow p-4 space-y-1.5 pt-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-gold-500/10 text-gold-600 border-l-4 border-gold-500"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-gold-600" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="px-4 text-xs font-semibold text-slate-400 truncate">
            Logged in as: {session?.user?.email || "Admin User"}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Layout Slide-out */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Overlay backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="relative flex flex-col w-64 bg-white h-full shadow-2xl z-50">
            {/* Sidebar Brand header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Compass className="h-6 w-6 text-gold-600" />
                <span className="font-serif font-extrabold text-sm tracking-wide text-slate-900 leading-none">
                  ADMIN PANEL
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-grow p-4 space-y-1.5 pt-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                      isActive
                        ? "bg-gold-500/10 text-gold-600 border-l-4 border-gold-500"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-5 w-5 text-current" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Logout footer */}
            <div className="p-4 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-all cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow p-4 sm:p-8 lg:p-10 min-w-0 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
