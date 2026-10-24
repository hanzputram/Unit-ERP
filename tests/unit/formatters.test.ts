import { describe, it, expect } from "vitest";
import { formatRupiah, formatRupiahCompact } from "../../src/lib/money";
import { formatDateIndo, formatDayEyebrow, formatRangeIndo } from "../../src/lib/dates";

describe("money formatting", () => {
  it("formats integer to standard Indonesian Rupiah", () => {
    expect(formatRupiah(1250000)).toMatch(/Rp\s*1\.250\.000/);
    expect(formatRupiah(0)).toMatch(/Rp\s*0/);
  });

  it("formats compact representations for dashboard cards", () => {
    expect(formatRupiahCompact(221553000)).toBe("Rp 221,6 jt");
    expect(formatRupiahCompact(1720000000)).toBe("Rp 1,72 M");
    expect(formatRupiahCompact(450000)).toBe("Rp 450 rb");
    expect(formatRupiahCompact(800)).toBe("Rp 800");
  });
});

describe("date formatting", () => {
  it("formats dates in Indonesian locale", () => {
    const testDate = new Date(2026, 9, 24, 14, 37); // 24 Oktober 2026
    expect(formatDateIndo(testDate)).toBe("Sab, 24 Okt 2026");
    expect(formatDayEyebrow(testDate)).toBe("SABTU, 24 OKTOBER");
  });

  it("formats stay ranges with nights calculation", () => {
    const start = new Date(2026, 9, 24);
    const end = new Date(2026, 9, 31);
    expect(formatRangeIndo(start, end)).toBe("24 Okt → 31 Okt 2026 · 7 malam");
  });
});
