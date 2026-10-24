"use client";

import * as React from "react";
import { PageHeader } from "@/components/shell/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Sheet } from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import { formatRupiah } from "@/lib/money";
import {
  Search,
  Plus,
  Phone,
  Mail,
  ShieldCheck,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface GuestItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  idType: "KTP" | "PASSPORT";
  idLast4: string;
  staysCount: number;
  totalSpent: number;
  lastStay: string;
  tag?: "VIP" | "LANGGANAN" | "REGULER";
  blacklisted?: boolean;
}

const MOCK_GUESTS: GuestItem[] = [
  {
    id: "g1",
    name: "Andi Pratama",
    phone: "+62 812-3456-7890",
    email: "andi.pratama@email.com",
    idType: "KTP",
    idLast4: "1203",
    staysCount: 4,
    totalSpent: 18500000,
    lastStay: "24 Okt 2026",
    tag: "VIP",
  },
  {
    id: "g2",
    name: "Rina Melati",
    phone: "+62 813-9876-5432",
    email: "rina.m@email.com",
    idType: "KTP",
    idLast4: "9842",
    staysCount: 8,
    totalSpent: 51000000,
    lastStay: "01 Okt 2026",
    tag: "LANGGANAN",
  },
  {
    id: "g3",
    name: "Bambang Santoso",
    phone: "+62 811-2233-4455",
    email: "bambang.s@corp.co.id",
    idType: "KTP",
    idLast4: "5512",
    staysCount: 1,
    totalSpent: 1350000,
    lastStay: "24 Okt 2026",
    tag: "REGULER",
  },
  {
    id: "g4",
    name: "Jessica Lee",
    phone: "+62 817-6655-4433",
    email: "jessica.lee@gmail.com",
    idType: "PASSPORT",
    idLast4: "7701",
    staysCount: 3,
    totalSpent: 14200000,
    lastStay: "20 Okt 2026",
    tag: "LANGGANAN",
  },
  {
    id: "g5",
    name: "David Kusuma",
    phone: "+62 819-0011-2233",
    email: "david.k@yahoo.com",
    idType: "KTP",
    idLast4: "3319",
    staysCount: 2,
    totalSpent: 2600000,
    lastStay: "15 Sep 2026",
    tag: "REGULER",
  },
];

export default function TamuPage() {
  const [search, setSearch] = React.useState("");
  const [selectedGuest, setSelectedGuest] = React.useState<GuestItem | null>(null);
  const [newGuestOpen, setNewGuestOpen] = React.useState(false);

  const filteredGuests = MOCK_GUESTS.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.phone.includes(search) ||
      g.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        breadcrumb={[
          { label: "Skyline Residence", href: "/" },
          { label: "Direktori", href: "/tamu" },
          { label: "Tamu" },
        ]}
        title="Direktori Tamu"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              icon={<Download className="h-4 w-4" />}
              onClick={() => toast.success("Daftar tamu diekspor")}
            >
              Export
            </Button>
            <Button
              variant="primary"
              icon={<Plus className="h-4 w-4 stroke-[2.5]" />}
              onClick={() => setNewGuestOpen(true)}
            >
              + Tamu Baru
            </Button>
          </div>
        }
      />

      <Card className="p-0 overflow-hidden">
        {/* Search header */}
        <div className="p-4 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-4">
          <div className="w-full max-w-sm">
            <Input
              placeholder="Cari nama, telepon, atau email tamu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              className="h-10 text-xs"
            />
          </div>
          <div className="text-xs text-[var(--muted)] shrink-0">
            Total <strong>{filteredGuests.length}</strong> tamu terdaftar
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Tamu</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Verifikasi ID</TableHead>
              <TableHead>Kunjungan</TableHead>
              <TableHead>Terakhir Menginap</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead align="right">Total Belanja</TableHead>
              <TableHead align="right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.map((g) => (
              <TableRow
                key={g.id}
                className="cursor-pointer"
                onClick={() => setSelectedGuest(g)}
              >
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[var(--blue-soft)] text-[var(--blue)] flex items-center justify-center font-bold text-xs shrink-0">
                      {g.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-semibold text-[var(--ink)]">
                      {g.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs text-[var(--ink)]">{g.phone}</div>
                  <div className="text-[11px] text-[var(--muted)]">{g.email}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[var(--green)]" />
                    <span>{g.idType} ••••{g.idLast4}</span>
                  </div>
                </TableCell>
                <TableCell className="tabular">
                  {g.staysCount} kali menginap
                </TableCell>
                <TableCell>{g.lastStay}</TableCell>
                <TableCell>
                  {g.tag === "VIP" && <Chip variant="amber" size="sm">VIP</Chip>}
                  {g.tag === "LANGGANAN" && <Chip variant="blue" size="sm">Langganan</Chip>}
                  {g.tag === "REGULER" && <Chip variant="default" size="sm">Reguler</Chip>}
                </TableCell>
                <TableCell align="right" className="font-semibold tabular">
                  {formatRupiah(g.totalSpent)}
                </TableCell>
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedGuest(g)}
                  >
                    Profil ›
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Guest Profile Sheet */}
      <Sheet
        open={Boolean(selectedGuest)}
        onClose={() => setSelectedGuest(null)}
        title={selectedGuest?.name}
        subtitle="Profil & Riwayat Tamu"
        footer={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setSelectedGuest(null)}
          >
            Tutup
          </Button>
        }
      >
        {selectedGuest && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[var(--surface-2)] space-y-2">
              <div className="text-xs font-semibold uppercase text-[var(--muted)]">
                Informasi Identitas (Terenkripsi)
              </div>
              <div className="text-sm font-medium text-[var(--ink)]">
                {selectedGuest.idType}: ••••••••••••{selectedGuest.idLast4}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                <Phone className="h-3.5 w-3.5" />
                {selectedGuest.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                <Mail className="h-3.5 w-3.5" />
                {selectedGuest.email}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-[var(--line)] space-y-2">
              <div className="text-xs font-semibold uppercase text-[var(--muted)]">
                Statistik Kunjungan
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Total Menginap:</span>
                <span className="font-semibold text-[var(--ink)]">
                  {selectedGuest.staysCount} kali
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Total Belanja:</span>
                <span className="font-bold text-[var(--green)]">
                  {formatRupiah(selectedGuest.totalSpent)}
                </span>
              </div>
            </div>
          </div>
        )}
      </Sheet>

      {/* New Guest Dialog */}
      <Dialog
        open={newGuestOpen}
        onClose={() => setNewGuestOpen(false)}
        title="Tambah Tamu Baru"
        description="Masukkan identitas dasar tamu untuk pemesanan"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setNewGuestOpen(false)}>
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setNewGuestOpen(false);
                toast.success("Tamu berhasil didaftarkan");
              }}
            >
              Simpan Tamu
            </Button>
          </>
        }
      >
        <div className="space-y-3 py-2">
          <Input label="Nama Lengkap" placeholder="Sesuai KTP / Paspor" />
          <Input label="Nomor Handphone / WhatsApp" placeholder="+62 8..." />
          <Input label="Email" type="email" placeholder="nama@email.com" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--muted)] mb-1">
                Tipe Identitas
              </label>
              <select className="w-full h-11 px-3.5 rounded-[14px] bg-[var(--surface-solid)] border border-[var(--line)] text-sm text-[var(--ink)] outline-none">
                <option value="KTP">KTP</option>
                <option value="PASSPORT">Paspor</option>
                <option value="SIM">SIM</option>
                <option value="KITAS">KITAS</option>
              </select>
            </div>
            <Input label="Nomor Identitas" placeholder="Nomor KTP/Paspor" />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
