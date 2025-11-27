import { getTabList } from "./tabsDB.js";
import {
  deleteApiUrlByRequestMetaId,
  getApiUrlDB,
  updateApiUrl,
} from "./apiUrlDB.js";
import {
  deleteParamsByRequestMetaId,
  getParams,
  replaceParams,
} from "./paramsDB.js";
import {
  deleteHeadersByRequestMetaId,
  getHeaders,
  replaceHeaders,
} from "./headersDB.js";
import {
  deleteBodyBinary,
  getBodyBinary,
  replaceBodyBinary,
} from "./bodyBinaryDB.js";
import {
  getRequestOrFolderMeta,
  getRequestOrFolderMetaById,
  updateRequestOrFolderMeta,
} from "./requestOrFolderMetaDB.js";
import {
  getHiddenHeadersCheck,
  updateHiddenHeadersCheck,
} from "./hiddenHeadersCheckDB.js";
import {
  deleteBodyFormDataByRequestMetaId,
  getBodyFormData,
  replaceBodyFormData,
} from "./bodyFormDataDB.js";
import {
  deleteBodyXWWWFormUrlencodedByRequestMetaId,
  getBodyXWWWFormUrlencoded,
  replaceBodyXWWWFormUrlencoded,
} from "./bodyXWWWFormUrlencodedDB.js";
import {
  deleteBodyRawByRequestMetaId,
  getBodyRaw,
  replaceBodyRaw,
} from "./bodyRawDB.js";
import {
  deleteRequestMetaTab,
  getRequestMetaTab,
  updateRequestMetaTab,
} from "./requestMetaTabDB.js";
import {
  deleteAuthByRequestMetaId,
  getInheritedAuthFromId,
  replaceAuth,
} from "./authorizationDB.js";
import { runInTransaction } from "../utils/db.js";
import { findSelectedRequestIds } from "../utils/request.js";
import { getTableColumns, inArray } from "drizzle-orm";
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
  requestOrFolderMetaTable,
} from "./schema.js";
import { db } from "./index.js";
import { getActiveProject } from "./projectsDB.js";
import { v4 as uuidv4 } from "uuid";

