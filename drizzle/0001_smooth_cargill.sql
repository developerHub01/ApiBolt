PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cookies_table` (
	`id` text PRIMARY KEY NOT NULL,
	`projectId` text,
	`cookies` text,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_cookies_table`("id", "projectId", "cookies") SELECT "id", "projectId", "cookies" FROM `cookies_table`;--> statement-breakpoint
DROP TABLE `cookies_table`;--> statement-breakpoint
ALTER TABLE `__new_cookies_table` RENAME TO `cookies_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `cookies_table_projectId_unique` ON `cookies_table` (`projectId`);--> statement-breakpoint
ALTER TABLE `setting_table` ADD `activityBarVisible` integer;