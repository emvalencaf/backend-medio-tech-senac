/*
  Warnings:

  - Added the required column `avaliation` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Grade` ADD COLUMN `avaliation` INTEGER NOT NULL,
    ADD COLUMN `score` DOUBLE NULL;
