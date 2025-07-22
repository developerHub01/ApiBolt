DROP TABLE `users_table`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_authorization_table` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text DEFAULT 'no-auth' NOT NULL,
	`projectId` text NOT NULL,
	`apiKeyKey` text,
	`apiKeyValue` text,
	`apiKeyAddTo` text,
	`bearerToken` text,
	`basicAuthUsername` text,
	`basicAuthPassword` text,
	`jwtAlgo` text,
	`jwtSecret` text,
	`jwtPayload` text,
	`jwtHeaderPrefix` text,
	`jwtAddTo` text,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_authorization_table`("id", "type", "projectId", "apiKeyKey", "apiKeyValue", "apiKeyAddTo", "bearerToken", "basicAuthUsername", "basicAuthPassword", "jwtAlgo", "jwtSecret", "jwtPayload", "jwtHeaderPrefix", "jwtAddTo") SELECT "id", "type", "projectId", "apiKeyKey", "apiKeyValue", "apiKeyAddTo", "bearerToken", "basicAuthUsername", "basicAuthPassword", "jwtAlgo", "jwtSecret", "jwtPayload", "jwtHeaderPrefix", "jwtAddTo" FROM `authorization_table`;--> statement-breakpoint
DROP TABLE `authorization_table`;--> statement-breakpoint
ALTER TABLE `__new_authorization_table` RENAME TO `authorization_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `authorization_table_projectId_unique` ON `authorization_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `__new_environments_table` (
	`id` text PRIMARY KEY NOT NULL,
	`variable` text,
	`type` text DEFAULT 'default',
	`value` text,
	`isCheck` integer DEFAULT 1 NOT NULL,
	`projectId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_environments_table`("id", "variable", "type", "value", "isCheck", "projectId", "createdAt") SELECT "id", "variable", "type", "value", "isCheck", "projectId", "createdAt" FROM `environments_table`;--> statement-breakpoint
DROP TABLE `environments_table`;--> statement-breakpoint
ALTER TABLE `__new_environments_table` RENAME TO `environments_table`;--> statement-breakpoint
CREATE TABLE `__new_request_or_folder_meta_table` (
	`id` text PRIMARY KEY NOT NULL,
	`method` text,
	`name` text DEFAULT '',
	`projectId` text NOT NULL,
	`parentId` text,
	`isExpended` integer DEFAULT 0 NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`parentId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_request_or_folder_meta_table`("id", "method", "name", "projectId", "parentId", "isExpended", "createdAt") SELECT "id", "method", "name", "projectId", "parentId", "isExpended", "createdAt" FROM `request_or_folder_meta_table`;--> statement-breakpoint
DROP TABLE `request_or_folder_meta_table`;--> statement-breakpoint
ALTER TABLE `__new_request_or_folder_meta_table` RENAME TO `request_or_folder_meta_table`;--> statement-breakpoint
CREATE TABLE `__new_tabs_table` (
	`id` text PRIMARY KEY NOT NULL,
	`openTabs` text DEFAULT '[]' NOT NULL,
	`selectedTab` text,
	`projectId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`selectedTab`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tabs_table`("id", "openTabs", "selectedTab", "projectId", "createdAt") SELECT "id", "openTabs", "selectedTab", "projectId", "createdAt" FROM `tabs_table`;--> statement-breakpoint
DROP TABLE `tabs_table`;--> statement-breakpoint
ALTER TABLE `__new_tabs_table` RENAME TO `tabs_table`;--> statement-breakpoint
CREATE UNIQUE INDEX `tabs_table_projectId_unique` ON `tabs_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `__new_active_project_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`active_project_id` text,
	FOREIGN KEY (`active_project_id`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_active_project_table`("id", "active_project_id") SELECT "id", "active_project_id" FROM `active_project_table`;--> statement-breakpoint
DROP TABLE `active_project_table`;--> statement-breakpoint
ALTER TABLE `__new_active_project_table` RENAME TO `active_project_table`;