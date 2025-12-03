import { eq } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { environmentTable } from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { ElectronAPIEnvironmentsInterface } from "@/shared/types/api/electron-environments";
import { TEnvironmentFile } from "@/shared/types/export-import/environments";

export const getAllEnvironments: ElectronAPIEnvironmentsInterface["getAllEnvironments"] =
  async () => {
    try {
      return await db.select().from(environmentTable);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

/* id === active project id */
export const getEnvironments: ElectronAPIEnvironmentsInterface["getEnvironments"] =
  async id => {
    try {
      id = id ?? (await getActiveProject());
      if (!id) throw new Error();

      return await db
        .select()
        .from(environmentTable)
        .where(eq(environmentTable.projectId, id));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export const createEnvironments: ElectronAPIEnvironmentsInterface["createEnvironments"] =
  async payload => {
    try {
      const activeProjectId = await getActiveProject();
      if (!activeProjectId) throw new Error();

      return (
        (
          await db.insert(environmentTable).values({
            ...payload,
            projectId: activeProjectId
          })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const importEnvironments = async (payload: TEnvironmentFile) => {
  try {
    const activeProjectId = await getActiveProject();
    if (!activeProjectId) throw new Error();

    const importPayload = payload.map(item => ({
      ...item,
      projectId: activeProjectId
    }));

    return (
      (await db.insert(environmentTable).values(importPayload))?.rowsAffected >
      0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateEnvironments: ElectronAPIEnvironmentsInterface["updateEnvironments"] =
  async payload => {
    try {
      const { id, ...updatePayload } = payload;
      const activeProjectId = await getActiveProject();
      if (!activeProjectId) throw new Error();

      return (
        (
          await db
            .insert(environmentTable)
            .values({
              ...payload,
              projectId: activeProjectId
            })
            .onConflictDoUpdate({
              target: [environmentTable.id],
              set: {
                ...updatePayload
              }
            })
        )?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteAllEnvironments: ElectronAPIEnvironmentsInterface["deleteAllEnvironments"] =
  async () => {
    try {
      const activeProjectId = await getActiveProject();
      if (!activeProjectId) throw new Error();

      return (
        (
          await db
            .delete(environmentTable)
            .where(eq(environmentTable.projectId, activeProjectId))
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteEnvironments: ElectronAPIEnvironmentsInterface["deleteEnvironments"] =
  async id => {
    try {
      return (
        (await db.delete(environmentTable).where(eq(environmentTable.id, id)))
          .rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteEnvironmentsByProjectId = async (
  id: string
): Promise<boolean> => {
  try {
    return (
      (
        await db
          .delete(environmentTable)
          .where(eq(environmentTable.projectId, id))
      ).rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};
