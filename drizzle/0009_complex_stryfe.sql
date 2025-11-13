CREATE TABLE `active_theme_table` (
	`projectId` text PRIMARY KEY NOT NULL,
	`activeTheme` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`activeTheme`) REFERENCES `theme_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `theme_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`type` text,
	`url` text DEFAULT '',
	`author` text DEFAULT 'system',
	`thumbnail` text,
	`palette` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL
);
