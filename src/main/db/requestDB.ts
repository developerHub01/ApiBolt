import { getRequestOrFolderMeta } from "@/main/db/requestOrFolderMetaDB.js";
import { findSelectedRequestIds } from "@/main/utils/request.js";
import { eq, getTableColumns, inArray } from "drizzle-orm";
import {
  apiUrlTable,
  authorizationTable,
  bodyBinaryTable,
  bodyFormDataTable,
  bodyRawTable,
  bodyXWWWFormUrlencodedTable,
  headersTable,
  hiddenHeadersCheckTable,
  paramsTable,
  requestMetaTabTable,
  requestOrFolderMetaTable
} from "@/main/db/schema.js";
import { db } from "@/main/db/index.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { v4 as uuidv4 } from "uuid";
import { RequestExportFileInterface } from "@/shared/types/export-import/request";
import { FolderExportFileInterface } from "@/shared/types/export-import/folder";
import { ProjectExportFileInterface } from "@/shared/types/export-import/project";

/* id === active project id */
export const clearRequest = async (id: string) => {
  return await db.transaction(async tsx => {
    /* clear api-url */
    await tsx
      .delete(apiUrlTable)
      .where(eq(apiUrlTable.requestOrFolderMetaId, id));

    /* clear auth */
    await tsx
      .delete(authorizationTable)
      .where(eq(authorizationTable.requestOrFolderMetaId, id));

    /* clear params */
    await tsx
      .delete(paramsTable)
      .where(eq(paramsTable.requestOrFolderMetaId, id));

    /* clear header */
    await tsx
      .delete(headersTable)
      .where(eq(headersTable.requestOrFolderMetaId, id));

    /* clear binary data */
    await tsx
      .delete(bodyBinaryTable)
      .where(eq(bodyBinaryTable.requestOrFolderMetaId, id));

    /* clear form-data data */
    await tsx
      .delete(bodyFormDataTable)
      .where(eq(bodyFormDataTable.requestOrFolderMetaId, id));

    /* clear xwww-form-urlencoded data */
    await tsx
      .delete(bodyXWWWFormUrlencodedTable)
      .where(eq(bodyXWWWFormUrlencodedTable.requestOrFolderMetaId, id));

    /* clear raw data data */
    await tsx
      .delete(bodyRawTable)
      .where(eq(bodyRawTable.requestOrFolderMetaId, id));

    /* clear request meta tab data */
    await tsx
      .delete(requestMetaTabTable)
      .where(eq(requestMetaTabTable.requestOrFolderMetaId, id));

    /* clear request or folder meta data */
    await tsx
      .update(requestOrFolderMetaTable)
      .set({
        name: "Request",
        method: "get"
      })
      .where(eq(requestOrFolderMetaTable.id, id));

    /* clear hidden headers check data */
    await tsx
      .update(hiddenHeadersCheckTable)
      .set({
        userAgent: true,
        contentLength: true,
        accept: true,
        acceptEncoding: true,
        connection: true
      })
      .where(eq(hiddenHeadersCheckTable.requestOrFolderMetaId, id));

    return true;
  });
};

