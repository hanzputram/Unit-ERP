"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/cn";

export interface GaugeProps {
  value: number; // 0 to 100
  target?: number;
  average?: number;
  label?: string;
  size?: number;
  className?: string;
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleInDegrees: number
) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    "M",
    start.x.toFixed(2),
    start.y.toFixed(2),
    "A",
    r.toFixed(2),
    r.toFixed(2),
    0,
    largeArcFlag,
    1,
    end.x.toFixed(2),
    end.y.toFixed(2),
  ].join(" ");
}

export function Gauge({
  value,
  target = 92,
  average = 88.4,
  label = "Okupansi Oktober",
  size = 220,
  className,
}: GaugeProps) {
  const clamped = Math.max(0, Math.min(100, value));

  // Geometry matching Cadra ERP reference exactly
  const cx = size / 2;
  const cy = 96;
  const r = 74;
  const strokeWidth = 11;

  const startAngle = 145; // Bottom-left (~7:30 o'clock)
  const endAngle = 395; // Bottom-right (~4:30 o'clock)
  const angleSpan = endAngle - startAngle; // 250 degrees total span

  // Needle target angle
  const targetNeedleAngle = startAngle + (clamped / 100) * angleSpan;

  // Track & Value arc paths
  const trackPath = describeArc(cx, cy, r, startAngle, endAngle);
  // Full arc circumference for dasharray calculation
  const totalArcLength = ((angleSpan * Math.PI) / 180) * r;
  const activeArcLength = (clamped / 100) * totalArcLength;

  // Tick mark angles (0%, 25%, 50%, 75%, 100%)
  const tickPercentages = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between text-center select-none w-full max-w-[280px] mx-auto",
        className
      )}
    >
      <div className="relative w-full flex justify-center" style={{ height: 185 }}>
        <svg
          width={size}
          height={185}
          viewBox={`0 0 ${size} 185`}
          className="overflow-visible"
        >
          {/* Background Track (Muted Gray Arc) */}
          <path
            d={trackPath}
            fill="none"
            stroke="var(--surface-2)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Value Arc (Vibrant Lime per Reference) */}
          <motion.path
            d={trackPath}
            fill="none"
            stroke="var(--lime)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${totalArcLength} ${totalArcLength}`}
            initial={{ strokeDashoffset: totalArcLength }}
            animate={{ strokeDashoffset: totalArcLength - activeArcLength }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Radial Ticks */}
          {tickPercentages.map((p, idx) => {
            const ang = startAngle + p * angleSpan;
            const p1 = polarToCartesian(cx, cy, r - 18, ang);
            const p2 = polarToCartesian(cx, cy, r - 9, ang);
            return (
              <line
                key={`tick-${idx}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="var(--muted)"
                strokeOpacity={0.45}
                strokeWidth={idx === 2 ? "2" : "1.5"}
                strokeLinecap="round"
              />
            );
          })}

          {/* Needle Layer with Rotation from the Exact Center Hub */}
          <motion.g
            style={{
              transformOrigin: `${cx}px ${cy}px`,
            }}
            initial={{ rotate: startAngle }}
            animate={{ rotate: targetNeedleAngle }}
            transition={springSoft}
          >
            {/* Sleek Tapered Pointer Needle */}
            <line
              x1={cx}
              y1={cy}
              x2={cx + (r - 10)}
              y2={cy}
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Center Hub: Donut Ring Matching Video */}
          <circle
            cx={cx}
            cy={cy}
            r="8"
            fill="var(--ink)"
            className="transition-colors duration-200"
          />
          <circle
            cx={cx}
            cy={cy}
            r="3.5"
            fill="var(--bg)"
            className="transition-colors duration-200"
          />
        </svg>

        {/* Big Number and Label positioned cleanly in the bottom opening */}
        <div className="absolute left-0 right-0 top-[125px] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-3xl font-bold tracking-tight text-[var(--ink)] tabular leading-none"
          >
            {clamped}%
          </motion.div>
          <div className="text-xs text-[var(--muted)] font-medium mt-1">
            {label}
          </div>
        </div>
      </div>

      {/* Target & 12-Month Average Footer */}
      <div className="text-xs text-[var(--muted)] font-medium mt-1 pt-2.5 border-t border-[var(--line)] w-full flex items-center justify-center gap-2.5">
        <span>
          Target <strong className="text-[var(--ink)] font-semibold">{target}%</strong>
        </span>
        <span className="text-[var(--muted)]/40">·</span>
        <span>
          Rata-rata 12 bln{" "}
          <strong className="text-[var(--ink)] font-semibold">{average}%</strong>
        </span>
      </div>
    </div>
  );
}
