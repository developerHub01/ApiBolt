import {
  type AuthorizationPayloadInterface,
  type EnvironmentInterface,
  type EnvironmentPayloadInterface,
  type HiddenHeadersCheckInterface,
  type ParamHeaderBuildPayloadInterface,
  type ProjectInterface,
  type RequestListItemInterface,
  type RequestListItemUpdatePayloadInterface,
  type TMethod,
} from "@/types/request-response.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  handleAddTab,
  handleAuthorizations,
  handleChangeActiveProject,
  handleChangeDeleteFolderOrRequestId,
  // handleChangeApiUrl,
  // handleChangeAuthType,
  // handleChangeBearerTokenAuth,
  // handleChangeDeleteFolderOrRequestId,
  handleChangeFolderDescription,
  handleChangeFolderTitle,
  handleChangeIsRequestListLoaded,
  // handleChangeRawData,
  // handleChangeRawRequestBodyType,
  // handleChangeRequestBodyType,
  // handleChangeRequestResponseSize,
  handleChangeSelectedTab,
  handleChangeTabList,
  handleCreateRestApiBasic,
  handleCreateSingleRequest,
  handleDeleteAllRequestOrFolder,
  handleLoadEnvironmentsList,
  handleLoadHeaders,
  handleLoadParams,
  handleLoadProjectsList,
  handleLoadRequestList,
  handleUpdateHiddenHeaders,
  // handleRemoveTab,
  // handleSetAPIKey,
  // handleSetBasicAuth,
  // handleSetBinary,
  // handleSetFormData,
  // handleSetHeaders,
  // handleSetJWTBearerAuth,
  // handleSetParams,
  // handleSetResponse,
  // handleSetXWWWFormUrlencodedData,
  handleUpdateRequestOrFolder,
  handleUpdateRequestResponseSelectedTab,
  // type APIKeyInterface,
  // type BasicAuthInterface,
  // type FileMetadataInterface,
  // type FormDataFileMetadataInterface,
  // type FormDataInterface,
  // type JWTBearerAuthInterface,
  // type ResponseFileDataInterface,
} from "@/context/redux/request-response/request-response-slice";
// import { base64ToFileObject, converterFileToMetadata } from "@/utils";
// import { handleCheckImportedRequestFileValidator } from "@/context/redux/request-response/utils";
import { v4 as uuidv4 } from "uuid";
// import {
//   defaultFolderDescription,
//   defaultFolderTitle,
// } from "@/constant/request-response.constant";
import {
  duplicateRequestOrFolderNode,
  getNodeParentsIdList,
} from "@/utils/request-response.utils";

/* ==============================
========== Projects start =========
================================= */
export const loadProjectList = createAsyncThunk<
  {
    activeProject: string | null;
    projectList: Array<ProjectInterface>;
  },
  void,
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadProjectList", async (_, { dispatch }) => {
  const list = await window.electronAPIProjectsDB.getProjects();
  const activeProject = await window.electronAPIProjectsDB.getActiveProject();

  dispatch(handleLoadProjectsList(list));
  dispatch(handleChangeActiveProject(activeProject));

  return {
    activeProject,
    projectList: list,
  };
});

export const changeActiveProject = createAsyncThunk<
  boolean,
  string,
  { dispatch: AppDispatch; state: RootState }
>("request-response/changeActiveProject", async (id, { dispatch }) => {
  dispatch(handleChangeActiveProject(id));
  const response = await window.electronAPIProjectsDB.changeActiveProject(id);

  if (response) dispatch(handleChangeIsRequestListLoaded(false));

  return response;
});

export const createProject = createAsyncThunk<
  boolean,
  string,
  { dispatch: AppDispatch; state: RootState }
>("request-response/changeActiveProject", async (name, { dispatch }) => {
  const response = await window.electronAPIProjectsDB.createProjects({
    name,
  });

  if (response) dispatch(loadProjectList());

  return response;
});

export const deleteProject = createAsyncThunk<
  boolean,
  string,
  { dispatch: AppDispatch; state: RootState }
