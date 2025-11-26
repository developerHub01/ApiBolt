PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_meta_show_column_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`paramsValue` integer DEFAULT 1,
	`paramsDescription` integer DEFAULT 0,
	`headersValue` integer DEFAULT 1,
	`headersDescription` integer DEFAULT 0,
	`formDataValue` integer DEFAULT 1,
	`formDataDescription` integer DEFAULT 0,
	`xWWWFormUrlencodedValue` integer DEFAULT 1,
	`xWWWFormUrlencodedDescription` integer DEFAULT 0,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_meta_show_column_table`("id", "requestOrFolderMetaId", "paramsValue", "paramsDescription", "headersValue", "headersDescription", "formDataValue", "formDataDescription", "xWWWFormUrlencodedValue", "xWWWFormUrlencodedDescription", "createdAt") SELECT "id", "requestOrFolderMetaId", "paramsValue", "paramsDescription", "headersValue", "headersDescription", "formDataValue", "formDataDescription", "xWWWFormUrlencodedValue", "xWWWFormUrlencodedDescription", "createdAt" FROM `meta_show_column_table`;--> statement-breakpoint
DROP TABLE `meta_show_column_table`;--> statement-breakpoint
ALTER TABLE `__new_meta_show_column_table` RENAME TO `meta_show_column_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `meta_show_column_table_requestOrFolderMetaId_unique` ON `meta_show_column_table` (`requestOrFolderMetaId`);