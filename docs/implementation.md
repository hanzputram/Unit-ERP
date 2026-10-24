# StayDesk — Implementation Guide

Sistem Check-in / Check-out Unit Apartemen + Ringkasan Keuangan + Invoice Webapp manajemen unit sewa harian, mingguan, dan bulanan dengan UI premium bergaya "Cadra" (video referensi).
Dokumen ini adalah spesifikasi implementasi lengkap. Bisa diberikan langsung ke developer atau AI coding agent (Claude Code, Cursor, dll.) dan dikerjakan fase demi fase.
"StayDesk" hanyalah nama kerja. Ganti kapan saja (cari-ganti di seluruh repo + APP_NAME di env).

## 1. Ringkasan & Tujuan
### 1.1 Masalah yang diselesaikan
Pemilik/pengelola apartemen yang menyewakan unit harian, mingguan, dan bulanan biasanya mengelola lewat WhatsApp + Excel + catatan manual. Akibatnya:
- unit double-booking atau tanggal kosong tidak terlihat,
- check-in/check-out tidak terdokumentasi (kondisi unit, meteran, deposit, kunci),
- uang masuk/keluar tidak terlacak per unit sehingga untung-rugi tidak jelas,
- invoice dibuat manual, nomor tidak konsisten, tagihan bulanan terlupa.

### 1.2 Tujuan produk
| # | Tujuan | Ukuran sukses |
|---|---|---|
| G1 | Booking tanpa bentrok | 0 double-booking (dijaga di level database, bukan hanya UI) |
| G2 | Check-in / check-out cepat & terdokumentasi | Check-in selesai < 90 detik oleh front desk terlatih |
| G3 | Keuangan terbaca sekali lihat | Dashboard menjawab "bulan ini untung berapa, siapa belum bayar, unit mana paling laku" tanpa buka laporan |
| G4 | Invoice otomatis & rapi | 1 klik buat invoice PDF + kirim WhatsApp; tagihan bulanan terbit otomatis |
| G5 | UI yang "wow" tapi tetap mudah | Mengikuti bahasa desain video referensi; tugas utama maksimal 3 klik dari dashboard |

### 1.3 Ruang lingkup
- **MVP (Fase 0–6):** Multi-properti & unit, tarif harian/mingguan/bulanan, kalender & booking, check-in/check-out wizard, deposit, tamu, pembayaran, pengeluaran, ringkasan keuangan, invoice + kwitansi PDF, dashboard, mode terang/gelap, role & permission dasar.
- **Pasca-MVP (Fase 7+):** Sinkronisasi iCal (Airbnb/Booking.com), payment gateway (Midtrans/Xendit/QRIS dinamis), WhatsApp API otomatis, portal tamu (self check-in), housekeeping app untuk petugas, smart lock integration, multi-bahasa penuh.
- **Di luar lingkup:** akuntansi double-entry penuh, payroll, channel manager dua arah real-time, aplikasi native.

### 1.4 Prinsip desain produk
- Hari ini dulu. Halaman pertama = apa yang harus dikerjakan hari ini (siapa check-in, siapa check-out, siapa nunggak).
- Satu sumber kebenaran. Status unit, keuangan, dan invoice diturunkan dari booking + payment, bukan diketik ulang.
- Database menjaga aturan. Overlap, nomor invoice unik, dan saldo invoice dijamin oleh constraint/transaction.
- Uang tidak pernah berupa float. Semua nominal Rupiah disimpan sebagai integer.
- Cantik itu fitur. Animasi, tipografi, dan warna adalah bagian dari requirement, bukan tahap "kalau sempat".

---

## 2. Analisis UI Referensi (Video)
Video referensi (±11 detik) menampilkan dashboard ERP bernama "Cadra – Larkspur Cycles" pada mode terang dan gelap, dengan halaman Dashboard, Stock, Warehouses, dan Reporting/Overview.

