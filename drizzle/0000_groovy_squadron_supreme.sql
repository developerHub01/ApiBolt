CREATE TABLE `active_project_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`active_project_id` text
);
--> statement-breakpoint
CREATE TABLE `authorization_table` (
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
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authorization_table_projectId_unique` ON `authorization_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `environments_table` (
	`id` text PRIMARY KEY NOT NULL,
	`variable` text,
	`type` text DEFAULT 'default',
	`value` text,
	`isCheck` integer DEFAULT 1 NOT NULL,
	`projectId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `projects_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);