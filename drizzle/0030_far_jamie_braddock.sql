CREATE TABLE `meta_show_column_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`type` text DEFAULT 'params' NOT NULL,
	`value` integer DEFAULT 1,
	`description` integer DEFAULT 0,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
