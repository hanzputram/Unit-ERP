"use client";

import * as React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatRupiahCompact } from "@/lib/money";
import { cn } from "@/lib/cn";

export interface AreaChartPoint {
  month: string;
  revenue: number;
  cost: number;
}

export interface AreaChartProps {
  data: AreaChartPoint[];
  height?: number;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-[12px] bg-[var(--surface-solid)] border border-[var(--line)] p-2.5 shadow-xl text-xs space-y-1.5 backdrop-blur-md">
        <p className="font-medium text-[var(--muted)] text-[11px] mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-[var(--ink-2)] text-[11px] capitalize">
                {entry.name === "revenue" ? "Pendapatan" : "Biaya"}
              </span>
            </div>
            <span className="font-semibold text-[var(--ink)] tabular">
              {formatRupiahCompact(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function AreaChart({ data, height = 240, className }: AreaChartProps) {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <div
      className={cn("w-full select-none", className)}
      style={{ height, minHeight: height }}
    >
      {mounted ? (
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={height}>
          <RechartsAreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--line, #e2e8f0)"
            />

            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => formatRupiahCompact(val)}
              ticks={[0, 100_000_000, 200_000_000]}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Secondary Series: Cost (dashed line, no fill) */}
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#94a3b8"
              strokeWidth={1.75}
              strokeDasharray="4 4"
              fill="none"
              isAnimationActive={false}
            />

            {/* Primary Series: Revenue (smooth blue line + soft gradient) */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#revenueGradient)"
              isAnimationActive={false}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-xs text-[var(--muted)] animate-pulse rounded-lg bg-[var(--surface-2)]/30"
          style={{ height }}
        >
          Memuat grafik...
        </div>
      )}
    </div>
  );
}
