/*
  Warnings:

  - You are about to drop the column `phantomWallet` on the `Author` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nonce` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Author_phantomWallet_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "phantomWallet",
ADD COLUMN     "nonce" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_walletAddress_key" ON "Author"("walletAddress");
