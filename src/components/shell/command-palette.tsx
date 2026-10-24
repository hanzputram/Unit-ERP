"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search, Calendar, UserPlus, CreditCard, Key, DoorOpen, X } from "lucide-react";
import { useRouter } from "next/navigation";

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    const openHandler = () => onOpenChange(true);
    document.addEventListener("keydown", down);
    window.addEventListener("staydesk:open-command-palette", openHandler);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("staydesk:open-command-palette", openHandler);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Palette Container */}
      <div className="relative z-10 w-full max-w-xl rounded-[24px] bg-[var(--surface-solid)] border border-[var(--line)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <Command className="w-full">
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 border-b border-[var(--line)]">
            <Search className="h-5 w-5 text-[var(--muted)] shrink-0" />
            <Command.Input
              placeholder="Cari tamu, unit, booking, invoice atau ketik aksi..."
              className="w-full h-14 bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--muted)] outline-none"
            />
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-md text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* List Options */}
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-xs text-[var(--muted)]">
              Tidak ada hasil yang cocok.
            </Command.Empty>

            <Command.Group heading="Aksi Cepat" className="text-[11px] font-semibold text-[var(--muted)] uppercase px-2 py-1.5">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/booking/new"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--ink)] hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--blue-soft)] text-[var(--blue)]">
                  <Calendar className="h-4 w-4" />
                </div>
                <span>Buat Booking Baru</span>
                <span className="ml-auto text-[10px] text-[var(--muted)]">N</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => router.push("/tamu?new=true"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--ink)] hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--green-soft)] text-[var(--green)]">
                  <UserPlus className="h-4 w-4" />
                </div>
                <span>Tambah Tamu Baru</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => router.push("/keuangan?tab=pembayaran"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--ink)] hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--amber-soft)] text-[var(--amber)]">
                  <CreditCard className="h-4 w-4" />
                </div>
                <span>Catat Pembayaran</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Unit Siap Check-in / Out" className="text-[11px] font-semibold text-[var(--muted)] uppercase px-2 py-1.5 mt-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/booking/bk-0803/check-in"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--ink)] hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-2)] text-[var(--ink)]">
                  <DoorOpen className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold">Check-in A-0803 (Andi Pratama)</div>
                  <div className="text-[10px] text-[var(--muted)]">Studio · Tower A · Jadwal 14:00</div>
                </div>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(() => router.push("/booking/bk-1205/check-out"))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--ink)] hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-2)] text-[var(--ink)]">
                  <Key className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold">Check-out B-0302 (Rina Melati)</div>
                  <div className="text-[10px] text-[var(--muted)]">2 BR · Tower B · Selesai masa tinggal</div>
                </div>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
