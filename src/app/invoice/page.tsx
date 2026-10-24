"use client";

import * as React from "react";
import { PageHeader } from "@/components/shell/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Sheet } from "@/components/ui/sheet";
import { formatRupiah } from "@/lib/money";
import {
  Receipt,
  Download,
  Printer,
} from "lucide-react";
import { toast } from "sonner";

interface InvoiceItem {
  id: string;
  number: string;
  guestName: string;
  phone: string;
  unitCode: string;
  unitType: string;
  issueDate: string;
  dueDate: string;
  total: number;
  paid: number;
  status: "PAID" | "PARTIAL" | "OVERDUE" | "SENT" | "DRAFT";
}

const MOCK_INVOICES: InvoiceItem[] = [
  {
    id: "inv-1",
    number: "INV/SKY/202610/0001",
    guestName: "Andi Pratama",
    phone: "+6281234567890",
    unitCode: "A-0803",
    unitType: "Studio",
    issueDate: "24 Okt 2026",
    dueDate: "27 Okt 2026",
    total: 4930000,
    paid: 1500000,
    status: "PARTIAL",
  },
  {
    id: "inv-2",
    number: "INV/SKY/202610/0002",
    guestName: "Rina Melati",
    phone: "+6281398765432",
    unitCode: "B-0302",
    unitType: "2 BR",
    issueDate: "01 Okt 2026",
    dueDate: "05 Okt 2026",
    total: 17000000,
    paid: 17000000,
    status: "PAID",
  },
  {
    id: "inv-3",
    number: "INV/SKY/202610/0003",
    guestName: "Bambang Santoso",
    phone: "+6281122334455",
    unitCode: "A-0404",
    unitType: "Studio",
    issueDate: "18 Okt 2026",
    dueDate: "21 Okt 2026",
    total: 3430000,
    paid: 0,
    status: "OVERDUE",
  },
  {
    id: "inv-4",
    number: "INV/SKY/202610/0004",
    guestName: "Jessica Lee",
    phone: "+6281766554433",
    unitCode: "A-0402",
    unitType: "1 BR",
    issueDate: "20 Okt 2026",
    dueDate: "23 Okt 2026",
    total: 3900000,
    paid: 3900000,
    status: "PAID",
  },
];

