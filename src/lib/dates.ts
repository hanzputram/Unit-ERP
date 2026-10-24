import { format, differenceInCalendarDays, addDays, addMonths } from "date-fns";
import { id } from "date-fns/locale";

export const DEFAULT_TIMEZONE = "Asia/Jakarta";

export function formatDateIndo(date: Date | string | number): string {
  const d = typeof date === "object" ? date : new Date(date);
  return format(d, "EEE, d MMM yyyy", { locale: id });
}

export function formatDayEyebrow(date: Date | string | number): string {
  const d = typeof date === "object" ? date : new Date(date);
  return format(d, "EEEE, d MMMM", { locale: id }).toUpperCase();
}

export function formatTime24(date: Date | string | number): string {
  const d = typeof date === "object" ? date : new Date(date);
  return format(d, "HH:mm");
}

export function formatRangeIndo(start: Date, end: Date): string {
  const nights = differenceInCalendarDays(end, start);
  return `${format(start, "d MMM", { locale: id })} → ${format(end, "d MMM yyyy", { locale: id })} · ${nights} malam`;
}

export { differenceInCalendarDays, addDays, addMonths };
