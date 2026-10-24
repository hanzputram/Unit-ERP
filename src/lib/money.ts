/**
 * Utility helper untuk format mata uang Rupiah
 * Semua uang adalah integer (tanpa desimal)
 */

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/\u00a0/g, " "); // Pastikan non-breaking space bersih
}

/**
 * Format ringkas untuk kartu KPI / grafik besar:
 * Rp 221,5 jt, Rp 1,72 M, atau Rp 450 rb
 */
export function formatRupiahCompact(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (abs >= 1_000_000_000) {
    const val = (abs / 1_000_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    });
    return `${sign}Rp ${val} M`;
  }
  if (abs >= 1_000_000) {
    const val = (abs / 1_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
    });
    return `${sign}Rp ${val} jt`;
  }
  if (abs >= 1_000) {
    const val = (abs / 1_000).toLocaleString("id-ID", {
      maximumFractionDigits: 0,
    });
    return `${sign}Rp ${val} rb`;
  }
  return `${sign}Rp ${abs}`;
}
