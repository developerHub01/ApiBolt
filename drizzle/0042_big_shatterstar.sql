CREATE TABLE `http_status_table` (
	`id` text PRIMARY KEY NOT NULL,
	`projectId` text DEFAULT 'null',
	`code` integer NOT NULL,
	`reason` text DEFAULT '',
	`description` text DEFAULT '',
	`editedReason` text DEFAULT '',
	`editedDescription` text DEFAULT '',
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_code_per_project` ON `http_status_table` (`projectId`,`code`);