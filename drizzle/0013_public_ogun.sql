ALTER TABLE `api_url_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);--> statement-breakpoint
ALTER TABLE `body_binary_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);--> statement-breakpoint
ALTER TABLE `body_form_data_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);--> statement-breakpoint
ALTER TABLE `body_raw_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);--> statement-breakpoint
ALTER TABLE `body_x_www_form_urlencoded_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);--> statement-breakpoint
ALTER TABLE `headers_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);--> statement-breakpoint
ALTER TABLE `hidden_headers_check_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);--> statement-breakpoint
ALTER TABLE `meta_show_column_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);--> statement-breakpoint
ALTER TABLE `params_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);--> statement-breakpoint
ALTER TABLE `request_meta_tab_table` ADD `projectId` text NOT NULL REFERENCES projects_table(id);