CREATE TABLE `active_code_snippit_type_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`languageId` text
);
--> statement-breakpoint
CREATE TABLE `active_project_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`active_project_id` text,
	FOREIGN KEY (`active_project_id`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `active_project_table_active_project_id_unique` ON `active_project_table` (`active_project_id`);--> statement-breakpoint
CREATE TABLE `active_active_sidebar_tab_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`tab` text DEFAULT 'project'
);
--> statement-breakpoint
CREATE TABLE `api_url_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`url` text DEFAULT 'http://localhost:3000',
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `api_url_table_requestOrFolderMetaId_unique` ON `api_url_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `authorization_table` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`projectId` text NOT NULL,
	`requestOrFolderMetaId` text,
	`apiKeyKey` text DEFAULT '',
	`apiKeyValue` text DEFAULT '',
	`apiKeyAddTo` text DEFAULT 'header',
	`bearerToken` text DEFAULT '',
	`basicAuthUsername` text DEFAULT '',
	`basicAuthPassword` text DEFAULT '',
	`jwtAlgo` text DEFAULT 'HS256',
	`jwtSecret` text DEFAULT '',
	`jwtPayload` text DEFAULT '',
	`jwtHeaderPrefix` text DEFAULT 'Bearer',
	`jwtAddTo` text DEFAULT 'header',
	`basicAuthToken` text DEFAULT '',
	`jwtAuthToken` text DEFAULT '',
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authorization_table_requestOrFolderMetaId_unique` ON `authorization_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `body_binary_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`path` text,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `body_binary_table_requestOrFolderMetaId_unique` ON `body_binary_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `body_form_data_table` (
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
CREATE TABLE `body_raw_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`type` text DEFAULT 'json',
	`rawData` text DEFAULT '',
	`lineWrap` integer DEFAULT 1,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `body_raw_table_requestOrFolderMetaId_unique` ON `body_raw_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `body_x_www_form_urlencoded_table` (
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
CREATE TABLE `cookies_table` (
	`id` text PRIMARY KEY NOT NULL,
	`projectId` text,
	`cookies` text DEFAULT '[]',
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cookies_table_projectId_unique` ON `cookies_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `environments_table` (
	`id` text PRIMARY KEY NOT NULL,
	`variable` text,
	`type` text DEFAULT 'default',
	`value` text,
	`isCheck` integer DEFAULT 1 NOT NULL,
	`projectId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `folder_table` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`projectId` text NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folder_table_requestOrFolderMetaId_unique` ON `folder_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `headers_table` (
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
CREATE TABLE `hidden_headers_check_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`userAgent` integer DEFAULT 1,
	`contentLength` integer DEFAULT 1,
	`accept` integer DEFAULT 1,
	`acceptEncoding` integer DEFAULT 1,
	`connection` integer DEFAULT 1,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `hidden_headers_check_table_requestOrFolderMetaId_unique` ON `hidden_headers_check_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `http_status_table` (
	`code` text PRIMARY KEY NOT NULL,
	`reason` text DEFAULT '',
	`description` text DEFAULT '',
	`editedReason` text,
	`editedDescription` text
);
--> statement-breakpoint
CREATE TABLE `meta_show_column_table` (
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
CREATE UNIQUE INDEX `meta_show_column_table_requestOrFolderMetaId_unique` ON `meta_show_column_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `params_table` (
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
CREATE TABLE `projects_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `request_meta_tab_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`activeMetaTab` text,
	`requestBodyType` text,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `request_meta_tab_table_requestOrFolderMetaId_unique` ON `request_meta_tab_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `request_or_folder_meta_table` (
	`id` text PRIMARY KEY NOT NULL,
	`method` text,
	`name` text DEFAULT '',
	`projectId` text NOT NULL,
	`parentId` text,
	`isExpended` integer DEFAULT 0 NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`parentId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `setting_table` (
	`id` text PRIMARY KEY NOT NULL,
	`backgroundImages` text,
	`backgroundOpacity` real,
	`backgroundBlur` integer,
	`maxNumberOfImages` integer,
	`slideInterval` integer,
	`zoomLevel` real,
	`isZoomable` integer,
	`codeFontSize` integer,
	`indentationSize` integer,
	`layoutType` text,
	`projectId` text,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `setting_table_projectId_unique` ON `setting_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `show_hidden_meta_data_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`showHiddenParams` integer DEFAULT 0,
	`showHiddenHeaders` integer DEFAULT 0,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `show_hidden_meta_data_table_requestOrFolderMetaId_unique` ON `show_hidden_meta_data_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `tabs_table` (
	`id` text PRIMARY KEY NOT NULL,
	`openTabs` text DEFAULT '[]' NOT NULL,
	`selectedTab` text,
	`projectId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tabs_table_projectId_unique` ON `tabs_table` (`projectId`);