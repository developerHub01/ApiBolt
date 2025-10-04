import { getTabList } from "./tabsDB.js";
import { deleteApiUrlByRequestMetaId } from "./apiUrlDB.js";
import { deleteParamsByRequestMetaId } from "./paramsDB.js";
import { deleteHeadersByRequestMetaId } from "./headersDB.js";
import { deleteBodyBinary } from "./bodyBinaryDB.js";
import { updateRequestOrFolderMeta } from "./requestOrFolderMetaDB.js";
import { updateHiddenHeadersCheck } from "./hiddenHeadersCheckDB.js";
import { deleteBodyFormDataByRequestMetaId } from "./bodyFormDataDB.js";
import { deleteBodyXWWWFormUrlencodedByRequestMetaId } from "./bodyXWWWFormUrlencodedDB.js";
import { deleteBodyRawByRequestMetaId } from "./bodyRawDB.js";
import { deleteRequestMetaTab } from "./requestMetaTabDB.js";
import { deleteAuthByRequestMetaId } from "./authorizationDB.js";

/* id === active project id */
export const clearRequestDB = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;

    /* clear api-url */
    await deleteApiUrlByRequestMetaId(id);
    /* clear auth */
    await deleteAuthByRequestMetaId(id);
    /* clear params */
    await deleteParamsByRequestMetaId(id);
    /* clear header */
    await deleteHeadersByRequestMetaId(id);
    /* clear binary data */
    await deleteBodyBinary(id);
    /* clear form-data data */
    await deleteBodyFormDataByRequestMetaId(id);
    /* clear xwww-form-urlencoded data */
    await deleteBodyXWWWFormUrlencodedByRequestMetaId(id);
    /* clear raw data data */
    await deleteBodyRawByRequestMetaId(id);
    /* clear request meta tab data */
    await deleteRequestMetaTab(id);
    /* clear request or folder meta data */
    await updateRequestOrFolderMeta({
      id,
      name: "",
      method: "get",
    });
    /* clear hidden headers check data */
    await updateHiddenHeadersCheck({
      requestOrFolderMetaId: id,
      userAgent: 1,
      contentLength: 1,
      accept: 1,
      acceptEncoding: 1,
      connection: 1,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
