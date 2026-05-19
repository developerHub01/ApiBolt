CREATE TABLE `mock_request_or_folder_meta_table` (
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
CREATE TABLE `mock_tabs_table` (
	`id` text PRIMARY KEY NOT NULL,
	`openTabs` text DEFAULT '[]' NOT NULL,
	`selectedTab` text,
	`projectId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mock_tabs_table_projectId_unique` ON `mock_tabs_table` (`projectId`);