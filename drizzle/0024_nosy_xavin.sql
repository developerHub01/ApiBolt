CREATE TABLE `request_tab_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`requestBodyType` text,
	`rawRequestBodyType` text,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `request_tab_table_requestOrFolderMetaId_unique` ON `request_tab_table` (`requestOrFolderMetaId`);