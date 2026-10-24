"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Building2,
  Calendar,
  Layers,
  DollarSign,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Users,
  Receipt,
  FileText,
  Palette,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { NavBadge } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const isDark = mounted && resolvedTheme === "dark";

  if (pathname?.startsWith("/i/")) return null;

  const openSearch = () => {
    setDrawerOpen(false);
    window.dispatchEvent(new CustomEvent("staydesk:open-command-palette"));
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navTabs = [
    { href: "/", label: "Home", icon: Building2 },
    { href: "/booking", label: "Booking", icon: Calendar, badge: 3 },
    { href: "/unit", label: "Unit", icon: Layers },
    { href: "/keuangan", label: "Keuangan", icon: DollarSign },
  ];

  const moreItems = [
    { href: "/tamu", label: "Direktori Tamu", icon: Users, desc: "Kelola profil & riwayat tamu" },
    { href: "/invoice", label: "Invoice & Kwitansi", icon: Receipt, badge: 1, desc: "Tagihan & payment link WA" },
    { href: "/laporan", label: "Laporan Bisnis", icon: FileText, desc: "Kinerja unit & okupansi" },
    { href: "/design", label: "Design System", icon: Palette, desc: "Galeri komponen & token" },
  ];

  return (
    <>
      {/* Pinned Bottom Bar (Mobile Only) */}
      <nav
        aria-label="Navigasi Mobile"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--surface-solid)]/95 backdrop-blur-xl border-t border-[var(--line)] shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around safe-area-bottom"
      >
        {navTabs.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-2xl transition-colors duration-150 active:scale-95",
                isActive
                  ? "text-[var(--blue)] font-semibold"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 h-4 min-w-[16px] px-1 rounded-full bg-[var(--orange)] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-[var(--surface-solid)]">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight leading-tight">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  transition={spring}
                  className="absolute -top-1 w-6 h-0.5 rounded-full bg-[var(--blue)]"
                />
              )}
            </Link>
          );
        })}

        {/* 5th Tab: Menu Trigger */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className={cn(
            "relative flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-2xl transition-colors duration-150 active:scale-95 cursor-pointer",
            drawerOpen || pathname?.startsWith("/tamu") || pathname?.startsWith("/invoice") || pathname?.startsWith("/laporan") || pathname?.startsWith("/design")
              ? "text-[var(--ink)] font-semibold"
              : "text-[var(--muted)] hover:text-[var(--ink)]"
          )}
        >
          <div className="relative">
            <Menu className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-[var(--orange)]" />
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-tight">Menu</span>
        </button>
      </nav>

      {/* Slide-up Mobile Drawer Sheet */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={spring}
              className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[var(--surface-solid)] rounded-t-[32px] border-t border-[var(--line)] shadow-2xl p-5 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                {/* Drag Handle & Header */}
                <div className="w-12 h-1.5 rounded-full bg-[var(--line)] mx-auto mb-4" />
                <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center shadow-xs">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[var(--ink)] leading-tight">
                        StayDesk
                      </div>
                      <div className="text-[10px] text-[var(--muted)]">
                        Skyline Residence
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="p-1.5 rounded-full text-[var(--muted)] hover:bg-[var(--surface-2)] text-inherit"
                    aria-label="Tutup"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Quick Action Buttons on Top of Drawer */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={openSearch}
                    className="flex items-center gap-2 p-2.5 rounded-2xl bg-[var(--surface-2)] text-[var(--ink)] text-xs font-medium border border-[var(--line)] hover:bg-[var(--line)] transition-colors"
                  >
                    <Search className="h-4 w-4 text-[var(--muted)]" />
                    <span>Cari (⌘K)</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center gap-2 p-2.5 rounded-2xl bg-[var(--surface-2)] text-[var(--ink)] text-xs font-medium border border-[var(--line)] hover:bg-[var(--line)] transition-colors"
                  >
                    {isDark ? (
                      <Sun className="h-4 w-4 text-[var(--amber)]" />
                    ) : (
                      <Moon className="h-4 w-4 text-[var(--blue)]" />
                    )}
                    <span>{isDark ? "Mode Terang" : "Mode Gelap"}</span>
                  </button>
                </div>

                {/* More Menu Items */}
                <div className="space-y-1.5 mb-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] px-1 mb-2">
                    Modul Lainnya
                  </div>

                  {moreItems.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-2xl transition-all",
                          isActive
                            ? "bg-[var(--ink)] text-[var(--bg)] font-medium"
                            : "hover:bg-[var(--surface-2)] text-[var(--ink)]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
                              isActive
                                ? "bg-white/20 text-inherit"
                                : "bg-[var(--surface-2)] text-[var(--ink)]"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                              <span>{item.label}</span>
                              {item.badge !== undefined && (
                                <NavBadge count={item.badge} />
                              )}
                            </div>
                            <div
                              className={cn(
                                "text-[10px] mt-0.5",
                                isActive ? "opacity-75" : "text-[var(--muted)]"
                              )}
                            >
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs opacity-60">›</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="pt-3 border-t border-[var(--line)]">
                <Link
                  href="/booking"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full"
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={<Plus className="h-4 w-4 stroke-[2.5]" />}
                  >
                    + Buat Booking Baru
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
