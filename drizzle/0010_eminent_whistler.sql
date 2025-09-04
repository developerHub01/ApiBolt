CREATE TABLE `setting_table` (
	`id` text PRIMARY KEY NOT NULL,
	`backgroundImages` text DEFAULT '[]' NOT NULL,
	`backgroundOpacity` integer DEFAULT 90 NOT NULL,
	`backgroundBlur` integer DEFAULT 0 NOT NULL,
	`zoomLevel` integer DEFAULT 100 NOT NULL,
	`isZoomable` integer DEFAULT 0 NOT NULL,
	`codeFontSize` integer DEFAULT 16 NOT NULL,
	`indentationSize` integer DEFAULT 4 NOT NULL,
	`layoutType` text DEFAULT 'ltr' NOT NULL,
	`projectId` text NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects_table`(`id`) ON UPDATE no action ON DELETE cascade
);
