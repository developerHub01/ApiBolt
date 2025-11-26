import { and, eq, inArray, isNull } from "drizzle-orm";
import { db } from "./index.js";
import { authorizationTable, requestOrFolderMetaTable } from "./schema.js";
import { getActiveProject } from "./projectsDB.js";
import { generateJWT, hasValue } from "../utils/utils.js";

/* id === active project id */
export const getAuth = async (requestId) => {
  try {
    const projectId = await getActiveProject();

    return (
      await db
        .select()
        .from(authorizationTable)
        .where(
          and(
            eq(authorizationTable.projectId, projectId),
            requestId
              ? eq(authorizationTable.requestOrFolderMetaId, requestId)
              : isNull(authorizationTable.requestOrFolderMetaId)
          )
        )
    )?.[0];
  } catch (error) {
    console.error(error);
  }
};

export const getInheritedAuthFromId = async (requestId) => {
  try {
    const projectId = await getActiveProject();
    let currentId = requestId;

    while (currentId) {
      const requestData = (
        await db
          .select()
          .from(requestOrFolderMetaTable)
          .where(
            and(
              eq(requestOrFolderMetaTable.id, currentId),
              eq(requestOrFolderMetaTable.projectId, projectId)
            )
          )
          .limit(1)
      )?.[0];
      if (!requestData) return;

      const auth = (
        await db
          .select()
          .from(authorizationTable)
          .where(
            and(
              eq(authorizationTable.requestOrFolderMetaId, currentId),
              eq(authorizationTable.projectId, projectId)
            )
          )
          .limit(1)
      )?.[0];

      /* no auth found here */
      const type = auth?.type ?? "inherit-parent";

      /* found auth */
      if (type !== "inherit-parent") return auth;

      currentId = requestData?.parentId ?? null;
      if (!currentId) return await getAuth();
    }

    return null;
  } catch (error) {
    console.error(error);
  }
};

