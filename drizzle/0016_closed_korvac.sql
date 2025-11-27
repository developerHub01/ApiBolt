PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_api_url_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`url` text DEFAULT 'http://localhost:3000',
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_api_url_table`("id", "requestOrFolderMetaId", "url", "createdAt") SELECT "id", "requestOrFolderMetaId", "url", "createdAt" FROM `api_url_table`;--> statement-breakpoint
DROP TABLE `api_url_table`;--> statement-breakpoint
ALTER TABLE `__new_api_url_table` RENAME TO `api_url_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `api_url_table_requestOrFolderMetaId_unique` ON `api_url_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `__new_body_binary_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`path` text,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_body_binary_table`("id", "requestOrFolderMetaId", "path") SELECT "id", "requestOrFolderMetaId", "path" FROM `body_binary_table`;--> statement-breakpoint
DROP TABLE `body_binary_table`;--> statement-breakpoint
ALTER TABLE `__new_body_binary_table` RENAME TO `body_binary_table`;--> statement-breakpoint
CREATE UNIQUE INDEX `body_binary_table_requestOrFolderMetaId_unique` ON `body_binary_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `__new_body_form_data_table` (
	`id` text PRIMARY KEY NOT NULL,
	`isCheck` integer DEFAULT 1,
	`key` text DEFAULT '' NOT NULL,
	`value` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_body_form_data_table`("id", "isCheck", "key", "value", "description", "requestOrFolderMetaId", "createdAt") SELECT "id", "isCheck", "key", "value", "description", "requestOrFolderMetaId", "createdAt" FROM `body_form_data_table`;--> statement-breakpoint
DROP TABLE `body_form_data_table`;--> statement-breakpoint
ALTER TABLE `__new_body_form_data_table` RENAME TO `body_form_data_table`;--> statement-breakpoint
CREATE TABLE `__new_body_raw_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`type` text DEFAULT 'json',
	`rawData` text DEFAULT '',
	`lineWrap` integer DEFAULT 1,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_body_raw_table`("id", "requestOrFolderMetaId", "type", "rawData", "lineWrap") SELECT "id", "requestOrFolderMetaId", "type", "rawData", "lineWrap" FROM `body_raw_table`;--> statement-breakpoint
DROP TABLE `body_raw_table`;--> statement-breakpoint
ALTER TABLE `__new_body_raw_table` RENAME TO `body_raw_table`;--> statement-breakpoint
CREATE UNIQUE INDEX `body_raw_table_requestOrFolderMetaId_unique` ON `body_raw_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `__new_body_x_www_form_urlencoded_table` (
	`id` text PRIMARY KEY NOT NULL,
	`isCheck` integer DEFAULT 1,
	`key` text DEFAULT '' NOT NULL,
	`value` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_body_x_www_form_urlencoded_table`("id", "isCheck", "key", "value", "description", "requestOrFolderMetaId", "createdAt") SELECT "id", "isCheck", "key", "value", "description", "requestOrFolderMetaId", "createdAt" FROM `body_x_www_form_urlencoded_table`;--> statement-breakpoint
DROP TABLE `body_x_www_form_urlencoded_table`;--> statement-breakpoint
ALTER TABLE `__new_body_x_www_form_urlencoded_table` RENAME TO `body_x_www_form_urlencoded_table`;--> statement-breakpoint
CREATE TABLE `__new_headers_table` (
	`id` text PRIMARY KEY NOT NULL,
	`isCheck` integer DEFAULT 1,
	`key` text DEFAULT '' NOT NULL,
	`value` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_headers_table`("id", "isCheck", "key", "value", "description", "requestOrFolderMetaId", "createdAt") SELECT "id", "isCheck", "key", "value", "description", "requestOrFolderMetaId", "createdAt" FROM `headers_table`;--> statement-breakpoint
DROP TABLE `headers_table`;--> statement-breakpoint
ALTER TABLE `__new_headers_table` RENAME TO `headers_table`;--> statement-breakpoint
CREATE TABLE `__new_hidden_headers_check_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`authorization` integer DEFAULT 1,
	`userAgent` integer DEFAULT 1,
	`contentLength` integer DEFAULT 1,
	`accept` integer DEFAULT 1,
	`acceptEncoding` integer DEFAULT 1,
	`connection` integer DEFAULT 1,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_hidden_headers_check_table`("id", "requestOrFolderMetaId", "authorization", "userAgent", "contentLength", "accept", "acceptEncoding", "connection") SELECT "id", "requestOrFolderMetaId", "authorization", "userAgent", "contentLength", "accept", "acceptEncoding", "connection" FROM `hidden_headers_check_table`;--> statement-breakpoint
DROP TABLE `hidden_headers_check_table`;--> statement-breakpoint
ALTER TABLE `__new_hidden_headers_check_table` RENAME TO `hidden_headers_check_table`;--> statement-breakpoint
CREATE UNIQUE INDEX `hidden_headers_check_table_requestOrFolderMetaId_unique` ON `hidden_headers_check_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `__new_params_table` (
	`id` text PRIMARY KEY NOT NULL,
	`isCheck` integer DEFAULT 1,
	`key` text DEFAULT '' NOT NULL,
	`value` text DEFAULT '' NOT NULL,
	`keyType` text DEFAULT 'text',
	`valueType` text DEFAULT 'text',
	`description` text DEFAULT '' NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_params_table`("id", "isCheck", "key", "value", "keyType", "valueType", "description", "requestOrFolderMetaId", "createdAt") SELECT "id", "isCheck", "key", "value", "keyType", "valueType", "description", "requestOrFolderMetaId", "createdAt" FROM `params_table`;--> statement-breakpoint
DROP TABLE `params_table`;--> statement-breakpoint
ALTER TABLE `__new_params_table` RENAME TO `params_table`;--> statement-breakpoint
CREATE TABLE `__new_request_meta_tab_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`activeMetaTab` text,
	`requestBodyType` text,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_request_meta_tab_table`("id", "requestOrFolderMetaId", "activeMetaTab", "requestBodyType") SELECT "id", "requestOrFolderMetaId", "activeMetaTab", "requestBodyType" FROM `request_meta_tab_table`;--> statement-breakpoint
DROP TABLE `request_meta_tab_table`;--> statement-breakpoint
ALTER TABLE `__new_request_meta_tab_table` RENAME TO `request_meta_tab_table`;--> statement-breakpoint
CREATE UNIQUE INDEX `request_meta_tab_table_requestOrFolderMetaId_unique` ON `request_meta_tab_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE UNIQUE INDEX `folder_table_requestOrFolderMetaId_unique` ON `folder_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE UNIQUE INDEX `meta_show_column_table_requestOrFolderMetaId_unique` ON `meta_show_column_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE UNIQUE INDEX `show_hidden_meta_data_table_requestOrFolderMetaId_unique` ON `show_hidden_meta_data_table` (`requestOrFolderMetaId`);