"use client";

import * as React from "react";
import { formatRupiahCompact } from "@/lib/money";
import { cn } from "@/lib/cn";

export interface StackedSegment {
  label: string;
  amount: number;
  color: string;
}

export interface StackedBarProps {
  segments: StackedSegment[];
  height?: number;
  className?: string;
}

export function StackedBar({
  segments,
  height = 14,
  className,
}: StackedBarProps) {
  const total = segments.reduce((acc, s) => acc + s.amount, 0) || 1;

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Horizontal Stacked Bar */}
      <div
        className="w-full flex rounded-[var(--r-pill)] overflow-hidden bg-[var(--surface-2)] shadow-inner"
        style={{ height }}
      >
        {segments.map((seg, idx) => {
          const pct = (seg.amount / total) * 100;
          if (pct <= 0) return null;
          return (
            <div
              key={seg.label + idx}
              style={{
                width: `${pct}%`,
                backgroundColor: seg.color,
              }}
              className="h-full transition-all duration-300 relative group"
              title={`${seg.label}: ${formatRupiahCompact(seg.amount)} (${pct.toFixed(0)}%)`}
            />
          );
        })}
      </div>

      {/* Legend Rows */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {segments.map((seg, idx) => {
          const pct = ((seg.amount / total) * 100).toFixed(0);
          return (
            <div
              key={seg.label + idx}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-[var(--ink-2)] truncate">{seg.label}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 tabular">
                <span className="font-semibold text-[var(--ink)]">
                  {formatRupiahCompact(seg.amount)}
                </span>
                <span className="text-[11px] text-[var(--muted)]">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
