CREATE TABLE `show_hidden_meta_data_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`showHiddenParams` integer DEFAULT 0,
	`showHiddenHeaders` integer DEFAULT 0,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `show_hidden_meta_data_table_requestOrFolderMetaId_unique` ON `show_hidden_meta_data_table` (`requestOrFolderMetaId`);