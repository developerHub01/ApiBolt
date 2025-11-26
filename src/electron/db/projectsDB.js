import { eq, count, inArray, getTableColumns } from "drizzle-orm";
import { db } from "./index.js";
import {
  projectTable,
  activeProjectTable,
  ACTIVE_PROJECT_ID,
  environmentTable,
  requestOrFolderMetaTable,
  apiUrlTable,
  paramsTable,
  headersTable,
  bodyFormDataTable,
  bodyXWWWFormUrlencodedTable,
  bodyBinaryTable,
  bodyRawTable,
  hiddenHeadersCheckTable,
  requestMetaTabTable,
} from "./schema.js";
import { createAuth } from "./authorizationDB.js";

export const getProjects = async () => {
  try {
    return await db.select().from(projectTable);
  } catch (error) {
    console.error(error);
  }
};

export const createProjects = async (payload) => {
  try {
    const result = (
      await db.insert(projectTable).values(payload).returning({
        id: projectTable.id,
      })
    )?.[0];

    if (!result || !result.id) return false;

    /* add default auth for globbaly for the project */
    await createAuth({
      projectId: result.id,
    });

    return true;
  } catch (error) {
    console.error(error);
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

    return updated.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProjects = async (id) => {
  try {
    const deleted = await db
      .delete(projectTable)
      .where(eq(projectTable.id, id));

    return deleted.rowsAffected > 0;
  } catch (error) {
    console.error(error);
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

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
};

export const getActiveProjectDetails = async () => {
  try {
    const result = await db
      .select()
      .from(activeProjectTable)
      .leftJoin(
        projectTable,
        eq(activeProjectTable.activeProjectId, projectTable.id)
      )
      .where(eq(activeProjectTable.id, ACTIVE_PROJECT_ID))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.error(error);
  }
};

export const exportProject = async (id) => {
  id = id ?? (await getActiveProject());

  try {
    const project =
      (
        await db
          .select({
            name: projectTable.name,
          })
          .from(projectTable)
          .where(eq(projectTable.id, id))
          .limit(1)
      )?.[0] ?? null;

    const environments = await db
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } =
            getTableColumns(environmentTable);
          return rest;
        })()
      )
      .from(environmentTable)
      .where(eq(environmentTable.projectId, id));

    const requestList = (
      (await db
        .select(
          (() => {
            const { projectId, createdAt, ...rest } = getTableColumns(
              requestOrFolderMetaTable
            );
            return rest;
          })()
        )
        .from(requestOrFolderMetaTable)
        .where(eq(requestOrFolderMetaTable.projectId, id))) ?? []
    ).reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    const requestIdList = [...new Set(Object.keys(requestList ?? {}))];

    const apiUrlList =
      (await db
        .select(
          (() => {
            const { projectId, createdAt, ...rest } =
              getTableColumns(apiUrlTable);
            return rest;
          })()
        )
        .from(apiUrlTable)
        .where(inArray(apiUrlTable.requestOrFolderMetaId, requestIdList))) ??
      [];

    const paramsList = await db
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } =
            getTableColumns(paramsTable);
          return rest;
        })()
      )
      .from(paramsTable)
      .where(inArray(paramsTable.requestOrFolderMetaId, requestIdList));

    const headersList = await db
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } =
            getTableColumns(headersTable);
          return rest;
        })()
      )
      .from(headersTable)
      .where(inArray(headersTable.requestOrFolderMetaId, requestIdList));

    const hiddenHeadersCheckList = await db
      .select(
        (() => {
          const { id, projectId, ...rest } = getTableColumns(
            hiddenHeadersCheckTable
          );
          return rest;
        })()
      )
      .from(hiddenHeadersCheckTable)
      .where(
        inArray(hiddenHeadersCheckTable.requestOrFolderMetaId, requestIdList)
      );

    const formDataList = await db
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } =
            getTableColumns(bodyFormDataTable);
          return rest;
        })()
      )
      .from(bodyFormDataTable)
      .where(inArray(bodyFormDataTable.requestOrFolderMetaId, requestIdList));

    const xWWWFormUrlencodedList = await db
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } = getTableColumns(
            bodyXWWWFormUrlencodedTable
          );
          return rest;
        })()
      )
      .from(bodyXWWWFormUrlencodedTable)
      .where(
        inArray(
          bodyXWWWFormUrlencodedTable.requestOrFolderMetaId,
          requestIdList
        )
      );

    const binaryDataList =
      (await db
        .select(
          (() => {
            const { id, projectId, ...rest } = getTableColumns(bodyBinaryTable);
            return rest;
          })()
        )
        .from(bodyBinaryTable)
        .where(
          inArray(bodyBinaryTable.requestOrFolderMetaId, requestIdList)
        )) ?? [];

    const rawDataList =
      (await db
        .select(
          (() => {
            const { id, projectId, lineWrap, ...rest } =
              getTableColumns(bodyRawTable);
            return rest;
          })()
        )
        .from(bodyRawTable)
        .where(inArray(bodyRawTable.requestOrFolderMetaId, requestIdList))) ??
      [];

    const requestMetaTabList =
      (await db
        .select(
          (() => {
            const { id, projectId, ...rest } =
              getTableColumns(requestMetaTabTable);
            return rest;
          })()
        )
        .from(requestMetaTabTable)
        .where(
          inArray(requestMetaTabTable.requestOrFolderMetaId, requestIdList)
        )) ?? [];

    return {
      project,
      environments,
      requestList,
      apiUrlList,
      paramsList,
      headersList,
      hiddenHeadersCheckList,
      formDataList,
      xWWWFormUrlencodedList,
      binaryDataList,
      rawDataList,
      requestMetaTabList,
    };
  } catch (error) {
    console.error(error);
  }
};
