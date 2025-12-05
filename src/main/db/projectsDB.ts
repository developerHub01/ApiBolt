import { eq, count, getTableColumns, inArray } from "drizzle-orm";
import { db } from "@/main/db/index.js";
import {
  projectTable,
  activeProjectTable,
  ACTIVE_PROJECT_ID,
  environmentTable,
  requestOrFolderMetaTable,
  apiUrlTable,
  paramsTable,
  headersTable,
  hiddenHeadersCheckTable,
  bodyFormDataTable,
  bodyXWWWFormUrlencodedTable,
  bodyBinaryTable,
  bodyRawTable,
  requestMetaTabTable,
  authorizationTable
} from "@/main/db/schema.js";
import { createAuth } from "@/main/db/authorizationDB.js";
import { v4 as uuidv4 } from "uuid";
import {
  CreateProjectPayloadInterface,
  ProjectInterface
} from "@shared/types/project.types.js";
import { ProjectExportFileInterface } from "@shared/types/export-import/project.js";
import { ElectronAPIProjectsInterface } from "@shared/types/api/electron-projects";

export const getProjects = async () => {
  try {
    return await db.select().from(projectTable);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createProjects = async (
  payload: CreateProjectPayloadInterface
) => {
  try {
    const result = (
      await db.insert(projectTable).values(payload).returning({
        id: projectTable.id
      })
    )?.[0];

    if (!result || !result.id) return false;

    /* add default auth for globbaly for the project */
    await createAuth({
      projectId: result.id
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateProjects: ElectronAPIProjectsInterface["updateProjects"] =
  async (id, payload) => {
    try {
      const updated = await db
        .update(projectTable)
        .set({
          ...payload
        })
        .where(eq(projectTable.id, id));

      return updated.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteProjects: ElectronAPIProjectsInterface["deleteProjects"] =
  async (id: string) => {
    try {
      const deleted = await db
        .delete(projectTable)
        .where(eq(projectTable.id, id));

      return deleted.rowsAffected > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const changeActiveProject: ElectronAPIProjectsInterface["changeActiveProject"] =
  async id => {
    try {
      const countResult = await db
        .select({
          count: count()
        })
        .from(activeProjectTable);
      const rowCount = countResult?.[0]?.count ?? 0;

      if (rowCount) {
        return (
          (
            await db
              .update(activeProjectTable)
              .set({
                activeProjectId: id
              })
              .where(eq(activeProjectTable.id, ACTIVE_PROJECT_ID))
          ).rowsAffected > 0
        );
      } else {
        return (
          (
            await db.insert(activeProjectTable).values({
              id: ACTIVE_PROJECT_ID,
              activeProjectId: id
            })
          ).rowsAffected > 0
        );
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const getActiveProject: ElectronAPIProjectsInterface["getActiveProject"] =
  async () => {
    try {
      const result = await db
        .select()
        .from(activeProjectTable)
        .where(eq(activeProjectTable.id, ACTIVE_PROJECT_ID))
        .limit(1);

      return result[0]?.activeProjectId ?? null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const getActiveProjectDetails =
  async (): Promise<ProjectInterface | null> => {
    try {
      const result =
        (
          await db
            .select({
              id: projectTable.id,
              name: projectTable.name
            })
            .from(activeProjectTable)
            .leftJoin(
              projectTable,
              eq(activeProjectTable.activeProjectId, projectTable.id)
            )
            .where(eq(activeProjectTable.id, ACTIVE_PROJECT_ID))
            .limit(1)
        )?.[0] ?? null;

      if (!result.id) throw new Error();

      return result as ProjectInterface;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const exportProject = async (id?: string | null) => {
  return await db.transaction(async tsx => {
    id = id ?? (await getActiveProject());
    if (!id) throw new Error("No project specified");

    const project: ProjectExportFileInterface["project"] =
      (
        await tsx
          .select({
            name: projectTable.name
          })
          .from(projectTable)
          .where(eq(projectTable.id, id))
          .limit(1)
      )?.[0] ?? null;

    const environments: ProjectExportFileInterface["environments"] = await tsx
      .select(
        (() => {
          const { id, projectId, createdAt, ...rest } =
            getTableColumns(environmentTable);
          return rest;
        })()
      )
      .from(environmentTable)
      .where(eq(environmentTable.projectId, id));

    const requestList: ProjectExportFileInterface["requestList"] = (
      (await tsx
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

    const apiUrlList: ProjectExportFileInterface["apiUrlList"] = (
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
      acc[curr.requestOrFolderMetaId] = curr;
      return acc;
    }, {});

    const paramsList: ProjectExportFileInterface["paramsList"] = (
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

    const headersList: ProjectExportFileInterface["headersList"] = (
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

    const hiddenHeadersCheckList: ProjectExportFileInterface["hiddenHeadersCheckList"] =
      (
        (await tsx
          .select(
            (() => {
              const { id, ...rest } = getTableColumns(hiddenHeadersCheckTable);
              return rest;
            })()
          )
          .from(hiddenHeadersCheckTable)
          .where(
            inArray(
              hiddenHeadersCheckTable.requestOrFolderMetaId,
              requestIdList
            )
          )) ?? []
      )?.reduce((acc, curr) => {
        acc[curr.requestOrFolderMetaId] = curr;
        return acc;
      }, {});

    const formDataList: ProjectExportFileInterface["formDataList"] = (
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

    const xWWWFormUrlencodedList: ProjectExportFileInterface["xWWWFormUrlencodedList"] =
      (
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

    const binaryDataList: ProjectExportFileInterface["binaryDataList"] = (
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

    const rawDataList: ProjectExportFileInterface["rawDataList"] = (
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

    const requestMetaTabList: ProjectExportFileInterface["requestMetaTabList"] =
      (
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
        acc[curr.requestOrFolderMetaId] = curr;
        return acc;
      }, {});

    const authorization: ProjectExportFileInterface["authorization"] = (
      (await tsx
        .select(
          (() => {
            const { id, projectId, ...rest } =
              getTableColumns(authorizationTable);
            return rest;
          })()
        )
        .from(authorizationTable)
        .where(eq(authorizationTable.projectId, id))) ?? []
    )?.reduce((acc, curr) => {
      acc[`${curr.requestOrFolderMetaId}`] = curr;
      return acc;
    }, {});

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
      authorization
    };
  });
};

export const importProject = async ({
  project,
  environments = [],
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
}: ProjectExportFileInterface) => {
  return await db.transaction(async tsx => {
    const projectId = (
      await tsx
        .insert(projectTable)
        .values({ ...project })
        .returning({ id: projectTable.id })
    )?.[0]?.id;

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

    if (authorization["null"]) {
      newAuthorization["null"] = {
        ...authorization["null"],
        projectId
      };
    }

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

    const finalEnvironments = environments.map(env => ({
      ...env,
      projectId
    }));
    const finalRequests = Object.values(newRequestList);

    if (finalRequests.length)
      await tsx.insert(requestOrFolderMetaTable).values(finalRequests);
    if (finalEnvironments.length)
      await tsx.insert(environmentTable).values(finalEnvironments);
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