>("request-response/deleteProject", async (id, { dispatch }) => {
  const response = await window.electronAPIProjectsDB.deleteProjects(id);

  // update the project list after deletion
  if (response) {
    dispatch(loadProjectList());
    dispatch(handleChangeActiveProject(null));
    dispatch(handleChangeIsRequestListLoaded(false));
  }

  return response;
});

export const updateProject = createAsyncThunk<
  boolean,
  {
    id: string;
    name: string;
  },
  { dispatch: AppDispatch; state: RootState }
>("request-response/updateProject", async ({ id, name }, { dispatch }) => {
  const response = await window.electronAPIProjectsDB.updateProjects(id, {
    name,
  });

  // update the project list after deletion
  if (response) {
    dispatch(loadProjectList());
  }

  return response;
});
/* ==============================
========== Projects end =========
================================= */

/* ==============================
===== Environment start =========
================================= */
export const loadEnvironmentsList = createAsyncThunk<
  Record<string, EnvironmentInterface>,
  void,
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadEnvironmentsList", async (_, { dispatch }) => {
  try {
    const list = (
      (await window.electronAPIEnvironmentsDB.getEnvironments()) ?? []
    ).reduce(
      (acc, curr) => {
        acc[curr.id] = {
          ...curr,
          isCheck: Boolean(Number(curr.isCheck)),
        };
        return acc;
      },
      {} as Record<string, EnvironmentInterface>
    );

    dispatch(handleLoadEnvironmentsList(list));

    return list;
  } catch {
    return {};
  }
});

export const createEnvironments = createAsyncThunk<
  boolean,
  void,
  { dispatch: AppDispatch; state: RootState }
>("request-response/createEnvironments", async (_, { dispatch }) => {
  try {
    const payload = {
      id: uuidv4(),
    };
    const response = await window.electronAPIEnvironmentsDB.createEnvironments({
      ...payload,
    });

    if (response) dispatch(loadEnvironmentsList());

    return response;
  } catch (error) {
    console.error("Error creating environment:", error);
    return false;
  }
});

export const updateEnvironments = createAsyncThunk<
  boolean,
  {
    id: string;
    payload: Partial<EnvironmentPayloadInterface>;
  },
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/updateEnvironments",
  async ({ id, payload }, { dispatch }) => {
    const response = await window.electronAPIEnvironmentsDB.updateEnvironments({
      id,
      ...payload,
    });

    if (response) dispatch(loadEnvironmentsList());

    return response;
  }
);

export const deleteAllEnvironments = createAsyncThunk<
  boolean,
  void,
  { dispatch: AppDispatch; state: RootState }
>("request-response/deleteAllEnvironments", async (_, { dispatch }) => {
  const response =
    await window.electronAPIEnvironmentsDB.deleteAllEnvironments();

  // update the environment list after deletion
  if (response) dispatch(loadEnvironmentsList());

  return response;
});

export const deleteEnvironments = createAsyncThunk<
  boolean,
  string,
  { dispatch: AppDispatch; state: RootState }
>("request-response/deleteEnvironments", async (id, { dispatch }) => {
  const response =
    await window.electronAPIEnvironmentsDB.deleteEnvironments(id);

  // update the environment list after deletion
  if (response) dispatch(loadEnvironmentsList());

  return response;
});
/* ==============================
===== Environment end =========
================================= */

/* ==============================
===== Auth start =========
================================= */
export const loadAuthorization = createAsyncThunk<
  AuthorizationPayloadInterface,
  void,
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadAuthorization", async (_, { dispatch }) => {
  const authorizationData = await window.electronAPIAuthorizationDB.getAuth();

  dispatch(handleAuthorizations(authorizationData));

  return authorizationData;
});
export const updateAuthorization = createAsyncThunk<
  boolean,
  Partial<Omit<AuthorizationPayloadInterface, "id">>,
  { dispatch: AppDispatch; state: RootState }
>("request-response/updateAuthorization", async (payload, { dispatch }) => {
  const response = await window.electronAPIAuthorizationDB.updateAuth({
    ...payload,
  });

  if (response) dispatch(loadAuthorization());

  return response;
});
/* ==============================
============== Auth end =========
================================= */

