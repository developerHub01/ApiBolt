PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_request_or_folder_meta_table` (
	`id` text PRIMARY KEY NOT NULL,
	`method` text DEFAULT 'null',
	`name` text DEFAULT '' NOT NULL,
	`projectId` text NOT NULL,
	`parentId` text,
	`isExpended` integer DEFAULT false NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`parentId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_request_or_folder_meta_table`("id", "method", "name", "projectId", "parentId", "isExpended", "createdAt") SELECT "id", "method", "name", "projectId", "parentId", "isExpended", "createdAt" FROM `request_or_folder_meta_table`;--> statement-breakpoint
DROP TABLE `request_or_folder_meta_table`;--> statement-breakpoint
ALTER TABLE `__new_request_or_folder_meta_table` RENAME TO `request_or_folder_meta_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;