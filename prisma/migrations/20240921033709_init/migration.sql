-- CreateTable
CREATE TABLE `Classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `semester` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comunications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `author_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ComunicationClass` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    PRIMARY KEY (`A`, `B`),  -- Definir chave primária composta
    UNIQUE INDEX `_ComunicationClass_AB_unique`(`A`, `B`),
    INDEX `_ComunicationClass_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ComunicationClass` ADD CONSTRAINT `_ComunicationClass_A_fkey` FOREIGN KEY (`A`) REFERENCES `Classes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComunicationClass` ADD CONSTRAINT `_ComunicationClass_B_fkey` FOREIGN KEY (`B`) REFERENCES `Comunications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