export default function InvoicePage() {
  const [selectedInvoice, setSelectedInvoice] = React.useState<InvoiceItem | null>(null);

  const getStatusChip = (status: InvoiceItem["status"]) => {
    switch (status) {
      case "PAID":
        return <Chip variant="green" dot>Lunas</Chip>;
      case "PARTIAL":
        return <Chip variant="amber" dot>Sebagian</Chip>;
      case "OVERDUE":
        return <Chip variant="red" dot>Jatuh Tempo (+3 hr)</Chip>;
      case "SENT":
        return <Chip variant="blue" dot>Terkirim</Chip>;
      case "DRAFT":
        return <Chip variant="default" dot>Draft</Chip>;
    }
  };

  const generateWhatsAppLink = (inv: InvoiceItem) => {
    const sisa = formatRupiah(inv.total - inv.paid);
    const text = encodeURIComponent(
      `Halo ${inv.guestName} 👋\nBerikut invoice ${inv.number} dari Skyline Residence:\n• Unit ${inv.unitCode}\n• Total ${formatRupiah(inv.total)} · Sisa ${sisa}\n• Jatuh tempo: ${inv.dueDate}\nLihat & unduh: http://localhost:3000/i/${inv.id}\nTerima kasih 🙏`
    );
    return `https://wa.me/${inv.phone}?text=${text}`;
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        breadcrumb={[
          { label: "Skyline Residence", href: "/" },
          { label: "Keuangan", href: "/invoice" },
          { label: "Invoice & Tagihan" },
        ]}
        title="Daftar Invoice & Kwitansi"
        actions={
          <Button
            variant="primary"
            icon={<Receipt className="h-4 w-4" />}
            onClick={() => toast.success("Form invoice manual baru")}
          >
            + Buat Invoice Baru
          </Button>
        }
      />

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-xs">
          <div className="text-xs text-[var(--muted)]">Belum Dibayar</div>
          <div className="text-2xl font-bold text-[var(--ink)] tabular mt-1">
            Rp 6.860.000
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--red)]/20 shadow-xs">
          <div className="text-xs text-[var(--red)] font-semibold">Lewat Jatuh Tempo</div>
          <div className="text-2xl font-bold text-[var(--red)] tabular mt-1">
            Rp 3.430.000
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-xs">
          <div className="text-xs text-[var(--muted)]">Lunas Bulan Ini</div>
          <div className="text-2xl font-bold text-[var(--green)] tabular mt-1">
            Rp 20.900.000
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-xs">
          <div className="text-xs text-[var(--muted)]">Draft Tersimpan</div>
          <div className="text-2xl font-bold text-[var(--muted)] tabular mt-1">
            0 Draft
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nomor Invoice</TableHead>
              <TableHead>Tamu</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Tanggal Terbit</TableHead>
              <TableHead>Jatuh Tempo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Total</TableHead>
              <TableHead align="right">Sisa Tagihan</TableHead>
              <TableHead align="right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_INVOICES.map((inv) => (
              <TableRow
                key={inv.id}
                className="cursor-pointer"
                onClick={() => setSelectedInvoice(inv)}
              >
                <TableCell className="font-semibold text-[var(--blue)]">
                  {inv.number}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-[var(--ink)]">{inv.guestName}</div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{inv.unitCode}</span> ({inv.unitType})
                </TableCell>
                <TableCell>{inv.issueDate}</TableCell>
                <TableCell>
                  <span className={inv.status === "OVERDUE" ? "text-[var(--red)] font-bold" : ""}>
                    {inv.dueDate}
                  </span>
                </TableCell>
                <TableCell>{getStatusChip(inv.status)}</TableCell>
                <TableCell align="right" className="font-semibold tabular">
                  {formatRupiah(inv.total)}
                </TableCell>
                <TableCell align="right" className="font-bold tabular">
                  {formatRupiah(inv.total - inv.paid)}
                </TableCell>
                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <a
                      href={generateWhatsAppLink(inv)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline">
                        WhatsApp
                      </Button>
                    </a>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => toast.success(`Mengunduh PDF ${inv.number}`)}
                    >
                      PDF
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Invoice Split Detail Sheet (§12.4 Preview A4) */}
      <Sheet
        open={Boolean(selectedInvoice)}
        onClose={() => setSelectedInvoice(null)}
        title={selectedInvoice?.number}
        subtitle="Pratinjau Kertas Tagihan Resmi"
        footer={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Printer className="h-4 w-4" />}
              onClick={() => window.print()}
            >
              Cetak
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Download className="h-4 w-4" />}
              onClick={() => toast.success("PDF berhasil diunduh")}
            >
              Unduh PDF
            </Button>
          </div>
        }
      >
        {selectedInvoice && (
          <div className="space-y-4">
            {/* A4 Paper Mockup View */}
            <div className="p-5 rounded-2xl bg-[var(--surface-solid)] border border-[var(--line)] shadow-sm space-y-4 text-xs">
              <div className="flex items-start justify-between pb-3 border-b border-[var(--line)]">
                <div>
                  <h3 className="font-bold text-base text-[var(--ink)]">
                    Skyline Residence
                  </h3>
                  <p className="text-[11px] text-[var(--muted)]">
                    Apartemen & Sewa Harian/Bulanan
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[var(--blue)]">
                    {selectedInvoice.number}
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    Terbit: {selectedInvoice.issueDate}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-[var(--muted)]">
                  Ditagihkan Kepada
                </div>
                <div className="font-semibold text-sm text-[var(--ink)]">
                  {selectedInvoice.guestName}
                </div>
                <div className="text-[11px] text-[var(--muted)]">
                  Unit: {selectedInvoice.unitCode} ({selectedInvoice.unitType})
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                <div className="flex justify-between">
                  <span>Sewa Unit ({selectedInvoice.unitCode})</span>
                  <span className="font-semibold tabular">
                    {formatRupiah(selectedInvoice.total - 1000000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Deposit Keamanan (Dapat dikembalikan)</span>
                  <span className="font-semibold tabular">Rp 1.000.000</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--line)] font-bold text-sm text-[var(--ink)]">
                  <span>TOTAL TAGIHAN</span>
                  <span className="tabular">{formatRupiah(selectedInvoice.total)}</span>
                </div>
                <div className="flex justify-between text-[var(--green)]">
                  <span>Telah Dibayar</span>
                  <span className="tabular">-{formatRupiah(selectedInvoice.paid)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-1 border-t border-[var(--line)]">
                  <span>SISA TAGIHAN</span>
                  <span className="tabular">
                    {formatRupiah(selectedInvoice.total - selectedInvoice.paid)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
