"use client";

import * as React from "react";
import { PageHeader } from "@/components/shell/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { AreaChart } from "@/components/charts/area-chart";
import { Gauge } from "@/components/charts/gauge";
import { Sparkline } from "@/components/charts/sparkline";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatRupiahCompact } from "@/lib/money";
import {
  FileText,
  Download,
  DollarSign,
  Building2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

export default function LaporanPage() {
  const [tab, setTab] = React.useState<"ringkasan" | "builder">("ringkasan");

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

  const unitPerformances = [
    { code: "A-0401", type: "2 BR", occ: "94%", nights: 29, adr: "Rp 950rb", revenue: 17000000, cost: 3800000, profit: 13200000 },
    { code: "B-0302", type: "2 BR", occ: "100%", nights: 31, adr: "Rp 950rb", revenue: 17000000, cost: 4100000, profit: 12900000 },
    { code: "A-0301", type: "2 BR", occ: "91%", nights: 28, adr: "Rp 950rb", revenue: 16800000, cost: 3900000, profit: 12900000 },
    { code: "A-0201", type: "2 BR", occ: "87%", nights: 27, adr: "Rp 950rb", revenue: 15400000, cost: 3700000, profit: 11700000 },
    { code: "A-0402", type: "1 BR", occ: "85%", nights: 26, adr: "Rp 650rb", revenue: 11500000, cost: 2800000, profit: 8700000 },
  ];

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        breadcrumb={[
          { label: "Skyline Residence", href: "/" },
          { label: "Analisis", href: "/laporan" },
          { label: "Laporan Bisnis" },
        ]}
        title="Laporan & Kinerja Operasional"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              icon={<Download className="h-4 w-4" />}
              onClick={() => toast.success("Ringkasan 1-halaman PDF diunduh")}
            >
              Export Summary PDF
            </Button>
            <Button
              variant="primary"
              icon={<FileText className="h-4 w-4" />}
              onClick={() => toast.info("Membuat laporan kustom")}
            >
              Buat Laporan
            </Button>
          </div>
        }
      />

      <Segmented
        value={tab}
        onChange={setTab}
        options={[
          { value: "ringkasan", label: "Overview Tahunan" },
          { value: "builder", label: "Report Builder" },
        ]}
      />

      {tab === "ringkasan" && (
        <div className="space-y-6">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <Card tone="ink" className="flex flex-col justify-between">
              <CardHeader
                icon={<DollarSign className="h-4 w-4" />}
                title="Pendapatan YTD"
              />
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-3xl font-semibold tracking-tight tabular">
                  Rp 1,72 M
                </span>
                <Sparkline data={[110, 125, 165, 180, 220, 211, 221]} color="currentColor" />
              </div>
              <div className="mt-3 text-xs opacity-75">Tahun berjalan (2026)</div>
            </Card>

            <Card tone="blue" className="flex flex-col justify-between">
              <CardHeader
                icon={<Building2 className="h-4 w-4" />}
                title="Malam Terjual"
              />
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-3xl font-semibold tracking-tight tabular">
                  1.842
                </span>
                <Sparkline data={[140, 155, 170, 185, 210, 205, 218]} color="var(--blue)" />
              </div>
              <div className="mt-3 text-xs">Malam hunian tamu</div>
            </Card>

            <Card tone="default" className="flex flex-col justify-between">
              <CardHeader
                icon={<TrendingUp className="h-4 w-4" />}
                title="Margin Laba Bersih"
              />
              <div className="mt-1">
                <span className="text-3xl font-semibold tracking-tight text-[var(--ink)] tabular">
                  71.8%
                </span>
              </div>
              <div className="mt-3 text-xs text-[var(--green)]">+4.2 pts vs tahun lalu</div>
            </Card>

            <Card tone="default" className="flex flex-col justify-between">
              <CardHeader
                icon={<Building2 className="h-4 w-4" />}
                title="Rata-rata Okupansi"
              />
              <div className="mt-1">
                <span className="text-3xl font-semibold tracking-tight text-[var(--ink)] tabular">
                  88.4%
                </span>
              </div>
              <div className="mt-3 text-xs text-[var(--muted)]">Target 85% terlampaui</div>
            </Card>
          </div>

          {/* Area Chart & Gauge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <Card className="lg:col-span-8 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-[var(--ink)]">
                    Perjalanan Pendapatan Bulanan
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Tren akumulasi performa tahun 2026
                  </p>
                </div>
              </div>
              <AreaChart data={areaData} height={260} />
            </Card>

            <Card className="lg:col-span-4 flex flex-col justify-between items-center text-center">
              <CardHeader
                icon={<Building2 className="h-4 w-4" />}
                title="Pencapaian Target Okupansi"
                className="w-full"
              />
              <div className="py-2">
                <Gauge value={91} target={85} average={88.4} label="YTD 2026" />
              </div>
            </Card>
          </div>

          {/* Table Kinerja Unit */}
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-[var(--line)]">
              <h3 className="font-semibold text-sm text-[var(--ink)]">
                Peringkat Kinerja Unit Terbaik (Top Performer)
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unit</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Okupansi</TableHead>
                  <TableHead>Malam Terjual</TableHead>
                  <TableHead>ADR</TableHead>
                  <TableHead>Pendapatan</TableHead>
                  <TableHead>Biaya</TableHead>
                  <TableHead align="right">Laba Bersih</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unitPerformances.map((u) => (
                  <TableRow key={u.code}>
                    <TableCell className="font-semibold text-[var(--blue)]">
                      {u.code}
                    </TableCell>
                    <TableCell>{u.type}</TableCell>
                    <TableCell className="font-medium text-[var(--green)]">
                      {u.occ}
                    </TableCell>
                    <TableCell className="tabular">{u.nights} mlm</TableCell>
                    <TableCell className="tabular">{u.adr}</TableCell>
                    <TableCell className="tabular font-medium">
                      {formatRupiahCompact(u.revenue)}
                    </TableCell>
                    <TableCell className="tabular text-[var(--muted)]">
                      {formatRupiahCompact(u.cost)}
                    </TableCell>
                    <TableCell align="right" className="font-bold text-[var(--green)] tabular">
                      {formatRupiahCompact(u.profit)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}

      {tab === "builder" && (
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-semibold text-[var(--ink)]">
            Pembuat Laporan Kustom
          </h3>
          <p className="text-xs text-[var(--muted)]">
            Pilih metrik, rentang tanggal, dan format ekspor yang diinginkan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-[var(--muted)] mb-1">
                Jenis Laporan
              </label>
              <select className="w-full h-11 px-3.5 rounded-[14px] bg-[var(--surface-solid)] border border-[var(--line)] text-sm text-[var(--ink)] outline-none">
                <option>Pendapatan per Unit</option>
                <option>Okupansi & Hunian</option>
                <option>Aging Piutang Tamu</option>
                <option>Laba Rugi Operasional</option>
                <option>Pajak & Retribusi</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--muted)] mb-1">
                Rentang Periode
              </label>
              <select className="w-full h-11 px-3.5 rounded-[14px] bg-[var(--surface-solid)] border border-[var(--line)] text-sm text-[var(--ink)] outline-none">
                <option>Bulan Ini (Oktober 2026)</option>
                <option>Bulan Lalu (September 2026)</option>
                <option>Kuartal 3 (Jul–Sep 2026)</option>
                <option>Year to Date (2026)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--muted)] mb-1">
                Format Ekspor
              </label>
              <select className="w-full h-11 px-3.5 rounded-[14px] bg-[var(--surface-solid)] border border-[var(--line)] text-sm text-[var(--ink)] outline-none">
                <option>PDF (Dokumen Resmi Cetak)</option>
                <option>Excel / XLSX</option>
                <option>CSV Data Mentah</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <Button
              variant="primary"
              icon={<Download className="h-4 w-4" />}
              onClick={() => toast.success("Laporan sedang di-generate...")}
            >
              Generate & Unduh Laporan
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