export const createAuth = async (payload = {}) => {
  try {
    if (!payload.projectId) payload.projectId = await getActiveProject();
    if (!payload.projectId) return false;

    /* checking if requestOrFolderMetaId is null and for that project is there allready a requestOrFolderMetaId with null */
    if (!payload.requestOrFolderMetaId) {
      const isExist = (
        await db
          .select()
          .from(authorizationTable)
          .where(
            and(
              eq(authorizationTable.projectId, payload.projectId),
              isNull(authorizationTable.requestOrFolderMetaId)
            )
          )
      )?.[0];

      if (isExist) return false;
    }

    if (!payload["type"])
      payload["type"] = payload.requestOrFolderMetaId
        ? "inherit-parent"
        : "no-auth";

    const result = await db.insert(authorizationTable).values({
      ...payload,
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const updateAuth = async ({ requestOrFolderId, payload = {} } = {}) => {
  try {
    const projectId = await getActiveProject();
    if (!projectId) return false;

    const authData = (
      await db
        .select()
        .from(authorizationTable)
        .where(
          and(
            eq(authorizationTable.projectId, projectId),
            requestOrFolderId
              ? eq(authorizationTable.requestOrFolderMetaId, requestOrFolderId)
              : isNull(authorizationTable.requestOrFolderMetaId)
          )
        )
    )?.[0];

    let updatedData = null;

    if (!authData)
      await createAuth({
        projectId,
        requestOrFolderMetaId: requestOrFolderId,
      });

    let basicAuthToken = null;
    let jwtAuthToken = null;
    const previousAuthType = authData?.type;
    const currentAuthType = payload.type;
    const previousAuthToken = authData?.jwtAuthToken;

    /* if previous and current auth type not diff and previous was jwt-bearer type */
    if (previousAuthType !== currentAuthType) {
      if (previousAuthType === "jwt-bearer") jwtAuthToken = "";
      else if (previousAuthType === "basic-auth") basicAuthToken = "";
    }

    const authType = payload.type ?? authData?.type;

    try {
      if (authType === "basic-auth") {
        const username =
          authData?.basicAuthUsername ?? payload.basicAuthUsername ?? "";
        const password =
          authData?.basicAuthPassword ?? payload.basicAuthPassword ?? "";
        basicAuthToken = btoa(`${username}:${password}`);
      } else if (authType === "jwt-bearer") {
        jwtAuthToken =
          generateJWT({
            algorithm: authData?.jwtAlgo ?? payload?.jwtAlgo ?? "HS256",
            secret: authData?.jwtSecret ?? payload?.jwtSecret ?? "",
            payload: authData?.jwtPayload ?? payload?.jwtPayload ?? "",
          }) ?? "";
      }
    } catch (error) {
      console.error(error);
    }

    if (!hasValue(payload.basicAuthToken))
      payload.basicAuthToken = basicAuthToken;
    if (!hasValue(payload.jwtAuthToken)) payload.jwtAuthToken = jwtAuthToken;

    updatedData = await db
      .update(authorizationTable)
      .set({
        ...payload,
      })
      .where(
        and(
          eq(authorizationTable.projectId, projectId),
          requestOrFolderId
            ? eq(authorizationTable.requestOrFolderMetaId, requestOrFolderId)
            : isNull(authorizationTable.requestOrFolderMetaId)
        )
      )
      .returning();

    return updatedData?.[0];
  } catch (error) {
    console.error(error);
  }
};

export const replaceAuth = async ({ requestOrFolderId, payload = {} } = {}) => {
  try {
    const projectId = await getActiveProject();
    if (!projectId) return false;

    delete payload["id"];
    delete payload["projectId"];
    delete payload["requestOrFolderMetaId"];

    payload = {
      type: "no-auth",
      /* API Key Auth =========== */
      apiKeyKey: "",
      apiKeyValue: "",
      apiKeyAddTo: "header",
      /* Bearer Token Auth ============ */
      bearerToken: "",
      /* Basic Auth =========== */
      basicAuthUsername: "",
      basicAuthPassword: "",
      /* Jwt Auth ========== */
      jwtAlgo: "HS256",
      jwtSecret: "",
      jwtPayload: "",
      jwtHeaderPrefix: "Bearer",
      jwtAddTo: "header",
      basicAuthToken: "",
      jwtAuthToken: "",
      ...payload,
    };

    const isExist = (
      await db
        .select({
          id: authorizationTable.id,
        })
        .from(authorizationTable)
        .where(
          and(
            eq(authorizationTable.projectId, projectId),
            requestOrFolderId
              ? eq(authorizationTable.requestOrFolderMetaId, requestOrFolderId)
              : isNull(authorizationTable.requestOrFolderMetaId)
          )
        )
        .limit(1)
    )?.[0]?.id;

    if (isExist) {
      await db
        .update(authorizationTable)
        .set({
          ...payload,
        })
        .where(
          and(
            eq(authorizationTable.projectId, projectId),
            requestOrFolderId
              ? eq(authorizationTable.requestOrFolderMetaId, requestOrFolderId)
              : isNull(authorizationTable.requestOrFolderMetaId)
          )
        );
    } else {
      await db.insert(authorizationTable).values({
        ...payload,
        requestOrFolderMetaId: requestOrFolderId,
        projectId,
      });
    }

    return true;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAuth = async (id) => {
  try {
    if (!id) id = (await getTabList())?.selectedTab;
    let deleted = null;

    if (id) {
      deleted = await db
        .delete(authorizationTable)
        .where(eq(authorizationTable.id, id));
      return deleted.rowsAffected > 0;
    }

    const projectId = await getActiveProject();

    deleted = await db
      .delete(authorizationTable)
      .where(eq(authorizationTable.projectId, projectId));
    return deleted.rowsAffected > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteAuthByProjectId = async (id) => {
  try {
    const deleted = await db
      .delete(authorizationTable)
      .where(eq(authorizationTable.projectId, id));

    return deleted.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAuthByRequestMetaId = async (requestOrFolderMetaId) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    const projectId = await getActiveProject();
    if (!requestOrFolderMetaId || !projectId) return false;

    await db
      .delete(authorizationTable)
      .where(
        and(
          eq(authorizationTable.requestOrFolderMetaId, requestOrFolderMetaId),
          eq(authorizationTable.projectId, projectId)
        )
      );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/* 
payload = {
  oldId: newId ---> newId means duplicatedId
}
*/
export const duplicateAuth = async (payload) => {
  try {
    if (!payload) return;
    const oldIds = Object.keys(payload);
    const projectId = await getActiveProject();
    if (!oldIds.length || !projectId) return;

    const existingAuthData = await db
      .select()
      .from(authorizationTable)
      .where(
        and(
          inArray(authorizationTable.requestOrFolderMetaId, oldIds),
          eq(authorizationTable.projectId, projectId)
        )
      );

    if (!existingAuthData.length) return true;

    /**
     * - Replacing oldId with duplicatedId
     * and only keeping url so that other things automatically generate by default
     */
    const duplicatePayload = existingAuthData.map((auth) => {
      delete auth["id"];
      return {
        ...auth,
        requestOrFolderMetaId: payload[auth.requestOrFolderMetaId],
        projectId,
      };
    });

    const result = await db.insert(authorizationTable).values(duplicatePayload);

    return result.rowsAffected > 0;
  } catch (error) {
    console.error(error);
  }
};
