import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { environmentTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";

export const getAllEnvironments = async () => {
  try {
    return await db.select().from(environmentTable);
  } catch (error) {
    console.error(error);
  }
};

/* id === active project id */
export const getEnvironments = async (id) => {
  try {
    if (!id) id = await getActiveProject();
    return await db
      .select()
      .from(environmentTable)
      .where(eq(environmentTable.projectId, id));
  } catch (error) {
    console.error(error);
  }
};

export const createEnvironments = async (payload = {}) => {
  try {
    if ("isCheck" in payload) payload["isCheck"] = Number(payload["isCheck"]);

    if (!payload.projectId) {
      const activeProjectId = await getActiveProject();
      payload.projectId = activeProjectId;
    }

    if (!payload.projectId) return false;

    const result = await db.insert(environmentTable).values({
      ...payload,
    });

    return result.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateEnvironments = async (payload = {}) => {
  try {
    const { id, ...rest } = payload;

    payload = rest;

    if ("isCheck" in payload) {
      payload["isCheck"] = Number(payload["isCheck"]);
    }

    const environmentData = await db
      .select()
      .from(environmentTable)
      .where(eq(environmentTable.id, id));

    let updated;

    if (!environmentData.length) {
      const activeProjectId = await getActiveProject();
      updated = await db.insert(environmentTable).values({
        id,
        projectId: activeProjectId,
        ...payload,
      });
    } else {
      updated = await db
        .update(environmentTable)
        .set({
          ...payload,
        })
        .where(eq(environmentTable.id, id));
    }

    return updated?.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllEnvironments = async () => {
  try {
    const activeProjectId = await getActiveProject();

    const deleted = await db
      .delete(environmentTable)
      .where(eq(environmentTable.projectId, activeProjectId));

    return deleted.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteEnvironments = async (id) => {
  try {
    const deleted = await db
      .delete(environmentTable)
      .where(eq(environmentTable.id, id));

    return deleted.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteEnvironmentsByProjectId = async (id) => {
  try {
    const deleted = await db
      .delete(environmentTable)
      .where(eq(environmentTable.projectId, id));

    return deleted.changes > 0;
  } catch (error) {
    console.error(error);
  }
};
