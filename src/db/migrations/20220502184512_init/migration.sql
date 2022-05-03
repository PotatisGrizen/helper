-- CreateTable
CREATE TABLE `configurations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discordId` VARCHAR(20) NOT NULL,
    `ownerId` VARCHAR(20) NOT NULL,
    `active` BOOLEAN NOT NULL,

    UNIQUE INDEX `discordId`(`discordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
