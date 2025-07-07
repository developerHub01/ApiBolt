import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/context/redux/store";
import {
  defaultFolderDescription,
  defaultFolderTitle,
  handleAddTab,
  handleChangeActiveProject,
  handleChangeApiUrl,
  handleChangeAuthType,
  handleChangeBearerTokenAuth,
  handleChangeDeleteFolderOrRequestId,
  handleChangeFolderDescription,
  handleChangeFolderTitle,
  handleChangeIsRequestListLoaded,
  handleChangeRawData,
  handleChangeRawRequestBodyType,
  handleChangeRequestBodyType,
  handleChangeRequestName,
  handleChangeRequestResponseSize,
  handleChangeSelectedMethod,
  handleChangeSelectedTab,
  handleChangeTabList,
  handleCreateRestApiBasic,
  handleCreateSingleRequest,
  handleInitFolder,
  handleInitRequest,
  handleLoadEnvironmentsList,
  handleLoadOpenFolderList,
  handleLoadProjectsList,
  handleLoadRequestList,
  handleRemoveTab,
  handleSetAPIKey,
  handleSetBasicAuth,
  handleSetBinary,
  handleSetFormData,
  handleSetHeaders,
  handleSetJWTBearerAuth,
  handleSetParams,
  handleSetResponse,
  handleSetXWWWFormUrlencodedData,
  handleToggleFolder,
  handleUpdateRequestResponseSelectedTab,
  type APIKeyInterface,
  type BasicAuthInterface,
  type EnvironmentInterface,
  type EnvironmentPayloadInterface,
  type FileMetadataInterface,
  type FormDataFileMetadataInterface,
  type FormDataInterface,
  type JWTBearerAuthInterface,
  type ProjectInterface,
  type RequestListItemInterface,
  type ResponseFileDataBackendInterface,
  type ResponseFileDataInterface,
  type ResponseFolderDataInterface,
  type THTTPMethods,
} from "@/context/redux/request-response/request-response-slice";
import { base64ToFileObject, converterFileToMetadata } from "@/utils";
import { handleCheckImportedRequestFileValidator } from "@/context/redux/request-response/utils";
import type { TAuthType, TMethod } from "@/types";
import { v4 as uuidv4 } from "uuid";

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

export const loadRequestList = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>("request-response/loadRequestList", async (_, { getState, dispatch }) => {
  const state = getState() as RootState;

  if (state.requestResponse.isRequestListLoaded) return;

  const list = await window.electronAPIDB.getAllBoltCore();
  const openFolderList = await window.electronAPIDB.getAllOpenFolder();

  dispatch(handleLoadRequestList(list));
  dispatch(handleLoadOpenFolderList(openFolderList));
  dispatch(handleChangeIsRequestListLoaded(true));
});

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

    const requestDetails =
      await window.electronAPIRequestAndFolderDB.findRequestOrFolderById(
        selectedTab
      );

    if (state.requestResponse.requestList[selectedTab]?.children) {
      dispatch(
        handleInitFolder({
          id: selectedTab,
          payload: requestDetails as ResponseFolderDataInterface | undefined,
        })
      );
    } else {
      dispatch(
        handleInitRequest({
          id: selectedTab,
          payload: requestDetails as
            | ResponseFileDataBackendInterface
            | undefined,
        })
      );
    }
  }
);

export const getDownloadableRequestData = createAsyncThunk<
  ResponseFileDataInterface | null,
  string,
  { state: RootState }
