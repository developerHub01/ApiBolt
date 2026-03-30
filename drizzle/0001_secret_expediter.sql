CREATE TABLE `test_script_table` (
	`requestOrFolderMetaId` text PRIMARY KEY NOT NULL,
	`script` text,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `test_script_table_requestOrFolderMetaId_unique` ON `test_script_table` (`requestOrFolderMetaId`);