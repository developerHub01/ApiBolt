import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { authorizationTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";

/* id === active project id */
export const getAuth = async (id) => {
  try {
    const activeProjectId = id ?? (await getActiveProject());

    return (
      await db
        .select()
        .from(authorizationTable)
        .where(eq(authorizationTable.projectId, activeProjectId))
    )?.[0];
  } catch (error) {
    console.log(error);
  }
};

export const createAuth = async (payload = {}) => {
  try {
    if (!payload.projectId) {
      const activeProjectId = await getActiveProject();
      payload.projectId = activeProjectId;
    }

    if (!payload.projectId) return false;

    const result = await db.insert(authorizationTable).values({
      ...payload,
    });

    return result.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const updateAuth = async (payload = {}) => {
  try {
    let { projectId: activeProjectId } = payload;

    if (!activeProjectId) activeProjectId = await getActiveProject();

    const authData = await db
      .select()
      .from(authorizationTable)
      .where(eq(authorizationTable.projectId, activeProjectId));

    let updatedData = null;

    if (!authData.length) {
      updatedData = await db.insert(authorizationTable).values({
        projectId: activeProjectId,
        ...payload,
      });

      return updatedData.changes > 0;
    }

    updatedData = await db
      .update(authorizationTable)
      .set({
        ...payload,
      })
      .where(eq(authorizationTable.projectId, activeProjectId));

    return updatedData?.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAuth = async (id) => {
  try {
    let deleted = null;

    if (id) {
      deleted = await db
        .delete(authorizationTable)
        .where(eq(authorizationTable.id, id));

      return deleted.changes > 0;
    }

    const activeProjectId = await getActiveProject();

    deleted = await db
      .delete(authorizationTable)
      .where(eq(authorizationTable.projectId, activeProjectId));

    return deleted.changes > 0;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAuthByProjectId = async (id) => {
  try {
    const deleted = await db
      .delete(authorizationTable)
      .where(eq(authorizationTable.projectId, id));

    return deleted.changes > 0;
  } catch (error) {
    console.log(error);
  }
};
