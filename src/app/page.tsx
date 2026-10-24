"use client";

import * as React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shell/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Button, IconButton } from "@/components/ui/button";
import { Chip, DeltaChip } from "@/components/ui/chip";
import { AreaChart } from "@/components/charts/area-chart";
import { Gauge } from "@/components/charts/gauge";
import { CashBars } from "@/components/charts/cash-bars";
import { StackedBar } from "@/components/charts/stacked-bar";
import { Sparkline } from "@/components/charts/sparkline";
import { DayTimeline, type TimelineEvent } from "@/components/charts/day-timeline";
import {
  DollarSign,
  Building2,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  AlertTriangle,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {

  // Sample data matching video frames exactly
  const sparklineRevenue = [65, 70, 68, 75, 80, 78, 85, 93];
  const sparklineOccupancy = [58, 62, 60, 68, 72, 70, 75, 78];

  const cashData = [
    { date: "11 Okt", inflow: 12000000, outflow: 3500000 },
    { date: "12 Okt", inflow: 18500000, outflow: 4200000 },
    { date: "13 Okt", inflow: 9000000, outflow: 8900000 },
    { date: "14 Okt", inflow: 24000000, outflow: 2100000 },
    { date: "15 Okt", inflow: 15000000, outflow: 5600000 },
    { date: "16 Okt", inflow: 31000000, outflow: 7800000 },
    { date: "17 Okt", inflow: 22000000, outflow: 3100000 },
    { date: "18 Okt", inflow: 19500000, outflow: 9400000 },
    { date: "19 Okt", inflow: 14000000, outflow: 2000000 },
    { date: "20 Okt", inflow: 28000000, outflow: 6100000 },
    { date: "21 Okt", inflow: 16500000, outflow: 4500000 },
    { date: "22 Okt", inflow: 35000000, outflow: 8200000 },
    { date: "23 Okt", inflow: 29000000, outflow: 5000000 },
    { date: "24 Okt", inflow: 42000000, outflow: 3200000, isToday: true },
  ];

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

  const timelineEvents: TimelineEvent[] = [
    { id: "e1", time: "08:30", title: "Check-out Unit A-0302 (Rina Melati)", type: "checkout" },
    { id: "e2", time: "11:00", title: "Turnover Bersih Unit A-0803", type: "task" },
    { id: "e3", time: "14:00", title: "Check-in Unit A-0404 (Bambang S.)", type: "checkin" },
    { id: "e4", time: "16:30", title: "Tamu Tiba Unit A-0204", type: "inbound" },
    { id: "e5", time: "19:00", title: "Check-in Unit B-0105 (David K.)", type: "checkin" },
  ];

  const stackedSegments = [
    { label: "Sewa Bulanan", amount: 135000000, color: "var(--blue)" },
    { label: "Sewa Harian", amount: 62000000, color: "var(--green)" },
    { label: "Sewa Mingguan", amount: 18500000, color: "var(--amber)" },
    { label: "Biaya Utilitas & Lain", amount: 6053000, color: "var(--orange)" },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <PageHeader
        breadcrumb={[
          { label: "Skyline Residence", href: "/" },
          { label: "Operasional" },
          { label: "Dashboard" },
        ]}
        title="Dashboard"
        actions={
          <div className="flex items-center gap-2">
            <Link href="/booking">
              <Button variant="secondary" size="md">
                Lihat Kalender
              </Button>
            </Link>
            <Link href="/design">
              <Button
                variant="primary"
                size="md"
                icon={<Plus className="h-4 w-4 stroke-[2.5]" />}
              >
                + Booking Baru
              </Button>
            </Link>
          </div>
        }
      />

      {/* Row 1: Hero Sapaan (8 kol) + Kas Tersedia (4 kol) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Hero Card Sapaan */}
        <Card className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--orange)] mb-1">
              SABTU, 24 OKTOBER 2026
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--ink)] mb-2">
              Selamat siang, Noor.
            </h2>
            <p className="text-sm text-[var(--ink-2)] max-w-xl">
              Hari ini ada <strong className="text-[var(--ink)]">3 check-in</strong>,{" "}
              <strong className="text-[var(--ink)]">2 check-out</strong> dan{" "}
              <span className="text-[var(--red)] font-semibold underline underline-offset-2 cursor-pointer">
                1 invoice lewat jatuh tempo
              </span>{" "}
              yang perlu ditindaklanjuti.
            </p>
          </div>

          <div className="my-2">
            <DayTimeline events={timelineEvents} currentTime="14:37" />
          </div>

          <div className="flex items-center gap-2.5 pt-3 border-t border-[var(--line)]">
            <Button
              variant="primary"
              size="sm"
              icon={<Calendar className="h-3.5 w-3.5" />}
              onClick={() => toast.info("Membuka agenda jadwal hari ini")}
            >
              Buka Jadwal
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Filter pipeline")}
            >
              Pipeline
            </Button>
          </div>
        </Card>

        {/* Cash On Hand Card */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <CardHeader
            icon={<DollarSign className="h-4 w-4" />}
            title="Kas Tersedia"
            action={
              <Link href="/keuangan">
                <Button variant="ghost" size="sm">
                  Pembayaran ›
                </Button>
              </Link>
            }
          />
          <div>
            <div className="text-3xl font-semibold text-[var(--ink)] tracking-tight tabular">
              Rp 221.553.000
            </div>
            <div className="mt-1">
              <DeltaChip
                value="Rp 49,4 jt"
                direction="up"
                suffix="dalam 14 hari"
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--line)]">
            <CashBars data={cashData} height={80} />
          </div>
        </Card>
      </div>

      {/* Row 2: 4 Kartu KPI (§8.4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* KPI #1: Ink (Black in light mode, Inverts to White in dark mode) */}
        <Card tone="ink" className="flex flex-col justify-between">
          <CardHeader
            icon={<DollarSign className="h-4 w-4" />}
            title="Pendapatan Bulan Ini"
            action={
              <IconButton size="sm" variant="ghost" aria-label="Buka Laporan">
                <ArrowUpRight className="h-4 w-4" />
              </IconButton>
            }
          />
          <div className="mt-1 flex items-baseline justify-between gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular">
              Rp 93,4 jt
            </span>
            <Sparkline data={sparklineRevenue} color="currentColor" />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-inherit font-medium">
              Terbaik: Jun Rp 220jt
            </span>
            <span className="opacity-70">On-pace Rp 250jt</span>
          </div>
        </Card>

        {/* KPI #2: Pastel Blue (Light blue in light mode, Dark blue in dark mode) */}
        <Card tone="blue" className="flex flex-col justify-between">
          <CardHeader
            icon={<Building2 className="h-4 w-4" />}
            title="Okupansi Hari Ini"
            action={
              <IconButton size="sm" variant="ghost" aria-label="Buka Unit">
                <ArrowUpRight className="h-4 w-4" />
              </IconButton>
            }
          />
          <div className="mt-1 flex items-baseline justify-between gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular">
              78%
            </span>
            <Sparkline data={sparklineOccupancy} color="var(--blue)" />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <DeltaChip value="3 pts" direction="up" suffix="vs bln lalu" />
            <span className="text-inherit opacity-80">61 dari 78 unit</span>
          </div>
        </Card>

        {/* KPI #3: White Card (Piutang / Outstanding) */}
        <Card tone="default" className="flex flex-col justify-between">
          <CardHeader
            icon={<CreditCard className="h-4 w-4" />}
            title="Piutang Aktif"
            action={
              <IconButton size="sm" variant="default" aria-label="Buka Invoice">
                <ArrowUpRight className="h-4 w-4" />
              </IconButton>
            }
          />
          <div className="mt-1">
            <span className="text-3xl font-semibold tracking-tight text-[var(--ink)] tabular">
              Rp 12.000.000
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <Chip variant="red" dot>
              1 overdue
            </Chip>
            <span className="text-[var(--muted)]">Aging 0–7 hari</span>
          </div>
        </Card>

        {/* KPI #4: White Card (ADR - Average Daily Rate) */}
        <Card tone="default" className="flex flex-col justify-between">
          <CardHeader
            icon={<TrendingUp className="h-4 w-4" />}
            title="Rata-rata Tarif (ADR)"
            action={
              <IconButton size="sm" variant="default" aria-label="Buka ADR">
                <ArrowUpRight className="h-4 w-4" />
              </IconButton>
            }
          />
          <div className="mt-1">
            <span className="text-3xl font-semibold tracking-tight text-[var(--ink)] tabular">
              Rp 640.000
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <DeltaChip value="5%" direction="up" suffix="target" />
            <span className="text-[var(--muted)]">RevPAR Rp 499rb</span>
          </div>
        </Card>
      </div>

      {/* Row 3: Pendapatan vs Biaya Area Chart (8) + Okupansi Gauge (4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[var(--ink)]">
                Pendapatan vs Biaya Operasional
              </h3>
              <p className="text-xs text-[var(--muted)]">
                12 bulan kalender terakhir (Basis Accrual)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--blue)]" />
                Pendapatan
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--muted)]" />
                Biaya operasional
              </span>
            </div>
          </div>
          <AreaChart data={areaData} height={250} />
        </Card>

        <Card className="lg:col-span-4 flex flex-col justify-between items-center text-center">
          <CardHeader
            icon={<Building2 className="h-4 w-4" />}
            title="Tingkat Okupansi"
            className="w-full"
          />
          <div className="py-2">
            <Gauge value={91} target={92} average={88.4} label="Okupansi Oktober" />
          </div>
        </Card>
      </div>

      {/* Row 4: Pipeline Booking (4) + Perlu Perhatian (4) + Dari Mana Uang Berasal (4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Pipeline Booking (4 kol) */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <CardHeader
            icon={<Calendar className="h-4 w-4" />}
            title="Pipeline Booking"
            action={
              <Link href="/booking">
                <Button variant="ghost" size="sm">
                  Semua ›
                </Button>
              </Link>
            }
          />
          <div className="space-y-3 py-1">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-[var(--ink)]">Hold (Tahan)</span>
                <span className="text-[var(--muted)] tabular">3 unit · Rp 4,2 jt</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                <div className="h-full bg-[var(--amber)] rounded-full w-[25%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-[var(--ink)]">Terkonfirmasi</span>
                <span className="text-[var(--muted)] tabular">15 unit · Rp 38,5 jt</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                <div className="h-full bg-[var(--blue)] rounded-full w-[60%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-[var(--ink)]">Sedang Menginap</span>
                <span className="text-[var(--muted)] tabular">42 unit · Rp 168 jt</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                <div className="h-full bg-[var(--green)] rounded-full w-[85%]" />
              </div>
            </div>
          </div>
          <div className="pt-3 border-t border-[var(--line)] text-xs text-[var(--muted)]">
            Total nilai booking aktif: <strong className="text-[var(--ink)]">Rp 210,7 jt</strong>
          </div>
        </Card>

        {/* Perlu Perhatian (4 kol) */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <CardHeader
            icon={<AlertTriangle className="h-4 w-4 text-[var(--orange)]" />}
            title="Perlu Perhatian"
            action={<span className="text-xs font-bold text-[var(--orange)]">3 item</span>}
          />
          <div className="space-y-2.5 py-1">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-2)]/80 hover:bg-[var(--surface-2)] transition-colors">
              <div className="flex items-start gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[var(--red)] mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-medium text-[var(--ink)]">
                    Inv #0412 lewat 5 hari
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    Andi Pratama · Rp 3.430.000
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success("Pesan WhatsApp siap dikirim")}
              >
                Kirim
              </Button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-2)]/80 hover:bg-[var(--surface-2)] transition-colors">
              <div className="flex items-start gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[var(--orange)] mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-medium text-[var(--ink)]">
                    A-0807 belum dibersihkan
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    Check-out 4 jam lalu · Tiba 16:00
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.info("Menghubungi housekeeping")}
              >
                Buka
              </Button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-2)]/80 hover:bg-[var(--surface-2)] transition-colors">
              <div className="flex items-start gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[var(--amber)] mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-medium text-[var(--ink)]">
                    Hold B-0302 habis 2 jam lagi
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    Belum ada DP diterima
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.info("Detail booking hold")}
              >
                Lihat
              </Button>
            </div>
          </div>
          <div className="pt-3 border-t border-[var(--line)] text-xs text-[var(--muted)]">
            Semua alert operasional disinkron otomatis
          </div>
        </Card>

        {/* Dari Mana Uang Berasal (4 kol) */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <CardHeader
            icon={<TrendingUp className="h-4 w-4" />}
            title="Dari Mana Uang Berasal"
            subtitle="Komposisi pendapatan bulan berjalan"
          />
          <div className="py-2">
            <StackedBar segments={stackedSegments} height={14} />
          </div>
          <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--muted)]">
            <span>61% berasal dari sewa bulanan</span>
            <Link href="/laporan" className="text-[var(--blue)] font-medium hover:underline">
              Analisis ›
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
