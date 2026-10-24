-- PostgreSQL exclusion constraint & data integrity migration
-- Required for anti-double booking and monetary boundaries

CREATE EXTENSION IF NOT EXISTS btree_gist;

-- 1) Tanggal keluar harus setelah tanggal masuk
ALTER TABLE "Booking" ADD CONSTRAINT booking_dates_valid CHECK ("checkOutDate" > "checkInDate");

-- 2) Anti double-booking: rentang [masuk, keluar) tidak boleh tumpang tindih
ALTER TABLE "Booking" ADD CONSTRAINT booking_no_overlap EXCLUDE USING gist (
  "unitId" WITH =,
  daterange("checkInDate", "checkOutDate", '[)') WITH &&
) WHERE ("status" IN ('HOLD','CONFIRMED','CHECKED_IN','CHECKED_OUT'));

-- 3) Block maintenance tidak boleh tumpang tindih
ALTER TABLE "UnitBlock" 
  ADD CONSTRAINT block_dates_valid CHECK ("endDate" > "startDate"),
  ADD CONSTRAINT block_no_overlap EXCLUDE USING gist (
    "unitId" WITH =,
    daterange("startDate", "endDate", '[)') WITH &&
  );

-- 4) Integritas uang
ALTER TABLE "Payment" ADD CONSTRAINT payment_amount_pos CHECK ("amount" > 0);
ALTER TABLE "Invoice" ADD CONSTRAINT invoice_paid_bounds CHECK ("amountPaid" >= 0 AND "amountPaid" <= "total");
ALTER TABLE "PaymentAllocation" ADD CONSTRAINT alloc_amount_pos CHECK ("amount" > 0);
