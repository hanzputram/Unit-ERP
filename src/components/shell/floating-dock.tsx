"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Search, Plus, Moon, Sun, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FloatingDockProps {
  onSearchClick?: () => void;
  onQuickAddClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  className?: string;
}

export function FloatingDock({
  onSearchClick,
  onQuickAddClick,
  onSettingsClick,
  onHelpClick,
  className,
}: FloatingDockProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <aside
      className={cn(
        "fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2 p-2 rounded-[28px] bg-[var(--ink)] text-[var(--bg)] shadow-[var(--shadow-float)] border border-white/10 backdrop-blur-xl transition-colors duration-200",
        className
      )}
      aria-label="Aksi Cepat"
    >
      {/* 1. Search (Command Palette) */}
      <button
        type="button"
        onClick={onSearchClick}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 transition-all text-inherit cursor-pointer active:scale-95 group relative"
        aria-label="Cari (Ctrl+K)"
      >
        <Search className="h-4 w-4" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-[var(--ink)] text-[var(--bg)] text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-[var(--line)]">
          Cari (⌘K)
        </span>
      </button>

      {/* 2. Quick Add (+) */}
      <button
        type="button"
        onClick={onQuickAddClick}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--blue)] text-white hover:bg-[var(--blue)]/90 transition-all cursor-pointer active:scale-95 group relative shadow-xs"
        aria-label="Tambah Cepat"
      >
        <Plus className="h-4 w-4 stroke-[2.5]" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-[var(--ink)] text-[var(--bg)] text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-[var(--line)]">
          Tambah Cepat
        </span>
      </button>

      {/* 3. Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 transition-all text-inherit cursor-pointer active:scale-95 group relative"
        aria-label="Ganti Tema"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-[var(--ink)] text-[var(--bg)] text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-[var(--line)]">
          {isDark ? "Mode Terang" : "Mode Gelap"}
        </span>
      </button>

      {/* Divider */}
      <div className="w-5 h-[1px] bg-white/15 my-0.5" />

      {/* 4. Settings */}
      <button
        type="button"
        onClick={onSettingsClick}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 transition-all text-inherit cursor-pointer active:scale-95 group relative"
        aria-label="Pengaturan"
      >
        <Settings className="h-4 w-4" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-[var(--ink)] text-[var(--bg)] text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-[var(--line)]">
          Pengaturan
        </span>
      </button>

      {/* 5. Help / Shortcuts */}
      <button
        type="button"
        onClick={onHelpClick}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15 transition-all text-inherit cursor-pointer active:scale-95 group relative"
        aria-label="Bantuan dan Pintasan"
      >
        <HelpCircle className="h-4 w-4" />
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-[var(--ink)] text-[var(--bg)] text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-[var(--line)]">
          Bantuan (?)
        </span>
      </button>
    </aside>
  );
}