export const importRequest = async ({
  requestId: id,
  name,
  url,
  method,
  params,
  headers,
  hiddenHeadersCheck,
  requestMetaTab,
  bodyRaw,
  bodyBinary,
  bodyXWWWFormUrlencoded,
  bodyFormData,
  authorization
}: RequestExportFileInterface & {
  requestId: string;
}): Promise<boolean> => {
  return await db.transaction(async tsx => {
    const projectId = await getActiveProject();
    if (!projectId) throw new Error();

    /**
     * ===================
     * request-meta-data
     * ===================
     */
    await tsx
      .update(requestOrFolderMetaTable)
      .set({
        name,
        method
      })
      .where(eq(requestOrFolderMetaTable.id, id));

    /**
     * ===================
     * api-url
     * ===================
     */
    await tsx
      .insert(apiUrlTable)
      .values({
        requestOrFolderMetaId: id,
        url
      })
      .onConflictDoUpdate({
        target: [apiUrlTable.requestOrFolderMetaId],
        set: {
          url,
          /* this extra requestOrFolderMetaId so that it not remain empty so not fail the query */
          requestOrFolderMetaId: id
        }
      });

    /**
     * ===================
     * Params
     * ===================
     */
    await tsx
      .delete(paramsTable)
      .where(eq(paramsTable.requestOrFolderMetaId, id));

    if (Array.isArray(params) && params.length)
      await tsx.insert(paramsTable).values(
        params.map(param => ({
          ...param,
          requestOrFolderMetaId: id
        }))
      );

    /**
     * ===================
     * Headers
     * ===================
     */
    await tsx
      .delete(headersTable)
      .where(eq(headersTable.requestOrFolderMetaId, id));

    if (Array.isArray(headers) && headers.length)
      await tsx.insert(headersTable).values(
        headers.map(header => ({
          ...header,
          requestOrFolderMetaId: id
        }))
      );

    /**
     * ===================
     * Hidden headers check
     * ===================
     */
    await tsx
      .insert(hiddenHeadersCheckTable)
      .values({
        ...hiddenHeadersCheck,
        requestOrFolderMetaId: id
      })
      .onConflictDoUpdate({
        target: [hiddenHeadersCheckTable.requestOrFolderMetaId],
        set: {
          ...hiddenHeadersCheck,
          /* this extra requestOrFolderMetaId so that it not remain empty so not fail the query */
          requestOrFolderMetaId: id
        }
      });

    /**
     * ===================
     * Request meta-tab
     * ===================
     */
    await tsx
      .insert(requestMetaTabTable)
      .values({
        ...requestMetaTab,
        requestOrFolderMetaId: id
      })
      .onConflictDoUpdate({
        target: [requestMetaTabTable.requestOrFolderMetaId],
        set: {
          ...requestMetaTab,
          /* this extra requestOrFolderMetaId so that it not remain empty so not fail the query */
          requestOrFolderMetaId: id
        }
      });

    /**
     * ===================
     * body x-www-formurlencoded
     * ===================
     */
    await tsx
      .delete(bodyXWWWFormUrlencodedTable)
      .where(eq(bodyXWWWFormUrlencodedTable.requestOrFolderMetaId, id));

    if (Array.isArray(bodyXWWWFormUrlencoded) && bodyXWWWFormUrlencoded.length)
      await tsx.insert(bodyXWWWFormUrlencodedTable).values(
        bodyXWWWFormUrlencoded.map(form => ({
          ...form,
          requestOrFolderMetaId: id
        }))
      );

    /**
     * ===================
     * body form-data
     * ===================
     */
    await tsx
      .delete(bodyFormDataTable)
      .where(eq(bodyFormDataTable.requestOrFolderMetaId, id));

    if (Array.isArray(bodyFormData) && bodyFormData.length)
      await tsx.insert(bodyFormDataTable).values(
        bodyFormData.map(form => ({
          ...form,
          requestOrFolderMetaId: id
        }))
      );

    /**
     * ===================
     * body binary-data
     * ===================
     */
    await tsx
      .insert(bodyBinaryTable)
      .values({
        ...bodyBinary,
        requestOrFolderMetaId: id
      })
      .onConflictDoUpdate({
        target: [bodyBinaryTable.requestOrFolderMetaId],
        set: {
          ...bodyBinary,
          /* this extra requestOrFolderMetaId so that it not remain empty so not fail the query */
          requestOrFolderMetaId: id
        }
      });

    /**
     * ===================
     * body raw-data
     * ===================
     */
    await tsx
      .insert(bodyRawTable)
      .values({
        ...bodyRaw,
        requestOrFolderMetaId: id
      })
      .onConflictDoUpdate({
        target: [bodyRawTable.requestOrFolderMetaId],
        set: {
          ...bodyRaw,
          /* this extra requestOrFolderMetaId so that it not remain empty so not fail the query */
          requestOrFolderMetaId: id
        }
      });

    /**
     * ===================
     * Authorization
     * ===================
     */
    await tsx
      .insert(authorizationTable)
      .values({
        ...authorization,
        requestOrFolderMetaId: id,
        projectId
      })
      .onConflictDoUpdate({
        target: [authorizationTable.requestOrFolderMetaId],
        set: {
          ...authorization,
          /* this extra requestOrFolderMetaId so that it not remain empty so not fail the query */
          requestOrFolderMetaId: id
        }
      });

    return true;
  });
};

