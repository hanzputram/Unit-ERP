"use client";

import * as React from "react";
import { PageHeader } from "@/components/shell/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Segmented } from "@/components/ui/segmented";
import { AreaChart } from "@/components/charts/area-chart";
import { Sparkline } from "@/components/charts/sparkline";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatRupiah } from "@/lib/money";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

export default function KeuanganPage() {
  const [tab, setTab] = React.useState<"ringkasan" | "pembayaran" | "pengeluaran" | "deposit">("ringkasan");
  const [basis, setBasis] = React.useState<"accrual" | "kas">("accrual");

  const areaData = [
    { month: "Nov", revenue: 95000000, cost: 35000000 },
    { month: "Des", revenue: 140000000, cost: 42000000 },
    { month: "Jan", revenue: 110000000, cost: 38000000 },
    { month: "Feb", revenue: 125000000, cost: 45000000 },
    { month: "Mar", revenue: 165000000, cost: 52000000 },
    { month: "Apr", revenue: 150000000, cost: 48000000 },
    { month: "Mei", revenue: 180000000, cost: 55000000 },
    { month: "Jun", revenue: 220000000, cost: 68000000 },
    { month: "Jul", revenue: 211000000, cost: 64000000 },
    { month: "Agu", revenue: 195000000, cost: 59000000 },
    { month: "Sep", revenue: 175000000, cost: 51000000 },
    { month: "Okt", revenue: 221553000, cost: 62000000 },
  ];

  const payments = [
    { id: "p1", kwt: "KWT/SKY/202610/0001", date: "24 Okt 14:15", guest: "Andi Pratama", booking: "BK-SKY-2610-0001", method: "TRANSFER", amount: 4930000, ref: "BCA 98214" },
    { id: "p2", kwt: "KWT/SKY/202610/0002", date: "24 Okt 10:30", guest: "Bambang Santoso", booking: "BK-SKY-2610-0003", method: "QRIS", amount: 500000, ref: "QRIS DANA" },
    { id: "p3", kwt: "KWT/SKY/202610/0003", date: "23 Okt 16:45", guest: "Jessica Lee", booking: "BK-SKY-2610-0004", method: "CARD", amount: 3900000, ref: "EDC Mandiri" },
    { id: "p4", kwt: "KWT/SKY/202610/0004", date: "20 Okt 09:20", guest: "Rina Melati", booking: "BK-SKY-2610-0002", method: "TRANSFER", amount: 17000000, ref: "BCA 11029" },
  ];

  const expenses = [
    { id: "x1", date: "23 Okt 2026", category: "Listrik & Utilitas", vendor: "PLN Pascabayar", desc: "Tagihan listrik Tower A Lantai 8", amount: 4850000 },
    { id: "x2", date: "22 Okt 2026", category: "Laundry & Linen", vendor: "Berkah Laundry", desc: "Cuci sprei, duvet & handuk 42 set", amount: 1250000 },
    { id: "x3", date: "20 Okt 2026", category: "Perlengkapan (Amenities)", vendor: "Metro Supply", desc: "Sabun, shampo, dental kit bulk", amount: 2800000 },
    { id: "x4", date: "15 Okt 2026", category: "Internet / Wi-Fi", vendor: "Biznet", desc: "Dedicated internet 200 Mbps", amount: 1650000 },
  ];

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        breadcrumb={[
          { label: "Skyline Residence", href: "/" },
          { label: "Keuangan", href: "/keuangan" },
          { label: "Ringkasan" },
        ]}
        title="Ringkasan Keuangan"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              icon={<Download className="h-4 w-4" />}
              onClick={() => toast.success("Laporan keuangan diekspor")}
            >
              Export
            </Button>
            <Button
              variant="primary"
              icon={<Plus className="h-4 w-4 stroke-[2.5]" />}
              onClick={() => toast.success("Catat transaksi")}
            >
              + Catat Transaksi
            </Button>
          </div>
        }
      />

      {/* Controls: Tab + Basis Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: "ringkasan", label: "Ringkasan Laba-Rugi" },
            { value: "pembayaran", label: "Pembayaran Diterima" },
            { value: "pengeluaran", label: "Pengeluaran Operasional" },
            { value: "deposit", label: "Buku Deposit" },
          ]}
        />

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--muted)]">Basis Pengakuan:</span>
          <Segmented
            size="sm"
            value={basis}
            onChange={setBasis}
            options={[
              { value: "accrual", label: "Accrual" },
              { value: "kas", label: "Kas" },
            ]}
          />
        </div>
      </div>

      {/* Tab 1: Ringkasan */}
      {tab === "ringkasan" && (
        <div className="space-y-6">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <Card tone="ink" className="flex flex-col justify-between">
              <CardHeader
                icon={<DollarSign className="h-4 w-4" />}
                title="Total Pendapatan"
              />
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-3xl font-semibold tracking-tight tabular">
                  Rp 221,6 jt
                </span>
                <Sparkline data={[140, 165, 180, 220, 211, 221]} color="currentColor" />
              </div>
              <div className="mt-3 text-xs opacity-75">+14% vs bulan lalu</div>
            </Card>

            <Card tone="blue" className="flex flex-col justify-between">
              <CardHeader
                icon={<TrendingUp className="h-4 w-4" />}
                title="Laba Operasional"
              />
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-3xl font-semibold tracking-tight tabular">
                  Rp 159,5 jt
                </span>
                <Sparkline data={[90, 110, 125, 152, 147, 159]} color="var(--blue)" />
              </div>
              <div className="mt-3 text-xs">Margin laba: <strong>72.0%</strong></div>
            </Card>

            <Card tone="default" className="flex flex-col justify-between">
              <CardHeader
                icon={<CreditCard className="h-4 w-4" />}
                title="Pengeluaran Operasional"
              />
              <div className="mt-1">
                <span className="text-3xl font-semibold tracking-tight text-[var(--ink)] tabular">
                  Rp 62.050.000
                </span>
              </div>
              <div className="mt-3 text-xs text-[var(--muted)]">42 transaksi tercatat</div>
            </Card>

            <Card tone="default" className="flex flex-col justify-between">
              <CardHeader
                icon={<DollarSign className="h-4 w-4" />}
                title="Kas Diterima Bersih"
              />
              <div className="mt-1">
                <span className="text-3xl font-semibold tracking-tight text-[var(--ink)] tabular">
                  Rp 217.948.000
                </span>
              </div>
              <div className="mt-3 text-xs text-[var(--green)]">Arus kas positif</div>
            </Card>
          </div>

          {/* Area Chart 12 Bulan */}
          <Card className="flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-semibold text-[var(--ink)]">
                  Tren Keuangan 12 Bulan
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  Perbandingan pendapatan vs pengeluaran operasional
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--blue)]" />
                  Pendapatan
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--muted)]" />
                  Biaya
                </span>
              </div>
            </div>
            <AreaChart data={areaData} height={280} />
          </Card>
        </div>
      )}

      {/* Tab 2: Pembayaran */}
      {tab === "pembayaran" && (
        <Card className="p-0 overflow-hidden">
          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No. Kwitansi</TableHead>
                  <TableHead>Waktu Bayar</TableHead>
                  <TableHead>Tamu & Booking</TableHead>
                  <TableHead>Metode</TableHead>
                  <TableHead>Referensi</TableHead>
                  <TableHead align="right">Nominal</TableHead>
                  <TableHead align="right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-semibold text-[var(--blue)]">
                      {p.kwt}
                    </TableCell>
                    <TableCell>{p.date}</TableCell>
                    <TableCell>
                      <div className="font-medium text-[var(--ink)]">{p.guest}</div>
                      <div className="text-xs text-[var(--muted)]">{p.booking}</div>
                    </TableCell>
                    <TableCell>
                      <Chip variant="default" size="sm">{p.method}</Chip>
                    </TableCell>
                    <TableCell className="text-xs text-[var(--muted)]">{p.ref}</TableCell>
                    <TableCell align="right" className="font-bold text-[var(--green)] tabular">
                      {formatRupiah(p.amount)}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toast.success(`Mencetak kwitansi ${p.kwt}`)}
                      >
                        Kwitansi ›
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card List (visible on mobile only) */}
          <div className="divide-y divide-[var(--line)] md:hidden">
            {payments.map((p) => (
              <div key={p.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-sm text-[var(--ink)]">
                      {p.guest}
                    </div>
                    <div className="text-[11px] font-mono text-[var(--blue)]">
                      {p.kwt}
                    </div>
                  </div>
                  <Chip variant="default" size="sm">{p.method}</Chip>
                </div>

                <div className="text-xs text-[var(--muted)] flex items-center justify-between">
                  <span>{p.booking}</span>
                  <span>{p.date}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
                  <div className="text-xs text-[var(--muted)]">
                    Ref: <span className="font-mono">{p.ref}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[var(--green)] tabular">
                      {formatRupiah(p.amount)}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.success(`Mencetak kwitansi ${p.kwt}`)}
                    >
                      Kwitansi ›
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 3: Pengeluaran */}
      {tab === "pengeluaran" && (
        <Card className="p-0 overflow-hidden">
          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead align="right">Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.date}</TableCell>
                    <TableCell>
                      <Chip variant="amber" size="sm">{x.category}</Chip>
                    </TableCell>
                    <TableCell className="font-medium">{x.vendor}</TableCell>
                    <TableCell className="text-xs text-[var(--muted)]">{x.desc}</TableCell>
                    <TableCell align="right" className="font-semibold text-[var(--red)] tabular">
                      -{formatRupiah(x.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card List (visible on mobile only) */}
          <div className="divide-y divide-[var(--line)] md:hidden">
            {expenses.map((x) => (
              <div key={x.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-sm text-[var(--ink)]">
                    {x.vendor}
                  </div>
                  <Chip variant="amber" size="sm">{x.category}</Chip>
                </div>

                <p className="text-xs text-[var(--muted)]">{x.desc}</p>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-xs">
                  <span className="text-[var(--muted)]">{x.date}</span>
                  <span className="font-bold text-sm text-[var(--red)] tabular">
                    -{formatRupiah(x.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 4: Deposit */}
      {tab === "deposit" && (
        <Card className="space-y-4">
          <div className="p-4 rounded-2xl bg-[var(--surface-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-[var(--muted)] font-semibold uppercase">
                Total Deposit Ditahan (Liabilitas)
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[var(--ink)] tabular mt-1">
                Rp 48.500.000
              </div>
            </div>
            <Chip variant="amber" dot>
              Bukan Pendapatan
            </Chip>
          </div>
          <p className="text-xs text-[var(--muted)]">
            Deposit disimpan terpisah dari pendapatan dan akan dikembalikan saat check-out tamu setelah inspeksi kondisi unit.
          </p>
        </Card>
      )}
    </div>
  );
}
