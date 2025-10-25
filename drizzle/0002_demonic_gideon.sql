CREATE TABLE `keyboard_shortcut_table` (
	`id` text NOT NULL,
	`lable` text DEFAULT '',
	`key` text,
	`projectId` text,
	PRIMARY KEY(`id`, `projectId`),
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `keyboard_shortcut_table_projectId_unique` ON `keyboard_shortcut_table` (`projectId`);