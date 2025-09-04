CREATE TABLE `body_raw_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`text` text,
	`javascript` text,
	`json` text,
	`html` text,
	`xml` text,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `body_raw_table_requestOrFolderMetaId_unique` ON `body_raw_table` (`requestOrFolderMetaId`);