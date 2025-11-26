import { and, eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { requestOrFolderMetaTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";
import {
  getTabList,
  updateTablistBasedRequestOrFolderMetaDeletion,
} from "./tabsDB.js";

/* id === active project id */
export const getRequestOrFolderMeta = async () => {
  try {
    const projectId = await getActiveProject();

    const dataList = await db
      .select()
      .from(requestOrFolderMetaTable)
      .where(eq(requestOrFolderMetaTable.projectId, projectId));

    // Make the map first
    const map = {};

    dataList.forEach(
      (item) =>
        (map[item.id] = { ...item, ...(item.method ? {} : { children: [] }) })
    );

    // Attach child IDs
    dataList.forEach((item) => {
      if (item.parentId && map[item.parentId] && map[item.parentId].children)
        map[item.parentId].children.push(item.id);
    });

    return map;
  } catch (error) {
    console.error(error);
  }
};

export const getRequestOrFolderMetaById = async (id) => {
  try {
    const projectId = await getActiveProject();

    return (
      await db
        .select()
        .from(requestOrFolderMetaTable)
        .where(
          and(
            eq(requestOrFolderMetaTable.id, id),
            eq(requestOrFolderMetaTable.projectId, projectId)
          )
        )
    )?.[0];
  } catch (error) {
    console.error(error);
  }
};

export const createRequestOrFolderMeta = async (payload) => {
  try {
    if (!payload || typeof payload !== "object") return;
    const projectId = await getActiveProject();

    if (Array.isArray(payload)) {
      payload.forEach((item, index, arr) => {
        arr[index] = {
          ...item,
          projectId,
        };
        delete arr[index]["createdAt"];
      });
    } else {
      payload.projectId = projectId;
      delete payload["createdAt"];
    }

    const response = await db.insert(requestOrFolderMetaTable).values(payload);

    return response?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateRequestOrFolderMeta = async (payload) => {
  try {
    if (!payload || typeof payload !== "object") return false;
    if (!("id" in payload)) payload["id"] = (await getTabList())?.selectedTab;
    if (!payload["projectId"]) payload["projectId"] = await getActiveProject();

    const { id, projectId } = payload;
    delete payload["id"];
    delete payload["projectId"];
    delete payload["children"];
    delete payload["createdAt"];

    if (!Object.keys(payload)?.length) return false;

    await db
      .update(requestOrFolderMetaTable)
      .set(payload)
      .where(
        and(
          eq(requestOrFolderMetaTable.id, id),
          eq(requestOrFolderMetaTable.projectId, projectId)
        )
      );
    return true;
  } catch (error) {
    console.error(error);
  }
};

export const collapseAllRequestOrFolderMeta = async (projectId) => {
  try {
    if (!projectId) projectId = await getActiveProject();

    const result = await db
      .update(requestOrFolderMetaTable)
      .set({
        isExpended: 0,
      })
      .where(eq(requestOrFolderMetaTable.projectId, projectId));

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const moveRequestOrFolderMeta = async ({ id, parentId = null } = {}) => {
  try {
    const projectId = await getActiveProject();

    const updated = await db
      .update(requestOrFolderMetaTable)
      .set({
        parentId,
      })
      .where(
        and(
          eq(requestOrFolderMetaTable.id, id),
          eq(requestOrFolderMetaTable.projectId, projectId)
        )
      );

    return updated?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRequestOrFolderMetaById = async (id) => {
  try {
    const deletionCandidates = Array.isArray(id) ? id : [id];
    const projectId = await getActiveProject();
    if (deletionCandidates.length === 0 || !projectId) return false;

    const deleted = await db
      .delete(requestOrFolderMetaTable)
      .where(
        and(
          inArray(requestOrFolderMetaTable.id, [deletionCandidates[0]]),
          eq(requestOrFolderMetaTable.projectId, projectId)
        )
      );

    if (deleted?.rowsAffected)
      await updateTablistBasedRequestOrFolderMetaDeletion(deletionCandidates);

    return deleted?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const duplicateRequestOrFolderMeta = async (payload) => {
  try {
    if (!payload || !Array.isArray(payload)) return;
    const result = await db.insert(requestOrFolderMetaTable).values(payload);

    return result?.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRequestOrFolderMetaByProjectId = async (id) => {
  try {
    const deletionCandidate = id ?? (await getActiveProject());

    const deleted = await db
      .delete(requestOrFolderMetaTable)
      .where(eq(requestOrFolderMetaTable.projectId, deletionCandidate));

    return deleted.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRequestOrFolderMetaAll = async () => {
  try {
    const deleted = await db.delete(requestOrFolderMetaTable);

    return deleted.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const expendOrCollapseRequestOrFolderMetaAll = async (
  id,
  isExpended = true
) => {
  try {
    if (Array.isArray(id)) id = [id];
    const projectId = await getActiveProject();
    if (!projectId) return false;

    const updated = await db
      .update(requestOrFolderMetaTable)
      .set({
        isExpended,
      })
      .where(
        and(
          inArray(requestOrFolderMetaTable.id, id),
          eq(requestOrFolderMetaTable.projectId, projectId)
        )
      );

    return updated.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