/* ==============================
===== RequestList start =========
================================= */
export const loadRequestList = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadRequestList", async (_, { getState, dispatch }) => {
  const state = getState() as RootState;

  if (state.requestResponse.isRequestListLoaded) return;
  try {
    const list =
      await window.electronAPIRequestOrFolderMetaDB.getRequestOrFolderMeta();

    dispatch(handleLoadRequestList(list));
    dispatch(handleChangeIsRequestListLoaded(true));
  } catch (error) {
    console.log(error);
  }
});
export const createSingleRequest = createAsyncThunk<
  void,
  string | undefined,
  {
    dispatch: AppDispatch;
  }
>("request-response/createSingleRequest", async (parentId, { dispatch }) => {
  try {
    const payload: RequestListItemInterface = {
      id: uuidv4(),
      name: "Request",
      method: "get",
      ...(parentId ? { parentId } : {}),
    };

    dispatch(handleCreateSingleRequest(payload));
    await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
      payload
    );
  } catch {
    console.log("Request JSON file is not valid");
  }
});
export const createCollection = createAsyncThunk<
  void,
  string | undefined,
  { dispatch: AppDispatch; state: RootState }
>("request-response/createCollection", async (parentId, { dispatch }) => {
  try {
    const payload = {
      id: uuidv4(),
      name: parentId ? "Folder" : "Collection",
      ...(parentId ? { parentId } : {}),
    };

    dispatch(handleCreateSingleRequest(payload));

    await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta({
      ...payload,
      children: [],
    });
  } catch {
    console.log("Request JSON file is not valid");
  }
});
export const createRestApiBasic = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>("request-response/createSingleRequest", async (_, { dispatch }) => {
  try {
    const parentFolder: RequestListItemInterface = {
      id: uuidv4(),
      name: "REST API basics: CRUD, test & variable",
      children: [],
      createdAt: Date.now(),
    };

    const payload: Array<RequestListItemInterface> = (
      ["get", "post", "put", "patch", "delete"] as Array<TMethod>
    ).map((method) => ({
      id: uuidv4(),
      name: `${method[0].toUpperCase()}${method.substring(1)} data`,
      method: method as TMethod,
      createdAt: Date.now(),
    }));

    parentFolder.children = payload.map((item) => item.id);

    const requestList = [
      parentFolder,
      ...payload.map((item) => ({
        ...item,
        parentId: parentFolder.id,
      })),
    ];

    dispatch(handleCreateRestApiBasic(requestList));
    await window.window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
      requestList
    );
  } catch {
    console.log("Request JSON file is not valid");
  }
});
export const updateRequestOrFolder = createAsyncThunk<
  void,
  RequestListItemUpdatePayloadInterface,
  { dispatch: AppDispatch }
>("request-response/updateRequestOrFolder", async (payload, { dispatch }) => {
  try {
    dispatch(handleUpdateRequestOrFolder(payload));
    await window.electronAPIRequestOrFolderMetaDB.updateRequestOrFolderMeta(
      payload
    );
  } catch {
    console.log("Request JSON file is not valid");
  }
});
export const moveRequestOrFolder = createAsyncThunk<
  void,
  { requestId: string; parentId: string | undefined },
  { dispatch: AppDispatch }
>(
  "request-response/moveRequestOrFolder",
  async ({ requestId, parentId }, { dispatch }) => {
    try {
      await window.electronAPIRequestOrFolderMetaDB.moveRequestOrFolderMeta(
        requestId,
        parentId
      );
      dispatch(handleChangeIsRequestListLoaded(false));
    } catch {
      console.log("Request JSON file is not valid");
    }
  }
);
export const deleteAllRequestOrFolder = createAsyncThunk<
  void,
  string | undefined,
  { dispatch: AppDispatch }
