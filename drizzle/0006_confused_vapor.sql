UPDATE environments_table SET createdAt = CURRENT_TIMESTAMP WHERE createdAt IS NULL;
