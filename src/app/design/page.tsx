"use client";

import * as React from "react";
import { PageHeader } from "@/components/shell/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Button, IconButton } from "@/components/ui/button";
import { Chip, DeltaChip, NavBadge } from "@/components/ui/chip";
import { Segmented } from "@/components/ui/segmented";
import { SubChips } from "@/components/ui/subchips";
import { Input, Select } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Sheet } from "@/components/ui/sheet";
import { Sparkline } from "@/components/charts/sparkline";
import { Gauge } from "@/components/charts/gauge";
import { CashBars } from "@/components/charts/cash-bars";
import { AreaChart } from "@/components/charts/area-chart";
import { StackedBar } from "@/components/charts/stacked-bar";
import { UnitGrid, type UnitTileData } from "@/components/charts/unit-grid";
import { DayTimeline, type TimelineEvent } from "@/components/charts/day-timeline";
import {
  Calendar,
  Building2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Plus,
  ArrowUpRight,
  Filter,
  Download,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function DesignSystemGalleryPage() {
  const [segmentedVal, setSegmentedVal] = React.useState("semua");
  const [subChipVal, setSubChipVal] = React.useState("harian");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // Sample data for charts
  const sparklineData = [45, 52, 49, 62, 58, 71, 68, 85, 92];
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

  const stackedSegments = [
    { label: "Sewa Bulanan", amount: 135000000, color: "var(--blue)" },
    { label: "Sewa Harian", amount: 62000000, color: "var(--green)" },
    { label: "Sewa Mingguan", amount: 18500000, color: "var(--amber)" },
    { label: "Biaya Utilitas & Lain", amount: 6053000, color: "var(--orange)" },
  ];

  const mockUnitsTowerA: UnitTileData[] = [
    // Lantai 4
    { id: "u401", code: "A-0401", floor: 4, type: "2 BR", status: "OCCUPIED", revenueThisMonth: 17000000, guestName: "Hendra Wijaya" },
    { id: "u402", code: "A-0402", floor: 4, type: "1 BR", status: "OCCUPIED", revenueThisMonth: 11500000, guestName: "Jessica Lee" },
    { id: "u403", code: "A-0403", floor: 4, type: "Studio", status: "VACANT", revenueThisMonth: 6500000 },
    { id: "u404", code: "A-0404", floor: 4, type: "Studio", status: "ARRIVING", revenueThisMonth: 8200000, guestName: "Bambang S." },
    // Lantai 3
    { id: "u301", code: "A-0301", floor: 3, type: "2 BR", status: "OCCUPIED", revenueThisMonth: 16800000, guestName: "Rudi Hartono" },
    { id: "u302", code: "A-0302", floor: 3, type: "1 BR", status: "CLEANING", revenueThisMonth: 9500000 },
    { id: "u303", code: "A-0303", floor: 3, type: "Studio", status: "OCCUPIED", revenueThisMonth: 8000000, guestName: "Maya Sari" },
    { id: "u304", code: "A-0304", floor: 3, type: "Studio", status: "BLOCKED", revenueThisMonth: 0 },
    // Lantai 2
    { id: "u201", code: "A-0201", floor: 2, type: "2 BR", status: "OCCUPIED", revenueThisMonth: 15400000, guestName: "Andi Pratama" },
    { id: "u202", code: "A-0202", floor: 2, type: "1 BR", status: "VACANT", revenueThisMonth: 7200000 },
    { id: "u203", code: "A-0203", floor: 2, type: "Studio", status: "OCCUPIED", revenueThisMonth: 8100000, guestName: "Dewi Lestari" },
    { id: "u204", code: "A-0204", floor: 2, type: "Studio", status: "ARRIVING", revenueThisMonth: 7500000, guestName: "Tony Stark" },
  ];

  const timelineEvents: TimelineEvent[] = [
    { id: "e1", time: "08:30", title: "Check-out Unit A-0302 (Rina Melati)", type: "checkout" },
    { id: "e2", time: "11:00", title: "Housekeeping Mulai Turnover", type: "task" },
    { id: "e3", time: "14:00", title: "Check-in Unit A-0404 (Bambang S.)", type: "checkin" },
    { id: "e4", time: "16:30", title: "Tiba dari Bandara Unit A-0204", type: "inbound" },
    { id: "e5", time: "19:00", title: "Check-in Unit B-0105 (David K.)", type: "checkin" },
  ];

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        breadcrumb={[
          { label: "Skyline Residence", href: "/" },
          { label: "Design System", href: "/design" },
          { label: "Komponen & Primitives" },
        ]}
        title="Galeri Design System (Cadra ERP Style)"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              icon={<Download className="h-4 w-4" />}
              onClick={() => toast.success("Spesifikasi diekspor ke clipboard")}
            >
              Export
            </Button>
            <Button
              variant="primary"
              icon={<Plus className="h-4 w-4 stroke-[2.5]" />}
              onClick={() => setSheetOpen(true)}
            >
              Buka Panel
            </Button>
          </div>
        }
      />

      {/* 1. Baris 4 Kartu KPI (§8.4) */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
          1. Baris 4 Kartu KPI (Inversi Kontras di Mode Gelap)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* Card #1: Ink (Hero Hitam di Light Mode, Putih di Dark Mode) */}
          <Card tone="ink" className="flex flex-col justify-between">
            <CardHeader
              icon={<DollarSign className="h-4 w-4" />}
              title="Pendapatan Bulan Ini"
              action={
                <IconButton size="sm" variant="ghost" aria-label="Detail">
                  <ArrowUpRight className="h-4 w-4" />
                </IconButton>
              }
            />
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <span className="text-3xl font-semibold tracking-tight tabular">
                Rp 221,6 jt
              </span>
              <Sparkline data={sparklineData} color="currentColor" />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-inherit font-medium">
                Terbaik: Jun Rp 220jt
              </span>
              <span className="opacity-70">+14% vs Sept</span>
            </div>
          </Card>

          {/* Card #2: Pastel Blue (Biru Muda di Light Mode, Biru Gelap di Dark Mode) */}
          <Card tone="blue" className="flex flex-col justify-between">
            <CardHeader
              icon={<Building2 className="h-4 w-4" />}
              title="Okupansi Hari Ini"
              action={
                <IconButton size="sm" variant="ghost" aria-label="Detail">
                  <ArrowUpRight className="h-4 w-4" />
                </IconButton>
              }
            />
            <div className="mt-2 flex items-baseline justify-between gap-2">
              <span className="text-3xl font-semibold tracking-tight tabular">
                78%
              </span>
              <Sparkline data={[60, 65, 70, 68, 75, 78]} color="var(--blue)" />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <DeltaChip value="3 pts" direction="up" suffix="vs bln lalu" />
              <span className="text-inherit opacity-80">61 dari 78 unit</span>
            </div>
          </Card>

          {/* Card #3: White Card (Piutang / Outstanding) */}
          <Card tone="default" className="flex flex-col justify-between">
            <CardHeader
              icon={<CreditCard className="h-4 w-4" />}
              title="Piutang / Jatuh Tempo"
              action={
                <IconButton size="sm" variant="default" aria-label="Detail">
                  <ArrowUpRight className="h-4 w-4" />
                </IconButton>
              }
            />
            <div className="mt-2">
              <span className="text-3xl font-semibold tracking-tight text-[var(--ink)] tabular">
                Rp 12.450.000
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <Chip variant="red" dot>
                1 lewat jatuh tempo
              </Chip>
              <span className="text-[var(--muted)]">3 tagihan aktif</span>
            </div>
          </Card>

          {/* Card #4: White Card (ADR - Average Daily Rate) */}
          <Card tone="default" className="flex flex-col justify-between">
            <CardHeader
              icon={<TrendingUp className="h-4 w-4" />}
              title="Rata-rata Tarif (ADR)"
              action={
                <IconButton size="sm" variant="default" aria-label="Detail">
                  <ArrowUpRight className="h-4 w-4" />
                </IconButton>
              }
            />
            <div className="mt-2">
              <span className="text-3xl font-semibold tracking-tight text-[var(--ink)] tabular">
                Rp 640.000
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <DeltaChip value="5%" direction="up" suffix="target bln" />
              <span className="text-[var(--muted)]">RevPAR Rp 499rb</span>
            </div>
          </Card>
        </div>
      </section>

      {/* 2. Hero Card Timeline & Cash on Hand */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
          2. Hero Card & Cash On Hand (§9.2)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Hero Sapaan (8 kolom) */}
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
                yang perlu dikonfirmasi.
              </p>
            </div>

            {/* Interactive Day Timeline */}
            <div className="my-3">
              <DayTimeline events={timelineEvents} currentTime="14:37" />
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex items-center gap-2.5 pt-3 border-t border-[var(--line)]">
              <Button
                variant="primary"
                size="sm"
                icon={<Calendar className="h-3.5 w-3.5" />}
                onClick={() => toast.info("Membuka jadwal hari ini")}
              >
                Buka Jadwal
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<Filter className="h-3.5 w-3.5" />}
                onClick={() => toast.info("Filter pipeline aktif")}
              >
                Pipeline Booking
              </Button>
            </div>
          </Card>

          {/* Cash on Hand Card (4 kolom) */}
          <Card className="lg:col-span-4 flex flex-col justify-between">
            <CardHeader
              icon={<DollarSign className="h-4 w-4" />}
              title="Kas Tersedia"
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toast.info("Menuju tab Pembayaran")}
                >
                  Pembayaran ›
                </Button>
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
      </section>

      {/* 3. Area Chart Pendapatan & Gauge Okupansi */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
          3. Grafik Area 12 Bulan & Gauge Setengah Lingkaran
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Area Chart (8 kolom) */}
          <Card className="lg:col-span-8 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-[var(--ink)]">
                  Pendapatan vs Biaya Operasional
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  Performa 12 bulan terakhir (Accrual basis)
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
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
            <AreaChart data={areaData} height={250} />
          </Card>

          {/* Semi-circular Gauge (4 kolom) */}
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
      </section>

      {/* 4. Peta Gedung UnitGrid & Komposisi Pendapatan */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
          4. Peta Gedung (UnitGrid ala Warehouses) & Stacked Bar
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* UnitGrid Tower A (6 kolom) */}
          <div className="lg:col-span-6">
            <UnitGrid
              buildingCode="TWA"
              buildingName="Tower A — Apartemen Eksekutif"
              accentColor="var(--blue)"
              units={mockUnitsTowerA}
              onUnitClick={(u) => {
                toast.info(`Unit ${u.code} diklik (${u.type} · ${u.status})`);
              }}
            />
          </div>

          {/* Komposisi Pendapatan (6 kolom) */}
          <Card className="lg:col-span-6 flex flex-col justify-between">
            <CardHeader
              icon={<DollarSign className="h-4 w-4" />}
              title="Dari Mana Uang Berasal"
              subtitle="Komposisi pendapatan per kategori sewa"
            />
            <div className="py-4">
              <StackedBar segments={stackedSegments} height={16} />
            </div>
            <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--muted)]">
              <span>Total omset bulan ini: <strong>Rp 221.553.000</strong></span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.info("Buka rincian")}
              >
                Laporan Lengkap ›
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. Primitives: Buttons, Segmented, Inputs, Table */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
          5. Primitives UI (Tombol, Segmented, Form, & Tabel)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Segmented & SubChips */}
          <Card className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--ink)]">
              Segmented Control & SubChips
            </h3>
            <div className="space-y-3">
              <div>
                <Segmented
                  value={segmentedVal}
                  onChange={setSegmentedVal}
                  options={[
                    { value: "semua", label: "Semua Unit" },
                    { value: "terisi", label: "Terisi", badge: <NavBadge count={42} /> },
                    { value: "kosong", label: "Kosong", badge: <NavBadge count={17} /> },
                    { value: "kotor", label: "Dibersihkan" },
                  ]}
                />
              </div>

              <div>
                <SubChips
                  value={subChipVal}
                  onChange={setSubChipVal}
                  items={[
                    { value: "harian", label: "Harian" },
                    { value: "mingguan", label: "Mingguan" },
                    { value: "bulanan", label: "Bulanan" },
                  ]}
                />
              </div>
            </div>
          </Card>

          {/* Form Controls */}
          <Card className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--ink)]">
              Form Controls
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Nama Tamu"
                placeholder="cth. Andi Pratama"
                defaultValue="Andi Pratama"
              />
              <Select label="Tipe Unit" defaultValue="studio">
                <option value="studio">Studio (450rb/hari)</option>
                <option value="1br">1 BR (650rb/hari)</option>
                <option value="2br">2 BR (950rb/hari)</option>
              </Select>
            </div>
          </Card>
        </div>

        {/* Operational Table */}
        <Card className="overflow-hidden">
          <CardHeader
            title="Daftar Check-in & Check-out Hari Ini"
            subtitle="Pembaruan operasional real-time"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDialogOpen(true)}
              >
                Konfirmasi Modal
              </Button>
            }
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode Booking</TableHead>
                <TableHead>Tamu</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Status Bayar</TableHead>
                <TableHead align="right">Total</TableHead>
                <TableHead align="right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-[var(--blue)]">
                  BK-SKY-2610-0001
                </TableCell>
                <TableCell>
                  <div className="font-medium text-[var(--ink)]">Andi Pratama</div>
                  <div className="text-xs text-[var(--muted)]">+62 812-3456-7890</div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">A-0803</span> · Studio
                </TableCell>
                <TableCell>24 Okt → 31 Okt (7 mlm)</TableCell>
                <TableCell>
                  <Chip variant="green" dot>
                    Lunas
                  </Chip>
                </TableCell>
                <TableCell align="right" className="font-semibold">
                  Rp 4.930.000
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => toast.success("Membuka wizard check-in")}
                  >
                    Check-in
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-semibold text-[var(--blue)]">
                  BK-SKY-2610-0002
                </TableCell>
                <TableCell>
                  <div className="font-medium text-[var(--ink)]">Rina Melati</div>
                  <div className="text-xs text-[var(--muted)]">+62 813-9876-5432</div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">B-0302</span> · 2 BR
                </TableCell>
                <TableCell>01 Okt → 31 Okt (1 bln)</TableCell>
                <TableCell>
                  <Chip variant="amber" dot>
                    Sebagian
                  </Chip>
                </TableCell>
                <TableCell align="right" className="font-semibold">
                  Rp 17.000.000
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toast.info("Detail tagihan")}
                  >
                    Invoice
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* Modal Dialog Demo */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Konfirmasi Check-in Unit A-0803"
        description="Pastikan deposit dan bukti identitas tamu telah diverifikasi sebelum menyerahkan kunci."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<CheckCircle className="h-4 w-4" />}
              onClick={() => {
                setDialogOpen(false);
                toast.success("Check-in berhasil diselesaikan!");
              }}
            >
              Selesaikan Check-in
            </Button>
          </>
        }
      >
        <div className="space-y-3 py-2 text-sm text-[var(--ink-2)]">
          <div className="p-3 rounded-xl bg-[var(--surface-2)] flex items-center justify-between">
            <span>Deposit Keamanan:</span>
            <strong className="text-[var(--ink)]">Rp 1.000.000 (Diterima)</strong>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-2)] flex items-center justify-between">
            <span>Kunci & Kartu Akses:</span>
            <strong className="text-[var(--ink)]">2 Kunci + 1 Kartu</strong>
          </div>
        </div>
      </Dialog>

      {/* Side Panel Sheet Demo */}
      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Detail Cepat Unit A-0803"
        subtitle="Studio Eksekutif · Lantai 8 · Tower A"
        footer={
          <Button variant="primary" size="sm" onClick={() => setSheetOpen(false)}>
            Tutup Panel
          </Button>
        }
      >
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-2xl bg-[var(--surface-2)] space-y-2">
            <div className="text-xs text-[var(--muted)] font-semibold uppercase">
              Status Operasional
            </div>
            <div className="flex items-center gap-2">
              <Chip variant="green" dot>
                Siap Huni (Bersih)
              </Chip>
              <span className="text-xs text-[var(--muted)]">Dibersihkan 11:30</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-[var(--muted)] uppercase">
              Tarif Resmi
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)]">Harian</div>
                <div className="font-semibold text-[var(--ink)]">Rp 450rb</div>
              </div>
              <div className="p-2.5 rounded-xl border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)]">Mingguan</div>
                <div className="font-semibold text-[var(--ink)]">Rp 2,6jt</div>
              </div>
              <div className="p-2.5 rounded-xl border border-[var(--line)]">
                <div className="text-[11px] text-[var(--muted)]">Bulanan</div>
                <div className="font-semibold text-[var(--ink)]">Rp 8,0jt</div>
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
