PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_authorization_table` (
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
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`requestOrFolderMetaId`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_authorization_table`("id", "type", "projectId", "requestOrFolderMetaId", "apiKeyKey", "apiKeyValue", "apiKeyAddTo", "bearerToken", "basicAuthUsername", "basicAuthPassword", "jwtAlgo", "jwtSecret", "jwtPayload", "jwtHeaderPrefix", "jwtAddTo") SELECT "id", "type", "projectId", "requestOrFolderMetaId", "apiKeyKey", "apiKeyValue", "apiKeyAddTo", "bearerToken", "basicAuthUsername", "basicAuthPassword", "jwtAlgo", "jwtSecret", "jwtPayload", "jwtHeaderPrefix", "jwtAddTo" FROM `authorization_table`;--> statement-breakpoint
DROP TABLE `authorization_table`;--> statement-breakpoint
ALTER TABLE `__new_authorization_table` RENAME TO `authorization_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `authorization_table_requestOrFolderMetaId_unique` ON `authorization_table` (`requestOrFolderMetaId`);