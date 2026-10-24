"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getInvoiceById } from "@/lib/data/invoices";
import { formatRupiah } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import {
  Building2,
  Calendar,
  CreditCard,
  Printer,
  Copy,
  Check,
  MessageCircle,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function GuestInvoicePage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";
  const invoice = getInvoiceById(id);

  const [copiedAccount, setCopiedAccount] = React.useState(false);
  const [copiedAmount, setCopiedAmount] = React.useState(false);

  if (!invoice) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <div className="h-16 w-16 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--muted)] mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--ink)] mb-2">
          Invoice Tidak Ditemukan
        </h1>
        <p className="text-sm text-[var(--muted)] max-w-md mb-6">
          Nomor invoice yang Anda cari tidak terdaftar atau tautan mungkin sudah kedaluwarsa.
        </p>
        <Link href="/">
          <Button variant="secondary" icon={<ArrowLeft className="h-4 w-4" />}>
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    );
  }

  const sisa = invoice.total - invoice.paid;
  const isLunas = invoice.status === "PAID" || sisa <= 0;

  const copyToClipboard = (text: string, type: "account" | "amount") => {
    navigator.clipboard.writeText(text);
    if (type === "account") {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
      toast.success("Nomor rekening berhasil disalin");
    } else {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
      toast.success("Nominal transfer berhasil disalin");
    }
  };

  const getStatusBadge = () => {
    switch (invoice.status) {
      case "PAID":
        return <Chip variant="green" dot>LUNAS</Chip>;
      case "PARTIAL":
        return <Chip variant="amber" dot>DIBAYAR SEBAGIAN</Chip>;
      case "OVERDUE":
        return <Chip variant="red" dot>JATUH TEMPO</Chip>;
      default:
        return <Chip variant="blue" dot>MENUNGGU PEMBAYARAN</Chip>;
    }
  };

  const waConfirmLink = () => {
    const text = encodeURIComponent(
      `Halo Skyline Residence,\n\nSaya ingin konfirmasi pembayaran untuk:\n• Invoice: ${invoice.number}\n• Nama: ${invoice.guestName}\n• Unit: ${invoice.unitCode}\n• Nominal: ${formatRupiah(sisa > 0 ? sisa : invoice.total)}\n\nBerikut bukti transfer pembayaran terlampir. Mohon dicek. Terima kasih.`
    );
    return `https://wa.me/6281234567890?text=${text}`;
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-10 px-4 space-y-6">
      {/* Top Bar for Guest */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center shadow-md">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--ink)] leading-tight">
              Skyline Residence
            </h2>
            <p className="text-xs text-[var(--muted)]">Portal Invoice Tamu Resmi</p>
          </div>
        </div>
        <div>{getStatusBadge()}</div>
      </div>

      {/* Main Invoice Paper Card */}
      <div className="rounded-[28px] bg-[var(--surface-solid)] border border-[var(--line)] shadow-xl p-6 sm:p-8 space-y-6">
        {/* Invoice Header Details */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[var(--line)]">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
              INVOICE TAGIHAN
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight">
              {invoice.number}
            </h1>
            <div className="flex items-center gap-2 text-xs text-[var(--muted)] mt-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Tanggal Terbit: {invoice.issueDate}</span>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
              JATUH TEMPO
            </div>
            <div className="text-base font-semibold text-[var(--ink)]">
              {invoice.dueDate}
            </div>
            <div className="text-xs text-[var(--muted)] mt-1">
              Unit: <strong className="text-[var(--ink)]">{invoice.unitCode}</strong> ({invoice.unitType})
            </div>
          </div>
        </div>

        {/* Guest Info */}
        <div className="p-4 rounded-2xl bg-[var(--surface-2)]/70 border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
              Ditagihkan Kepada
            </div>
            <div className="text-sm font-semibold text-[var(--ink)] mt-0.5">
              {invoice.guestName}
            </div>
          </div>
          <div className="text-xs text-[var(--muted)]">
            No. Kontak: <span className="text-[var(--ink)] font-medium">{invoice.phone}</span>
          </div>
        </div>

        {/* Itemized Breakdown Table */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
            Rincian Tagihan
          </div>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {invoice.items && invoice.items.length > 0 ? (
              invoice.items.map((it, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <span className="text-[var(--ink)] font-medium">{it.description}</span>
                  <span className="text-[var(--ink)] font-semibold tabular">
                    {formatRupiah(it.amount)}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-3 flex items-center justify-between text-xs">
                <span className="text-[var(--ink)] font-medium">Sewa Unit {invoice.unitCode}</span>
                <span className="text-[var(--ink)] font-semibold tabular">
                  {formatRupiah(invoice.total)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Calculation Summary */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>Total Tagihan</span>
            <span className="font-semibold text-[var(--ink)] tabular">
              {formatRupiah(invoice.total)}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-[var(--green)]">
            <span>Telah Dibayar</span>
            <span className="font-semibold tabular">-{formatRupiah(invoice.paid)}</span>
          </div>
          <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Sisa Tagihan
              </div>
              <div className="text-[11px] text-[var(--muted)]">
                {isLunas ? "Tagihan sudah lunas sepenuhnya" : "Harap dilunasi sebelum jatuh tempo"}
              </div>
            </div>
            <div className={`text-2xl font-bold tabular ${isLunas ? "text-[var(--green)]" : "text-[var(--red)]"}`}>
              {formatRupiah(sisa > 0 ? sisa : 0)}
            </div>
          </div>
        </div>

        {/* Payment Instructions if not yet fully paid */}
        {!isLunas && invoice.bankAccount && (
          <div className="p-5 rounded-2xl bg-[var(--blue-soft)]/40 border border-[var(--blue)]/20 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--blue)] uppercase tracking-wider">
              <CreditCard className="h-4 w-4" />
              Instruksi Transfer Bank
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--surface-solid)] border border-[var(--line)] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[var(--muted)]">Bank Tujuan:</div>
                  <div className="font-bold text-sm text-[var(--ink)]">{invoice.bankAccount.bank}</div>
                  <div className="text-[11px] text-[var(--muted)]">{invoice.bankAccount.accountNumber}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(invoice.bankAccount?.accountNumber || "", "account")}
                  icon={copiedAccount ? <Check className="h-3.5 w-3.5 text-[var(--green)]" /> : <Copy className="h-3.5 w-3.5" />}
                >
                  {copiedAccount ? "Tersalin" : "Salin"}
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-[var(--surface-solid)] border border-[var(--line)] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[var(--muted)]">Nominal Transfer:</div>
                  <div className="font-bold text-sm text-[var(--red)] tabular">{formatRupiah(sisa)}</div>
                  <div className="text-[10px] text-[var(--muted)]">a.n. {invoice.bankAccount.holder}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(String(sisa), "amount")}
                  icon={copiedAmount ? <Check className="h-3.5 w-3.5 text-[var(--green)]" /> : <Copy className="h-3.5 w-3.5" />}
                >
                  {copiedAmount ? "Tersalin" : "Salin"}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[var(--muted)]">
              <ShieldCheck className="h-4 w-4 text-[var(--green)] shrink-0" />
              <span>
                Pembayaran diverifikasi otomatis oleh pengelola setelah bukti transfer dikirim.
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
          {!isLunas && (
            <a
              href={waConfirmLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1"
            >
              <Button
                size="md"
                variant="primary"
                className="w-full justify-center bg-[var(--green)] hover:bg-[var(--green)]/90 text-white"
                icon={<MessageCircle className="h-4 w-4" />}
              >
                Konfirmasi via WhatsApp
              </Button>
            </a>
          )}
          <Button
            size="md"
            variant="secondary"
            className="w-full sm:flex-1 justify-center"
            icon={<Printer className="h-4 w-4" />}
            onClick={() => window.print()}
          >
            Cetak / Simpan PDF
          </Button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-[var(--muted)] space-y-1">
        <p>© 2026 Skyline Residence Management. All rights reserved.</p>
        <p>Pertanyaan seputar invoice? Hubungi Front Desk di +62 812-3456-7890</p>
      </div>
    </div>
  );
}
