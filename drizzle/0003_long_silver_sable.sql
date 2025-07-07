CREATE TABLE `environments_table` (
	`id` text PRIMARY KEY NOT NULL,
	`variable` text,
	`type` text,
	`value` text,
	`projectId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE no action
);
