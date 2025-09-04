ALTER TABLE `request_tab_table` RENAME TO `request_meta_tab_table`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_request_meta_tab_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`requestBodyType` text,
	`rawRequestBodyType` text,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_request_meta_tab_table`("id", "requestOrFolderMetaId", "requestBodyType", "rawRequestBodyType") SELECT "id", "requestOrFolderMetaId", "requestBodyType", "rawRequestBodyType" FROM `request_meta_tab_table`;--> statement-breakpoint
DROP TABLE `request_meta_tab_table`;--> statement-breakpoint
ALTER TABLE `__new_request_meta_tab_table` RENAME TO `request_meta_tab_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `request_meta_tab_table_requestOrFolderMetaId_unique` ON `request_meta_tab_table` (`requestOrFolderMetaId`);