PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_http_status_table` (
	`id` text PRIMARY KEY NOT NULL,
	`code` integer NOT NULL,
	`reason` text DEFAULT '',
	`description` text DEFAULT '',
	`editedReason` text DEFAULT '',
	`editedDescription` text DEFAULT ''
);
--> statement-breakpoint
INSERT INTO `__new_http_status_table`("id", "code", "reason", "description", "editedReason", "editedDescription") SELECT "id", "code", "reason", "description", "editedReason", "editedDescription" FROM `http_status_table`;--> statement-breakpoint
DROP TABLE `http_status_table`;--> statement-breakpoint
ALTER TABLE `__new_http_status_table` RENAME TO `http_status_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `http_status_table_code_unique` ON `http_status_table` (`code`);