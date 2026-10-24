"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface TimelineEvent {
  id: string;
  time: string; // e.g. "08:30" or "14:00"
  title: string; // e.g. "Check-in Andi (A-0803)"
  type: "checkin" | "checkout" | "task" | "inbound";
}

export interface DayTimelineProps {
  events: TimelineEvent[];
  currentTime?: string; // e.g. "14:37"
  className?: string;
  onEventClick?: (event: TimelineEvent) => void;
}

export function DayTimeline({
  events,
  currentTime = "14:37",
  className,
  onEventClick,
}: DayTimelineProps) {
  const [hoveredEvent, setHoveredEvent] = React.useState<TimelineEvent | null>(null);

  // Timeline runs from 06:00 (360 mins) to 22:00 (1320 mins) = 960 mins span
  const startMins = 6 * 60;
  const endMins = 22 * 60;
  const totalMins = endMins - startMins;

  const parseMins = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + (m || 0);
  };

  const getPositionPct = (timeStr: string) => {
    const mins = parseMins(timeStr);
    const clamped = Math.max(startMins, Math.min(endMins, mins));
    return ((clamped - startMins) / totalMins) * 100;
  };

  const currentPct = getPositionPct(currentTime);

  const getDotColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "checkin":
        return "bg-[var(--green)] ring-2 ring-[var(--green-soft)]";
      case "checkout":
        return "bg-[var(--blue)] ring-2 ring-[var(--blue-soft)]";
      case "task":
        return "bg-[var(--orange)] ring-2 ring-[var(--orange-soft)]";
      case "inbound":
        return "bg-[var(--amber)] ring-2 ring-[var(--amber-soft)]";
      default:
        return "bg-[var(--ink)]";
    }
  };

  return (
    <div className={cn("w-full py-4 relative select-none", className)}>
      {/* Background Track Line */}
      <div className="relative h-1.5 w-full bg-[var(--surface-2)] rounded-full border border-[var(--line)]">
        {/* Active Track Highlight up to current time */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-[var(--blue)]/30 rounded-full"
          style={{ width: `${currentPct}%` }}
        />

        {/* Current Time Indicator Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
          style={{ left: `${currentPct}%` }}
        >
          <div className="px-1.5 py-0.5 rounded-full bg-[var(--orange)] text-white text-[10px] font-bold shadow-xs tabular">
            {currentTime}
          </div>
          <div className="h-4 w-0.5 bg-[var(--orange)] mt-0.5" />
        </div>

        {/* Event Dots */}
        {events.map((evt, idx) => {
          const pct = getPositionPct(evt.time);
          return (
            <motion.div
              key={evt.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.2 }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 cursor-pointer"
              style={{ left: `${pct}%` }}
              onMouseEnter={() => setHoveredEvent(evt)}
              onMouseLeave={() => setHoveredEvent(null)}
              onClick={() => onEventClick?.(evt)}
            >
              <div
                className={cn(
                  "h-3.5 w-3.5 rounded-full transition-transform hover:scale-125 shadow-xs",
                  getDotColor(evt.type)
                )}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Time Scale Labels */}
      <div className="flex items-center justify-between text-[11px] text-[var(--muted)] font-medium mt-3 px-1">
        <span>06:00</span>
        <span>10:00</span>
        <span>14:00</span>
        <span>18:00</span>
        <span>22:00</span>
      </div>

      {/* Tooltip Overlay */}
      {hoveredEvent && (
        <div
          className="absolute -top-7 px-2.5 py-1 rounded-lg bg-[var(--ink)] text-[var(--bg)] text-xs shadow-lg z-30 pointer-events-none -translate-x-1/2 whitespace-nowrap"
          style={{ left: `${getPositionPct(hoveredEvent.time)}%` }}
        >
          <span className="font-semibold">{hoveredEvent.time}</span> ·{" "}
          <span>{hoveredEvent.title}</span>
        </div>
      )}
    </div>
  );
}
