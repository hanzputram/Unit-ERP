"use client";

import * as React from "react";
import { formatTime24 } from "@/lib/dates";
import { cn } from "@/lib/cn";

export interface StatusPillProps {
  checkInCount?: number;
  checkOutCount?: number;
  completedTasks?: number;
  totalTasks?: number;
  className?: string;
  onClick?: () => void;
}

export function StatusPill({
  checkInCount = 3,
  checkOutCount = 2,
  completedTasks = 4,
  totalTasks = 5,
  className,
  onClick,
}: StatusPillProps) {
  const [time, setTime] = React.useState<string>("14:37");

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime24(new Date()));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const progressPct =
    totalTasks > 0 ? Math.min(100, (completedTasks / totalTasks) * 100) : 0;

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={cn(
        "inline-flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-1.5 rounded-[var(--r-pill)] bg-[var(--surface)] border border-[var(--line)] shadow-[var(--shadow-card)] backdrop-blur-md cursor-pointer select-none transition-all hover:bg-[var(--surface-solid)] active:scale-[0.99] max-w-full",
        className
      )}
    >
      {/* Pulsing Green Dot */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--green)]" />
      </span>

      {/* Clock & Text */}
      <div className="flex flex-col text-left min-w-0">
        <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold text-[var(--ink)] tabular">
          <span>{time}</span>
          <span className="text-[var(--line)]">·</span>
          <span className="truncate">
            {checkInCount} check-in, {checkOutCount} check-out
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {/* Orange Progress Bar */}
          <div className="w-14 sm:w-20 h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden shrink-0">
            <div
              className="h-full bg-[var(--orange)] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-[10px] text-[var(--muted)] font-medium whitespace-nowrap">
            {completedTasks}/{totalTasks} tugas
          </span>
        </div>
      </div>
    </div>
  );
}
