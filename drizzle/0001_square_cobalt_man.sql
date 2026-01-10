PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_setting_request_table` (
	`id` text PRIMARY KEY NOT NULL,
	`httpVersion` text,
	`requestTimeout` integer,
	`maxResponseSize` integer,
	`sslVerification` integer,
	`cookieTracking` integer,
	`projectId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_setting_request_table`("id", "httpVersion", "requestTimeout", "maxResponseSize", "sslVerification", "cookieTracking", "projectId") SELECT "id", "httpVersion", "requestTimeout", "maxResponseSize", "sslVerification", "cookieTracking", "projectId" FROM `setting_request_table`;--> statement-breakpoint
DROP TABLE `setting_request_table`;--> statement-breakpoint
ALTER TABLE `__new_setting_request_table` RENAME TO `setting_request_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `setting_request_table_projectId_unique` ON `setting_request_table` (`projectId`);--> statement-breakpoint
CREATE UNIQUE INDEX `setting_request_unique_project` ON `setting_request_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `__new_setting_table` (
	`id` text PRIMARY KEY NOT NULL,
	`backgroundImages` text,
	`backgroundOpacity` real,
	`backgroundBlur` integer,
	`maxNumberOfImages` integer,
	`slideInterval` integer,
	`zoomLevel` real,
	`isZoomable` integer,
	`codeFontSize` integer,
	`indentationSize` integer,
	`layoutType` text,
	`activityBarVisible` integer,
	`tabListLayoutType` text,
	`projectId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_setting_table`("id", "backgroundImages", "backgroundOpacity", "backgroundBlur", "maxNumberOfImages", "slideInterval", "zoomLevel", "isZoomable", "codeFontSize", "indentationSize", "layoutType", "activityBarVisible", "tabListLayoutType", "projectId") SELECT "id", "backgroundImages", "backgroundOpacity", "backgroundBlur", "maxNumberOfImages", "slideInterval", "zoomLevel", "isZoomable", "codeFontSize", "indentationSize", "layoutType", "activityBarVisible", "tabListLayoutType", "projectId" FROM `setting_table`;--> statement-breakpoint
DROP TABLE `setting_table`;--> statement-breakpoint
ALTER TABLE `__new_setting_table` RENAME TO `setting_table`;--> statement-breakpoint
CREATE UNIQUE INDEX `setting_table_projectId_unique` ON `setting_table` (`projectId`);--> statement-breakpoint
CREATE UNIQUE INDEX `setting_unique_project` ON `setting_table` (`projectId`);