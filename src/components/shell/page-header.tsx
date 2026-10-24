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
    <div className={cn("space-y-2 mb-6", className)}>
      <Breadcrumb items={breadcrumb} />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--ink)]">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          {showStatusPill && <StatusPill />}
          {actions}
        </div>
      </div>
    </div>
  );
}
