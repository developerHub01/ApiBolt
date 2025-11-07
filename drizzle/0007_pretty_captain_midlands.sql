ALTER TABLE `history_table` ADD `body` text;--> statement-breakpoint
ALTER TABLE `history_table` DROP COLUMN `formData`;--> statement-breakpoint
ALTER TABLE `history_table` DROP COLUMN `xWWWFormUrlencoded`;--> statement-breakpoint
ALTER TABLE `history_table` DROP COLUMN `binaryData`;--> statement-breakpoint
ALTER TABLE `history_table` DROP COLUMN `raw`;--> statement-breakpoint
ALTER TABLE `history_table` DROP COLUMN `rawType`;--> statement-breakpoint
ALTER TABLE `history_table` DROP COLUMN `requestBodyType`;