>("request-response/deleteAllRequestOrFolder", async (id, { dispatch }) => {
  try {
    dispatch(handleDeleteAllRequestOrFolder());
    await window.electronAPIRequestOrFolderMetaDB.deleteRequestOrFolderMetaByProjectId(
      id
    );
  } catch {
    console.log("Request JSON file is not valid");
  }
});
export const deleteRequestOrFolder = createAsyncThunk<
  void,
  boolean | string,
  { state: RootState; dispatch: AppDispatch }
>(
  "request-response/deleteRequestOrFolder",
  async (payload, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;

      /* if false then cancel the deletion */
      if (!payload) {
        dispatch(handleChangeDeleteFolderOrRequestId(""));
        return;
      }

      /* if true then get the id else take passed id as payload */
      const rootId =
        payload === true
          ? state.requestResponse.deleteFolderOrRequestId
          : payload;
      dispatch(handleChangeDeleteFolderOrRequestId(""));

      const response =
        await window.electronAPIRequestOrFolderMetaDB.deleteRequestOrFolderMetaById(
          rootId
        );

      if (response) dispatch(handleChangeIsRequestListLoaded(false));
    } catch (error) {
      console.log(error);
    }
  }
);
export const duplicateRequestOrFolder = createAsyncThunk<
  void,
  string,
  { state: RootState; dispatch: AppDispatch }
>(
  "request-response/duplicateRequestOrFolder",
  async (id: string, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const requestList = state.requestResponse.requestList;

      const { newParentId, nodes: duplicatedNodes } =
        duplicateRequestOrFolderNode({
          source: requestList,
          id,
          parentId: requestList[id]?.parentId,
        });

      if (duplicatedNodes?.[newParentId]?.name)
        duplicatedNodes[newParentId].name += " copy";

      const duplicatedData = Object.values(duplicatedNodes).map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ children, createdAt, ...rest }) => rest
      );

      const response =
        await window.electronAPIRequestOrFolderMetaDB.duplicateRequestOrFolderMeta(
          duplicatedData
        );

      if (response) dispatch(handleChangeIsRequestListLoaded(false));
    } catch (error) {
      console.log(error);
    }
  }
);
/* ==============================
======= RequestList end =========
================================= */

/* ==============================
========= TabList start =========
================================= */
export const loadTabsData = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>("request-response/loadTabsData", async (_, { dispatch }) => {
  try {
    const tabsListData = await window.electronAPITabsDB.getTabList();

    dispatch(handleChangeTabList(tabsListData?.openTabs ?? []));
    dispatch(handleChangeSelectedTab(tabsListData?.selectedTab ?? null));
  } catch (error) {
    console.log(error);
  }
});

export const changeTabsData = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("request-response/changeTabsData", async (_, { getState }) => {
  const state = getState() as RootState;
  try {
    await window.electronAPITabsDB.updateTabList({
      openTabs: state.requestResponse.tabList,
      selectedTab: state.requestResponse.selectedTab,
    });
  } catch (error) {
    console.log(error);
  }
});

export const addNewTabsData = createAsyncThunk<
  void,
  void,
  { state: RootState; dispatch: AppDispatch }
>("request-response/addNewTabsData", async (_, { dispatch }) => {
  try {
    const newTabId = uuidv4();

    const payload: RequestListItemInterface = {
      id: newTabId,
      name: "Request",
      method: "get",
    };

    dispatch(handleAddTab(newTabId));
    dispatch(handleChangeSelectedTab(newTabId));
    dispatch(handleCreateSingleRequest(payload));
    await window.electronAPIRequestOrFolderMetaDB.createRequestOrFolderMeta(
      payload
    );
  } catch {
    console.log("addNewTabsData error");
  }
});

export const expendParentsOnSelectedChangeTabsData = createAsyncThunk<
  void,
  string,
  { state: RootState; dispatch: AppDispatch }
>(
  "request-response/expendParentsOnSelectedChangeTabsData",
  async (id, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const requestList = state.requestResponse.requestList;

      const payload = getNodeParentsIdList({
        source: requestList,
        id,
      });

      if (!payload?.length) return;

      const response =
        await window.electronAPIRequestOrFolderMetaDB.expendOrCollapseRequestOrFolderMetaAll(
          payload,
          true
        );

      if (response) dispatch(handleChangeIsRequestListLoaded(false));
    } catch {
      console.log("changeTabsData error");
    }
  }
);
/* ==============================
========= TabList end =========
================================= */

