PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_request_or_folder_meta_table` (
	`id` text PRIMARY KEY NOT NULL,
	`method` text,
	`name` text DEFAULT '',
	`projectId` text NOT NULL,
	`parentId` text,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parentId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_request_or_folder_meta_table`("id", "method", "name", "projectId", "parentId") SELECT "id", "method", "name", "projectId", "parentId" FROM `request_or_folder_meta_table`;--> statement-breakpoint
DROP TABLE `request_or_folder_meta_table`;--> statement-breakpoint
ALTER TABLE `__new_request_or_folder_meta_table` RENAME TO `request_or_folder_meta_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;