### 2.1 Ciri khas visual yang teramati
- **Top navbar berbentuk pill:** Logo kotak hitam membulat + nama app + subjudul (nama perusahaan) di kiri. Menu di dalam kapsul abu-putih melayang. Item aktif = pill hitam solid bertulisan putih. Badge bulat oranye berisi angka. Indikator aktif meluncur mulus. Kanan: tombol lonceng bulat dengan titik oranye + avatar bulat berinisial (NH) berlatar mint.
- **Breadcrumb + judul besar:** Larkspur › Inventory › Stock (segmen terakhir biru). Judul halaman besar (±32px) berat sedang di bawahnya.
- **Status pill kanan atas:** Kapsul berisi titik hijau, jam (3:37 PM), teks "5 on the floor / 4 on track · 1 behind", dan progress bar oranye.
- **Sub-navigasi 2 tingkat:** Tingkat 1: chip kecil ber-ikon di bawah menu. Tingkat 2: segmented control (aktif = putih terangkat).
- **Tombol aksi kanan:** Tombol hitam pill dengan ikon (+ Booking baru), tombol outline putih (Export). Pada dark mode tombol utama menjadi putih.
- **Floating dock kiri:** Kapsul hitam vertikal melayang di kiri-tengah layar berisi 5 ikon bulat: cari (⌘K), quick-add (+), tema (bulan/matahari), pengaturan, bantuan.
- **Kartu KPI 4 kolom:** Baris 4 kartu: #1 hitam (angka putih), #2 biru muda pastel, #3 & #4 putih. Tiap kartu: ikon dalam lingkaran kecil, label, angka besar (±32px, semi-bold), chip kecil keterangan, sparkline di kanan.
- **Kartu besar bersudut sangat bulat:** Radius ±24px, latar putih translusen, bayangan sangat lembut berlapis, tanpa border tebal.
- **Kartu sapaan (hero):** "WEDNESDAY, NOVEMBER 11" (kapital kecil oranye berspasi), "Good afternoon, Noor." (besar), ringkasan kalimat dengan frasa tebal dan 1 frasa merah (peringatan), lalu timeline hari dengan titik berwarna sepanjang garis biru dari 06:00–22:00 dengan penanda jam sekarang berbentuk label oranye. Dua tombol: Buka jadwal (hitam) dan Pipeline (outline).
- **Kartu "Cash on hand":** Angka besar + chip hijau (+Rp 49jt in 14 days) + bar chart positif/negatif (hijau naik, oranye turun dari garis nol) + legenda Masuk / Keluar.
- **Grafik area halus:** Kurva biru smooth, area di bawahnya gradien biru transparan, garis putus-putus abu untuk seri kedua, sumbu minimalis, tooltip crosshair vertikal saat hover.
- **Gauge setengah lingkaran:** Busur hijau-lime tebal dengan ujung membulat, jarum dengan hub bulat, angka besar di bawah hub, footer Target · Rata-rata. Jarum menyapu dari 0 ke nilai saat load.
- **Grid "bin" berwarna (Peta Gedung):** Kartu per gedung dengan header border warna atas (biru/oranye/hijau), badge kode 3 huruf (SKY), 78% of 240 units used, legenda, grid kotak kecil bersudut membulat. Di bawahnya 3 mini-tile statistik dan daftar "UNIT TERBAIK DI SINI". Grid terisi dengan animasi stagger.
- **Dark mode penuh:** Latar hampir hitam (#0A0A0B), kartu abu-gelap dengan border tipis transparan, kartu KPI #1 menjadi putih (inversi), kartu #2 menjadi biru tua, pill menu aktif putih bertulisan hitam, tombol utama putih.
- **Tipografi:** Outfit (heading & angka tabular) + Inter/Outfit untuk body.

---

## 3. Tech Stack
- **Framework:** Next.js (App Router) + React 19, TypeScript strict
- **Styling:** Tailwind CSS + CSS variables (design tokens)
- **Komponen dasar:** Radix UI primitives / shadcn/ui custom
- **Animasi:** Framer Motion / Motion
- **Grafik:** Recharts + SVG custom (Gauge, sparkline, unit grid, day timeline)
- **Database:** PostgreSQL + Prisma (+ migrasi SQL custom untuk exclusion constraint & btree_gist)
- **Validasi:** Zod (form & actions)
- **Tanggal:** date-fns + date-fns-tz (Asia/Jakarta)
- **Command palette:** cmdk
- **Toast:** sonner
- **Tema:** next-themes (light/dark/system)
- **Ikon:** Lucide React

---

## 4. Design System Tokens (§8.1)
```css
:root {
  --bg: #F1F1EF;
  --bg-glow: radial-gradient(1200px 600px at 20% -10%, #FFFFFF 0%, transparent 60%);
  --surface: rgba(255,255,255,.80);
  --surface-solid: #FFFFFF;
  --surface-2: #F6F6F4;
  --line: rgba(13,13,15,.07);
  --ink: #0D0D0F;
  --ink-2: #4A4A52;
  --muted: #8C8C93;
  --kpi1-bg: #0D0D0F;
  --kpi1-fg: #FFFFFF;
  --kpi2-bg: #BCD2F3;
  --kpi2-fg: #16315F;
  --blue: #3F6FD9;
  --blue-soft: #E3ECFB;
  --orange: #E2552B;
  --orange-soft: #FCE6DE;
  --lime: #8CB93B;
  --green: #2E9D5B;
  --green-soft: #E3F3E8;
  --amber: #E8A91A;
  --amber-soft: #FBF0CF;
  --red: #D8392B;
  --red-soft: #FBE4E1;
  --mint: #CDEBDD;
  --r-xl: 28px;
  --r-lg: 24px;
  --r-md: 16px;
  --r-sm: 10px;
  --r-xs: 4px;
  --r-pill: 999px;
  --shadow-card: 0 1px 1px rgba(13,13,15,.03), 0 4px 12px rgba(13,13,15,.04), 0 24px 48px -12px rgba(13,13,15,.06);
  --shadow-float: 0 8px 24px rgba(13,13,15,.18), 0 2px 6px rgba(13,13,15,.12);
}
:root[data-theme="dark"] {
  --bg: #09090A;
  --bg-glow: radial-gradient(1000px 500px at 20% -10%, #17171B 0%, transparent 60%);
  --surface: rgba(24,24,27,.72);
  --surface-solid: #151518;
  --surface-2: #1D1D21;
  --line: rgba(255,255,255,.08);
  --ink: #F4F4F5;
  --ink-2: #B9B9C0;
  --muted: #7F7F88;
  --kpi1-bg: #F6F6F4;
  --kpi1-fg: #0D0D0F; /* Inversi */
  --kpi2-bg: #1E4A82;
  --kpi2-fg: #EAF1FF;
  --blue: #5B8CF0;
  --blue-soft: rgba(91,140,240,.16);
  --orange: #F0693F;
  --orange-soft: rgba(240,105,63,.16);
  --amber: #F0B83A;
  --amber-soft: rgba(240,184,58,.16);
  --green: #46C27A;
  --green-soft: rgba(70,194,122,.16);
  --red: #F0594B;
  --red-soft: rgba(240,89,75,.16);
  --shadow-card: 0 0 0 1px rgba(255,255,255,.04), 0 12px 32px rgba(0,0,0,.5);
  --shadow-float: 0 8px 28px rgba(0,0,0,.6);
}
```

---

## 5. Roadmap Fase & Checklist (§21)
- **Fase 0 — Fondasi:** Repo, TypeScript strict, CSS tokens, Prisma schema, auth dasar, lib/{money, dates, env, action}, CI.
- **Fase 1 — Design System & Shell:** Primitives, Shell (PillNav, FloatingDock, StatusPill, Breadcrumb), Charts (Gauge, Sparkline, AreaChart, CashBars, UnitGrid, DayTimeline), halaman `/design` light/dark.
- **Fase 2 — Properti, Unit, Tarif, Tamu:** Peta Gedung, seed 78 unit, CRUD tamu, tarif H/M/B.
- **Fase 3 — Booking engine & Kalender:** Pricing quote, availability guard, wizard booking, Gantt timeline.
- **Fase 4 — Check-in/Check-out & Housekeeping:** Wizard 5 langkah, stay records, Kanban housekeeping.
- **Fase 5 — Invoice & Pembayaran:** Penomoran, alokasi FIFO, PDF react-pdf, WhatsApp share.
- **Fase 6 — Keuangan, Dashboard, Laporan:** KPI, accrual revenue, dashboard hero & pipeline, polish.
