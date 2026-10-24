"use client";

import * as React from "react";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";
import { StatusPill } from "./status-pill";
import { cn } from "@/lib/cn";

export interface PageHeaderProps {
  breadcrumb: BreadcrumbItem[];
  title: string;
  actions?: React.ReactNode;
  showStatusPill?: boolean;
  className?: string;
}

export function PageHeader({
  breadcrumb,
  title,
  actions,
  showStatusPill = true,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-2 mb-4 sm:mb-6", className)}>
      <Breadcrumb items={breadcrumb} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)]">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {showStatusPill && <StatusPill />}
          {actions}
        </div>
      </div>
    </div>
  );
}
