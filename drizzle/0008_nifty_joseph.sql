CREATE TABLE `folder_table` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`projectId` text NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folder_table_projectId_unique` ON `folder_table` (`projectId`);--> statement-breakpoint
CREATE UNIQUE INDEX `folder_table_requestOrFolderMetaId_unique` ON `folder_table` (`requestOrFolderMetaId`);