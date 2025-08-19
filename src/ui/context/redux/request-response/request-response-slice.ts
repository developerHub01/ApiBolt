import {
  defaultApiKey,
  defaultBasicAuth,
  defaultFolderDescription,
  defaultFolderTitle,
  defaultJWTBearerAuth,
  generateNewMetaDataItem,
  initialHiddenCookie,
  initialHiddenHeaderData,
  ResponsePanelMinLimit,
} from "@/constant/request-response.constant";
import { type TMetaTableType } from "@/context/collections/request/RequestMetaTableProvider";
import type {
  APIKeyInterface,
  AuthorizationPayloadInterface,
  BasicAuthInterface,
  EnvironmentInterface,
  FormDataInterface,
  JWTBearerAuthInterface,
  ParamInterface,
  ParamHeaderPayloadInterface,
  ProjectInterface,
  RequestListInterface,
  RequestListItemInterface,
  RequestListItemUpdatePayloadInterface,
  RequestResponseSizeInterface,
  // ResponseFileDataBackendInterface,
  ResponseFolderDataInterface,
  ResponseInterface,
  TActiveTabType,
  TAuthType,
  TBearerToken,
  TContentType,
  TRequestBodyType,
  BodyRawInterface,
} from "@/types/request-response.types";
import { parseUrlParams } from "@/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// export const fetchApiUniformError = (error: unknown): ResponseInterface => {
//   // console.log("error", error);
//   if (axios.isAxiosError(error) && error.response) {
//     return {
//       data: error.response.data,
//       headers: error.response.headers,
//       status: error.response.status,
//       statusText: error.response.statusText,
//       statusDescription: "",
//     };
//   } else {
//     return {
//       data: null,
//       headers: {},
//       status: 0,
//       statusText: "Network Error",
//       statusDescription:
//         "Could not connect to the server. Check your internet or API URL.",
//     };
//   }
// };

// const generateNextHiddenHeaderOrParam = () => {
//   return {
//     id: uuidv4(),
//     key: "",
//     value: "",
//     description: "",
//     prevent: true,
//   };
// };

// const getRestOfAuthType = (excludes?: string | Array<string>) => {
//   if (!excludes) return AuthTypeList;

//   return AuthTypeList.filter(
//     (item) => !(Array.isArray(excludes) ? excludes : [excludes]).includes(item)
//   );
// };

// const useMetaDataManager = <
//   T extends { id: string; hide?: boolean; value: unknown },
// >(
//   setState: React.Dispatch<React.SetStateAction<Record<string, Array<T>>>>,
//   generateNewItem: () => T
// ) => {
//   const handleChange = useCallback(
//     (requestId: string | null, id: string, key: string, value: unknown) => {
//       if (!requestId) return;

//       setState((prev) => ({
//         ...prev,
//         [requestId]: (prev[requestId] ?? []).map((item) => {
//           if (item.id !== id) return item;

//           if (value instanceof File) {
//             const existingFiles = (
//               Array.isArray(item[key as keyof T]) ? item[key as keyof T] : []
//             ) as Array<unknown>;

//             return {
//               ...item,
//               [key]: [...existingFiles, value],
//             };
//           }

//           return {
//             ...item,
//             [key]: value,
//           };
//         }),
//       }));
//     },
//     [setState]
//   );

//   const handleDelete = useCallback(
//     (requestId: string | null, id: string) => {
//       if (!requestId) return;

//       setState((prev) => ({
//         ...prev,
//         [requestId]: prev[requestId]?.filter((item) => item.id !== id),
//       }));
//     },
//     [setState]
//   );

//   const handleAdd = useCallback(
//     (requestId: string | null) => {
//       if (!requestId) return;

//       setState((prev) => ({
//         ...prev,
//         [requestId]: [...(prev[requestId] ?? []), generateNewItem()],
//       }));
//     },
//     [setState, generateNewItem]
//   );

//   const handleCheckToggle = useCallback(
//     (requestId: string | null, id?: string) => {
//       if (!requestId) return;

//       if (id) {
//         setState((prev) => ({
//           ...prev,
//           [requestId]: (prev[requestId] ?? []).map((item) => {
//             if (item.id !== id) return item;
//             return {
//               ...item,
//               hide: item.hide ? undefined : true,
//             };
//           }),
//         }));
//       } else {
//         setState((prev) => {
//           const isAllChecked = Boolean(
//             (prev[requestId] ?? [])?.every((item) => !item.hide)
//           );

//           return {
//             ...prev,
//             [requestId]: (prev[requestId] ?? []).map((item) => ({
//               ...item,
//               hide: isAllChecked ? true : undefined,
//             })),
//           };
//         });
//       }
//     },
//     [setState]
//   );

