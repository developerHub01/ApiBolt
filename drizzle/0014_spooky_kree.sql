CREATE TABLE `hidden_headers_check_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`userAgent` integer DEFAULT 1,
	`contentLength` integer DEFAULT 1,
	`accept` integer DEFAULT 1,
	`acceptEncoding` integer DEFAULT 1,
	`connection` integer DEFAULT 1,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
