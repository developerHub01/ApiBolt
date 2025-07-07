INSERT INTO environments_table_new
SELECT id, variable, type, value, isCheck, projectId,
COALESCE(createdAt, CURRENT_TIMESTAMP)
FROM environments_table;