>("request-response/getDownloadableRequestData", async (id, { getState }) => {
  const state = getState() as RootState;

  if (!state.requestResponse.loadedRequestList[id]) return null;

  const formDataWithMetadata: Array<FormDataFileMetadataInterface> =
    await Promise.all(
      (state.requestResponse.formData[id] ?? []).map(async (data) => {
        let value: Array<FileMetadataInterface> | string = "";
        if (
          Array.isArray(data.value) &&
          data.value.every((v) => v instanceof File)
        ) {
          value = await Promise.all(
            data.value.map((file) =>
              converterFileToMetadata(
                file,
                state.requestResponse.isDownloadRequestWithBase64[id]
              )
            )
          );
        } else if (typeof data.value === "string") {
          value = data.value;
        }

        return {
          ...data,
          value,
        };
      })
    );

  const authorizationData =
    state.requestResponse.authType[id] === "api-key"
      ? state.requestResponse.apiKeyAuth[id]
      : state.requestResponse.authType[id] === "basic-auth"
        ? state.requestResponse.basicAuth[id]
        : state.requestResponse.authType[id] === "bearer-token"
          ? state.requestResponse.bearerTokenAuth[id]
          : state.requestResponse.authType[id] === "jwt-bearer"
            ? state.requestResponse.jwtBearerAuth[id]
            : undefined;

  const downloadData: ResponseFileDataInterface = {
    name: state.requestResponse.requestList[id].name,
    url: state.requestResponse.apiUrl[id],
    method: state.requestResponse.requestList[id].method!,
    params: state.requestResponse.params[id],
    headers: state.requestResponse.headers[id],
    authorization: {
      type: state.requestResponse.authType[id],
      data: authorizationData,
    },
    body: {
      selected: state.requestResponse.requestBodyType[id],
      rawData: state.requestResponse.rawData[id],
      formData: formDataWithMetadata,
      xWWWFormUrlencodedData: state.requestResponse.xWWWFormUrlencodedData[id],
      binaryData:
        state.requestResponse.binaryData[id] &&
        (await converterFileToMetadata(
          state.requestResponse.binaryData[id],
          state.requestResponse.isDownloadRequestWithBase64[id]
        )),
      rawRequestBodyType: state.requestResponse.rawRequestBodyType[id],
    },
    response: state.requestResponse.response[id],
    size: {
      requestSize: state.requestResponse.requestSize[id],
      responseSize: state.requestResponse.responseSize[id],
    },
  };

  return downloadData;
});

export const importRequestFromFile = createAsyncThunk<
  void,
  { file: File; selectedTab: string; cb?: (message: string) => void },
  { dispatch: AppDispatch; state: RootState }
>(
  "request-response/importRequestFromFile",
  async ({ file, selectedTab, cb }, { dispatch }) => {
    try {
      const text = await file.text();
      const jsonData: ResponseFileDataInterface = JSON.parse(text);

      if (!handleCheckImportedRequestFileValidator(jsonData))
        throw new Error("File json is not valid");

      const formData: Array<FormDataInterface> = jsonData.body.formData.map(
        (data) => {
          if (typeof data.value === "string") return data as FormDataInterface;

          if (Array.isArray(data.value)) {
            if (data.value.some((v) => !v.base64)) {
              return { ...data, value: "" };
            }

            const files = data.value.map((file) =>
              base64ToFileObject(file.base64!, file.fileName, file.mimeType)
            );

            return { ...data, value: files };
          }

          return { ...data, value: "" };
        }
      );

      const binaryData = jsonData.body.binaryData?.base64
        ? base64ToFileObject(
            jsonData.body.binaryData.base64,
            jsonData.body.binaryData.fileName,
            jsonData.body.binaryData.mimeType
          )
        : null;

      const authorizationType = jsonData.authorization.type;
      const authorizationData = jsonData.authorization.data;

      dispatch(
        handleChangeRequestName({
          id: selectedTab,
          name: jsonData.name,
        })
      );
      dispatch(
        handleChangeSelectedMethod({
          id: selectedTab,
          method: jsonData.method,
        })
      );
      dispatch(
        handleSetParams({
          id: selectedTab,
          params: jsonData.params,
        })
      );
      dispatch(
        handleSetHeaders({
          id: selectedTab,
          headers: jsonData.headers,
        })
      );
      dispatch(
        handleSetResponse({
          id: selectedTab,
          response: jsonData.response,
        })
      );
      dispatch(
        handleSetFormData({
          id: selectedTab,
          formData: formData,
        })
      );
      dispatch(
        handleSetBinary({
          id: selectedTab,
          binary: binaryData,
        })
      );
      dispatch(
        handleChangeRawData({
          id: selectedTab,
          raw: jsonData.body.rawData,
        })
      );
      dispatch(
        handleChangeRequestBodyType({
          id: selectedTab,
          type: jsonData.body.selected,
        })
      );
      dispatch(
        handleSetXWWWFormUrlencodedData({
          id: selectedTab,
          xWWWFormUrlencoded: jsonData.body.xWWWFormUrlencodedData,
        })
      );
      dispatch(
        handleChangeRawRequestBodyType({
          id: selectedTab,
          type: jsonData.body.rawRequestBodyType,
        })
      );
      dispatch(
        handleChangeApiUrl({
          id: selectedTab,
          url: jsonData.url,
        })
      );
      dispatch(
        handleChangeRequestResponseSize({
          id: selectedTab,
          payload: jsonData.size.requestSize,
          type: "request",
        })
      );
      dispatch(
        handleChangeRequestResponseSize({
          id: selectedTab,
          payload: jsonData.size.responseSize,
          type: "response",
        })
      );
      dispatch(
        handleChangeAuthType({
          id: selectedTab,
          type: authorizationType,
        })
      );

      switch (authorizationType as TAuthType) {
        case "api-key":
          dispatch(
            handleSetAPIKey({
              id: selectedTab,
              value: authorizationData as APIKeyInterface,
            })
          );
          break;
        case "basic-auth":
          dispatch(
            handleSetBasicAuth({
              id: selectedTab,
              value: authorizationData as BasicAuthInterface,
            })
          );
          break;
        case "bearer-token":
          dispatch(
            handleChangeBearerTokenAuth({
              id: selectedTab,
              value: authorizationData as string,
            })
          );
          break;
        case "jwt-bearer":
          dispatch(
            handleSetJWTBearerAuth({
              id: selectedTab,
              value: authorizationData as JWTBearerAuthInterface,
            })
          );
          break;
      }

      if (cb) cb("Successfully imported");
    } catch {
      if (cb) cb("Request JSON file is not valid");
    }
  }
);

