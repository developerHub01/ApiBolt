PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_active_sidebar_tab_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`tab` text DEFAULT 'navigate_projects'
);
--> statement-breakpoint
INSERT INTO `__new_active_sidebar_tab_table`("id", "tab") SELECT "id", "tab" FROM `active_sidebar_tab_table`;--> statement-breakpoint
DROP TABLE `active_sidebar_tab_table`;--> statement-breakpoint
ALTER TABLE `__new_active_sidebar_tab_table` RENAME TO `active_sidebar_tab_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;