"use client";

import { cn } from "@/lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "rectangle" | "circle" | "pill";
}

export function Skeleton({
  className,
  shape = "rectangle",
  ...props
}: SkeletonProps) {
  const shapeClasses = {
    rectangle: "rounded-[14px]",
    circle: "rounded-full",
    pill: "rounded-[var(--r-pill)]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--surface-2)] animate-pulse",
        shapeClasses[shape],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--line)] to-transparent animate-[shimmer_1.4s_infinite]" />
    </div>
  );
}
