ALTER TABLE `meta_show_column_table` ADD `paramsValue` integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE `meta_show_column_table` ADD `paramsDescription` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `meta_show_column_table` ADD `headersValue` integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE `meta_show_column_table` ADD `headersDescription` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `meta_show_column_table` ADD `formDataValue` integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE `meta_show_column_table` ADD `formDataDescription` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `meta_show_column_table` ADD `xWWWFormUrlencodedValue` integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE `meta_show_column_table` ADD `xWWWFormUrlencodedDescription` integer DEFAULT 0;--> statement-breakpoint
CREATE UNIQUE INDEX `meta_show_column_table_requestOrFolderMetaId_unique` ON `meta_show_column_table` (`requestOrFolderMetaId`);--> statement-breakpoint
ALTER TABLE `meta_show_column_table` DROP COLUMN `type`;--> statement-breakpoint
ALTER TABLE `meta_show_column_table` DROP COLUMN `value`;--> statement-breakpoint
ALTER TABLE `meta_show_column_table` DROP COLUMN `description`;