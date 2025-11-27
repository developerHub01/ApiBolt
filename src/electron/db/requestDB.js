import { getTabList } from "./tabsDB.js";
import { deleteApiUrlByRequestMetaId } from "./apiUrlDB.js";
import { deleteParamsByRequestMetaId } from "./paramsDB.js";
import { deleteHeadersByRequestMetaId } from "./headersDB.js";
import { deleteBodyBinary } from "./bodyBinaryDB.js";
import {
  getRequestOrFolderMeta,
  updateRequestOrFolderMeta,
} from "./requestOrFolderMetaDB.js";
import { updateHiddenHeadersCheck } from "./hiddenHeadersCheckDB.js";
import { deleteBodyFormDataByRequestMetaId } from "./bodyFormDataDB.js";
import { deleteBodyXWWWFormUrlencodedByRequestMetaId } from "./bodyXWWWFormUrlencodedDB.js";
import { deleteBodyRawByRequestMetaId } from "./bodyRawDB.js";
import { deleteRequestMetaTab } from "./requestMetaTabDB.js";
import { deleteAuthByRequestMetaId } from "./authorizationDB.js";
import { runInTransaction } from "../utils/db.js";
import { findSelectedRequestIds } from "../utils/request.js";
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
} from "./schema.js";
import { db } from "./index.js";
import { getActiveProject } from "./projectsDB.js";

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
      .where(eq(authorizationTable.projectId, projectId))) ?? []
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
