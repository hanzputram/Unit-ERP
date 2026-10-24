"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { formatRupiahCompact } from "@/lib/money";
import { cn } from "@/lib/cn";

export interface CashBarItem {
  date: string; // e.g. "12 Okt"
  inflow: number; // positive Rp
  outflow: number; // positive Rp (displayed downward)
  isToday?: boolean;
}

export interface CashBarsProps {
  data: CashBarItem[];
  height?: number;
  className?: string;
}

export function CashBars({ data, height = 76, className }: CashBarsProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // Find max magnitude for scaling
  const maxVal = Math.max(
    ...data.flatMap((d) => [d.inflow, d.outflow]),
    10_000_000
  );

  const halfHeight = height / 2;

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      <div
        className="relative flex items-center justify-between gap-1 w-full"
        style={{ height }}
      >
        {/* Zero Baseline */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[var(--line)]" />

        {data.map((item, idx) => {
          const inHeight = Math.max(2, (item.inflow / maxVal) * (halfHeight - 4));
          const outHeight = Math.max(2, (item.outflow / maxVal) * (halfHeight - 4));
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={item.date + idx}
              className="relative flex-1 flex flex-col items-center justify-center h-full group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-10 z-30 px-2 py-1 rounded-md bg-[var(--ink)] text-[var(--bg)] text-[10px] font-medium whitespace-nowrap shadow-md pointer-events-none">
                  <div className="text-[9px] text-[var(--muted)]">{item.date}</div>
                  <div className="text-[var(--green)]">+{formatRupiahCompact(item.inflow)}</div>
                  <div className="text-[var(--orange)]">-{formatRupiahCompact(item.outflow)}</div>
                </div>
              )}

              {/* Inflow Bar (Upwards) */}
              <div
                className="w-full flex items-end justify-center"
                style={{ height: halfHeight }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: inHeight }}
                  transition={{ delay: idx * 0.02, duration: 0.3 }}
                  className={cn(
                    "w-full max-w-[12px] rounded-t-[3px] bg-[var(--green)] transition-opacity",
                    item.isToday ? "opacity-100" : "opacity-75 hover:opacity-100",
                    isHovered && "ring-1 ring-[var(--green)]"
                  )}
                />
              </div>

              {/* Outflow Bar (Downwards) */}
              <div
                className="w-full flex items-start justify-center"
                style={{ height: halfHeight }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: outHeight }}
                  transition={{ delay: idx * 0.02, duration: 0.3 }}
                  className={cn(
                    "w-full max-w-[12px] rounded-b-[3px] bg-[var(--orange)] transition-opacity",
                    item.isToday ? "opacity-100" : "opacity-75 hover:opacity-100",
                    isHovered && "ring-1 ring-[var(--orange)]"
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)] pt-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--green)]" />
            Uang masuk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--orange)]" />
            Uang keluar
          </span>
        </div>
        <span>14 hari terakhir</span>
      </div>
    </div>
  );
}
