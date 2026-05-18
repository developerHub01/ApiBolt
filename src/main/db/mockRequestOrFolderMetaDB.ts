import { eq, inArray } from "drizzle-orm";
import { db } from "@/main/db/index";
import { mockRequestOrFolderMetaTable } from "@/main/db/schema";
import { getActiveProject } from "@/main/db/projectsDB";
import { updateTablistBasedRequestOrFolderMetaDeletion } from "@/main/db/tabsDB";
import { RequestListItemInterface } from "@shared/types/request-response.types";
import { RequestOrFolderMetaTableInterface } from "@/main/types";
import { ElectronAPIMockRequestOrFolderMetaInterface } from "@shared/types/api/electron-mock-request-or-folder-meta";

/* id === active project id */
export const getMockRequestOrFolderMeta = async () => {
  try {
    const activeProjectId = await getActiveProject();
    if (!activeProjectId) throw new Error("no project active");

    const dataList = await db
      .select({
        id: mockRequestOrFolderMetaTable.id,
        method: mockRequestOrFolderMetaTable.method,
        name: mockRequestOrFolderMetaTable.name,
        projectId: mockRequestOrFolderMetaTable.projectId,
        parentId: mockRequestOrFolderMetaTable.parentId,
        isExpended: mockRequestOrFolderMetaTable.isExpended,
        createdAt: mockRequestOrFolderMetaTable.createdAt,
      })
      .from(mockRequestOrFolderMetaTable)
      .where(eq(mockRequestOrFolderMetaTable.projectId, activeProjectId));

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

export const getMockRequestOrFolderMetaById: ElectronAPIMockRequestOrFolderMetaInterface["getMockRequestOrFolderMetaById"] =
  async id => {
    try {
      return (
        await db
          .select({
            id: mockRequestOrFolderMetaTable.id,
            method: mockRequestOrFolderMetaTable.method,
            name: mockRequestOrFolderMetaTable.name,
            projectId: mockRequestOrFolderMetaTable.projectId,
            parentId: mockRequestOrFolderMetaTable.parentId,
            isExpended: mockRequestOrFolderMetaTable.isExpended,
            createdAt: mockRequestOrFolderMetaTable.createdAt,
          })
          .from(mockRequestOrFolderMetaTable)
          .where(eq(mockRequestOrFolderMetaTable.id, id))
      )?.[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createMockRequestOrFolderMeta: ElectronAPIMockRequestOrFolderMetaInterface["createMockRequestOrFolderMeta"] =
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
        .insert(mockRequestOrFolderMetaTable)
        .values(requestOrFolderPayload);

      return response?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateMockRequestOrFolderMeta: ElectronAPIMockRequestOrFolderMetaInterface["updateMockRequestOrFolderMeta"] =
  async payload => {
    try {
      if (!payload || typeof payload !== "object") return false;

      const { id, ...updateData } = payload;

      if (!Object.keys(updateData)?.length) return false;

      await db
        .update(mockRequestOrFolderMetaTable)
        .set(updateData)
        .where(eq(mockRequestOrFolderMetaTable.id, id));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const collapseAllMockRequestOrFolderMeta: ElectronAPIMockRequestOrFolderMetaInterface["collapseAllMockRequestOrFolderMeta"] =
  async projectId => {
    try {
      if (!projectId) projectId = await getActiveProject();
      if (!projectId) return false;

      const result = await db
        .update(mockRequestOrFolderMetaTable)
        .set({
          isExpended: false,
        })
        .where(eq(mockRequestOrFolderMetaTable.projectId, projectId));

      return result.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const moveMockRequestOrFolderMeta: ElectronAPIMockRequestOrFolderMetaInterface["moveMockRequestOrFolderMeta"] =
  async ({ id, parentId = null }) => {
    try {
      const updated = await db
        .update(mockRequestOrFolderMetaTable)
        .set({
          parentId,
        })
        .where(eq(mockRequestOrFolderMetaTable.id, id));

      return updated?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteMockRequestOrFolderMetaById: ElectronAPIMockRequestOrFolderMetaInterface["deleteMockRequestOrFolderMetaById"] =
  async id => {
    try {
      const deletionCandidates = Array.isArray(id) ? id : [id];
      if (deletionCandidates.length === 0) return false;

      const deleted = await db
        .delete(mockRequestOrFolderMetaTable)
        .where(
          inArray(mockRequestOrFolderMetaTable.id, [deletionCandidates[0]]),
        );

      if (deleted?.rowsAffected)
        await updateTablistBasedRequestOrFolderMetaDeletion(deletionCandidates);

      return deleted?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const duplicateMockRequestOrFolderMeta: ElectronAPIMockRequestOrFolderMetaInterface["duplicateMockRequestOrFolderMeta"] =
  async payload => {
    try {
      if (!payload || !Array.isArray(payload)) return false;
      const result = await db
        .insert(mockRequestOrFolderMetaTable)
        .values(payload);

      return result?.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteMockRequestOrFolderMetaByProjectId: ElectronAPIMockRequestOrFolderMetaInterface["deleteMockRequestOrFolderMetaByProjectId"] =
  async id => {
    try {
      const deletionCandidate = id ?? (await getActiveProject());
      if (!deletionCandidate) return false;

      const deleted = await db
        .delete(mockRequestOrFolderMetaTable)
        .where(eq(mockRequestOrFolderMetaTable.projectId, deletionCandidate));

      return deleted.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteMockRequestOrFolderMetaAll: ElectronAPIMockRequestOrFolderMetaInterface["deleteMockRequestOrFolderMetaAll"] =
  async () => {
    try {
      const deleted = await db.delete(mockRequestOrFolderMetaTable);

      return deleted.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const expendOrCollapseMockRequestOrFolderMetaAll: ElectronAPIMockRequestOrFolderMetaInterface["expendOrCollapseMockRequestOrFolderMetaAll"] =
  async (id, isExpended = true) => {
    try {
      if (!id) return false;
      if (!Array.isArray(id)) id = [id];

      const updated = await db
        .update(mockRequestOrFolderMetaTable)
        .set({
          isExpended,
        })
        .where(inArray(mockRequestOrFolderMetaTable.id, id));

      return updated.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
