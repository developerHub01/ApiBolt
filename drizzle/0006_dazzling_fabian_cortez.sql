PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_theme_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT 'theme' NOT NULL,
	`type` text DEFAULT 'dark' NOT NULL,
	`url` text DEFAULT '' NOT NULL,
	`author` text DEFAULT 'system' NOT NULL,
	`thumbnail` text DEFAULT '' NOT NULL,
	`palette` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_theme_table`("id", "name", "type", "url", "author", "thumbnail", "palette", "createdAt") SELECT "id", "name", "type", "url", "author", "thumbnail", "palette", "createdAt" FROM `theme_table`;--> statement-breakpoint
DROP TABLE `theme_table`;--> statement-breakpoint
ALTER TABLE `__new_theme_table` RENAME TO `theme_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;