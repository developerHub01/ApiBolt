import { eq } from "drizzle-orm";
import { db } from "./index.js";
import { projectTable } from "./schema.js";

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