//   return {
//     handleChange,
//     handleDelete,
//     handleAdd,
//     handleCheckToggle,
//   };
// };

// Define a type for the slice state

interface RequestResponseState {
  projectList: Array<ProjectInterface>;
  activeProjectId: string | null;

  environmentsList: Record<string, EnvironmentInterface>;

  requestList: RequestListInterface;
  loadedRequestList: Record<string, boolean>;
  isRequestListLoaded: boolean;
  deleteFolderOrRequestId: string;
  requestListCollapsed: boolean;

  tabList: Array<string>;
  isTabListHovering: boolean;
  selectedTab: string | null /* selectedTabId in tabList */;

  isResponseCollapsed: Record<string, boolean>;
  activeMetaTab: Record<string, TActiveTabType>;
  isApiUrlError: Record<string, boolean>;
  isLoading: Record<string, boolean>;
  apiUrl: Record<string, string>;
  rawData: Record<string, string>;
  rawDataLineWrap: Record<string, boolean>;
  response: Record<string, ResponseInterface | null>;
  requestSize: Record<string, RequestResponseSizeInterface>;
  responseSize: Record<string, RequestResponseSizeInterface>;
  isResposneError: Record<string, boolean>;
  requestBodyType: Record<string, TRequestBodyType>;
  rawRequestBodyType: Record<string, TContentType>;
  params: Record<string, Array<ParamInterface>>;
  hiddenParams: Record<string, Array<ParamInterface>>;
  headers: Record<string, Array<ParamInterface>>;
  hiddenCookie: ParamInterface;
  hiddenHeaders: Record<string, Array<ParamInterface>>;
  binaryData: Record<string, File | null>;
  formData: Record<string, Array<FormDataInterface>>;
  xWWWFormUrlencodedData: Record<string, Array<ParamInterface>>;
  isDownloadRequestWithBase64: Record<string, boolean>;
  requestIdShouldFetch: string;
  authType: TAuthType;
  apiKeyAuth: APIKeyInterface;
  /**
   * convert
   * const token = btoa(`${username}:${password}`);
   * headers["Authorization"] = `Basic ${token}`;
   * when to request the API
   */
  basicAuth: BasicAuthInterface;

  /**
   * convert
   * Authorization: `Bearer ${bearerToken}`
   * when to request the API
   */
  bearerTokenAuth: TBearerToken;

  /**
   * convert
   * Authorization: `Bearer ${bearerToken}`
   * based on the data
   * when to request the API
   */
  jwtBearerAuth: JWTBearerAuthInterface;

  folderTitle: Record<string, string>;
  folderDescription: Record<string, string>;
}

// Define the initial state using that type
const initialState: RequestResponseState = {
  projectList: [],
  activeProjectId: null,

  environmentsList: {},

  requestList: {},
  loadedRequestList: {},
  isRequestListLoaded: false,
  deleteFolderOrRequestId: "",
  requestListCollapsed: false,

  tabList: [],
  isTabListHovering: false,

  selectedTab: null,
  isResponseCollapsed: {},
  activeMetaTab: {},
  isApiUrlError: {},
  isLoading: {},
  apiUrl: {},
  rawData: {},
  rawDataLineWrap: {},
  response: {},
  requestSize: {},
  responseSize: {},
  isResposneError: {},
  requestBodyType: {},
  rawRequestBodyType: {},
  params: {},
  hiddenParams: {},
  headers: {},
  hiddenCookie: initialHiddenCookie(),
  hiddenHeaders: {},
  binaryData: {},
  formData: {},
  xWWWFormUrlencodedData: {},
  isDownloadRequestWithBase64: {},
  requestIdShouldFetch: "",

  authType: "no-auth",
  apiKeyAuth: defaultApiKey,
  basicAuth: defaultBasicAuth,
  bearerTokenAuth: "",
  jwtBearerAuth: defaultJWTBearerAuth,

  folderTitle: {},
  folderDescription: {},
};

