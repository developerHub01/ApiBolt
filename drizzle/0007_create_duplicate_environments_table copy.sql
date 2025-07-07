CREATE TABLE environments_table_new (
  id TEXT PRIMARY KEY,
  variable TEXT,
  type TEXT DEFAULT 'default',
  value TEXT,
  isCheck INTEGER NOT NULL DEFAULT 1,
  projectId TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