/* ==============================
======== Params start ===========
================================= */
export const loadParams = createAsyncThunk<
  void,
  void | { requestId?: string | null | undefined; once?: boolean },
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadParams", async (payload, { getState, dispatch }) => {
  if (!payload) payload = {};

  let selectedTab = payload.requestId;
  const once = payload.once ?? false;

  const state = getState() as RootState;

  if (!selectedTab) selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab || (state.requestResponse.params[selectedTab] && once))
    return;

  const response = await window.electronAPIParamsDB.getParams(selectedTab);

  dispatch(handleLoadParams(response));
});

export const addParams = createAsyncThunk<
  boolean,
  Partial<ParamHeaderBuildPayloadInterface> | undefined,
  { dispatch: AppDispatch; state: RootState }
>("request-response/addParams", async (payload, { getState, dispatch }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab) return false;

  if (!payload) payload = {};
  const response = await window.electronAPIParamsDB.createParams(payload);

  if (response) dispatch(loadParams());

  return response;
});

export const deleteParams = createAsyncThunk<
  boolean,
  string,
  { dispatch: AppDispatch; state: RootState }
>("request-response/deleteParams", async (id, { getState, dispatch }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab) return false;

  const response = await window.electronAPIParamsDB.deleteParams(id);

  if (response) dispatch(loadParams());
  return response;
});

export const deleteParamsByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined | null,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/deleteParamsByRequestMetaId",
  async (id, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (!id) id = state.requestResponse.selectedTab;

    if (!id) return false;

    const response =
      await window.electronAPIParamsDB.deleteParamsByRequestMetaId(id);

    if (response) dispatch(handleLoadParams([]));
    return response;
  }
);

export const updateParams = createAsyncThunk<
  boolean,
  {
    paramId: string;
    payload: Partial<ParamHeaderBuildPayloadInterface>;
  },
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/updateParams",
  async ({ paramId, payload }, { dispatch }) => {
    const response = await window.electronAPIParamsDB.updateParams(
      paramId,
      payload
    );

    if (response) dispatch(loadParams());
    return response;
  }
);

export const checkAllParamsByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/checkAllParamsByRequestMetaId",
  async (requestOrFolderMetaId, { dispatch }) => {
    const response =
      await window.electronAPIParamsDB.checkAllParamsByRequestMetaId(
        requestOrFolderMetaId
      );

    if (response) dispatch(loadParams());
    return response;
  }
);

/* ==============================
======== Params end =============
================================= */

/* ==============================
======== Headers start ===========
================================= */
export const loadHeaders = createAsyncThunk<
  void,
  void | { requestId?: string | null | undefined; once?: boolean },
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadHeaders", async (payload, { getState, dispatch }) => {
  if (!payload) payload = {};

  let selectedTab = payload.requestId;
  const once = payload.once ?? false;

  const state = getState() as RootState;

  if (!selectedTab) selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab || (state.requestResponse.params[selectedTab] && once))
    return;

  const response = await window.electronAPIHeadersDB.getHeaders(selectedTab);

  dispatch(handleLoadHeaders(response));
});

export const addHeaders = createAsyncThunk<
  boolean,
  Partial<ParamHeaderBuildPayloadInterface> | undefined,
  { dispatch: AppDispatch; state: RootState }
>("request-response/addHeaders", async (payload, { getState, dispatch }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab) return false;

  if (!payload) payload = {};
  const response = await window.electronAPIHeadersDB.createHeaders(payload);

  if (response) dispatch(loadHeaders());

  return response;
});

export const deleteHeaders = createAsyncThunk<
  boolean,
  string,
  { dispatch: AppDispatch; state: RootState }
