import { eq, sql } from "drizzle-orm";
import { db } from "./index.js";
import { projectTable, activeProjectTable } from "./schema.js";

export const ACTIVE_PROJECT_ID = "singleton";

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
        // prettier-ignore
        count: sql<number>`count(0)`,
      })
      .from(activeProjectTable);

    const count = countResult[0]?.count ?? 0;

    let result;

    if (count) {
      result = await db
        .update(activeProjectTable)
        .set({
          activeProjectId: id,
        })
        .where(eq(activeProjectTable.activeProjectId, ACTIVE_PROJECT_ID));
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

export const getActiveProject = async (id) => {
  try {
    const result = await db.select
      .from(activeProjectTable)
      .where(eq(activeProjectTable.activeProjectId, ACTIVE_PROJECT_ID))
      .limit(1);

    return result[0].activeProjectId ?? null;
  } catch (error) {
    console.log(error);
  }
};
