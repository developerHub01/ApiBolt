import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import { requestOrFolderMetaTable } from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { updateTablistBasedRequestOrFolderMetaDeletion } from "@/main/db/tabsDB.js";
import { RequestListItemInterface } from "@shared/types/request-response.types";
import { ElectronAPIRequestOrFolderMetaInterface } from "@shared/types/api/electron-request-or-folder-meta";
import { RequestOrFolderMetaTableInterface } from "@/main/types";

/* id === active project id */
export const getRequestOrFolderMeta = async () => {
  try {
    const activeProjectId = await getActiveProject();
    if (!activeProjectId) throw new Error("no project active");

    const dataList = await db
      .select({
        id: requestOrFolderMetaTable.id,
        method: requestOrFolderMetaTable.method,
        name: requestOrFolderMetaTable.name,
        projectId: requestOrFolderMetaTable.projectId,
        parentId: requestOrFolderMetaTable.parentId,
        isExpended: requestOrFolderMetaTable.isExpended,
        createdAt: requestOrFolderMetaTable.createdAt,
      })
      .from(requestOrFolderMetaTable)
      .where(eq(requestOrFolderMetaTable.projectId, activeProjectId));

    // Make the map first
    const map: Record<string, RequestListItemInterface> = {};

    dataList.forEach(
      item =>
        (map[item.id] = {
          ...item,
          ...(item.method ? {} : { children: [] as Array<string> }),
        }),
    );

    // Attach child IDs
    dataList.forEach(item => {
      const parent = item.parentId ? map[item.parentId] : undefined;
      if (parent?.children) parent.children.push(item.id);
    });

    return map;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getRequestOrFolderMetaById: ElectronAPIRequestOrFolderMetaInterface["getRequestOrFolderMetaById"] =
  async id => {
    try {
      return (
        await db
          .select({
            id: requestOrFolderMetaTable.id,
            method: requestOrFolderMetaTable.method,
            name: requestOrFolderMetaTable.name,
            projectId: requestOrFolderMetaTable.projectId,
            parentId: requestOrFolderMetaTable.parentId,
            isExpended: requestOrFolderMetaTable.isExpended,
            createdAt: requestOrFolderMetaTable.createdAt,
          })
          .from(requestOrFolderMetaTable)
          .where(eq(requestOrFolderMetaTable.id, id))
      )?.[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createRequestOrFolderMeta: ElectronAPIRequestOrFolderMetaInterface["createRequestOrFolderMeta"] =
  async payload => {
    try {
      if (!Array.isArray(payload)) payload = [payload];

      const requestOrFolderPayload: Array<RequestOrFolderMetaTableInterface> =
        [];

      const activeProjectId = await getActiveProject();
      if (!payload || typeof payload !== "object" || !activeProjectId)
        return false;

      payload.forEach(item => {
        delete item.createdAt;
        requestOrFolderPayload.push({
          ...item,
          projectId: activeProjectId,
        });
      });

      const response = await db
        .insert(requestOrFolderMetaTable)
        .values(requestOrFolderPayload);

      return response?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateRequestOrFolderMeta: ElectronAPIRequestOrFolderMetaInterface["updateRequestOrFolderMeta"] =
  async payload => {
    try {
      if (!payload || typeof payload !== "object") return false;

      const { id, ...updateData } = payload;

      if (!Object.keys(updateData)?.length) return false;

      await db
        .update(requestOrFolderMetaTable)
        .set(updateData)
        .where(eq(requestOrFolderMetaTable.id, id));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const collapseAllRequestOrFolderMeta: ElectronAPIRequestOrFolderMetaInterface["collapseAllRequestOrFolderMeta"] =
  async projectId => {
    try {
      if (!projectId) projectId = await getActiveProject();
      if (!projectId) return false;

      const result = await db
        .update(requestOrFolderMetaTable)
        .set({
          isExpended: false,
        })
        .where(eq(requestOrFolderMetaTable.projectId, projectId));

      return result.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const moveRequestOrFolderMeta: ElectronAPIRequestOrFolderMetaInterface["moveRequestOrFolderMeta"] =
  async ({ id, parentId = null }) => {
    try {
      const updated = await db
        .update(requestOrFolderMetaTable)
        .set({
          parentId,
        })
        .where(eq(requestOrFolderMetaTable.id, id));

      return updated?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteRequestOrFolderMetaById: ElectronAPIRequestOrFolderMetaInterface["deleteRequestOrFolderMetaById"] =
  async id => {
    try {
      const deletionCandidates = Array.isArray(id) ? id : [id];
      if (deletionCandidates.length === 0) return false;

      const deleted = await db
        .delete(requestOrFolderMetaTable)
        .where(inArray(requestOrFolderMetaTable.id, [deletionCandidates[0]]));

      if (deleted?.rowsAffected)
        await updateTablistBasedRequestOrFolderMetaDeletion(deletionCandidates);

      return deleted?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const duplicateRequestOrFolderMeta: ElectronAPIRequestOrFolderMetaInterface["duplicateRequestOrFolderMeta"] =
  async payload => {
    try {
      if (!payload || !Array.isArray(payload)) return false;
      const result = await db.insert(requestOrFolderMetaTable).values(payload);

      return result?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteRequestOrFolderMetaByProjectId: ElectronAPIRequestOrFolderMetaInterface["deleteRequestOrFolderMetaByProjectId"] =
  async id => {
    try {
      const deletionCandidate = id ?? (await getActiveProject());
      if (!deletionCandidate) return false;

      const deleted = await db
        .delete(requestOrFolderMetaTable)
        .where(eq(requestOrFolderMetaTable.projectId, deletionCandidate));

      return deleted.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteRequestOrFolderMetaAll: ElectronAPIRequestOrFolderMetaInterface["deleteRequestOrFolderMetaAll"] =
  async () => {
    try {
      const deleted = await db.delete(requestOrFolderMetaTable);

      return deleted.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const expendOrCollapseRequestOrFolderMetaAll: ElectronAPIRequestOrFolderMetaInterface["expendOrCollapseRequestOrFolderMetaAll"] =
  async (id, isExpended = true) => {
    try {
      if (!id) return false;
      if (!Array.isArray(id)) id = [id];

      const updated = await db
        .update(requestOrFolderMetaTable)
        .set({
          isExpended,
        })
        .where(inArray(requestOrFolderMetaTable.id, id));

      return updated.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