>("request-response/deleteHeaders", async (id, { getState, dispatch }) => {
  const state = getState() as RootState;

  const selectedTab = state.requestResponse.selectedTab;
  if (!selectedTab) return false;

  const response = await window.electronAPIHeadersDB.deleteHeaders(id);

  if (response) dispatch(loadHeaders());
  return response;
});

export const deleteHeadersByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined | null,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/deleteHeadersByRequestMetaId",
  async (id, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (!id) id = state.requestResponse.selectedTab;

    if (!id) return false;

    const response =
      await window.electronAPIHeadersDB.deleteHeadersByRequestMetaId(id);

    if (response) dispatch(handleLoadHeaders([]));
    return response;
  }
);

export const updateHeaders = createAsyncThunk<
  boolean,
  {
    paramId: string;
    payload: Partial<ParamHeaderBuildPayloadInterface>;
  },
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/updateHeaders",
  async ({ paramId, payload }, { dispatch }) => {
    const response = await window.electronAPIHeadersDB.updateHeaders(
      paramId,
      payload
    );

    if (response) dispatch(loadHeaders());
    return response;
  }
);

export const checkAllHeadersByRequestMetaId = createAsyncThunk<
  boolean,
  string | undefined,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/checkAllHeadersByRequestMetaId",
  async (requestOrFolderMetaId, { dispatch }) => {
    const response =
      await window.electronAPIHeadersDB.checkAllHeadersByRequestMetaId(
        requestOrFolderMetaId
      );

    if (response) dispatch(loadHeaders());
    return response;
  }
);

export const updateHiddenHeaders = createAsyncThunk<
  void,
  {
    keyName: keyof HiddenHeadersCheckInterface;
  },
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/updateHiddenHeaders",
  async ({ keyName }, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.requestResponse.selectedTab) return;

    const newValue = !state.requestResponse.hiddenHeaders?.[
      state.requestResponse.selectedTab!
    ]?.find((header) => header.isCheck);

    const response =
      await window.electronAPIHiddenHeadersCheckTableDB.updateHiddenHeadersCheck(
        {
          [keyName]: newValue,
        }
      );

    if (response)
      dispatch(
        handleUpdateHiddenHeaders({
          keyName,
        })
      );
    return;
  }
);

/* ==============================
======== Headers end =============
================================= */

export const loadRequestData = createAsyncThunk<
  void,
  string | null,
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/loadRequestData",
  async (selectedTab, { getState, dispatch }) => {
    if (!selectedTab) return;
    const state = getState() as RootState;

    const isSelectedRequestAlreadyLoaded =
      state.requestResponse.loadedRequestList[selectedTab];

    // if (selectedTab === requestResponseSelectedTab) return;
    dispatch(handleUpdateRequestResponseSelectedTab(selectedTab));

    if (!selectedTab || isSelectedRequestAlreadyLoaded) return;

    // const requestDetails =
    //   await window.electronAPIRequestAndFolderDB.findRequestOrFolderById(
    //     selectedTab
    //   );

    // if (state.requestResponse.requestList[selectedTab]?.children) {
    //   dispatch(
    //     handleInitFolder({
    //       id: selectedTab,
    //       payload: requestDetails as ResponseFolderDataInterface | undefined,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     handleInitRequest({
    //       id: selectedTab,
    //       payload: requestDetails as
    //         | ResponseFileDataBackendInterface
    //         | undefined,
    //     })
    //   );
    // }
  }
);

// export const getDownloadableRequestData = createAsyncThunk<
//   ResponseFileDataInterface | null,
//   string,
//   { state: RootState }
// >("request-response/getDownloadableRequestData", async (id, { getState }) => {
//   const state = getState() as RootState;

//   if (!state.requestResponse.loadedRequestList[id]) return null;

//   const formDataWithMetadata: Array<FormDataFileMetadataInterface> =
//     await Promise.all(
//       (state.requestResponse.formData[id] ?? []).map(async (data) => {
//         let value: Array<FileMetadataInterface> | string = "";
//         if (
//           Array.isArray(data.value) &&
//           data.value.every((v) => v instanceof File)
//         ) {
//           value = await Promise.all(
//             data.value.map((file) =>
//               converterFileToMetadata(
//                 file,
//                 state.requestResponse.isDownloadRequestWithBase64[id]
//               )
//             )
//           );
//         } else if (typeof data.value === "string") {
//           value = data.value;
//         }

