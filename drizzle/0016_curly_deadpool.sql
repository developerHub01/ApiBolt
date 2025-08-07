PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_setting_table` (
	`id` text PRIMARY KEY NOT NULL,
	`backgroundImages` text,
	`backgroundOpacity` real,
	`backgroundBlur` integer,
	`zoomLevel` real,
	`isZoomable` integer,
	`codeFontSize` integer,
	`indentationSize` integer,
	`layoutType` text,
	`projectId` text,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_setting_table`("id", "backgroundImages", "backgroundOpacity", "backgroundBlur", "zoomLevel", "isZoomable", "codeFontSize", "indentationSize", "layoutType", "projectId") SELECT "id", "backgroundImages", "backgroundOpacity", "backgroundBlur", "zoomLevel", "isZoomable", "codeFontSize", "indentationSize", "layoutType", "projectId" FROM `setting_table`;--> statement-breakpoint
DROP TABLE `setting_table`;--> statement-breakpoint
ALTER TABLE `__new_setting_table` RENAME TO `setting_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;