PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_environments_table` (
	`id` text PRIMARY KEY NOT NULL,
	`variable` text,
	`type` text DEFAULT 'default',
	`value` text,
	`isCheck` integer DEFAULT 1 NOT NULL,
	`projectId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_environments_table`("id", "variable", "type", "value", "isCheck", "projectId") SELECT "id", "variable", "type", "value", 1, "projectId" FROM `environments_table`;--> statement-breakpoint
DROP TABLE `environments_table`;--> statement-breakpoint
ALTER TABLE `__new_environments_table` RENAME TO `environments_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;