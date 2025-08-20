CREATE TABLE `body_form_data_table` (
	`id` text PRIMARY KEY NOT NULL,
	`isCheck` integer DEFAULT 1,
	`key` text DEFAULT '' NOT NULL,
	`value` text DEFAULT '' NOT NULL,
	`type` text DEFAULT 'text' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