export const createSingleRequest = createAsyncThunk<
  void,
  string | undefined,
  {
    dispatch: AppDispatch;
  }
>("request-response/createSingleRequest", async (parent, { dispatch }) => {
  try {
    const payload: RequestListItemInterface = {
      id: uuidv4(),
      name: "Request",
      method: "get",
      ...(parent ? { parent } : {}),
    };

    dispatch(handleCreateSingleRequest(payload));
    await window.electronAPIDB.addBoltCore(payload);
  } catch {
    console.log("Request JSON file is not valid");
  }
});

export const createCollection = createAsyncThunk<
  void,
  string | undefined,
  { dispatch: AppDispatch; state: RootState }
>("request-response/createCollection", async (parent, { dispatch }) => {
  try {
    const payload = {
      id: uuidv4(),
      name: parent ? "Folder" : "Collection",
      children: [],
      ...(parent ? { parent } : {}),
    };

    dispatch(handleCreateSingleRequest(payload));
    await window.electronAPIDB.addBoltCore(payload);
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
        parent: parentFolder.id,
      })),
    ];

    dispatch(handleCreateRestApiBasic(requestList));
    await window.electronAPIDB.addMultipleBoltCore(requestList);
  } catch {
    console.log("Request JSON file is not valid");
  }
});

export const moveRequest = createAsyncThunk<
  void,
  { requestId: string; folderId: string | undefined; index: number },
  { dispatch: AppDispatch }
>(
  "request-response/moveRequest",
  async ({ requestId, folderId, index = 0 }, { dispatch }) => {
    try {
      await window.electronAPIDB.moveBoltCore(requestId, folderId, index);
      dispatch(handleChangeIsRequestListLoaded(false));
    } catch {
      console.log("Request JSON file is not valid");
    }
  }
);

export const changeRequestName = createAsyncThunk<
  void,
  { id?: string; name: string },
  { state: RootState; dispatch: AppDispatch }
>(
  "request-response/changeRequestName",
  async ({ id, name }, { dispatch, getState }) => {
    const requestId = id ?? getState().requestResponse.selectedTab;

    if (!requestId) return;

    try {
      dispatch(
        handleChangeRequestName({
          id: requestId,
          name,
        })
      );
      await window.electronAPIDB.updateBoltCore(requestId, {
        name,
      });
    } catch {
      console.log("changeRequestName error");
    }
  }
);

