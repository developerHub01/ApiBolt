CREATE TABLE `active_code_snippit_type_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`languageId` text DEFAULT 'javascript-fetch' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `active_project_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`active_project_id` text,
	FOREIGN KEY (`active_project_id`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `active_project_table_active_project_id_unique` ON `active_project_table` (`active_project_id`);--> statement-breakpoint
CREATE TABLE `active_sidebar_tab_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`tab` text DEFAULT 'navigate_projects' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `active_theme_table` (
	`projectId` text NOT NULL,
	`activeTheme` text,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`activeTheme`) REFERENCES `theme_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `active_theme_table_projectId_unique` ON `active_theme_table` (`projectId`);--> statement-breakpoint
CREATE UNIQUE INDEX `active_theme_unique_project` ON `active_theme_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `api_url_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`url` text DEFAULT 'http://localhost:3000' NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `api_url_table_requestOrFolderMetaId_unique` ON `api_url_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `authorization_table` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text DEFAULT 'no-auth' NOT NULL,
	`projectId` text NOT NULL,
	`requestOrFolderMetaId` text,
	`apiKeyKey` text DEFAULT '' NOT NULL,
	`apiKeyValue` text DEFAULT '' NOT NULL,
	`apiKeyAddTo` text DEFAULT 'header' NOT NULL,
	`bearerToken` text DEFAULT '' NOT NULL,
	`basicAuthUsername` text DEFAULT '' NOT NULL,
	`basicAuthPassword` text DEFAULT '' NOT NULL,
	`jwtAlgo` text DEFAULT 'HS256' NOT NULL,
	`jwtSecret` text DEFAULT '' NOT NULL,
	`jwtPayload` text DEFAULT '' NOT NULL,
	`jwtHeaderPrefix` text DEFAULT 'Bearer' NOT NULL,
	`jwtAddTo` text DEFAULT 'header' NOT NULL,
	`basicAuthToken` text DEFAULT '' NOT NULL,
	`jwtAuthToken` text DEFAULT '' NOT NULL,
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
	`isCheck` integer DEFAULT true NOT NULL,
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
	`type` text DEFAULT 'json' NOT NULL,
	`rawData` text DEFAULT '' NOT NULL,
	`lineWrap` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `body_raw_table_requestOrFolderMetaId_unique` ON `body_raw_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `body_x_www_form_urlencoded_table` (
	`id` text PRIMARY KEY NOT NULL,
	`isCheck` integer DEFAULT true NOT NULL,
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
	`projectId` text NOT NULL,
	`cookies` text,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cookies_table_projectId_unique` ON `cookies_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `environments_table` (
	`id` text PRIMARY KEY NOT NULL,
	`variable` text DEFAULT '' NOT NULL,
	`type` text DEFAULT 'default' NOT NULL,
	`value` text DEFAULT '' NOT NULL,
	`isCheck` integer DEFAULT true NOT NULL,
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
	`isCheck` integer DEFAULT true NOT NULL,
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
	`authorization` integer DEFAULT true NOT NULL,
	`userAgent` integer DEFAULT true NOT NULL,
	`contentLength` integer DEFAULT true NOT NULL,
	`accept` integer DEFAULT true NOT NULL,
	`acceptEncoding` integer DEFAULT true NOT NULL,
	`connection` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `hidden_headers_check_table_requestOrFolderMetaId_unique` ON `hidden_headers_check_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `history_table` (
	`id` text PRIMARY KEY NOT NULL,
	`request` text NOT NULL,
	`url` text NOT NULL,
	`method` text DEFAULT 'get' NOT NULL,
	`name` text NOT NULL,
	`params` text,
	`headers` text,
	`authorization` text,
	`body` text,
	`responseStatus` text,
	`responseSize` text,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`request`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `http_status_table` (
	`code` text PRIMARY KEY NOT NULL,
	`reason` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`editedReason` text,
	`editedDescription` text
);
--> statement-breakpoint
CREATE TABLE `keyboard_shortcut_table` (
	`id` text NOT NULL,
	`label` text DEFAULT '' NOT NULL,
	`key` text NOT NULL,
	`projectId` text NOT NULL,
	PRIMARY KEY(`id`, `projectId`),
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `local_password_table` (
	`id` text PRIMARY KEY DEFAULT 'singleton' NOT NULL,
	`password` text
);
--> statement-breakpoint
CREATE TABLE `meta_show_column_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`paramsValue` integer DEFAULT true NOT NULL,
	`paramsDescription` integer DEFAULT false NOT NULL,
	`headersValue` integer DEFAULT true NOT NULL,
	`headersDescription` integer DEFAULT false NOT NULL,
	`formDataValue` integer DEFAULT true NOT NULL,
	`formDataDescription` integer DEFAULT false NOT NULL,
	`xWWWFormUrlencodedValue` integer DEFAULT true NOT NULL,
	`xWWWFormUrlencodedDescription` integer DEFAULT false NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `meta_show_column_table_requestOrFolderMetaId_unique` ON `meta_show_column_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `params_table` (
	`id` text PRIMARY KEY NOT NULL,
	`isCheck` integer DEFAULT true NOT NULL,
	`key` text DEFAULT '' NOT NULL,
	`value` text DEFAULT '' NOT NULL,
	`keyType` text DEFAULT 'text' NOT NULL,
	`valueType` text DEFAULT 'text' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `projects_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT 'Project' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `request_meta_tab_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`activeMetaTab` text DEFAULT 'url' NOT NULL,
	`requestBodyType` text DEFAULT 'none' NOT NULL,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `request_meta_tab_table_requestOrFolderMetaId_unique` ON `request_meta_tab_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE TABLE `request_or_folder_meta_table` (
	`id` text PRIMARY KEY NOT NULL,
	`method` text DEFAULT 'null',
	`name` text DEFAULT '' NOT NULL,
	`projectId` text NOT NULL,
	`parentId` text,
	`isExpended` integer DEFAULT false NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`parentId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `setting_request_table` (
	`id` text PRIMARY KEY NOT NULL,
	`httpVersion` text,
	`requestTimeout` integer,
	`maxResponseSize` integer,
	`sslVerification` integer,
	`cookieTracking` integer,
	`projectId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `setting_request_table_projectId_unique` ON `setting_request_table` (`projectId`);--> statement-breakpoint
CREATE UNIQUE INDEX `setting_request_unique_project` ON `setting_request_table` (`projectId`);--> statement-breakpoint
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
	`activityBarVisible` integer,
	`tabListLayoutType` text,
	`projectId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `setting_table_projectId_unique` ON `setting_table` (`projectId`);--> statement-breakpoint
CREATE UNIQUE INDEX `setting_unique_project` ON `setting_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `show_hidden_meta_data_table` (
	`id` text PRIMARY KEY NOT NULL,
	`requestOrFolderMetaId` text NOT NULL,
	`showHiddenParams` integer DEFAULT false NOT NULL,
	`showHiddenHeaders` integer DEFAULT false NOT NULL,
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
CREATE UNIQUE INDEX `tabs_table_projectId_unique` ON `tabs_table` (`projectId`);--> statement-breakpoint
CREATE TABLE `theme_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT 'theme' NOT NULL,
	`type` text DEFAULT 'dark' NOT NULL,
	`author` text DEFAULT 'system' NOT NULL,
	`authorUsername` text,
	`thumbnail` text DEFAULT '' NOT NULL,
	`palette` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL
);
