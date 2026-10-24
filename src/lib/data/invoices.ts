export interface InvoiceLineItem {
  description: string;
  amount: number;
}

export interface InvoiceItem {
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
  items?: InvoiceLineItem[];
  bankAccount?: {
    bank: string;
    accountNumber: string;
    holder: string;
  };
}

export const MOCK_INVOICES: InvoiceItem[] = [
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
    items: [
      { description: "Sewa Unit A-0803 (Studio) - 3 Malam", amount: 3600000 },
      { description: "Deposit Jaminan Keamanan (Dapat dikembalikan)", amount: 1000000 },
      { description: "Biaya Layanan & Kebersihan", amount: 330000 },
    ],
    bankAccount: {
      bank: "BCA",
      accountNumber: "8830 1928 4710",
      holder: "PT Skyline Residence Manajemen",
    },
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
    items: [
      { description: "Sewa Bulanan Unit B-0302 (2 BR) - Oktober 2026", amount: 15000000 },
      { description: "Deposit Jaminan Keamanan", amount: 2000000 },
    ],
    bankAccount: {
      bank: "BCA",
      accountNumber: "8830 1928 4710",
      holder: "PT Skyline Residence Manajemen",
    },
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
    items: [
      { description: "Sewa Unit A-0404 (Studio) - 2 Malam", amount: 2400000 },
      { description: "Deposit Jaminan Keamanan", amount: 800000 },
      { description: "Biaya Kebersihan Awal", amount: 230000 },
    ],
    bankAccount: {
      bank: "BCA",
      accountNumber: "8830 1928 4710",
      holder: "PT Skyline Residence Manajemen",
    },
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
    items: [
      { description: "Sewa Unit A-0402 (1 BR) - 3 Malam", amount: 2900000 },
      { description: "Deposit Jaminan Keamanan", amount: 1000000 },
    ],
    bankAccount: {
      bank: "BCA",
      accountNumber: "8830 1928 4710",
      holder: "PT Skyline Residence Manajemen",
    },
  },
];

export function getInvoiceById(id: string): InvoiceItem | undefined {
  return MOCK_INVOICES.find((inv) => inv.id === id);
}
