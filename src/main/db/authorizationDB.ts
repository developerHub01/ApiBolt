import { and, eq, inArray, isNull } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import {
  authorizationTable,
  requestOrFolderMetaTable
} from "@/main/db/schema.js";
import { getActiveProject } from "@/main/db/projectsDB.js";
import { generateJWT, hasValue } from "@/main/utils/utils.js";
import { ElectronAPIAuthorizationInterface } from "@/shared/types/api/electron-authorization";
import { getTabList } from "@/main/db/tabsDB";
import { AuthorizationPayloadInterface } from "@/shared/types/authorization.types";

/* id === active project id */
export const getAuth: ElectronAPIAuthorizationInterface["getAuth"] =
  async requestId => {
    try {
      const activeProjectId = await getActiveProject();
      if (!activeProjectId) throw new Error();

      return (
        await db
          .select()
          .from(authorizationTable)
          .where(
            and(
              eq(authorizationTable.projectId, activeProjectId),
              requestId
                ? eq(authorizationTable.requestOrFolderMetaId, requestId)
                : isNull(authorizationTable.requestOrFolderMetaId)
            )
          )
      )?.[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getInheritedAuthFromId: ElectronAPIAuthorizationInterface["getInheritedAuthFromId"] =
  async requestId => {
    try {
      let currentId: string | null = requestId;

      while (currentId) {
        const requestData = (
          await db
            .select()
            .from(requestOrFolderMetaTable)
            .where(eq(requestOrFolderMetaTable.id, currentId))
            .limit(1)
        )?.[0];
        if (!requestData) throw new Error();

        const auth = (
          await db
            .select()
            .from(authorizationTable)
            .where(eq(authorizationTable.requestOrFolderMetaId, currentId))
            .limit(1)
        )?.[0];

        /* no auth found here */
        const type = auth?.type ?? "inherit-parent";

        /* found auth */
        if (type !== "inherit-parent") return auth;

        currentId = requestData?.parentId ?? null;
        if (!currentId) return await getAuth();
      }

      throw new Error();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createAuth: ElectronAPIAuthorizationInterface["createAuth"] =
  async payload => {
    try {
      let projectId = payload.projectId;

      if (!projectId) {
        const activeProject = await getActiveProject();
        if (!activeProject) throw new Error();
        projectId = activeProject;
      }

      /* checking if requestOrFolderMetaId is null and for that project is there allready a requestOrFolderMetaId with null */
      if (!payload.requestOrFolderMetaId) {
        const isExist = (
          await db
            .select()
            .from(authorizationTable)
            .where(
              and(
                eq(authorizationTable.projectId, projectId),
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
        projectId
      });

      return result.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const updateAuth: ElectronAPIAuthorizationInterface["updateAuth"] =
  async ({ requestOrFolderId, payload = {} }) => {
    try {
      const activeProjectId = await getActiveProject();
      if (!activeProjectId) throw new Error();

      const authData = (
        await db
          .select()
          .from(authorizationTable)
          .where(
            and(
              eq(authorizationTable.projectId, activeProjectId),
              requestOrFolderId
                ? eq(
                    authorizationTable.requestOrFolderMetaId,
                    requestOrFolderId
                  )
                : isNull(authorizationTable.requestOrFolderMetaId)
            )
          )
      )?.[0];

      if (!authData)
        await createAuth({
          projectId: activeProjectId,
          requestOrFolderMetaId: requestOrFolderId
        });

      let basicAuthToken: string | null = null;
      let jwtAuthToken: string | null = null;
      const previousAuthType = authData?.type;
      const currentAuthType = payload.type;

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
              payload: authData?.jwtPayload ?? payload?.jwtPayload ?? ""
            }) ?? "";
        }
      } catch (error) {
        console.error(error);
      }

      if (!hasValue(payload.basicAuthToken))
        payload.basicAuthToken = basicAuthToken as string | undefined;
      if (!hasValue(payload.jwtAuthToken))
        payload.jwtAuthToken = jwtAuthToken as string | undefined;

      return (
        (
          await db
            .update(authorizationTable)
            .set({
              ...payload
            })
            .where(
              and(
                eq(authorizationTable.projectId, activeProjectId),
                requestOrFolderId
                  ? eq(
                      authorizationTable.requestOrFolderMetaId,
                      requestOrFolderId
                    )
                  : isNull(authorizationTable.requestOrFolderMetaId)
              )
            )
            .returning()
        )?.[0] ?? null
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const replaceAuth = async ({
  requestOrFolderId,
  payload
}: {
  requestOrFolderId?: string | null;
  payload: Partial<AuthorizationPayloadInterface>;
}) => {
  try {
    const activeProjectId = await getActiveProject();
    if (!activeProjectId) return false;

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
      ...payload
    };

    const isExist = (
      await db
        .select({
          id: authorizationTable.id
        })
        .from(authorizationTable)
        .where(
          and(
            eq(authorizationTable.projectId, activeProjectId),
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
          ...payload
        })
        .where(
          and(
            eq(authorizationTable.projectId, activeProjectId),
            requestOrFolderId
              ? eq(authorizationTable.requestOrFolderMetaId, requestOrFolderId)
              : isNull(authorizationTable.requestOrFolderMetaId)
          )
        );
    } else {
      await db.insert(authorizationTable).values({
        ...payload,
        requestOrFolderMetaId: requestOrFolderId,
        projectId: activeProjectId
      });
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteAuth: ElectronAPIAuthorizationInterface["deleteAuth"] =
  async id => {
    try {
      if (!id) id = (await getTabList())?.selectedTab;

      if (id) {
        return (
          (
            await db
              .delete(authorizationTable)
              .where(eq(authorizationTable.id, id))
          )?.rowsAffected > 0
        );
      }

      const activeProjectId = await getActiveProject();
      if (!activeProjectId) throw new Error();

      return (
        (
          await db
            .delete(authorizationTable)
            .where(eq(authorizationTable.projectId, activeProjectId))
        ).rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteAuthByProjectId = async (id: string): Promise<boolean> => {
  try {
    return (
      (
        await db
          .delete(authorizationTable)
          .where(eq(authorizationTable.projectId, id))
      ).rowsAffected > 0
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteAuthByRequestMetaId = async (
  requestOrFolderMetaId?: string | null
) => {
  try {
    if (!requestOrFolderMetaId)
      requestOrFolderMetaId = (await getTabList())?.selectedTab;
    if (!requestOrFolderMetaId) throw new Error();

    return (
      (
        await db
          .delete(authorizationTable)
          .where(
            eq(authorizationTable.requestOrFolderMetaId, requestOrFolderMetaId)
          )
      )?.rowsAffected > 0
    );
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
export const duplicateAuth: ElectronAPIAuthorizationInterface["duplicateAuth"] =
  async payload => {
    try {
      if (!payload) throw new Error();
      const oldIds = Object.keys(payload);
      if (!oldIds.length) throw new Error();

      const existingAuthData = await db
        .select()
        .from(authorizationTable)
        .where(inArray(authorizationTable.requestOrFolderMetaId, oldIds));

      if (!existingAuthData.length) return true;

      /**
       * - Replacing oldId with duplicatedId
       * and only keeping url so that other things automatically generate by default
       */
      const duplicatePayload = existingAuthData.map(auth => {
        const { id, ...authPayload } = auth;
        return {
          ...authPayload,
          requestOrFolderMetaId: payload[auth.requestOrFolderMetaId!]
        };
      });

      return (
        (await db.insert(authorizationTable).values(duplicatePayload))
          ?.rowsAffected > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  };
