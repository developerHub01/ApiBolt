ALTER TABLE `body_raw_table` ADD `type` text DEFAULT 'json';--> statement-breakpoint
ALTER TABLE `body_raw_table` ADD `rawData` text DEFAULT '';--> statement-breakpoint
ALTER TABLE `body_raw_table` DROP COLUMN `text`;--> statement-breakpoint
ALTER TABLE `body_raw_table` DROP COLUMN `javascript`;--> statement-breakpoint
ALTER TABLE `body_raw_table` DROP COLUMN `json`;--> statement-breakpoint
ALTER TABLE `body_raw_table` DROP COLUMN `html`;--> statement-breakpoint
ALTER TABLE `body_raw_table` DROP COLUMN `xml`;