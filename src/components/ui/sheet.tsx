"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/components/ui/button";
import { spring } from "@/lib/motion";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  width?: string;
}

export function Sheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  className,
  width = "w-full sm:max-w-md md:max-w-[480px]",
}: SheetProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/35 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 flex pl-0 sm:pl-10 w-full justify-end pointer-events-none">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={spring}
              className={cn(
                "relative w-full sm:w-auto bg-[var(--surface-solid)] border-l border-[var(--line)] shadow-2xl flex flex-col justify-between p-4 sm:p-6 pointer-events-auto h-full",
                width,
                className
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[var(--line)]">
                  <div>
                    {title && (
                      <h2 className="text-lg font-semibold text-[var(--ink)]">
                        {title}
                      </h2>
                    )}
                    {subtitle && (
                      <p className="text-xs text-[var(--muted)] mt-0.5">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    onClick={onClose}
                    aria-label="Tutup panel"
                  >
                    <X className="h-4 w-4" />
                  </IconButton>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
                  {children}
                </div>
              </div>
              {footer && (
                <div className="pt-4 mt-4 border-t border-[var(--line)] flex items-center justify-end gap-2.5">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