/* id === active project id */
export const clearRequestDB = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;

    await runInTransaction(async () => {
      if (
        /* clear api-url */
        !(await deleteApiUrlByRequestMetaId(id)) ||
        /* clear auth */
        !(await deleteAuthByRequestMetaId(id)) ||
        /* clear params */
        !(await deleteParamsByRequestMetaId(id)) ||
        /* clear header */
        !(await deleteHeadersByRequestMetaId(id)) ||
        /* clear binary data */
        !(await deleteBodyBinary(id)) ||
        /* clear form-data data */
        !(await deleteBodyFormDataByRequestMetaId(id)) ||
        /* clear xwww-form-urlencoded data */
        !(await deleteBodyXWWWFormUrlencodedByRequestMetaId(id)) ||
        /* clear raw data data */
        !(await deleteBodyRawByRequestMetaId(id)) ||
        /* clear request meta tab data */
        !(await deleteRequestMetaTab(id)) ||
        /* clear request or folder meta data */
        !(await updateRequestOrFolderMeta({
          id,
          name: "Request",
          method: "get",
        })) ||
        /* clear hidden headers check data */
        !(await updateHiddenHeadersCheck({
          requestOrFolderMetaId: id,
          userAgent: 1,
          contentLength: 1,
          accept: 1,
          acceptEncoding: 1,
          connection: 1,
        }))
      ) {
        throw new Error("Can't clear the request.");
      }
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const importRequest = async ({
  requestId,
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
  authorization,
}) => {
  return await runInTransaction(async () => {
    /**
     * ===================
     * request-meta-data
     * ===================
     */

    await updateRequestOrFolderMeta({
      id: requestId,
      name,
      method,
    });

    /**
     * ===================
     * api-url
     * ===================
     */
    await updateApiUrl({
      requestOrFolderMetaId: requestId,
      url,
    });

    /**
     * ===================
     * Params
     * ===================
     */
    await replaceParams(requestId, params);

    /**
     * ===================
     * Headers
     * ===================
     */
    await replaceHeaders(requestId, headers);

    /**
     * ===================
     * Hidden headers check
     * ===================
     */
    await updateHiddenHeadersCheck({
      requestOrFolderMetaId: requestId,
      ...hiddenHeadersCheck,
    });

    /**
     * ===================
     * Request meta-tab
     * ===================
     */
    await updateRequestMetaTab({
      requestOrFolderMetaId: requestId,
      ...requestMetaTab,
    });

    /**
     * ===================
     * body x-www-formurlencoded
     * ===================
     */
    await replaceBodyXWWWFormUrlencoded(requestId, bodyXWWWFormUrlencoded);

    /**
     * ===================
     * body form-data
     * ===================
     */
    await replaceBodyFormData(requestId, bodyFormData);

    /**
     * ===================
     * body binary-data
     * ===================
     */
    await replaceBodyBinary({
      requestOrFolderMetaId: requestId,
      ...bodyBinary,
    });

    /**
     * ===================
     * body raw-data
     * ===================
     */
    await replaceBodyRaw({
      requestOrFolderMetaId: requestId,
      ...bodyRaw,
    });

    /**
     * ===================
     * Authorization
     * ===================
     */
    await replaceAuth({
      requestOrFolderId: requestId,
      payload: authorization,
    });

    return true;
  });
};

export const exportRequest = async (id) => {
  const metaResponse = await getRequestOrFolderMetaById(id);
  if (!metaResponse?.method) return false;
  const { name, method } = metaResponse;

  const apiUrlResponse = await getApiUrlDB(id);
  if (!apiUrlResponse?.url) return false;
  const { url } = apiUrlResponse;

  const params = ((await getParams(id)) ?? []).map(
    ({ id, createdAt, requestOrFolderMetaId, ...other }) => ({
      ...other,
    })
  );
  const headers = ((await getHeaders(id)) ?? []).map(
    ({ id, createdAt, requestOrFolderMetaId, ...other }) => ({
      ...other,
    })
  );
  const hiddenHeadersCheck = await getHiddenHeadersCheck(id);
  if (hiddenHeadersCheck) {
    delete hiddenHeadersCheck["id"];
    delete hiddenHeadersCheck["requestOrFolderMetaId"];
  }
  const requestMetaTab = await getRequestMetaTab(id);
  if (requestMetaTab) {
    delete requestMetaTab["id"];
    delete requestMetaTab["requestOrFolderMetaId"];
  }
  const bodyRaw = await getBodyRaw(id);
  if (bodyRaw) {
    delete bodyRaw["id"];
    delete bodyRaw["requestOrFolderMetaId"];
    delete bodyRaw["lineWrap"];
  }
  const bodyBinary = await getBodyBinary(id);
  if (bodyBinary) {
    delete bodyBinary["id"];
    delete bodyBinary["requestOrFolderMetaId"];
  }
  const bodyXWWWFormUrlencoded = (
    (await getBodyXWWWFormUrlencoded(id)) ?? []
  ).map(({ id, createdAt, requestOrFolderMetaId, ...other }) => ({
    ...other,
  }));
  const bodyFormData = ((await getBodyFormData(id)) ?? []).map(
    ({ id, createdAt, requestOrFolderMetaId, ...other }) => ({
      ...other,
    })
  );

  const authorization = await getInheritedAuthFromId(id);
  if (authorization) {
    delete authorization["id"];
    delete authorization["projectId"];
    delete authorization["requestOrFolderMetaId"];
  }

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
    authorization,
  };
};

export const exportFolder = async (id) => {
  const projectId = await getActiveProject();
  const requestTree = await getRequestOrFolderMeta();
  if (!projectId || !requestTree[id]) return false;

  const selectedReuestIds = findSelectedRequestIds(id, requestTree);

  /**
   * =========================
   * Find out request-list
   * =========================
   */
  const requestList = {};
  Object.keys(requestTree ?? {}).forEach((requestId) => {
    if (!selectedReuestIds.has(requestId)) return;
    requestList[requestId] = requestTree[requestId];
    delete requestList[requestId].children;
    delete requestList[requestId].projectId;
    delete requestList[requestId].createdAt;
  });
  requestList[id].parentId = null;

  const requestIdList = [...selectedReuestIds];

  const apiUrlList = (
    (await db
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } =
            getTableColumns(apiUrlTable);
          return rest;
        })()
      )
      .from(apiUrlTable)
      .where(inArray(apiUrlTable.requestOrFolderMetaId, requestIdList))) ?? []
  )?.reduce((acc, curr) => {
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

    return acc;
  }, {});

  const paramsList = (
    (await db
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } =
            getTableColumns(paramsTable);
          return rest;
        })()
      )
      .from(paramsTable)
      .where(inArray(paramsTable.requestOrFolderMetaId, requestIdList))) ?? []
  )?.reduce((acc, curr) => {
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

    return acc;
  }, {});

  const headersList = (
    (await db
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } =
            getTableColumns(headersTable);
          return rest;
        })()
      )
      .from(headersTable)
      .where(inArray(headersTable.requestOrFolderMetaId, requestIdList))) ?? []
  )?.reduce((acc, curr) => {
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

    return acc;
  }, {});

  const hiddenHeadersCheckList = (
    (await db
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
      )) ?? []
  )?.reduce((acc, curr) => {
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

    return acc;
  }, {});

  const formDataList = (
    (await db
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } =
            getTableColumns(bodyFormDataTable);
          return rest;
        })()
      )
      .from(bodyFormDataTable)
      .where(
        inArray(bodyFormDataTable.requestOrFolderMetaId, requestIdList)
      )) ?? []
  )?.reduce((acc, curr) => {
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

    return acc;
  }, {});

  const xWWWFormUrlencodedList = (
    (await db
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
      )) ?? []
  )?.reduce((acc, curr) => {
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

    return acc;
  }, {});

  const binaryDataList = (
    (await db
      .select(
        (() => {
          const { id, projectId, ...rest } = getTableColumns(bodyBinaryTable);
          return rest;
        })()
      )
      .from(bodyBinaryTable)
      .where(inArray(bodyBinaryTable.requestOrFolderMetaId, requestIdList))) ??
    []
  )?.reduce((acc, curr) => {
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

    return acc;
  }, {});

  const rawDataList = (
    (await db
      .select(
        (() => {
          const { id, projectId, lineWrap, ...rest } =
            getTableColumns(bodyRawTable);
          return rest;
        })()
      )
      .from(bodyRawTable)
      .where(inArray(bodyRawTable.requestOrFolderMetaId, requestIdList))) ?? []
  )?.reduce((acc, curr) => {
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

    return acc;
  }, {});

  const requestMetaTabList = (
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
      )) ?? []
  )?.reduce((acc, curr) => {
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

    return acc;
  }, {});

  const authorization = (
    (await db
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
    if (!acc[curr.requestOrFolderMetaId]) acc[curr.requestOrFolderMetaId] = [];
    acc[curr.requestOrFolderMetaId].push(curr);

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
    authorization,
  };
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
  authorization = {},
}) => {
  return await db.transaction(async (tsx) => {
    const newApiUrlList = [];
    const newParamsList = [];
    const newHeadersList = [];
    const newHiddenHeadersList = [];
    const newRequestMetaTabList = [];
    const newFormDataList = [];
    const newXWWWList = [];
    const newBinaryList = [];
    const newRawList = [];
    const newAuthorization = [];

    const idMapping = {};
    Object.keys(requestList).forEach((oldId) => {
      const newId = uuidv4();
      idMapping[oldId] = newId;
    });

    Object.keys(requestList).forEach((oldId) => {
      const newId = idMapping[oldId];
      const request = {
        ...requestList[oldId],
        id: newId,
        projectId,
      };

      if (request.parentId) {
        request.parentId = idMapping[request.parentId] || null;
      }

      requestList[newId] = request;
      delete requestList[oldId];

      if (apiUrlList[oldId]) {
        newApiUrlList.push(
          ...apiUrlList[oldId].map((url) => ({
            ...url,
            requestOrFolderMetaId: newId,
          }))
        );
      }

      if (paramsList[oldId]) {
        newParamsList.push(
          ...paramsList[oldId].map((param) => ({
            ...param,
            requestOrFolderMetaId: newId,
          }))
        );
      }

      if (headersList[oldId]) {
        newHeadersList.push(
          ...headersList[oldId].map((header) => ({
            ...header,
            requestOrFolderMetaId: newId,
          }))
        );
      }

      if (hiddenHeadersCheckList[oldId]) {
        newHiddenHeadersList.push(
          ...hiddenHeadersCheckList[oldId].map((header) => ({
            ...header,
            requestOrFolderMetaId: newId,
          }))
        );
      }

      if (requestMetaTabList[oldId]) {
        newRequestMetaTabList.push(
          ...requestMetaTabList[oldId].map((meta) => ({
            ...meta,
            requestOrFolderMetaId: newId,
          }))
        );
      }

      if (formDataList[oldId]) {
        newFormDataList.push(
          ...formDataList[oldId].map((form) => ({
            ...form,
            requestOrFolderMetaId: newId,
          }))
        );
      }

      if (xWWWFormUrlencodedList[oldId]) {
        newXWWWList.push(
          ...xWWWFormUrlencodedList[oldId].map((form) => ({
            ...form,
            requestOrFolderMetaId: newId,
          }))
        );
      }

      if (binaryDataList[oldId]) {
        newBinaryList.push(
          ...binaryDataList[oldId].map((form) => ({
            ...form,
            requestOrFolderMetaId: newId,
          }))
        );
      }

      if (rawDataList[oldId]) {
        newRawList.push(
          ...rawDataList[oldId].map((form) => ({
            ...form,
            requestOrFolderMetaId: newId,
          }))
        );
      }

      if (authorization[oldId]) {
        newAuthorization.push(
          ...authorization[oldId].map((auth) => ({
            ...auth,
            requestOrFolderMetaId: newId,
            projectId,
          }))
        );
      }
    });

    /**
     * =========================
     * update root folder with targated request-id
     * =========================
     */
    const rootFolderId = Object.keys(requestList).find(
      (id) => !requestList[id].parentId
    );
    if (!rootFolderId) return false;
    requestList[rootFolderId].parentId = requestId;

    const finalRequests = Object.values(requestList);

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
