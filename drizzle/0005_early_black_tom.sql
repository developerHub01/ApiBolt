CREATE TABLE `history_table` (
	`id` text PRIMARY KEY NOT NULL,
	`request` text,
	`url` text DEFAULT '',
	`method` text,
	`name` text,
	`authorization` text,
	`params` text,
	`headers` text,
	`formData` text,
	`xWWWFormUrlencoded` text,
	`binaryData` text,
	`raw` text,
	`rawType` text DEFAULT 'json',
	`requestBodyType` text,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`request`) REFERENCES `request_or_folder_meta_table`(`id`) ON UPDATE no action ON DELETE cascade
);
