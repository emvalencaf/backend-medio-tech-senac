-- DropForeignKey
ALTER TABLE `Grade` DROP FOREIGN KEY `Grade_teachingAssignmentId_fkey`;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_teachingAssignmentId_fkey` FOREIGN KEY (`teachingAssignmentId`) REFERENCES `TeachingAssignment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
