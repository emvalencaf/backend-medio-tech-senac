/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the `_ClassSubjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TeacherSubjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teachingAssignmentId` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Grade` DROP FOREIGN KEY `Grade_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `_ClassSubjects` DROP FOREIGN KEY `_ClassSubjects_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ClassSubjects` DROP FOREIGN KEY `_ClassSubjects_B_fkey`;

-- DropForeignKey
ALTER TABLE `_TeacherSubjects` DROP FOREIGN KEY `_TeacherSubjects_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TeacherSubjects` DROP FOREIGN KEY `_TeacherSubjects_B_fkey`;

-- AlterTable
ALTER TABLE `Grade` DROP COLUMN `subjectId`,
    ADD COLUMN `teachingAssignmentId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_ClassSubjects`;

-- DropTable
DROP TABLE `_TeacherSubjects`;

-- CreateTable
CREATE TABLE `TeachingAssignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `teacherId` INTEGER NOT NULL,

    UNIQUE INDEX `TeachingAssignment_classId_subjectId_key`(`classId`, `subjectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TeachingAssignment` ADD CONSTRAINT `TeachingAssignment_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeachingAssignment` ADD CONSTRAINT `TeachingAssignment_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeachingAssignment` ADD CONSTRAINT `TeachingAssignment_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_teachingAssignmentId_fkey` FOREIGN KEY (`teachingAssignmentId`) REFERENCES `TeachingAssignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
