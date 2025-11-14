ALTER TABLE `active_active_sidebar_tab_table` RENAME TO `active_sidebar_tab_table`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_active_sidebar_tab_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`tab` text DEFAULT 'navigate_project'
);
--> statement-breakpoint
INSERT INTO `__new_active_sidebar_tab_table`("id", "tab") SELECT "id", "tab" FROM `active_sidebar_tab_table`;--> statement-breakpoint
DROP TABLE `active_sidebar_tab_table`;--> statement-breakpoint
ALTER TABLE `__new_active_sidebar_tab_table` RENAME TO `active_sidebar_tab_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_active_theme_table` (
	`projectId` text,
	`activeTheme` text,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`activeTheme`) REFERENCES `theme_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_active_theme_table`("projectId", "activeTheme") SELECT "projectId", "activeTheme" FROM `active_theme_table`;--> statement-breakpoint
DROP TABLE `active_theme_table`;--> statement-breakpoint
ALTER TABLE `__new_active_theme_table` RENAME TO `active_theme_table`;