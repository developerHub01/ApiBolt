PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_http_status_table` (
	`code` integer PRIMARY KEY NOT NULL,
	`reason` text DEFAULT '',
	`description` text DEFAULT '',
	`editedReason` text,
	`editedDescription` text
);
--> statement-breakpoint
INSERT INTO `__new_http_status_table`("code", "reason", "description", "editedReason", "editedDescription") SELECT "code", "reason", "description", "editedReason", "editedDescription" FROM `http_status_table`;--> statement-breakpoint
DROP TABLE `http_status_table`;--> statement-breakpoint
ALTER TABLE `__new_http_status_table` RENAME TO `http_status_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;