export const exportRequest = async (
  id: string
): Promise<RequestExportFileInterface | null> => {
  return await db.transaction(async tsx => {
    const { name, method } =
      (
        await tsx
          .select(
            (() => {
              const { method, name } = getTableColumns(
                requestOrFolderMetaTable
              );
              return {
                method,
                name
              };
            })()
          )
          .from(requestOrFolderMetaTable)
          .where(eq(requestOrFolderMetaTable.id, id))
          .limit(1)
      )?.[0] ?? {};
    if (!method) return null;

    const { url } =
      (
        await tsx
          .select(
            (() => {
              const { id, createdAt, requestOrFolderMetaId, ...rest } =
                getTableColumns(apiUrlTable);
              return rest;
            })()
          )
          .from(apiUrlTable)
          .where(eq(apiUrlTable.requestOrFolderMetaId, id))
          .limit(1)
      )?.[0] ?? {};

    const params =
      (await tsx
        .select(
          (() => {
            const { id, createdAt, requestOrFolderMetaId, ...rest } =
              getTableColumns(paramsTable);
            return rest;
          })()
        )
        .from(paramsTable)
        .where(eq(paramsTable.requestOrFolderMetaId, id))) ?? [];

    const headers =
      (await tsx
        .select(
          (() => {
            const { id, createdAt, requestOrFolderMetaId, ...rest } =
              getTableColumns(headersTable);
            return rest;
          })()
        )
        .from(headersTable)
        .where(eq(headersTable.requestOrFolderMetaId, id))) ?? [];

    const hiddenHeadersCheck =
      (
        await tsx
          .select(
            (() => {
              const { id, requestOrFolderMetaId, ...rest } = getTableColumns(
                hiddenHeadersCheckTable
              );
              return rest;
            })()
          )
          .from(hiddenHeadersCheckTable)
          .where(eq(hiddenHeadersCheckTable.requestOrFolderMetaId, id))
          .limit(1)
      )?.[0] ?? {};

    const requestMetaTab =
      (
        await tsx
          .select(
            (() => {
              const { id, ...rest } = getTableColumns(requestMetaTabTable);
              return rest;
            })()
          )
          .from(requestMetaTabTable)
          .where(eq(requestMetaTabTable.requestOrFolderMetaId, id))
          .limit(1)
      )?.[0] ?? {};

    const bodyRaw =
      (
        await tsx
          .select(
            (() => {
              const { id, requestOrFolderMetaId, lineWrap, ...rest } =
                getTableColumns(bodyRawTable);
              return rest;
            })()
          )
          .from(bodyRawTable)
          .where(eq(bodyRawTable.requestOrFolderMetaId, id))
          .limit(1)
      )?.[0] ?? {};

    const bodyBinary =
      (
        await tsx
          .select(
            (() => {
              const { id, requestOrFolderMetaId, ...rest } =
                getTableColumns(bodyBinaryTable);
              return rest;
            })()
          )
          .from(bodyBinaryTable)
          .where(eq(bodyBinaryTable.requestOrFolderMetaId, id))
          .limit(1)
      )?.[0] ?? {};

    const bodyXWWWFormUrlencoded =
      (await tsx
        .select(
          (() => {
            const { id, createdAt, requestOrFolderMetaId, ...rest } =
              getTableColumns(bodyXWWWFormUrlencodedTable);
            return rest;
          })()
        )
        .from(bodyXWWWFormUrlencodedTable)
        .where(eq(bodyXWWWFormUrlencodedTable.requestOrFolderMetaId, id))) ??
      [];

    const bodyFormData =
      (await tsx
        .select(
          (() => {
            const { id, createdAt, requestOrFolderMetaId, ...rest } =
              getTableColumns(bodyFormDataTable);
            return rest;
          })()
        )
        .from(bodyFormDataTable)
        .where(eq(bodyFormDataTable.requestOrFolderMetaId, id))) ?? [];

    const authorization =
      (
        await tsx
          .select(
            (() => {
              const { id, projectId, requestOrFolderMetaId, ...rest } =
                getTableColumns(authorizationTable);
              return rest;
            })()
          )
          .from(authorizationTable)
          .where(eq(authorizationTable.requestOrFolderMetaId, id))
          .limit(1)
      )?.[0] ?? {};

    return {
      name,
      method,
      url,
      params,
      headers,
      hiddenHeadersCheck,
      requestMetaTab,
      bodyRaw,
      bodyBinary,
      bodyXWWWFormUrlencoded,
      bodyFormData,
      authorization
    };
  });
};

