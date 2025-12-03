/*
  Warnings:

  - You are about to drop the column `operator` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pnr` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `route` on the `Booking` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - You are about to drop the column `amount` on the `Refund` table. All the data in the column will be lost.
  - You are about to drop the column `processedAt` on the `Refund` table. All the data in the column will be lost.
  - You are about to drop the column `requestedAt` on the `Refund` table. All the data in the column will be lost.
  - Added the required column `fromCity` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toCity` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fromCity" TEXT NOT NULL,
    "toCity" TEXT NOT NULL,
    "journeyDate" DATETIME NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'BOOKED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("amount", "createdAt", "id", "journeyDate", "status", "userId") SELECT "amount", "createdAt", "id", "journeyDate", "status", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Refund" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Refund_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Refund" ("bookingId", "id", "status") SELECT "bookingId", "id", "status" FROM "Refund";
DROP TABLE "Refund";
ALTER TABLE "new_Refund" RENAME TO "Refund";
CREATE UNIQUE INDEX "Refund_bookingId_key" ON "Refund"("bookingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