export const changeRequestMethod = createAsyncThunk<
  void,
  { id?: string; method: THTTPMethods },
  { state: RootState; dispatch: AppDispatch }
>(
  "request-response/changeRequestName",
  async ({ id, method }, { dispatch, getState }) => {
    const requestId = id ?? getState().requestResponse.selectedTab;

    if (!requestId) return;

    try {
      dispatch(
        handleChangeSelectedMethod({
          id: requestId,
          method,
        })
      );
      await window.electronAPIDB.updateBoltCore(requestId, {
        method,
      });
    } catch {
      console.log("changeRequestName error");
    }
  }
);

export const toggleOpenFolder = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch }
>("request-response/toggleOpenFolder", async (id: string, { dispatch }) => {
  try {
    dispatch(handleToggleFolder(id));
    await window.electronAPIDB.toggleFolder(id);
  } catch {
    console.log("toggleOpenFolder error");
  }
});

export const loadTabList = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>("request-response/loadTabList", async (_, { dispatch }) => {
  try {
    const tabsListData = await window.electronAPIDB.getTabList();
    dispatch(handleChangeTabList(tabsListData.openTabs ?? []));
    dispatch(handleChangeSelectedTab(tabsListData.selectedTab ?? null));
  } catch {
    console.log("loadTabList error");
  }
});

export const changeTabsData = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("request-response/changeTabsData", async (_, { getState }) => {
  const state = getState() as RootState;
  try {
    await window.electronAPIDB.changeTabsData({
      openTabs: state.requestResponse.tabList,
      selectedTab: state.requestResponse.selectedTab,
    });
  } catch {
    console.log("changeTabsData error");
  }
});

export const addNewTab = createAsyncThunk<
  void,
  void,
  { state: RootState; dispatch: AppDispatch }
>("request-response/addNewTab", async (_, { dispatch }) => {
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
    await window.electronAPIDB.addBoltCore(payload);
  } catch {
    console.log("changeTabsData error");
  }
});

export const duplicateRequestOrFolder = createAsyncThunk<
  void,
  string,
  { state: RootState; dispatch: AppDispatch }
>(
  "request-response/duplicateRequestOrFolder",
  async (id: string, { dispatch }) => {
    try {
      const newRequestId = uuidv4();
      await window.electronAPIDB.duplicateBoltCore(id, newRequestId);
      dispatch(handleChangeIsRequestListLoaded(false));
      dispatch(handleChangeSelectedTab(newRequestId));
    } catch {
      console.log("duplicateRequestOrFolder error");
    }
  }
);

export const deleteFolderOrRequest = createAsyncThunk<
  void,
  boolean,
  { state: RootState; dispatch: AppDispatch }
>(
  "request-response/deleteFolderOrRequest",
  async (value, { getState, dispatch }) => {
    const state = getState() as RootState;

    const deleteCandidateId = state.requestResponse.deleteFolderOrRequestId;

    try {
      if (value && state.requestResponse.deleteFolderOrRequestId) {
        await window.electronAPIDB.deleteBoltCore(deleteCandidateId);
        dispatch(handleChangeIsRequestListLoaded(false));
        if (state.requestResponse.tabList.includes(deleteCandidateId))
          dispatch(handleRemoveTab(deleteCandidateId));
      }

      dispatch(handleChangeDeleteFolderOrRequestId(""));
    } catch {
      console.log("deleteFolderOrRequest error");
    }
  }
);

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
      await window.electronAPIRequestAndFolderDB.updateRequestOrFolderById(
        requestId,
        {
          title:
            type === "title"
              ? value
              : (state.requestResponse.folderTitle[requestId] ??
                defaultFolderTitle),
          description:
            type === "description"
              ? value
              : (state.requestResponse.folderDescription[requestId] ??
                defaultFolderDescription),
        }
      );
    } catch {
      console.log("changeFolderContent error");
    }
  }
);