//         return {
//           ...data,
//           value,
//         };
//       })
//     );

//   // const authorizationData =
//   //   state.requestResponse.authType[id] === "api-key"
//   //     ? state.requestResponse.apiKeyAuth[id]
//   //     : state.requestResponse.authType[id] === "basic-auth"
//   //       ? state.requestResponse.basicAuth[id]
//   //       : state.requestResponse.authType[id] === "bearer-token"
//   //         ? state.requestResponse.bearerTokenAuth[id]
//   //         : state.requestResponse.authType[id] === "jwt-bearer"
//   //           ? state.requestResponse.jwtBearerAuth[id]
//   //           : undefined;

//   // const downloadData: ResponseFileDataInterface = {
//   //   name: state.requestResponse.requestList[id].name,
//   //   url: state.requestResponse.apiUrl[id],
//   //   method: state.requestResponse.requestList[id].method!,
//   //   params: state.requestResponse.params[id],
//   //   headers: state.requestResponse.headers[id],
//   //   // authorization: {
//   //   //   type: state.requestResponse.authType[id],
//   //   //   data: authorizationData,
//   //   // },
//   //   body: {
//   //     selected: state.requestResponse.requestBodyType[id],
//   //     rawData: state.requestResponse.rawData[id],
//   //     formData: formDataWithMetadata,
//   //     xWWWFormUrlencodedData: state.requestResponse.xWWWFormUrlencodedData[id],
//   //     binaryData:
//   //       state.requestResponse.binaryData[id] &&
//   //       (await converterFileToMetadata(
//   //         state.requestResponse.binaryData[id],
//   //         state.requestResponse.isDownloadRequestWithBase64[id]
//   //       )),
//   //     rawRequestBodyType: state.requestResponse.rawRequestBodyType[id],
//   //   },
//   //   response: state.requestResponse.response[id],
//   //   size: {
//   //     requestSize: state.requestResponse.requestSize[id],
//   //     responseSize: state.requestResponse.responseSize[id],
//   //   },
//   // };

//   return downloadData;
// });

// export const importRequestFromFile = createAsyncThunk<
//   void,
//   { file: File; selectedTab: string; cb?: (message: string) => void },
//   { dispatch: AppDispatch; state: RootState }
// >(
//   "request-response/importRequestFromFile",
//   async ({ file, selectedTab, cb }, { dispatch }) => {
//     try {
//       const text = await file.text();
//       const jsonData: ResponseFileDataInterface = JSON.parse(text);

//       if (!handleCheckImportedRequestFileValidator(jsonData))
//         throw new Error("File json is not valid");

//       const formData: Array<FormDataInterface> = jsonData.body.formData.map(
//         (data) => {
//           if (typeof data.value === "string") return data as FormDataInterface;

//           if (Array.isArray(data.value)) {
//             if (data.value.some((v) => !v.base64)) {
//               return { ...data, value: "" };
//             }

//             const files = data.value.map((file) =>
//               base64ToFileObject(file.base64!, file.fileName, file.mimeType)
//             );

//             return { ...data, value: files };
//           }

//           return { ...data, value: "" };
//         }
//       );

//       const binaryData = jsonData.body.binaryData?.base64
//         ? base64ToFileObject(
//             jsonData.body.binaryData.base64,
//             jsonData.body.binaryData.fileName,
//             jsonData.body.binaryData.mimeType
//           )
//         : null;

//       const authorizationType = jsonData.authorization.type;
//       const authorizationData = jsonData.authorization.data;

