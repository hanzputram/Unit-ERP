"use client";

import * as React from "react";
import { PageHeader } from "@/components/shell/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Segmented } from "@/components/ui/segmented";
import { SubChips } from "@/components/ui/subchips";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Sheet } from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import { formatRupiah } from "@/lib/money";
import {
  Search,
  Plus,
  Download,
  User,
  Phone,
  Mail,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";

interface BookingItem {
  id: string;
  code: string;
  guestName: string;
  phone: string;
  email: string;
  unitCode: string;
  unitType: string;
  building: string;
  rentalType: "DAILY" | "WEEKLY" | "MONTHLY";
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  paid: number;
  status: "CONFIRMED" | "CHECKED_IN" | "HOLD" | "CHECKED_OUT" | "CANCELLED";
  paymentStatus: "PAID" | "PARTIAL" | "UNPAID";
}

const MOCK_BOOKINGS: BookingItem[] = [
  {
    id: "bk-1",
    code: "BK-SKY-2610-0001",
    guestName: "Andi Pratama",
    phone: "+62 812-3456-7890",
    email: "andi.pratama@email.com",
    unitCode: "A-0803",
    unitType: "Studio",
    building: "Tower A",
    rentalType: "DAILY",
    checkIn: "24 Okt 2026",
    checkOut: "31 Okt 2026",
    nights: 7,
    total: 4930000,
    paid: 4930000,
    status: "CONFIRMED",
    paymentStatus: "PAID",
  },
  {
    id: "bk-2",
    code: "BK-SKY-2610-0002",
    guestName: "Rina Melati",
    phone: "+62 813-9876-5432",
    email: "rina.m@email.com",
    unitCode: "B-0302",
    unitType: "2 BR",
    building: "Tower B",
    rentalType: "MONTHLY",
    checkIn: "01 Okt 2026",
    checkOut: "31 Des 2026",
    nights: 91,
    total: 17000000,
    paid: 17000000,
    status: "CHECKED_IN",
    paymentStatus: "PAID",
  },
  {
    id: "bk-3",
    code: "BK-SKY-2610-0003",
    guestName: "Bambang Santoso",
    phone: "+62 811-2233-4455",
    email: "bambang.s@corp.co.id",
    unitCode: "A-0404",
    unitType: "Studio",
    building: "Tower A",
    rentalType: "DAILY",
    checkIn: "24 Okt 2026",
    checkOut: "27 Okt 2026",
    nights: 3,
    total: 1350000,
    paid: 500000,
    status: "CONFIRMED",
    paymentStatus: "PARTIAL",
  },
  {
    id: "bk-4",
    code: "BK-SKY-2610-0004",
    guestName: "Jessica Lee",
    phone: "+62 817-6655-4433",
    email: "jessica.lee@gmail.com",
    unitCode: "A-0402",
    unitType: "1 BR",
    building: "Tower A",
    rentalType: "WEEKLY",
    checkIn: "20 Okt 2026",
    checkOut: "27 Okt 2026",
    nights: 7,
    total: 3900000,
    paid: 3900000,
    status: "CHECKED_IN",
    paymentStatus: "PAID",
  },
  {
    id: "bk-5",
    code: "BK-SKY-2610-0005",
    guestName: "David Kusuma",
    phone: "+62 819-0011-2233",
    email: "david.k@yahoo.com",
    unitCode: "B-0105",
    unitType: "1 BR",
    building: "Tower B",
    rentalType: "DAILY",
    checkIn: "24 Okt 2026",
    checkOut: "25 Okt 2026",
    nights: 1,
    total: 650000,
    paid: 0,
    status: "HOLD",
    paymentStatus: "UNPAID",
  },
];

export default function BookingPage() {
  const [viewMode, setViewMode] = React.useState<"daftar" | "kalender">("daftar");
  const [statusFilter, setStatusFilter] = React.useState("semua");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedBooking, setSelectedBooking] = React.useState<BookingItem | null>(null);
  const [newBookingModalOpen, setNewBookingModalOpen] = React.useState(false);

  // Filter bookings
  const filteredBookings = MOCK_BOOKINGS.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unitCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery);

    if (!matchesSearch) return false;
    if (statusFilter === "semua") return true;
    if (statusFilter === "hold") return item.status === "HOLD";
    if (statusFilter === "terkonfirmasi") return item.status === "CONFIRMED";
    if (statusFilter === "in-stay") return item.status === "CHECKED_IN";
    return true;
  });

  const getStatusChip = (status: BookingItem["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return <Chip variant="blue" dot>Terkonfirmasi</Chip>;
      case "CHECKED_IN":
        return <Chip variant="green" dot>Sedang Menginap</Chip>;
      case "HOLD":
        return <Chip variant="amber" dot>Hold (Tahan)</Chip>;
      case "CHECKED_OUT":
        return <Chip variant="default" dot>Selesai</Chip>;
      case "CANCELLED":
        return <Chip variant="red" dot>Batal</Chip>;
      default:
        return <Chip variant="default">{status}</Chip>;
    }
  };

  const getPaymentChip = (status: BookingItem["paymentStatus"]) => {
    switch (status) {
      case "PAID":
        return <span className="text-xs font-semibold text-[var(--green)]">Lunas</span>;
      case "PARTIAL":
        return <span className="text-xs font-semibold text-[var(--amber)]">Sebagian</span>;
      case "UNPAID":
        return <span className="text-xs font-semibold text-[var(--red)]">Belum Bayar</span>;
    }
  };

  const getRentalTypeChip = (type: BookingItem["rentalType"]) => {
    switch (type) {
      case "DAILY":
        return <Chip variant="default" size="sm">Harian</Chip>;
      case "WEEKLY":
        return <Chip variant="amber" size="sm">Mingguan</Chip>;
      case "MONTHLY":
        return <Chip variant="blue" size="sm">Bulanan</Chip>;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <PageHeader
        breadcrumb={[
          { label: "Skyline Residence", href: "/" },
          { label: "Operasional", href: "/booking" },
          { label: "Booking" },
        ]}
        title="Manajemen Booking"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              icon={<Download className="h-4 w-4" />}
              onClick={() => toast.success("Daftar booking diekspor ke CSV")}
            >
              Export
            </Button>
            <Button
              variant="primary"
              icon={<Plus className="h-4 w-4 stroke-[2.5]" />}
              onClick={() => setNewBookingModalOpen(true)}
            >
              + Booking Baru
            </Button>
          </div>
        }
      />

      {/* Control Bar: View Segmented + Search + SubChips */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* View Mode: Daftar | Kalender */}
        <Segmented
          value={viewMode}
          onChange={setViewMode}
          options={[
            { value: "daftar", label: "Daftar Booking" },
            { value: "kalender", label: "Kalender Gantt" },
          ]}
        />

        {/* Filter SubChips */}
        <SubChips
          value={statusFilter}
          onChange={setStatusFilter}
          items={[
            { value: "semua", label: "Semua" },
            { value: "terkonfirmasi", label: "Terkonfirmasi" },
            { value: "in-stay", label: "Sedang Menginap" },
            { value: "hold", label: "Hold" },
          ]}
        />
      </div>

      {viewMode === "daftar" ? (
        <Card className="p-0 overflow-hidden">
          {/* Search bar inside card */}
          <div className="p-3 sm:p-4 border-b border-[var(--line)] bg-[var(--surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="w-full max-w-sm">
              <Input
                placeholder="Cari kode booking, nama tamu, unit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                className="h-10 text-xs"
              />
            </div>
            <div className="text-xs text-[var(--muted)] shrink-0">
              Menampilkan <strong>{filteredBookings.length}</strong> booking
            </div>
          </div>

          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode Booking</TableHead>
                  <TableHead>Tamu</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Periode Menginap</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bayar</TableHead>
                  <TableHead align="right">Total</TableHead>
                  <TableHead align="right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((b) => (
                  <TableRow
                    key={b.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedBooking(b)}
                  >
                    <TableCell className="font-semibold text-[var(--blue)]">
                      {b.code}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-[var(--ink)]">{b.guestName}</div>
                      <div className="text-xs text-[var(--muted)]">{b.phone}</div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{b.unitCode}</span>
                      <span className="text-xs text-[var(--muted)] ml-1">
                        ({b.unitType} · {b.building})
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium">
                        {b.checkIn} → {b.checkOut}
                      </div>
                      <div className="text-[11px] text-[var(--muted)]">
                        {b.nights} malam
                      </div>
                    </TableCell>
                    <TableCell>{getRentalTypeChip(b.rentalType)}</TableCell>
                    <TableCell>{getStatusChip(b.status)}</TableCell>
                    <TableCell>{getPaymentChip(b.paymentStatus)}</TableCell>
                    <TableCell align="right" className="font-semibold tabular">
                      {formatRupiah(b.total)}
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {b.status === "CONFIRMED" && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                              toast.success(`Check-in dimulai untuk unit ${b.unitCode}`);
                            }}
                          >
                            Check-in
                          </Button>
                        )}
                        {b.status === "CHECKED_IN" && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              toast.info(`Inspeksi check-out untuk ${b.unitCode}`);
                            }}
                          >
                            Check-out
                          </Button>
                        )}
                        {b.status === "HOLD" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              toast.success(`Hold dikonfirmasi untuk ${b.unitCode}`);
                            }}
                          >
                            Konfirmasi
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card List (visible on mobile only) */}
          <div className="divide-y divide-[var(--line)] md:hidden">
            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-xs text-[var(--muted)]">
                Tidak ada booking yang cocok.
              </div>
            ) : (
              filteredBookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  className="p-4 space-y-2.5 active:bg-[var(--surface-2)] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm text-[var(--ink)]">
                        {b.guestName}
                      </div>
                      <div className="text-[11px] font-mono text-[var(--blue)]">
                        {b.code}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {getStatusChip(b.status)}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ink-2)]">
                    <span className="font-semibold px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--ink)]">
                      Unit {b.unitCode} ({b.unitType})
                    </span>
                    <span>•</span>
                    <span>{b.building}</span>
                    <span>•</span>
                    {getRentalTypeChip(b.rentalType)}
                  </div>

                  <div className="text-xs text-[var(--muted)] flex items-center justify-between pt-1">
                    <div>
                      <span className="font-medium text-[var(--ink)]">{b.checkIn}</span> → <span>{b.checkOut}</span>
                      <span className="ml-1 text-[11px]">({b.nights} malam)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold tabular text-[var(--ink)]">
                        {formatRupiah(b.total)}
                      </span>
                      {getPaymentChip(b.paymentStatus)}
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {b.status === "CONFIRMED" && (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => {
                            toast.success(`Check-in dimulai untuk unit ${b.unitCode}`);
                          }}
                        >
                          Check-in
                        </Button>
                      )}
                      {b.status === "CHECKED_IN" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            toast.info(`Inspeksi check-out untuk ${b.unitCode}`);
                          }}
                        >
                          Check-out
                        </Button>
                      )}
                      {b.status === "HOLD" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            toast.success(`Hold dikonfirmasi untuk ${b.unitCode}`);
                          }}
                        >
                          Konfirmasi
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      ) : (
        /* Calendar Gantt View §9.3.2 */
        <Card className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
            <div>
              <h3 className="text-base font-semibold text-[var(--ink)]">
                Timeline Hunian Unit (Gantt Chart)
              </h3>
              <p className="text-xs text-[var(--muted)]">
                Visualisasi serah-terima unit dan kalender okupansi 14 hari
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" size="sm">
                ◀ Oktober 2026 ▶
              </Button>
              <Button variant="primary" size="sm">
                Hari Ini
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px] space-y-2">
              {/* Timeline Header Days */}
              <div className="grid grid-cols-12 gap-1 text-center text-xs font-semibold text-[var(--muted)] pb-2 border-b border-[var(--line)]">
                <div className="col-span-3 text-left pl-2">Unit</div>
                <div>Sen 19</div>
                <div>Sel 20</div>
                <div>Rab 21</div>
                <div>Kam 22</div>
                <div>Jum 23</div>
                <div className="text-[var(--orange)] font-bold">Sab 24</div>
                <div>Min 25</div>
                <div>Sen 26</div>
                <div>Sel 27</div>
              </div>

              {/* Rows */}
              {MOCK_BOOKINGS.map((b) => (
                <div
                  key={b.id}
                  className="grid grid-cols-12 gap-1 items-center py-2 px-2 rounded-xl hover:bg-[var(--surface-2)] transition-colors"
                >
                  <div className="col-span-3">
                    <span className="font-semibold text-xs text-[var(--ink)]">
                      {b.unitCode}
                    </span>
                    <span className="text-[11px] text-[var(--muted)] ml-1.5">
                      {b.unitType}
                    </span>
                  </div>
                  <div className="col-span-9 relative h-8 flex items-center">
                    <div
                      style={{
                        width: b.rentalType === "MONTHLY" ? "100%" : "65%",
                        left: b.rentalType === "MONTHLY" ? "0%" : "25%",
                      }}
                      className="absolute h-6 rounded-full bg-[var(--blue-soft)] border border-[var(--blue)]/30 text-[var(--blue)] px-2.5 flex items-center justify-between text-xs font-medium shadow-xs truncate cursor-pointer hover:bg-[var(--blue-soft)]/90"
                      onClick={() => setSelectedBooking(b)}
                    >
                      <span className="truncate">{b.guestName}</span>
                      <span className="text-[10px] ml-1 shrink-0 opacity-80">
                        {b.nights} mlm
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Booking Detail Sheet */}
      <Sheet
        open={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        title={selectedBooking ? selectedBooking.code : "Detail Booking"}
        subtitle={selectedBooking ? `${selectedBooking.unitCode} · ${selectedBooking.unitType}` : ""}
        footer={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedBooking(null)}
            >
              Tutup
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Receipt className="h-4 w-4" />}
              onClick={() => {
                toast.success("Membuka Invoice resmi");
              }}
            >
              Buka Invoice
            </Button>
          </div>
        }
      >
        {selectedBooking && (
          <div className="space-y-4">
            {/* Guest Profile Card */}
            <div className="p-4 rounded-2xl bg-[var(--surface-2)] space-y-2">
              <div className="text-xs font-semibold uppercase text-[var(--muted)]">
                Informasi Tamu
              </div>
              <div className="flex items-center gap-2 font-medium text-[var(--ink)]">
                <User className="h-4 w-4 text-[var(--muted)]" />
                {selectedBooking.guestName}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                <Phone className="h-3.5 w-3.5" />
                {selectedBooking.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                <Mail className="h-3.5 w-3.5" />
                {selectedBooking.email}
              </div>
            </div>

            {/* Stay Period */}
            <div className="p-4 rounded-2xl bg-[var(--surface-2)] space-y-2">
              <div className="text-xs font-semibold uppercase text-[var(--muted)]">
                Masa Menginap
              </div>
              <div className="text-sm font-semibold text-[var(--ink)]">
                {selectedBooking.checkIn} → {selectedBooking.checkOut}
              </div>
              <div className="text-xs text-[var(--muted)]">
                Durasi: <strong>{selectedBooking.nights} malam</strong> (Sewa{" "}
                {selectedBooking.rentalType.toLowerCase()})
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-2xl border border-[var(--line)] space-y-2">
              <div className="text-xs font-semibold uppercase text-[var(--muted)]">
                Rincian Pembayaran
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Total Tagihan:</span>
                <span className="font-semibold text-[var(--ink)]">
                  {formatRupiah(selectedBooking.total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Telah Dibayar:</span>
                <span className="font-semibold text-[var(--green)]">
                  {formatRupiah(selectedBooking.paid)}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-[var(--line)]">
                <span className="font-medium text-[var(--ink)]">Sisa Tagihan:</span>
                <span className="font-bold text-[var(--ink)]">
                  {formatRupiah(selectedBooking.total - selectedBooking.paid)}
                </span>
              </div>
            </div>
          </div>
        )}
      </Sheet>

      {/* New Booking Wizard Dialog Modal */}
      <Dialog
        open={newBookingModalOpen}
        onClose={() => setNewBookingModalOpen(false)}
        title="Buat Booking Baru (Wizard)"
        description="Pilih tanggal, unit, tamu, dan hitung tarif otomatis"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewBookingModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setNewBookingModalOpen(false);
                toast.success("Booking berhasil dibuat & invoice terbit!");
              }}
            >
              Konfirmasi Booking
            </Button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Tanggal Masuk" type="date" defaultValue="2026-10-24" />
            <Input label="Tanggal Keluar" type="date" defaultValue="2026-10-31" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Nama Tamu" placeholder="Nama lengkap..." />
            <Input label="Nomor WhatsApp" placeholder="+62 8..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-1">
              Pilih Unit Kosong
            </label>
            <select className="w-full h-11 px-3.5 rounded-[14px] bg-[var(--surface-solid)] border border-[var(--line)] text-sm text-[var(--ink)] outline-none">
              <option value="A-0803">A-0803 (Studio · Rp 450.000/hari)</option>
              <option value="A-0402">A-0402 (1 BR · Rp 650.000/hari)</option>
              <option value="B-0302">B-0302 (2 BR · Rp 950.000/hari)</option>
            </select>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
