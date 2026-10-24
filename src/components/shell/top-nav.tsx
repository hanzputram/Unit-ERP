"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Building2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { NavBadge } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/button";

export interface NavItem {
  href: string;
  label: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard" },
  { href: "/booking", label: "Booking", badge: 3 },
  { href: "/unit", label: "Unit" },
  { href: "/tamu", label: "Tamu" },
  { href: "/keuangan", label: "Keuangan" },
  { href: "/invoice", label: "Invoice", badge: 1 },
  { href: "/laporan", label: "Laporan" },
  { href: "/design", label: "Design System" },
];

export function TopNav() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = React.useState<string | null>(null);

  return (
    <header className="sticky top-3 z-40 w-full px-4 md:px-8 max-w-[1440px] mx-auto pointer-events-none">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Link
            href="/"
            className="flex items-center gap-3 p-1 rounded-2xl group transition-transform hover:scale-[1.02]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--ink)] text-[var(--bg)] shadow-md transition-colors">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-semibold leading-tight text-[var(--ink)] tracking-tight">
                StayDesk
              </div>
              <div className="text-[11px] font-medium text-[var(--muted)] leading-tight">
                Skyline Residence
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Floating Pill Navigation */}
        <nav
          className="pointer-events-auto relative hidden md:inline-flex items-center rounded-[var(--r-pill)] bg-[var(--surface)] p-1.5 border border-[var(--line)] shadow-[var(--shadow-card)] backdrop-blur-xl"
          role="navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                onMouseLeave={() => setHoveredHref(null)}
                className={cn(
                  "relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-[var(--r-pill)] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]",
                  isActive
                    ? "text-[var(--bg)]"
                    : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                )}
              >
                {/* Active Indicator (solid pill sliding across items) */}
                {isActive && (
                  <motion.div
                    layoutId="top-nav-pill"
                    transition={spring}
                    className="absolute inset-0 rounded-[var(--r-pill)] bg-[var(--ink)] shadow-md z-[-1]"
                  />
                )}

                {/* Hover peek indicator */}
                {!isActive && hoveredHref === item.href && (
                  <motion.div
                    layoutId="top-nav-hover"
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 rounded-[var(--r-pill)] bg-[var(--surface-2)] z-[-1]"
                  />
                )}

                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <NavBadge count={item.badge} className="ml-0.5" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Notification Bell & Profile Avatar */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Notification Button with unread dot */}
          <div className="relative">
            <IconButton
              size="md"
              variant="solid"
              aria-label="Notifikasi"
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--orange)] ring-2 ring-[var(--surface-solid)]" />
            </IconButton>
          </div>

          {/* User Avatar with Initials "NH" and Mint Background */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mint)] text-[#155239] text-xs font-semibold shadow-xs border border-black/5 cursor-pointer hover:ring-2 hover:ring-[var(--blue)]/40 transition-all select-none"
            title="Noor (Owner)"
          >
            NH
          </div>
        </div>
      </div>
    </header>
  );
}
