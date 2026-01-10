PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_active_theme_table` (
	`projectId` text NOT NULL,
	`activeTheme` text,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`activeTheme`) REFERENCES `theme_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_active_theme_table`("projectId", "activeTheme") SELECT "projectId", "activeTheme" FROM `active_theme_table`;--> statement-breakpoint
DROP TABLE `active_theme_table`;--> statement-breakpoint
ALTER TABLE `__new_active_theme_table` RENAME TO `active_theme_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `active_theme_table_projectId_unique` ON `active_theme_table` (`projectId`);--> statement-breakpoint
CREATE UNIQUE INDEX `active_theme_unique_project` ON `active_theme_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `__new_keyboard_shortcut_table` (
	`id` text NOT NULL,
	`label` text DEFAULT '' NOT NULL,
	`key` text NOT NULL,
	`projectId` text NOT NULL,
	PRIMARY KEY(`id`, `projectId`),
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_keyboard_shortcut_table`("id", "label", "key", "projectId") SELECT "id", "label", "key", "projectId" FROM `keyboard_shortcut_table`;--> statement-breakpoint
DROP TABLE `keyboard_shortcut_table`;--> statement-breakpoint
ALTER TABLE `__new_keyboard_shortcut_table` RENAME TO `keyboard_shortcut_table`;