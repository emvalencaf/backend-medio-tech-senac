/*
  Warnings:

  - You are about to alter the column `year` on the `Class` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Class` MODIFY `year` INTEGER NOT NULL;
