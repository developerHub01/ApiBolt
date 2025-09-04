CREATE TABLE `body_binary_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`path` text,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `body_binary_table_requestOrFolderMetaId_unique` ON `body_binary_table` (`requestOrFolderMetaId`);