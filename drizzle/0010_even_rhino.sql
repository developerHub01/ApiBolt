PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_active_theme_table` (
	`projectId` text,
	`activeTheme` text NOT NULL,
	PRIMARY KEY(`projectId`, `activeTheme`),
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`activeTheme`) REFERENCES `theme_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_active_theme_table`("projectId", "activeTheme") SELECT "projectId", "activeTheme" FROM `active_theme_table`;--> statement-breakpoint
DROP TABLE `active_theme_table`;--> statement-breakpoint
ALTER TABLE `__new_active_theme_table` RENAME TO `active_theme_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;