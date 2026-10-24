"use client";

import * as React from "react";
import { PageHeader } from "@/components/shell/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Segmented } from "@/components/ui/segmented";
import { SubChips } from "@/components/ui/subchips";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { UnitGrid, type UnitTileData } from "@/components/charts/unit-grid";
import { Sheet } from "@/components/ui/sheet";
import { formatRupiahCompact } from "@/lib/money";
import {
  Plus,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

export default function UnitPage() {
  const [activeTab, setActiveTab] = React.useState<"peta" | "daftar" | "housekeeping">("peta");
  const [filterType, setFilterType] = React.useState("semua");
  const [selectedUnit, setSelectedUnit] = React.useState<UnitTileData | null>(null);

  // Tower A mock units (Executive tower, 4 floors)
  const unitsTowerA: UnitTileData[] = [
    { id: "a401", code: "A-0401", floor: 4, type: "2 BR", status: "OCCUPIED", revenueThisMonth: 17000000, guestName: "Hendra Wijaya" },
    { id: "a402", code: "A-0402", floor: 4, type: "1 BR", status: "OCCUPIED", revenueThisMonth: 11500000, guestName: "Jessica Lee" },
    { id: "a403", code: "A-0403", floor: 4, type: "Studio", status: "VACANT", revenueThisMonth: 6500000 },
    { id: "a404", code: "A-0404", floor: 4, type: "Studio", status: "ARRIVING", revenueThisMonth: 8200000, guestName: "Bambang S." },
    { id: "a301", code: "A-0301", floor: 3, type: "2 BR", status: "OCCUPIED", revenueThisMonth: 16800000, guestName: "Rudi Hartono" },
    { id: "a302", code: "A-0302", floor: 3, type: "1 BR", status: "CLEANING", revenueThisMonth: 9500000 },
    { id: "a303", code: "A-0303", floor: 3, type: "Studio", status: "OCCUPIED", revenueThisMonth: 8000000, guestName: "Maya Sari" },
    { id: "a304", code: "A-0304", floor: 3, type: "Studio", status: "BLOCKED", revenueThisMonth: 0 },
    { id: "a201", code: "A-0201", floor: 2, type: "2 BR", status: "OCCUPIED", revenueThisMonth: 15400000, guestName: "Andi Pratama" },
    { id: "a202", code: "A-0202", floor: 2, type: "1 BR", status: "VACANT", revenueThisMonth: 7200000 },
    { id: "a203", code: "A-0203", floor: 2, type: "Studio", status: "OCCUPIED", revenueThisMonth: 8100000, guestName: "Dewi Lestari" },
    { id: "a204", code: "A-0204", floor: 2, type: "Studio", status: "ARRIVING", revenueThisMonth: 7500000, guestName: "Tony Stark" },
  ];

  // Tower B mock units (Sky tower, 3 floors)
  const unitsTowerB: UnitTileData[] = [
    { id: "b301", code: "B-0301", floor: 3, type: "2 BR", status: "VACANT", revenueThisMonth: 9000000 },
    { id: "b302", code: "B-0302", floor: 3, type: "2 BR", status: "OCCUPIED", revenueThisMonth: 17000000, guestName: "Rina Melati" },
    { id: "b303", code: "B-0303", floor: 3, type: "1 BR", status: "OCCUPIED", revenueThisMonth: 11000000, guestName: "Siti Rahma" },
    { id: "b304", code: "B-0304", floor: 3, type: "Studio", status: "CLEANING", revenueThisMonth: 6000000 },
    { id: "b201", code: "B-0201", floor: 2, type: "1 BR", status: "OCCUPIED", revenueThisMonth: 10500000, guestName: "Michael Chang" },
    { id: "b202", code: "B-0202", floor: 2, type: "Studio", status: "OCCUPIED", revenueThisMonth: 7800000, guestName: "Agus Salim" },
    { id: "b203", code: "B-0203", floor: 2, type: "Studio", status: "VACANT", revenueThisMonth: 5500000 },
    { id: "b204", code: "B-0204", floor: 2, type: "2 BR", status: "BLOCKED", revenueThisMonth: 0 },
    { id: "b101", code: "B-0101", floor: 1, type: "Studio", status: "OCCUPIED", revenueThisMonth: 7900000, guestName: "Linda K." },
    { id: "b102", code: "B-0102", floor: 1, type: "Studio", status: "VACANT", revenueThisMonth: 4200000 },
    { id: "b103", code: "B-0103", floor: 1, type: "1 BR", status: "OCCUPIED", revenueThisMonth: 11200000, guestName: "Fajar Nugraha" },
    { id: "b104", code: "B-0104", floor: 1, type: "Studio", status: "ARRIVING", revenueThisMonth: 8100000, guestName: "Wahyu P." },
  ];

  // Housekeeping task cards
  const hkTasks = [
    { id: "hk-1", unit: "A-0302", type: "1 BR", due: "Tiba 14:00", urgent: true, notes: "Ganti linen & pasang wewangian lavender" },
    { id: "hk-2", unit: "B-0304", type: "Studio", due: "Tiba 16:30", urgent: false, notes: "Cek filter AC" },
    { id: "hk-3", unit: "A-0807", type: "2 BR", due: "Turnover harian", urgent: false, notes: "Pembersihan rutin setelah check-out" },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <PageHeader
        breadcrumb={[
          { label: "Skyline Residence", href: "/" },
          { label: "Unit & Properti", href: "/unit" },
          { label: "Peta Gedung" },
        ]}
        title="Peta Unit & Gedung"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              icon={<ShieldAlert className="h-4 w-4" />}
              onClick={() => toast.info("Fitur blokir unit untuk maintenance")}
            >
              Blokir Unit
            </Button>
            <Button
              variant="primary"
              icon={<Plus className="h-4 w-4 stroke-[2.5]" />}
              onClick={() => toast.success("Form tambah unit baru")}
            >
              + Unit Baru
            </Button>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Segmented
          value={activeTab}
          onChange={setActiveTab}
          options={[
            { value: "peta", label: "Peta Gedung (Bins)" },
            { value: "daftar", label: "Daftar Tarif & Unit" },
            { value: "housekeeping", label: "Housekeeping Kanban" },
          ]}
        />

        <SubChips
          value={filterType}
          onChange={setFilterType}
          items={[
            { value: "semua", label: "Semua Tipe" },
            { value: "studio", label: "Studio" },
            { value: "1br", label: "1 BR" },
            { value: "2br", label: "2 BR" },
          ]}
        />
      </div>

      {/* Tab 1: Peta Gedung (§9.4.1 ala Warehouses) */}
      {activeTab === "peta" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UnitGrid
            buildingCode="TWA"
            buildingName="Tower A — Apartemen Eksekutif"
            accentColor="var(--blue)"
            units={unitsTowerA}
            onUnitClick={(u) => setSelectedUnit(u)}
          />

          <UnitGrid
            buildingCode="TWB"
            buildingName="Tower B — Sky Residence"
            accentColor="var(--orange)"
            units={unitsTowerB}
            onUnitClick={(u) => setSelectedUnit(u)}
          />
        </div>
      )}

      {/* Tab 2: Daftar Unit */}
      {activeTab === "daftar" && (
        <Card className="p-0 overflow-hidden">
          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Unit</TableHead>
                  <TableHead>Gedung & Lantai</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Tarif Harian</TableHead>
                  <TableHead>Tarif Mingguan</TableHead>
                  <TableHead>Tarif Bulanan</TableHead>
                  <TableHead>Status Operasional</TableHead>
                  <TableHead align="right">Omset Bln Ini</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...unitsTowerA, ...unitsTowerB].map((u) => (
                  <TableRow
                    key={u.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedUnit(u)}
                  >
                    <TableCell className="font-semibold text-[var(--blue)]">
                      {u.code}
                    </TableCell>
                    <TableCell>
                      {u.code.startsWith("A") ? "Tower A" : "Tower B"} · Lantai {u.floor}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{u.type}</span>
                    </TableCell>
                    <TableCell className="tabular">
                      {u.type === "Studio" && "Rp 450.000"}
                      {u.type === "1 BR" && "Rp 650.000"}
                      {u.type === "2 BR" && "Rp 950.000"}
                    </TableCell>
                    <TableCell className="tabular">
                      {u.type === "Studio" && "Rp 2.600.000"}
                      {u.type === "1 BR" && "Rp 3.900.000"}
                      {u.type === "2 BR" && "Rp 5.600.000"}
                    </TableCell>
                    <TableCell className="tabular">
                      {u.type === "Studio" && "Rp 8.000.000"}
                      {u.type === "1 BR" && "Rp 11.500.000"}
                      {u.type === "2 BR" && "Rp 17.000.000"}
                    </TableCell>
                    <TableCell>
                      {u.status === "OCCUPIED" && <Chip variant="blue" dot>Terisi</Chip>}
                      {u.status === "VACANT" && <Chip variant="default" dot>Kosong</Chip>}
                      {u.status === "ARRIVING" && <Chip variant="amber" dot>Tiba Hari Ini</Chip>}
                      {u.status === "CLEANING" && <Chip variant="orange" dot>Dibersihkan</Chip>}
                      {u.status === "BLOCKED" && <Chip variant="red" dot>Diblokir</Chip>}
                    </TableCell>
                    <TableCell align="right" className="font-semibold tabular">
                      {formatRupiahCompact(u.revenueThisMonth || 0)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card List (visible on mobile only) */}
          <div className="divide-y divide-[var(--line)] md:hidden">
            {[...unitsTowerA, ...unitsTowerB].map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedUnit(u)}
                className="p-4 space-y-2 active:bg-[var(--surface-2)] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-base text-[var(--blue)]">
                      {u.code}
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      {u.code.startsWith("A") ? "Tower A" : "Tower B"} · Lantai {u.floor} · {u.type}
                    </div>
                  </div>
                  <div>
                    {u.status === "OCCUPIED" && <Chip variant="blue" size="sm" dot>Terisi</Chip>}
                    {u.status === "VACANT" && <Chip variant="default" size="sm" dot>Kosong</Chip>}
                    {u.status === "ARRIVING" && <Chip variant="amber" size="sm" dot>Tiba Hari Ini</Chip>}
                    {u.status === "CLEANING" && <Chip variant="orange" size="sm" dot>Dibersihkan</Chip>}
                    {u.status === "BLOCKED" && <Chip variant="red" size="sm" dot>Diblokir</Chip>}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 text-[var(--ink-2)]">
                  <span>
                    Harian:{" "}
                    <strong className="text-[var(--ink)] tabular">
                      {u.type === "Studio" && "Rp 450rb"}
                      {u.type === "1 BR" && "Rp 650rb"}
                      {u.type === "2 BR" && "Rp 950rb"}
                    </strong>
                  </span>
                  <span>
                    Bulanan:{" "}
                    <strong className="text-[var(--ink)] tabular">
                      {u.type === "Studio" && "Rp 8 jt"}
                      {u.type === "1 BR" && "Rp 11,5 jt"}
                      {u.type === "2 BR" && "Rp 17 jt"}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-xs">
                  <span className="text-[var(--muted)]">Omset bulan ini:</span>
                  <span className="font-bold text-[var(--ink)] tabular">
                    {formatRupiahCompact(u.revenueThisMonth || 0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 3: Housekeeping Kanban (§9.4.3) */}
      {activeTab === "housekeeping" && (
        <div className="flex overflow-x-auto snap-x gap-4 pb-4 md:grid md:grid-cols-4 md:overflow-visible">
          {/* Kolom 1: Kotor */}
          <Card className="space-y-3 bg-[var(--surface)] min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <span className="text-xs font-semibold uppercase text-[var(--orange)]">
                Kotor (Perlu Dibersihkan)
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--orange-soft)] text-[var(--orange)]">
                {hkTasks.length}
              </span>
            </div>
            {hkTasks.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-2xl bg-[var(--surface-solid)] border border-[var(--line)] shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[var(--ink)]">
                    {t.unit}
                  </span>
                  {t.urgent ? (
                    <Chip variant="red" size="sm" dot>
                      {t.due}
                    </Chip>
                  ) : (
                    <span className="text-[11px] text-[var(--muted)]">{t.due}</span>
                  )}
                </div>
                <p className="text-xs text-[var(--muted)]">{t.notes}</p>
                <div className="pt-2 border-t border-[var(--line)] flex justify-end">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => toast.success(`Mulai tugas di unit ${t.unit}`)}
                  >
                    Mulai Bersihkan
                  </Button>
                </div>
              </div>
            ))}
          </Card>

          {/* Kolom 2: Dikerjakan */}
          <Card className="space-y-3 bg-[var(--surface)] min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <span className="text-xs font-semibold uppercase text-[var(--blue)]">
                Sedang Dikerjakan
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--blue-soft)] text-[var(--blue)]">
                1
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--surface-solid)] border border-[var(--line)] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[var(--ink)]">A-0301</span>
                <span className="text-[11px] text-[var(--blue)]">Mulai 11:15</span>
              </div>
              <p className="text-xs text-[var(--muted)]">Petugas: Budi Santoso</p>
              <div className="pt-2 border-t border-[var(--line)] flex justify-end">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => toast.success("Ditandai selesai dikerjakan")}
                >
                  Tandai Selesai
                </Button>
              </div>
            </div>
          </Card>

          {/* Kolom 3: Perlu Cek / Inspeksi */}
          <Card className="space-y-3 bg-[var(--surface)] min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <span className="text-xs font-semibold uppercase text-[var(--amber)]">
                Perlu Cek (Inspeksi)
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--amber-soft)] text-[var(--amber)]">
                1
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--surface-solid)] border border-[var(--line)] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[var(--ink)]">B-0105</span>
                <Chip variant="amber" size="sm">Siap Inspeksi</Chip>
              </div>
              <p className="text-xs text-[var(--muted)]">Checklist fasilitas pendingin & air</p>
              <div className="pt-2 border-t border-[var(--line)] flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.success("Inspeksi unit lulus")}
                >
                  Lolos Inspeksi
                </Button>
              </div>
            </div>
          </Card>

          {/* Kolom 4: Bersih (Siap Huni) */}
          <Card className="space-y-3 bg-[var(--surface)] min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <span className="text-xs font-semibold uppercase text-[var(--green)]">
                Bersih & Siap Huni
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--green-soft)] text-[var(--green)]">
                18
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--surface-solid)] border border-[var(--line)] shadow-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[var(--ink)]">A-0403</span>
                <span className="text-xs text-[var(--green)]">100% OK</span>
              </div>
              <p className="text-xs text-[var(--muted)]">Studio · Siap terima tamu baru</p>
            </div>
          </Card>
        </div>
      )}

      {/* Unit Detail Sheet */}
      <Sheet
        open={Boolean(selectedUnit)}
        onClose={() => setSelectedUnit(null)}
        title={selectedUnit ? `Unit ${selectedUnit.code}` : "Detail Unit"}
        subtitle={selectedUnit ? `${selectedUnit.type} · Lantai ${selectedUnit.floor}` : ""}
        footer={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setSelectedUnit(null)}
          >
            Tutup
          </Button>
        }
      >
        {selectedUnit && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[var(--surface-2)] space-y-2">
              <div className="text-xs font-semibold uppercase text-[var(--muted)]">
                Status Saat Ini
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[var(--ink)]">
                  {selectedUnit.status}
                </span>
                {selectedUnit.guestName && (
                  <span className="text-xs text-[var(--blue)]">
                    · Dihuni: {selectedUnit.guestName}
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-[var(--line)] space-y-2">
              <div className="text-xs font-semibold uppercase text-[var(--muted)]">
                Akumulasi Pendapatan
              </div>
              <div className="text-2xl font-bold text-[var(--ink)] tabular">
                {formatRupiahCompact(selectedUnit.revenueThisMonth || 0)}
              </div>
              <p className="text-xs text-[var(--muted)]">Omset bulan berjalan</p>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