export const requestResponseSlice = createSlice({
  name: "request-response",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    /* =============== Project reducers start ============= */
    handleLoadProjectsList: (
      state,
      action: PayloadAction<Array<ProjectInterface>>
    ) => {
      state.projectList = action.payload;
    },
    handleChangeActiveProject: (
      state,
      action: PayloadAction<string | null>
    ) => {
      if (state.activeProjectId === action.payload) return;
      state.activeProjectId = action.payload;
    },
    /* =============== Project reducers end ============= */

    /* =============== Environment reducers start ============= */
    handleLoadEnvironmentsList: (
      state,
      action: PayloadAction<Record<string, EnvironmentInterface>>
    ) => {
      if (!state.activeProjectId) return;

      state.environmentsList = action.payload;
    },
    /* =============== Environment reducers end ============= */

    /* =============== Authorization reducers start ============= */
    handleAuthorizations: (
      state,
      action: PayloadAction<AuthorizationPayloadInterface>
    ) => {
      if (!state.activeProjectId) return;

      const {
        type,
        apiKeyKey,
        apiKeyValue,
        apiKeyAddTo,
        /* Bearer Token Auth ============ */
        bearerToken,
        /* Basic Auth =========== */
        basicAuthUsername,
        basicAuthPassword,
        /* JWT Bearer Auth ============ */
        jwtAlgo,
        jwtSecret,
        jwtPayload,
        jwtHeaderPrefix,
        jwtAddTo,
      } = action.payload;

      state.authType = type;

      state.apiKeyAuth = {
        key: apiKeyKey ?? "",
        value: apiKeyValue ?? "",
        addTo: apiKeyAddTo ?? "header",
      };
      state.bearerTokenAuth = bearerToken ?? "";
      state.basicAuth = {
        username: basicAuthUsername ?? "",
        password: basicAuthPassword ?? "",
      };
      state.jwtBearerAuth = {
        algo: jwtAlgo ?? "",
        secret: jwtSecret ?? "",
        payload: jwtPayload ?? "",
        headerPrefix: jwtHeaderPrefix ?? "Bearer",
        addTo: jwtAddTo ?? "header",
      };
    },
    /* =============== Authorization reducers end ============= */

    /* ================ Requestlist start =================== */
    handleLoadRequestList: (
      state,
      action: PayloadAction<RequestListInterface>
    ) => {
      state.requestList = action.payload;
    },
    handleChangeIsRequestListLoaded: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isRequestListLoaded = action.payload ?? !state.isRequestListLoaded;
    },
    handleToggleRequestList: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      if (action.payload === state.requestListCollapsed) return;

      state.requestListCollapsed =
        action.payload ?? !state.requestListCollapsed;
    },
    handleCreateSingleRequest: (
      state,
      action: PayloadAction<RequestListItemInterface>
    ) => {
      const payload = action.payload;

      if (!payload.id) return;

      const { parentId } = payload;

      if (parentId && state.requestList[parentId]) {
        const parentData = state.requestList[parentId];
        if (!parentData.children) parentData.children = [];
        parentData.children.push(payload.id);
      }

      state.requestList[payload.id] = payload;
    },
    handleCreateRestApiBasic: (
      state,
      action: PayloadAction<Array<RequestListItemInterface>>
    ) => {
      const payload = (action.payload ?? [])?.reduce(
        (acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        },
        {} as Record<string, RequestListItemInterface>
      );

      state.requestList = {
        ...state.requestList,
        ...payload,
      };
    },
    handleUpdateRequestOrFolder: (
      state,
      action: PayloadAction<RequestListItemUpdatePayloadInterface>
    ) => {
      const { id } = action.payload;

      if (!state.requestList[id]) return;

      state.requestList[id] = {
        ...state.requestList[id],
        ...action.payload,
      };
    },
    handleDeleteAllRequestOrFolder: (state) => {
      state.requestList = {};
    },
    handleChangeDeleteFolderOrRequestId: (
      state,
      action: PayloadAction<string>
    ) => {
      state.deleteFolderOrRequestId = action.payload;
    },
    /* ================ Requestlist end =================== */

    /* ================ TabList start =================== */
    handleChangeIsTabListHovering: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      if (state.isTabListHovering === action.payload) return;

      state.isTabListHovering = action.payload ?? !state.isTabListHovering;
    },
    handleClearTabList: (state) => {
      state.tabList = [];
      state.selectedTab = null;
    },
    handleChangeTabList: (state, action: PayloadAction<Array<string>>) => {
      state.tabList = action.payload;
    },
    handleAddTab: (state, action: PayloadAction<string | undefined>) => {
      const id = action.payload ?? uuidv4();

      let addIndex = state.tabList.length;

      const selectedIdIndex = state.tabList.findIndex(
        (tabId) => tabId === state.selectedTab
      );

      if (selectedIdIndex >= 0) addIndex = selectedIdIndex + 1;

      if (state.tabList.includes(id)) return;

      const newList = state.tabList;
      newList.splice(addIndex, 0, id);
      state.tabList = newList;
    },
    handleRemoveTab: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const idIndex = state.tabList.findIndex((tabId) => tabId === id);
      const newTabList = state.tabList.filter((tabId) => tabId !== id);
      state.tabList = newTabList;

      // If the removed tab isn't the selected one, no need to touch selectedTab
      if (id !== state.selectedTab) return;

      const nextSelectedTabIndex = Math.max(
        Math.min(idIndex, newTabList.length - 1),
        0
      );

      // If no tabs left, set to null
      state.selectedTab =
        newTabList.length === 0 ? null : newTabList[nextSelectedTabIndex];
    },
    handleMoveTab: (
      state,
      action: PayloadAction<{
        id: string;
        index?: number;
      }>
    ) => {
      const { id, index = 0 } = action.payload;

      let tabList = state.tabList;

      const idIndex = tabList.findIndex((tabId) => tabId === id);
      if (idIndex >= 0) tabList = tabList.filter((tabId) => tabId !== id);

      tabList.splice(index ?? tabList.length, 0, id);
      state.tabList = [...tabList];
    },
    handleChangeSelectedTab: (
      state,
      action: PayloadAction<string | undefined | null>
    ) => {
      const id = action.payload;

      if (!id) {
        state.selectedTab = null;
        return;
      }

      const newSelectedTabIndex = state.tabList.findIndex(
        (tabId) => tabId === id
      );
      const oldSelectedTabIndex = state.tabList.findIndex(
        (tabId) => tabId === state.selectedTab
      );

      /* if new selected tab index doesnt exist in tabList (in open tabs) then add it next to old selected tab if old exist else last */
      if (newSelectedTabIndex < 0) {
        const newTabList = state.tabList;
        newTabList.splice(
          oldSelectedTabIndex < 0
            ? state.tabList.length
            : oldSelectedTabIndex + 1,
          0,
          id
        );
        state.tabList = newTabList;
      }

      state.selectedTab = id;
    },
    /* ================ TabsList end =================== */

    /* ================ Params start =================== */
    handleLoadParams: (
      state,
      action: PayloadAction<Array<ParamHeaderPayloadInterface>>
    ) => {
      if (!state.selectedTab) return;

      state.params[state.selectedTab] = action.payload;
    },
    handleSetParams: (
      state,
      action: PayloadAction<{
        id?: string;
        params: Array<ParamInterface>;
      }>
    ) => {
      const { params } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.params[id] = params;
    },
    /* ================ Params end =================== */

    /* ================ Headers start =================== */
    handleLoadHeaders: (
      state,
      action: PayloadAction<Array<ParamHeaderPayloadInterface>>
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;

      state.headers[selectedTab] = action.payload;

      if (!state.hiddenHeaders[selectedTab])
        state.hiddenHeaders[selectedTab] = initialHiddenHeaderData();
    },
    handleSetHeaders: (
      state,
      action: PayloadAction<{
        id?: string;
        headers: Array<ParamInterface>;
      }>
    ) => {
      const { headers } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.headers[id] = headers;
    },
    handleUpdateHiddenHeaders: (
      state,
      action: PayloadAction<{
        keyName: string;
      }>
    ) => {
      const { keyName } = action.payload;
      const selectedTab = state.selectedTab;

      if (!selectedTab || !state.hiddenHeaders[selectedTab]) return;

      state.hiddenHeaders[selectedTab].map((header: ParamInterface) => {
        if (header.id === keyName) {
          console.log(header);

          header["isCheck"] = !header["isCheck"];
        }

        return header;
      });
    },
    /* ================ Headers end =================== */

    /* ================ BodyRaw start =================== */
    handleLoadBodyRaw: (state, action: PayloadAction<BodyRawInterface>) => {
      const payload = action.payload;
      const selectedTab = state.selectedTab;

      if (!selectedTab) return;

      state.rawData[selectedTab] = payload.rawData ?? "";
      state.rawRequestBodyType[selectedTab] = payload.type ?? "json";
      state.rawDataLineWrap[selectedTab] = payload.lineWrap ?? true;
    },
    /* ================ BodyRaw end =================== */

    handleToggleCollapse: (
      state,
      action: PayloadAction<
        | {
            id?: string;
            size?: number;
          }
        | undefined
      >
    ) => {
      const id = action.payload?.id ?? state.selectedTab;
      if (!id) return;

      const size = action.payload?.size;
      const isResponseCollapsed = state.isResponseCollapsed[id];

      if (
        size !== undefined &&
        ((size > ResponsePanelMinLimit && !isResponseCollapsed) ||
          (size <= ResponsePanelMinLimit && isResponseCollapsed))
      )
        return;

      state.isResponseCollapsed[id] = !state.isResponseCollapsed[id];
    },
    handleInitRequest: () =>
      // state,
      // action: PayloadAction<{
      //   id: string;
      //   payload?: ResponseFileDataBackendInterface;
      // }>
      {
        // const { id, payload } = action.payload;
        // if (!id) return;
        // if (state.loadedRequestList[id]) return;
        // /**
        //  * If payload have that value then good else check if already loaded data or not if not then assign default value
        //  * **/
        // state.activeMetaTab[id] = state.activeMetaTab[id] ?? "params";
        // state.apiUrl[id] = payload?.url ?? state.apiUrl[id] ?? "";
        // state.requestBodyType[id] = state.requestBodyType[id] ?? "none";
        // state.rawRequestBodyType[id] = state.rawRequestBodyType[id] ?? "text";
        // state.params[id] = payload?.params ?? state.params[id] ?? [];
        // state.hiddenParams[id] = state.hiddenParams[id] ?? [];
        // state.headers[id] = payload?.headers ?? state.headers[id] ?? [];
        // state.hiddenHeaders[id] =
        //   state.hiddenHeaders[id] ?? initialHiddenHeaderData();
        // state.formData[id] = state.formData[id] ?? [];
        // state.xWWWFormUrlencodedData[id] =
        //   payload?.body?.xWWWFormUrlencodedData ??
        //   state.xWWWFormUrlencodedData[id] ??
        //   [];
        // state.loadedRequestList[id] = true;
      },
    handleUpdateRequestResponseSelectedTab: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.selectedTab = action.payload;
    },
    handleChangeActiveMetaTab: (
      state,
      action: PayloadAction<{
        id?: string;
        type: TActiveTabType;
      }>
    ) => {
      const { type } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.activeMetaTab[id] = type;
    },
    handleSetResponse: (
      state,
      action: PayloadAction<{
        id?: string;
        response: ResponseInterface | null;
      }>
    ) => {
      const { response } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.response[id] = response;
    },
    handleSetFormData: (
      state,
      action: PayloadAction<{
        id?: string;
        formData: Array<FormDataInterface>;
      }>
    ) => {
      const { formData } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.formData[id] = formData;
    },
    handleSetXWWWFormUrlencodedData: (
      state,
      action: PayloadAction<{
        id?: string;
        xWWWFormUrlencoded: Array<ParamInterface>;
      }>
    ) => {
      const { xWWWFormUrlencoded } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.xWWWFormUrlencodedData[id] = xWWWFormUrlencoded;
    },
    handleSetBinary: (
      state,
      action: PayloadAction<{
        id?: string;
        binary: File | null;
      }>
    ) => {
      const { binary } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.binaryData[id] = binary;
    },
    handleChangeRequestBodyType: (
      state,
      action: PayloadAction<{
        id?: string;
        type: TRequestBodyType;
      }>
    ) => {
      const { type } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;
      state.requestBodyType[id] = type;
    },
    handleChangeRawData: (
      state,
      action: PayloadAction<{
        id?: string;
        raw: string;
      }>
    ) => {
      const { raw } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.rawData[id] = raw;
    },
    handleChangeRawRequestBodyType: (
      state,
      action: PayloadAction<{
        id?: string;
        type: TContentType;
      }>
    ) => {
      const { type } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.rawRequestBodyType[id] = type;
    },
    handleIsInputError: (state, action: PayloadAction<boolean>) => {
      if (!state.selectedTab) return;
      state.isApiUrlError[state.selectedTab] = action.payload;
    },
    handleRequestSend: (state) => {
      if (!state.selectedTab) return;
      state.requestIdShouldFetch = state.selectedTab;
    },
    handleChangeApiUrl: (
      state,
      action: PayloadAction<{
        id?: string;
        url: string;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      const { url: api } = action.payload;

      const urlParams: Array<{
        key: string;
        value: string;
      }> = parseUrlParams(api).map(([key, value]) => ({
        key,
        value,
      }));

      let updatedParams: Array<ParamInterface> = [];
      /* 
      if new params size less then previous means some of them have to filter out
      
      so we keep hidden params as it is but for others we checked that is it exist in new param list

      if exist then update it
      else filter out it.
      */
      if (!state.params[id]) state.params[id] = [];
      if (state.params[id].length < urlParams.length) {
        updatedParams = urlParams.map((param, index) => ({
          ...generateNewMetaDataItem("params"),
          ...state.params[id]?.[index],
          ...param,
        }));
      } else {
        let index = 0;
        updatedParams = state.params[id]?.reduce(
          (acc, curr) =>
            curr.isCheck
              ? [...acc, curr]
              : urlParams[index]
                ? [
                    ...acc,
                    {
                      ...curr,
                      ...urlParams[index++],
                    },
                  ]
                : acc,
          [] as Array<ParamInterface>
        );
      }

      // Save it to the state
      state.params[id] = updatedParams;
      state.apiUrl[id] = api;
    },
    handleChangeRequestResponseSize: (
      state,
      action: PayloadAction<{
        id?: string;
        payload: RequestResponseSizeInterface;
        type: "request" | "response";
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      const { payload, type } = action.payload;
      if (type === "request") state.requestSize[id] = payload;
      else state.responseSize[id] = payload;
    },
    handleChangeAuthType: (
      state,
      action: PayloadAction<{
        type: TAuthType;
      }>
    ) => {
      const { type } = action.payload;

      state.authType = type;
    },
    // handleSetAPIKey: (
    //   state,
    //   action: PayloadAction<{
    //     id?: string;
    //     value: APIKeyInterface;
    //   }>
    // ) => {
    //   const { value } = action.payload;
    //   const id = action.payload.id ?? state.selectedTab;
    //   if (!id) return;

    //   state.apiKeyAuth[id] = value;
    // },
    // handleChangeAPIKey: (
    //   state,
    //   action: PayloadAction<{
    //     id?: string;
    //     key: "key" | "value" | "addTo";
    //     value: string;
    //   }>
    // ) => {
    //   const { value, key } = action.payload;
    //   const id = action.payload.id ?? state.selectedTab;
    //   if (!id) return;

    //   state.apiKeyAuth[id] = {
    //     ...defaultApiKey,
    //     ...(state.apiKeyAuth[id] ?? {}),
    //     [key]: value,
    //   };
    // },
    // handleSetBasicAuth: (
    //   state,
    //   action: PayloadAction<{
    //     id?: string;
    //     value: BasicAuthInterface;
    //   }>
    // ) => {
    //   const { value } = action.payload;
    //   const id = action.payload.id ?? state.selectedTab;
    //   if (!id) return;

    //   state.basicAuth[id] = value;
    // },
    // handleChangeBasicAuth: (
    //   state,
    //   action: PayloadAction<{
    //     id?: string;
    //     key: "username" | "password";
    //     value: string;
    //   }>
    // ) => {
    //   const { value, key } = action.payload;
    //   const id = action.payload.id ?? state.selectedTab;
    //   if (!id) return;

    //   state.basicAuth[id] = {
    //     ...defaultBasicAuth,
    //     ...(state.basicAuth[id] ?? {}),
    //     [key]: value,
    //   };
    // },
    // handleChangeBearerTokenAuth: (
    //   state,
    //   action: PayloadAction<{
    //     id?: string;
    //     value: string;
    //   }>
    // ) => {
    //   const { value } = action.payload;
    //   const id = action.payload.id ?? state.selectedTab;
    //   if (!id) return;

    //   state.bearerTokenAuth[id] = value;
    // },
    // handleSetJWTBearerAuth: (
    //   state,
    //   action: PayloadAction<{
    //     id?: string;
    //     value: JWTBearerAuthInterface;
    //   }>
    // ) => {
    //   const { value } = action.payload;
    //   const id = action.payload.id ?? state.selectedTab;
    //   if (!id) return;

    //   state.jwtBearerAuth[id] = value;
    // },
    // handleChangeJWTBearerAuth: (
    //   state,
    //   action: PayloadAction<{
    //     id?: string;
    //     key: "algo" | "secret" | "payload" | "headerPrefix" | "addTo";
    //     value: string;
    //   }>
    // ) => {
    //   const { key, value } = action.payload;
    //   const id = action.payload.id ?? state.selectedTab;
    //   if (!id) return;

    //   state.jwtBearerAuth[id] = {
    //     ...defaultJWTBearerAuth,
    //     ...(state.jwtBearerAuth[id] ?? {}),
    //     [key]: value,
    //   };
    // },
    handleIsDownloadRequestWithBase64: (
      state,
      action: PayloadAction<boolean>
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;

      state.isDownloadRequestWithBase64[selectedTab] = action.payload;
    },
    handleClearRequestResponse: () =>
      // state,
      // action: PayloadAction<
      //   | {
      //       id?: string;
      //     }
      //   | undefined
      // >
      {
        // const id = action?.payload?.id ?? state.selectedTab;
        // if (!id) return;
        // delete state.isLoading[id];
        // delete state.isApiUrlError[id];
        // delete state.isResposneError[id];
        // state.apiUrl[id] = "";
        // state.params[id] = [];
        // state.headers[id] = [];
        // state.headers[id] = [];
        // // delete state.basicAuth[id];
        // // delete state.bearerTokenAuth[id];
        // // delete state.jwtBearerAuth[id];
        // // delete state.apiKeyAuth[id];
        // state.requestBodyType[id] = "none";
        // state.rawRequestBodyType[id] = "json";
        // state.formData[id] = [];
        // delete state.binaryData[id];
        // state.xWWWFormUrlencodedData[id] = [];
        // delete state.response[id];
        // delete state.requestSize[id];
        // delete state.responseSize[id];
        // state.hiddenParams[id] = [];
        // state.hiddenHeaders[id] = [];
      },
    handleAddMetaData: (
      state,
      action: PayloadAction<{
        id?: string;
        type: Omit<TMetaTableType, "hiddenParams" | "hiddenHeaders">;
      }>
    ) => {
      const { type } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      const newData = generateNewMetaDataItem(type as TMetaTableType);

      switch (type) {
        case "params":
          if (!state.params[id]) state.params[id] = [];
          state.params[id].push(newData);
          break;
        case "headers":
          if (!state.headers[id]) state.headers[id] = [];
          state.headers[id].push(newData);
          break;
        case "form-data":
          if (!state.formData[id]) state.formData[id] = [];
          state.formData[id].push(newData);
          break;
        case "x-www-form-urlencoded":
          if (!state.xWWWFormUrlencodedData[id])
            state.xWWWFormUrlencodedData[id] = [];
          state.xWWWFormUrlencodedData[id].push(newData);
          break;
        default:
          break;
      }
    },
    handleChangeMetaData: (
      state,
      action: PayloadAction<{
        requestId?: string;
        id: string;
        key: string;
        value: unknown;
        type: TMetaTableType;
      }>
    ) => {
      const requestId = action.payload.requestId ?? state.selectedTab;
      if (!requestId) return;

      const { id, key, value, type } = action.payload;

      let targetList:
        | Record<string, Array<ParamInterface | FormDataInterface>>
        | undefined;

      switch (type) {
        case "params":
          targetList = state.params;
          break;
        case "headers":
          targetList = state.headers;
          break;
        case "form-data":
          targetList = state.formData;
          break;
        case "x-www-form-urlencoded":
          targetList = state.xWWWFormUrlencodedData;
          break;
        default:
          return;
      }

      if (!targetList[requestId]) {
        targetList[requestId] = [];
      }

      targetList[requestId] = targetList[requestId].map((item) => {
        if (item.id !== id) return item;

        if (value instanceof File) {
          const existingFiles = (
            Array.isArray(item[key as keyof typeof item])
              ? item[key as keyof typeof item]
              : []
          ) as Array<unknown>;

          return {
            ...item,
            [key]: [...existingFiles, value],
          };
        }

        return {
          ...item,
          [key]: value,
        };
      });
    },
    handleDeleteMetaData: (
      state,
      action: PayloadAction<{
        requestId?: string;
        id: string;
        type: TMetaTableType;
      }>
    ) => {
      const requestId = action.payload.requestId ?? state.selectedTab;
      if (!requestId) return;

      const { id, type } = action.payload;

      let targetList:
        | Record<string, Array<ParamInterface | FormDataInterface>>
        | undefined;

      switch (type) {
        case "params":
          targetList = state.params;
          break;
        case "headers":
          targetList = state.headers;
          break;
        case "form-data":
          targetList = state.formData;
          break;
        case "x-www-form-urlencoded":
          targetList = state.xWWWFormUrlencodedData;
          break;
        default:
          return;
      }

      if (!targetList[requestId]) {
        targetList[requestId] = [];
        return;
      }

      targetList[requestId] = targetList[requestId]?.filter(
        (item) => item.id !== id
      );
    },
    handleCheckToggleMetaData: (
      state,
      action: PayloadAction<{
        requestId?: string;
        id?: string;
        type: TMetaTableType;
      }>
    ) => {
      const requestId = action.payload.requestId ?? state.selectedTab;
      if (!requestId) return;

      const { id, type } = action.payload;

      let targetList:
        | Record<string, Array<ParamInterface | FormDataInterface>>
        | undefined;

      switch (type) {
        case "params":
          targetList = state.params;
          break;
        case "headers":
          targetList = state.headers;
          break;
        case "form-data":
          targetList = state.formData;
          break;
        case "x-www-form-urlencoded":
          targetList = state.xWWWFormUrlencodedData;
          break;
        default:
          return;
      }

      if (!targetList[requestId]) {
        targetList[requestId] = [];
      }

      if (id) {
        targetList[requestId] = targetList[requestId].map((item) => {
          if (item.id !== id) return item;
          return {
            ...item,
            hide: item.isCheck ? undefined : true,
          };
        });
      } else {
        const isAllChecked = Boolean(
          (targetList[requestId] ?? [])?.every((item) => !item.isCheck)
        );

        targetList[requestId] = targetList[requestId].map((item) => ({
          ...item,
          hide: isAllChecked ? true : undefined,
        }));
      }
    },
    handleRemoveAllMetaData: (
      state,
      action: PayloadAction<{
        id?: string;
        type: TMetaTableType;
      }>
    ) => {
      const { type } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      switch (type) {
        case "params":
          state.params[id] = [];
          return;
        case "headers":
          state.headers[id] = [];
          return;
        case "form-data":
          state.formData[id] = [];
          return;
        case "x-www-form-urlencoded":
          state.xWWWFormUrlencodedData[id] = [];
          return;
      }
    },
    handleChangeBinaryData: (
      state,
      action: PayloadAction<{
        id?: string;
        file: File | null;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;
      const { file } = action.payload;

      state.binaryData[id] = file;
    },
    handleRemoveFormDataFile: (
      state,
      action: PayloadAction<{
        id: string;
        index: number;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      const { index } = action.payload;

      (state.formData[id] ?? []).map((item) => {
        if (item.id !== id || typeof item.value === "string") return item;
        return {
          ...item,
          value: item.value.filter((_, i) => i !== index),
        };
      });
    },

    handleInitFolder: (
      state,
      action: PayloadAction<{
        id?: string;
        payload?: ResponseFolderDataInterface;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      const { payload } = action.payload;

      if (state.loadedRequestList[id]) return;

      /**
       * If payload have that value then good else check if already loaded data or not if not then assign default value
       * **/
      state.folderTitle[id] =
        payload?.title ?? state.folderTitle[id] ?? defaultFolderTitle;
      state.folderDescription[id] =
        payload?.description ??
        state.folderDescription[id] ??
        defaultFolderDescription;

      state.loadedRequestList[id] = true;
    },
    handleChangeFolderTitle: (
      state,
      action: PayloadAction<{
        id?: string;
        value: string;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.folderTitle[id] = action.payload.value;
    },
    handleChangeFolderDescription: (
      state,
      action: PayloadAction<{
        id?: string;
        value: string;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.folderDescription[id] = action.payload.value;
    },
  },
  // extraReducers(builder){
  //   builder.addCase(getDownloadableRequestData.fulfilled, (state, action)=>{

  //   })
  // }
});

export const selectRequestNameById =
  (id: string) => (state: RequestResponseState) =>
    state.requestList[id]?.name;

export const {
  handleLoadProjectsList,
  handleChangeActiveProject,

  handleLoadEnvironmentsList,

  handleAuthorizations,

  handleLoadRequestList,
  handleChangeIsRequestListLoaded,
  handleToggleRequestList,
  handleUpdateRequestOrFolder,
  handleDeleteAllRequestOrFolder,
  handleChangeDeleteFolderOrRequestId,
  handleCreateSingleRequest,
  handleCreateRestApiBasic,

  handleChangeTabList,
  handleChangeIsTabListHovering,
  handleClearTabList,
  handleAddTab,
  handleRemoveTab,
  handleMoveTab,
  handleChangeSelectedTab,

  /* params start =========== */
  handleLoadParams,
  /* params end =========== */

  /* headers start =========== */
  handleLoadHeaders,
  /* headers end =========== */

  handleToggleCollapse,
  handleInitRequest,
  handleUpdateRequestResponseSelectedTab,
  handleChangeActiveMetaTab,
  handleSetParams,
  handleSetHeaders,
  handleUpdateHiddenHeaders,

  handleLoadBodyRaw,

  handleSetResponse,
  handleSetFormData,
  handleSetXWWWFormUrlencodedData,
  handleSetBinary,
  handleChangeRawData,
  handleChangeRequestBodyType,
  handleChangeRawRequestBodyType,
  handleIsInputError,
  handleRequestSend,
  handleChangeApiUrl,
  handleChangeRequestResponseSize,
  handleChangeAuthType,
  // handleSetAPIKey,
  // handleChangeAPIKey,
  // handleSetBasicAuth,
  // handleChangeBasicAuth,
  // handleChangeBearerTokenAuth,
  // handleSetJWTBearerAuth,
  // handleChangeJWTBearerAuth,
  handleIsDownloadRequestWithBase64,
  handleClearRequestResponse,
  handleAddMetaData,
  handleChangeMetaData,
  handleDeleteMetaData,
  handleCheckToggleMetaData,
  handleRemoveAllMetaData,
  handleChangeBinaryData,
  handleRemoveFormDataFile,

  handleInitFolder,
  handleChangeFolderTitle,
  handleChangeFolderDescription,
} = requestResponseSlice.actions;

export default requestResponseSlice.reducer;
