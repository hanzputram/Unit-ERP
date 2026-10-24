"use client";

import * as React from "react";
import { formatRupiahCompact } from "@/lib/money";
import { cn } from "@/lib/cn";

export type UnitTileStatus =
  | "OCCUPIED" // Terisi (solid blue)
  | "VACANT" // Kosong (surface-2 / light gray)
  | "ARRIVING" // Tiba hari ini (yellow/amber outline)
  | "CLEANING" // Dibersihkan (solid orange)
  | "BLOCKED"; // Diblokir (diagonal stripes)

export interface UnitTileData {
  id: string;
  code: string; // e.g. "A-0801"
  floor: number;
  type: string; // "Studio" | "1 BR" | "2 BR"
  status: UnitTileStatus;
  guestName?: string;
  checkOutDate?: string;
  revenueThisMonth?: number;
}

export interface UnitGridProps {
  buildingCode: string; // "TWA"
  buildingName: string; // "Tower A"
  accentColor?: string; // e.g. "var(--blue)" or "var(--orange)"
  units: UnitTileData[];
  onUnitClick?: (unit: UnitTileData) => void;
  className?: string;
}

export function UnitGrid({
  buildingCode,
  buildingName,
  accentColor = "var(--blue)",
  units,
  onUnitClick,
  className,
}: UnitGridProps) {
  const [hoveredUnit, setHoveredUnit] = React.useState<UnitTileData | null>(null);

  // Group by floor (descending so top floor is at top)
  const floors = React.useMemo(() => {
    const map = new Map<number, UnitTileData[]>();
    for (const unit of units) {
      const list = map.get(unit.floor) || [];
      list.push(unit);
      map.set(unit.floor, list);
    }
    return Array.from(map.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([floor, floorUnits]) => ({
        floor,
        units: floorUnits.sort((a, b) => a.code.localeCompare(b.code)),
      }));
  }, [units]);

  const totalUnits = units.length;
  const occupiedUnits = units.filter(
    (u) => u.status === "OCCUPIED" || u.status === "ARRIVING"
  ).length;
  const occupiedPct = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

  // Top 3 performing units
  const topUnits = React.useMemo(() => {
    return [...units]
      .filter((u) => (u.revenueThisMonth ?? 0) > 0)
      .sort((a, b) => (b.revenueThisMonth ?? 0) - (a.revenueThisMonth ?? 0))
      .slice(0, 3);
  }, [units]);

  const getStatusClasses = (status: UnitTileStatus) => {
    switch (status) {
      case "OCCUPIED":
        return "bg-[var(--blue)] border-transparent text-white";
      case "VACANT":
        return "bg-[var(--surface-2)] border-[var(--line)] hover:bg-[var(--line)]";
      case "ARRIVING":
        return "bg-[var(--amber-soft)] border-2 border-[var(--amber)]";
      case "CLEANING":
        return "bg-[var(--orange)] border-transparent text-white";
      case "BLOCKED":
        return "bg-[repeating-linear-gradient(45deg,var(--surface-2),var(--surface-2)_2px,var(--muted)/30_2px,var(--muted)/30_4px)] border-[var(--line)]";
      default:
        return "bg-[var(--surface-2)] border-[var(--line)]";
    }
  };

  return (
    <div
      style={{ borderTopColor: accentColor }}
      className={cn(
        "rounded-[var(--r-lg)] bg-[var(--surface)] border border-[var(--line)] border-t-[3px] p-5 shadow-[var(--shadow-card)] backdrop-blur-md flex flex-col justify-between",
        className
      )}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                className="px-2 py-0.5 rounded-[var(--r-pill)] text-xs font-bold tracking-wider"
              >
                {buildingCode}
              </span>
              <h3 className="text-base font-semibold text-[var(--ink)]">
                {buildingName}
              </h3>
            </div>
            <p className="text-xs text-[var(--muted)] mt-1">
              <strong className="text-[var(--ink)] font-semibold">
                {occupiedPct}%
              </strong>{" "}
              dari {totalUnits} unit terisi
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--muted)] mb-4 pb-3 border-b border-[var(--line)]">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[var(--blue)] shrink-0" />
            Terisi
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[var(--surface-2)] border border-[var(--line)] shrink-0" />
            Kosong
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-[3px] border border-[var(--amber)] bg-[var(--amber-soft)] shrink-0" />
            Tiba hari ini
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[var(--orange)] shrink-0" />
            Dibersihkan
          </span>
        </div>

        {/* Floor-by-Floor Unit Tiles */}
        <div className="space-y-1.5 mb-5 relative">
          {floors.map((floorGroup) => (
            <div key={floorGroup.floor} className="flex items-center gap-2">
              <span className="w-5 text-[10px] font-semibold text-[var(--muted)] tabular text-right shrink-0">
                L{floorGroup.floor}
              </span>
              <div className="flex flex-wrap gap-1">
                {floorGroup.units.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => onUnitClick?.(unit)}
                    onMouseEnter={() => setHoveredUnit(unit)}
                    onMouseLeave={() => setHoveredUnit(null)}
                    className={cn(
                      "h-7 w-7 sm:h-6 sm:w-6 rounded-[5px] sm:rounded-[4px] border cursor-pointer transition-all duration-150 hover:scale-115 active:scale-95 shadow-xs relative flex items-center justify-center text-[9px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]",
                      getStatusClasses(unit.status)
                    )}
                    aria-label={`Unit ${unit.code}: ${unit.status}`}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Hover Tooltip Overlay */}
          {hoveredUnit && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 px-3 py-2 rounded-xl bg-[var(--ink)] text-[var(--bg)] text-xs shadow-xl border border-[var(--line)] pointer-events-none whitespace-nowrap">
              <div className="font-semibold text-sm">{hoveredUnit.code} · {hoveredUnit.type}</div>
              <div className="text-[11px] text-[var(--muted)] capitalize">
                Status: {hoveredUnit.status.toLowerCase()}
              </div>
              {hoveredUnit.guestName && (
                <div className="text-[11px] text-[var(--blue-soft)]">
                  Tamu: {hoveredUnit.guestName}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mini Stats & Top Performing Units */}
      <div className="pt-3 border-t border-[var(--line)]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
          UNIT TERBAIK DI SINI
        </div>
        <div className="space-y-1.5">
          {topUnits.map((tu) => (
            <div
              key={tu.id}
              className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-[var(--surface-2)]/60 hover:bg-[var(--surface-2)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-[var(--blue-soft)] text-[var(--blue)] flex items-center justify-center text-[10px] font-bold">
                  {tu.code.slice(-2)}
                </span>
                <span className="font-medium text-[var(--ink)]">{tu.code}</span>
                <span className="text-[11px] text-[var(--muted)]">({tu.type})</span>
              </div>
              <span className="font-semibold text-[var(--ink)] tabular">
                {formatRupiahCompact(tu.revenueThisMonth || 0)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
