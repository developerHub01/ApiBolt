CREATE TABLE `api_url_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`url` text DEFAULT 'http://localhost:3000',
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `api_url_table_requestOrFolderMetaId_unique` ON `api_url_table` (`requestOrFolderMetaId`);