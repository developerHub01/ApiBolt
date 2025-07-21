import { eq, count } from "drizzle-orm";
import { db } from "./index.js";
import {
  projectTable,
  activeProjectTable,
  ACTIVE_PROJECT_ID,
} from "./schema.js";
import { deleteAuthByProjectId } from "./authorizationDB.js";
import { deleteEnvironmentsByProjectId } from "./environmentsDB.js";
import { deleteRequestOrFolderMetaByProjectId } from "./requestOrFolderMetaDB.js";

export const getProjects = async () => {
  try {
    return await db.select().from(projectTable);
  } catch (error) {
    console.log(error);
  }
};

export const createProjects = async (payload) => {
  try {
    const result = await db.insert(projectTable).values(payload);

    return result.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const updateProjects = async (id, payload = {}) => {
  try {
    const updated = await db
      .update(projectTable)
      .set({
        ...payload,
      })
      .where(eq(projectTable.id, id));

    return updated.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjects = async (id) => {
  try {
    await deleteAuthByProjectId(id);
    await deleteEnvironmentsByProjectId(id);
    await deleteRequestOrFolderMetaByProjectId(id);
    /* delete active project from that table if deleting project is active project  */
    await db
      .delete(activeProjectTable)
      .where(eq(activeProjectTable.activeProjectId, id));

    const deleted = await db
      .delete(projectTable)
      .where(eq(projectTable.id, id));

    return deleted.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const changeActiveProject = async (id) => {
  try {
    const countResult = await db
      .select({
        count: count(),
      })
      .from(activeProjectTable);
    const rowCount = countResult?.[0]?.count ?? 0;

    let result;

    if (rowCount) {
      result = await db
        .update(activeProjectTable)
        .set({
          activeProjectId: id,
        })
        .where(eq(activeProjectTable.id, ACTIVE_PROJECT_ID));
    } else {
      result = await db.insert(activeProjectTable).values({
        id: ACTIVE_PROJECT_ID,
        activeProjectId: id,
      });
    }

    return result.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const getActiveProject = async () => {
  try {
    const result = await db
      .select()
      .from(activeProjectTable)
      .where(eq(activeProjectTable.id, ACTIVE_PROJECT_ID))
      .limit(1);

    return result[0]?.activeProjectId ?? null;
  } catch (error) {
    console.log(error);
  }
};
