CREATE TABLE `request_or_folder_meta_table` (
	`id` text PRIMARY KEY NOT NULL,
	`method` text,
	`name` text DEFAULT '',
	`projectId` text NOT NULL,
	`parentId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parentId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE no action
);