export const exportFolder = async (
  id: string
): Promise<FolderExportFileInterface | null> => {
  return await db.transaction(async tsx => {
    const projectId = await getActiveProject();
    const requestTree = await getRequestOrFolderMeta();
    if (!projectId || !requestTree[id]) return null;

    const selectedReuestIds = findSelectedRequestIds(id, requestTree);

    /**
     * =========================
     * Find out request-list
     * =========================
     */
    const requestList: FolderExportFileInterface["requestList"] = {};
    Object.keys(requestTree ?? {}).forEach(requestId => {
      if (!selectedReuestIds.has(requestId)) return;
      const { children, projectId, createdAt, ...rest } =
        requestTree[requestId];
      requestList[requestId] = rest;
    });
    requestList[id].parentId = null;

    const requestIdList = [...selectedReuestIds];

    const apiUrlList = (
      (await tsx
        .select(
          (() => {
            const { id, createdAt, ...rest } = getTableColumns(apiUrlTable);
            return rest;
          })()
        )
        .from(apiUrlTable)
        .where(inArray(apiUrlTable.requestOrFolderMetaId, requestIdList))) ?? []
    )?.reduce((acc, curr) => {
      if (!acc[curr.requestOrFolderMetaId])
        acc[curr.requestOrFolderMetaId] = [];
      acc[curr.requestOrFolderMetaId].push(curr);

      return acc;
    }, {});

    const paramsList = (
      (await tsx
        .select(
          (() => {
            const { id, createdAt, ...rest } = getTableColumns(paramsTable);
            return rest;
          })()
        )
        .from(paramsTable)
        .where(inArray(paramsTable.requestOrFolderMetaId, requestIdList))) ?? []
    )?.reduce((acc, curr) => {
      if (!acc[curr.requestOrFolderMetaId])
        acc[curr.requestOrFolderMetaId] = [];
      acc[curr.requestOrFolderMetaId].push(curr);

      return acc;
    }, {});

    const headersList = (
      (await tsx
        .select(
          (() => {
            const { id, createdAt, ...rest } = getTableColumns(headersTable);
            return rest;
          })()
        )
        .from(headersTable)
        .where(inArray(headersTable.requestOrFolderMetaId, requestIdList))) ??
      []
    )?.reduce((acc, curr) => {
      if (!acc[curr.requestOrFolderMetaId])
        acc[curr.requestOrFolderMetaId] = [];
      acc[curr.requestOrFolderMetaId].push(curr);

      return acc;
    }, {});

    const hiddenHeadersCheckList = (
      (await tsx
        .select(
          (() => {
            const { id, ...rest } = getTableColumns(hiddenHeadersCheckTable);
            return rest;
          })()
        )
        .from(hiddenHeadersCheckTable)
        .where(
          inArray(hiddenHeadersCheckTable.requestOrFolderMetaId, requestIdList)
        )) ?? []
    )?.reduce((acc, curr) => {
      if (!acc[curr.requestOrFolderMetaId])
        acc[curr.requestOrFolderMetaId] = [];
      acc[curr.requestOrFolderMetaId].push(curr);

      return acc;
    }, {});

    const formDataList = (
      (await tsx
        .select(
          (() => {
            const { id, createdAt, ...rest } =
              getTableColumns(bodyFormDataTable);
            return rest;
          })()
        )
        .from(bodyFormDataTable)
        .where(
          inArray(bodyFormDataTable.requestOrFolderMetaId, requestIdList)
        )) ?? []
    )?.reduce((acc, curr) => {
      if (!acc[curr.requestOrFolderMetaId])
        acc[curr.requestOrFolderMetaId] = [];
      acc[curr.requestOrFolderMetaId].push(curr);

      return acc;
    }, {});

    const xWWWFormUrlencodedList = (
      (await tsx
        .select(
          (() => {
            const { id, createdAt, ...rest } = getTableColumns(
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
        )) ?? []
    )?.reduce((acc, curr) => {
      if (!acc[curr.requestOrFolderMetaId])
        acc[curr.requestOrFolderMetaId] = [];
      acc[curr.requestOrFolderMetaId].push(curr);

      return acc;
    }, {});

    const binaryDataList = (
      (await tsx
        .select(
          (() => {
            const { id, ...rest } = getTableColumns(bodyBinaryTable);
            return rest;
          })()
        )
        .from(bodyBinaryTable)
        .where(
          inArray(bodyBinaryTable.requestOrFolderMetaId, requestIdList)
        )) ?? []
    )?.reduce((acc, curr) => {
      if (!acc[curr.requestOrFolderMetaId])
        acc[curr.requestOrFolderMetaId] = [];
      acc[curr.requestOrFolderMetaId].push(curr);

      return acc;
    }, {});

    const rawDataList = (
      (await tsx
        .select(
          (() => {
            const { id, lineWrap, ...rest } = getTableColumns(bodyRawTable);
            return rest;
          })()
        )
        .from(bodyRawTable)
        .where(inArray(bodyRawTable.requestOrFolderMetaId, requestIdList))) ??
      []
    )?.reduce((acc, curr) => {
      if (!acc[curr.requestOrFolderMetaId])
        acc[curr.requestOrFolderMetaId] = [];
      acc[curr.requestOrFolderMetaId].push(curr);

      return acc;
    }, {});

    const requestMetaTabList = (
      (await tsx
        .select(
          (() => {
            const { id, ...rest } = getTableColumns(requestMetaTabTable);
            return rest;
          })()
        )
        .from(requestMetaTabTable)
        .where(
          inArray(requestMetaTabTable.requestOrFolderMetaId, requestIdList)
        )) ?? []
    )?.reduce((acc, curr) => {
      if (!acc[curr.requestOrFolderMetaId])
        acc[curr.requestOrFolderMetaId] = [];
      acc[curr.requestOrFolderMetaId].push(curr);

      return acc;
    }, {});

    const authorization = (
      (await tsx
        .select(
          (() => {
            const { id, projectId, ...rest } =
              getTableColumns(authorizationTable);
            return rest;
          })()
        )
        .from(authorizationTable)
        .where(
          inArray(authorizationTable.requestOrFolderMetaId, requestIdList)
        )) ?? []
    )?.reduce((acc, curr) => {
      if (!acc[`${curr.requestOrFolderMetaId}`])
        acc[`${curr.requestOrFolderMetaId}`] = [];
      acc[`${curr.requestOrFolderMetaId}`].push(curr);

      return acc;
    }, {});

    return {
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
      authorization
    };
  });
};

export const importFolder = async ({
  requestId = null,
  projectId,
  requestList = {},
  apiUrlList = {},
  paramsList = {},
  headersList = {},
  hiddenHeadersCheckList = {},
  formDataList = {},
  xWWWFormUrlencodedList = {},
  binaryDataList = {},
  rawDataList = {},
  requestMetaTabList = {},
  authorization = {}
}: FolderExportFileInterface & {
  requestId: string | null;
  projectId: string;
}): Promise<boolean> => {
  return await db.transaction(async tsx => {
    const newRequestList: Array<
      ProjectExportFileInterface["requestList"][string] & {
        projectId: string;
      }
    > = [];
    const newApiUrlList: Array<
      ProjectExportFileInterface["apiUrlList"][string]
    > = [];
    const newParamsList: Array<
      ProjectExportFileInterface["paramsList"][string][number] & {
        requestOrFolderMetaId: string;
      }
    > = [];
    const newHeadersList: Array<
      ProjectExportFileInterface["headersList"][string][number]
    > = [];
    const newHiddenHeadersList: Array<
      ProjectExportFileInterface["hiddenHeadersCheckList"][string]
    > = [];
    const newRequestMetaTabList: Array<
      ProjectExportFileInterface["requestMetaTabList"][string] & {
        requestOrFolderMetaId: string;
      }
    > = [];
    const newFormDataList: Array<
      ProjectExportFileInterface["formDataList"][string][number] & {
        requestOrFolderMetaId: string;
      }
    > = [];
    const newXWWWList: Array<
      ProjectExportFileInterface["xWWWFormUrlencodedList"][string][number] & {
        requestOrFolderMetaId: string;
      }
    > = [];
    const newBinaryList: Array<
      ProjectExportFileInterface["binaryDataList"][string] & {
        requestOrFolderMetaId: string;
      }
    > = [];
    const newRawList: Array<
      ProjectExportFileInterface["rawDataList"][string] & {
        requestOrFolderMetaId: string;
      }
    > = [];
    const newAuthorization: Array<
      ProjectExportFileInterface["authorization"][string] & {
        projectId: string;
      }
    > = [];

    const idMapping = {};
    Object.keys(requestList).forEach(oldId => {
      const newId = uuidv4();
      idMapping[oldId] = newId;
    });

    Object.keys(requestList).forEach(oldId => {
      const newId = idMapping[oldId];
      const request = {
        ...requestList[oldId],
        id: newId,
        projectId
      };

      if (request.parentId) {
        request.parentId = idMapping[request.parentId] || null;
      }

      newRequestList[newId] = request;
      delete requestList[oldId];

      if (apiUrlList[oldId]) {
        newApiUrlList.push({
          ...apiUrlList[oldId],
          requestOrFolderMetaId: newId
        });
      }

      if (paramsList[oldId]) {
        newParamsList.push(
          ...paramsList[oldId].map(param => ({
            ...param,
            requestOrFolderMetaId: newId
          }))
        );
      }

      if (headersList[oldId]) {
        newHeadersList.push(
          ...headersList[oldId].map(header => ({
            ...header,
            requestOrFolderMetaId: newId
          }))
        );
      }

      if (hiddenHeadersCheckList[oldId]) {
        newHiddenHeadersList.push({
          ...hiddenHeadersCheckList[oldId],
          requestOrFolderMetaId: newId
        });
      }

      if (requestMetaTabList[oldId]) {
        newRequestMetaTabList.push({
          ...requestMetaTabList[oldId],
          requestOrFolderMetaId: newId
        });
      }

      if (formDataList[oldId]) {
        newFormDataList.push(
          ...formDataList[oldId].map(form => ({
            ...form,
            requestOrFolderMetaId: newId
          }))
        );
      }

      if (xWWWFormUrlencodedList[oldId]) {
        newXWWWList.push(
          ...xWWWFormUrlencodedList[oldId].map(form => ({
            ...form,
            requestOrFolderMetaId: newId
          }))
        );
      }

      if (binaryDataList[oldId]) {
        newBinaryList.push({
          ...binaryDataList[oldId],
          requestOrFolderMetaId: newId
        });
      }

      if (rawDataList[oldId]) {
        newRawList.push({
          ...rawDataList[oldId],
          requestOrFolderMetaId: newId
        });
      }

      if (authorization[oldId]) {
        newAuthorization.push({
          ...authorization[oldId],
          requestOrFolderMetaId: newId,
          projectId
        });
      }
    });

    /**
     * =========================
     * update root folder with targated request-id
     * =========================
     */
    const rootFolderId = Object.keys(newRequestList).find(
      id => !newRequestList[id].parentId
    );
    if (!rootFolderId) return false;
    newRequestList[rootFolderId].parentId = requestId;

    const finalRequests = Object.values(newRequestList);

    if (finalRequests.length)
      await tsx.insert(requestOrFolderMetaTable).values(finalRequests);
    if (newApiUrlList.length)
      await tsx.insert(apiUrlTable).values(newApiUrlList);
    if (newParamsList.length)
      await tsx.insert(paramsTable).values(newParamsList);
    if (newHeadersList.length)
      await tsx.insert(headersTable).values(newHeadersList);
    if (newHiddenHeadersList.length)
      await tsx.insert(hiddenHeadersCheckTable).values(newHiddenHeadersList);
    if (newRequestMetaTabList.length)
      await tsx.insert(requestMetaTabTable).values(newRequestMetaTabList);
    if (newFormDataList.length)
      await tsx.insert(bodyFormDataTable).values(newFormDataList);
    if (newXWWWList.length)
      await tsx.insert(bodyXWWWFormUrlencodedTable).values(newXWWWList);
    if (newBinaryList.length)
      await tsx.insert(bodyBinaryTable).values(newBinaryList);
    if (newRawList.length) await tsx.insert(bodyRawTable).values(newRawList);
    if (newAuthorization.length)
      await tsx.insert(authorizationTable).values(newAuthorization);

    return true;
  });
};
