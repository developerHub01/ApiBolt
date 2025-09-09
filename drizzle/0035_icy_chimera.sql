PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tabs_table` (
	`id` text PRIMARY KEY NOT NULL,
	`openTabs` text DEFAULT '[]' NOT NULL,
	`selectedTab` text,
	`projectId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tabs_table`("id", "openTabs", "selectedTab", "projectId", "createdAt") SELECT "id", "openTabs", "selectedTab", "projectId", "createdAt" FROM `tabs_table`;--> statement-breakpoint
DROP TABLE `tabs_table`;--> statement-breakpoint
ALTER TABLE `__new_tabs_table` RENAME TO `tabs_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `tabs_table_projectId_unique` ON `tabs_table` (`projectId`);