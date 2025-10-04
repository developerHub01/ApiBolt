import { eq, inArray } from "drizzle-orm";
import { db } from "./index.js";
import { requestOrFolderMetaTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";
import { updateTablistBasedRequestOrFolderMetaDeletion } from "./tabsDB.js";

/* id === active project id */
export const getRequestOrFolderMeta = async () => {
  try {
    const activeProjectId = await getActiveProject();

    const dataList = await db
      .select()
      .from(requestOrFolderMetaTable)
      .where(eq(requestOrFolderMetaTable.projectId, activeProjectId));

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
    return (
      await db
        .select()
        .from(requestOrFolderMetaTable)
        .where(eq(requestOrFolderMetaTable.id, id))
    )?.[0];
  } catch (error) {
    console.error(error);
  }
};

export const createRequestOrFolderMeta = async (payload) => {
  try {
    if (!payload || typeof payload !== "object") return;

    const activeProjectId = await getActiveProject();

    if (Array.isArray(payload)) {
      payload.forEach((item, index, arr) => {
        arr[index] = {
          ...item,
          projectId: activeProjectId,
        };
        delete arr[index]["createdAt"];
      });
    } else {
      payload.projectId = activeProjectId;
      delete payload["createdAt"];
    }

    const response = await db.insert(requestOrFolderMetaTable).values(payload);

    return response?.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateRequestOrFolderMeta = async (payload) => {
  try {
    if (!payload || typeof payload !== "object") return;

    const { id } = payload;

    delete payload["id"];
    delete payload["projectId"];
    delete payload["children"];
    delete payload["createdAt"];

    const updated = await db
      .update(requestOrFolderMetaTable)
      .set(payload)
      .where(eq(requestOrFolderMetaTable.id, id));

    return updated?.changes > 0;
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

    return result.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const moveRequestOrFolderMeta = async ({ id, parentId = null } = {}) => {
  try {
    const updated = await db
      .update(requestOrFolderMetaTable)
      .set({
        parentId,
      })
      .where(eq(requestOrFolderMetaTable.id, id));

    return updated?.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRequestOrFolderMetaById = async (id) => {
  try {
    const deletionCandidates = Array.isArray(id) ? id : [id];
    if (deletionCandidates.length === 0) return false;

    const deleted = await db
      .delete(requestOrFolderMetaTable)
      .where(inArray(requestOrFolderMetaTable.id, [deletionCandidates[0]]));

    if (deleted?.changes)
      await updateTablistBasedRequestOrFolderMetaDeletion(deletionCandidates);

    return deleted?.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const duplicateRequestOrFolderMeta = async (payload) => {
  try {
    if (!payload || !Array.isArray(payload)) return;

    const result = await db.insert(requestOrFolderMetaTable).values(payload);

    return result?.changes > 0;
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

    return deleted.changes > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRequestOrFolderMetaAll = async () => {
  try {
    const deleted = await db.delete(requestOrFolderMetaTable);

    return deleted.changes > 0;
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

    const updated = await db
      .update(requestOrFolderMetaTable)
      .set({
        isExpended,
      })
      .where(inArray(requestOrFolderMetaTable.id, id));

    return updated.changes > 0;
  } catch (error) {
    console.error(error);
  }
};
