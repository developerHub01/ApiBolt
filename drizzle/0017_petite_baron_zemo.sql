CREATE UNIQUE INDEX `active_project_table_active_project_id_unique` ON `active_project_table` (`active_project_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `folder_table_requestOrFolderMetaId_unique` ON `folder_table` (`requestOrFolderMetaId`);--> statement-breakpoint
CREATE UNIQUE INDEX `setting_table_projectId_unique` ON `setting_table` (`projectId`);