//       dispatch(
//         handleChangeRequestName({
//           id: selectedTab,
//           name: jsonData.name,
//         })
//       );
//       dispatch(
//         handleChangeSelectedMethod({
//           id: selectedTab,
//           method: jsonData.method,
//         })
//       );
//       dispatch(
//         handleSetParams({
//           id: selectedTab,
//           params: jsonData.params,
//         })
//       );
//       dispatch(
//         handleSetHeaders({
//           id: selectedTab,
//           headers: jsonData.headers,
//         })
//       );
//       dispatch(
//         handleSetResponse({
//           id: selectedTab,
//           response: jsonData.response,
//         })
//       );
//       dispatch(
//         handleSetFormData({
//           id: selectedTab,
//           formData: formData,
//         })
//       );
//       dispatch(
//         handleSetBinary({
//           id: selectedTab,
//           binary: binaryData,
//         })
//       );
//       dispatch(
//         handleChangeRawData({
//           id: selectedTab,
//           raw: jsonData.body.rawData,
//         })
//       );
//       dispatch(
//         handleChangeRequestBodyType({
//           id: selectedTab,
//           type: jsonData.body.selected,
//         })
//       );
//       dispatch(
//         handleSetXWWWFormUrlencodedData({
//           id: selectedTab,
//           xWWWFormUrlencoded: jsonData.body.xWWWFormUrlencodedData,
//         })
//       );
//       dispatch(
//         handleChangeRawRequestBodyType({
//           id: selectedTab,
//           type: jsonData.body.rawRequestBodyType,
//         })
//       );
//       dispatch(
//         handleChangeApiUrl({
//           id: selectedTab,
//           url: jsonData.url,
//         })
//       );
//       dispatch(
//         handleChangeRequestResponseSize({
//           id: selectedTab,
//           payload: jsonData.size.requestSize,
//           type: "request",
//         })
//       );
//       dispatch(
//         handleChangeRequestResponseSize({
//           id: selectedTab,
//           payload: jsonData.size.responseSize,
//           type: "response",
//         })
//       );
//       dispatch(
//         handleChangeAuthType({
//           id: selectedTab,
//           type: authorizationType,
//         })
//       );

//       switch (authorizationType as TAuthType) {
//         case "api-key":
//           dispatch(
//             handleSetAPIKey({
//               id: selectedTab,
//               value: authorizationData as APIKeyInterface,
//             })
//           );
//           break;
//         case "basic-auth":
//           dispatch(
//             handleSetBasicAuth({
//               id: selectedTab,
//               value: authorizationData as BasicAuthInterface,
//             })
//           );
//           break;
//         case "bearer-token":
//           dispatch(
//             handleChangeBearerTokenAuth({
//               id: selectedTab,
//               value: authorizationData as string,
//             })
//           );
//           break;
//         case "jwt-bearer":
//           dispatch(
//             handleSetJWTBearerAuth({
//               id: selectedTab,
//               value: authorizationData as JWTBearerAuthInterface,
//             })
//           );
//           break;
//       }

//       if (cb) cb("Successfully imported");
//     } catch {
//       if (cb) cb("Request JSON file is not valid");
//     }
//   }
// );

export const changeFolderContent = createAsyncThunk<
  void,
  { id?: string; value: string; type?: "title" | "description" },
  { state: RootState; dispatch: AppDispatch }
>(
  "request-response/changeFolderContent",
  async ({ id, value, type = "title" }, { getState, dispatch }) => {
    const state = getState() as RootState;

    const requestId = id ?? state.requestResponse.selectedTab;
    if (!requestId || !state.requestResponse.requestList[requestId].children)
      return;

    try {
      dispatch(
        type === "title"
          ? handleChangeFolderTitle({
              value,
            })
          : handleChangeFolderDescription({
              value,
            })
      );
      // await window.electronAPIRequestAndFolderDB.updateRequestOrFolderById(
      //   requestId,
      //   {
      //     title:
      //       type === "title"
      //         ? value
      //         : (state.requestResponse.folderTitle[requestId] ??
      //           defaultFolderTitle),
      //     description:
      //       type === "description"
      //         ? value
      //         : (state.requestResponse.folderDescription[requestId] ??
      //           defaultFolderDescription),
      //   }
      // );
    } catch (error) {
      console.log(error);
    }
  }
);
