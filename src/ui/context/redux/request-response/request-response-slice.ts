import {
  AUTHORIZATION_AUTH_HEADER_KEY,
  DEFAULT_API_KEY,
  DEFAULT_AUTHORIZATION_ID,
  DEFAULT_BASIC_AUTH,
  DEFAULT_JWT_BEARER_AUTH,
  INITIAL_HIDDEN_HEADER_AUTHORIZATION_DATA,
} from "@/constant/authorization.constant";
import {
  initialHiddenCookie,
  initialHiddenHeaderData,
  RESPONSE_PANEL_MIN_LIMIT,
} from "@/constant/request-response.constant";
import type {
  FormDataInterface,
  ParamInterface,
  ParamHeaderPayloadInterface,
  RequestListInterface,
  RequestListItemInterface,
  RequestListItemUpdatePayloadInterface,
  ResponseFolderDataInterface,
  ResponseInterface,
  TActiveTabType,
  TContentType,
  TRequestBodyType,
  BodyRawInterface,
  RequestTabInterface,
  MetaShowColumnInterface,
  TMetaTableType,
  TRequestFolderDescriptionTab,
  ShowHiddenMetaInterface,
} from "@/types/request-response.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { loadFolder } from "@/context/redux/request-response/thunks/folder";
import type {
  APIKeyInterface,
  AuthorizationPayloadInterface,
  BasicAuthInterface,
  JWTBearerAuthInterface,
  TAuthType,
  TBearerToken,
} from "@/types/authorization.types";
import type { ProjectInterface } from "@/types/project.types";
import type { EnvironmentInterface } from "@/types/environment.types";
import {
  DEFAULT_FOLDER_DESCRIPTION,
  DEFAULT_FOLDER_TITLE,
} from "@/constant/folder.constant";

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
//   if (!excludes) return AUTH_TYPE_LIST;

//   return AUTH_TYPE_LIST.filter(
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
  isLoading: Record<string, boolean>;

  metaShowColumn: Record<string, MetaShowColumnInterface>;
  paramsBulkEditOpen: Record<string, boolean>;
  headersBulkEditOpen: Record<string, boolean>;
  formDataBulkEditOpen: Record<string, boolean>;
  xWWWFormEncodedBulkEditOpen: Record<string, boolean>;

  rawData: Record<string, string>;
  rawDataLineWrap: Record<string, boolean>;
  response: Record<string, ResponseInterface | null>;
  isResposneError: Record<string, boolean>;
  requestBodyType: Record<string, TRequestBodyType>;
  rawRequestBodyType: Record<string, TContentType>;
  params: Record<string, Array<ParamInterface>>;
  hiddenParams: Record<string, ParamInterface>;
  showHiddenParams: Record<string, boolean>;
  headers: Record<string, Array<ParamInterface>>;
  hiddenCookie: ParamInterface;
  hiddenHeaders: Record<string, Array<ParamInterface>>;
  showHiddenHeaders: Record<string, boolean>;
  binaryData: Record<string, string | null>;
  formData: Record<string, Array<FormDataInterface>>;
  xWWWFormUrlencodedData: Record<string, Array<ParamInterface>>;
  isDownloadRequestWithBase64: Record<string, boolean>;

  authType: Record<string, TAuthType>;
  authInheritedId: Record<string, string | null>;
  apiKeyAuth: Record<string, APIKeyInterface>;
  /**
   * convert
   * const token = btoa(`${username}:${password}`);
   * headers["Authorization"] = `Basic ${token}`;
   * when to request the API
   */
  basicAuth: Record<string, BasicAuthInterface>;

  /**
   * convert
   * Authorization: `Bearer ${bearerToken}`
   * when to request the API
   */
  bearerTokenAuth: Record<string, TBearerToken>;

  /**
   * convert
   * Authorization: `Bearer ${bearerToken}`
   * based on the data
   * when to request the API
   */
  jwtBearerAuth: Record<string, JWTBearerAuthInterface>;

  folderTitle: Record<string, string>;
  folderDescription: Record<string, string>;
  folderDescriptionActiveTab: Record<string, TRequestFolderDescriptionTab>;

  /* loaders start ================ */
  isLoadingFolder: Record<string, boolean>;
  /* loaders end ================ */
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
  isLoading: {},

  metaShowColumn: {},
  paramsBulkEditOpen: {},
  headersBulkEditOpen: {},
  formDataBulkEditOpen: {},
  xWWWFormEncodedBulkEditOpen: {},

  rawData: {},
  rawDataLineWrap: {},
  response: {},
  isResposneError: {},
  requestBodyType: {},
  rawRequestBodyType: {},
  params: {},
  hiddenParams: {},
  showHiddenParams: {},
  headers: {},
  hiddenCookie: initialHiddenCookie(),
  hiddenHeaders: {},
  showHiddenHeaders: {},
  binaryData: {},
  formData: {},
  xWWWFormUrlencodedData: {},
  isDownloadRequestWithBase64: {},

  authType: {},
  authInheritedId: {},
  apiKeyAuth: {},
  basicAuth: {},
  bearerTokenAuth: {},
  jwtBearerAuth: {},

  folderTitle: {},
  folderDescription: {},
  folderDescriptionActiveTab: {},

  /* loaders start ================ */
  isLoadingFolder: {},
  /* loaders end ================ */
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
    handleAuthorizationsInheritedId: (
      state,
      action: PayloadAction<{
        requestId: string;
        inheritedId: string;
      }>
    ) => {
      if (!state.activeProjectId) return;
      const { requestId, inheritedId = DEFAULT_AUTHORIZATION_ID } =
        action.payload;

      if (state.authInheritedId[requestId] === inheritedId) return;
      state.authInheritedId[requestId] = inheritedId;
    },
    handleAuthorizations: (
      state,
      action: PayloadAction<{
        id?: string;
        payload: Partial<AuthorizationPayloadInterface>;
      }>
    ) => {
      if (!state.activeProjectId) return;
      const { id = DEFAULT_AUTHORIZATION_ID, payload } = action.payload;

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
      } = payload;

      /* auth type start =========== */
      const updatedType =
        id === DEFAULT_AUTHORIZATION_ID || !id ? "no-auth" : "inherit-parent";
      if (!state.authType[id]) state.authType[id] = updatedType;
      if (type && state.authType[id] !== type) state.authType[id] = type;
      /* auth type end =========== */

      /* api key start =========== */
      if (!state.apiKeyAuth[id])
        state.apiKeyAuth[id] = {
          ...DEFAULT_API_KEY,
        };

      if (apiKeyKey !== undefined && state.apiKeyAuth[id].key !== apiKeyKey)
        state.apiKeyAuth[id].key = apiKeyKey;
      if (
        apiKeyValue !== undefined &&
        state.apiKeyAuth[id].value !== apiKeyValue
      )
        state.apiKeyAuth[id].value = apiKeyValue;
      if (
        apiKeyAddTo !== undefined &&
        state.apiKeyAuth[id].addTo !== apiKeyAddTo
      )
        state.apiKeyAuth[id].addTo = apiKeyAddTo;
      /* api key end =========== */

      /* bearer token start =========== */
      if (
        state.bearerTokenAuth[id] === undefined ||
        state.bearerTokenAuth[id] === null
      )
        state.bearerTokenAuth[id] = "";
      if (
        bearerToken !== undefined &&
        state.bearerTokenAuth[id] !== bearerToken
      )
        state.bearerTokenAuth[id] = bearerToken;
      /* bearer token end =========== */

      /* basic auth start =========== */
      if (state.basicAuth[id] === undefined || state.basicAuth[id] === null)
        state.basicAuth[id] = {
          ...DEFAULT_BASIC_AUTH,
        };
      if (
        basicAuthUsername !== undefined &&
        state.basicAuth[id].username !== basicAuthUsername
      )
        state.basicAuth[id].username = basicAuthUsername;
      if (
        basicAuthPassword !== undefined &&
        state.basicAuth[id].password !== basicAuthPassword
      )
        state.basicAuth[id].password = basicAuthPassword;
      /* basic auth end =========== */

      /* jwt auth start =========== */
      if (
        state.jwtBearerAuth[id] === undefined ||
        state.jwtBearerAuth[id] === null
      )
        state.jwtBearerAuth[id] = {
          ...DEFAULT_JWT_BEARER_AUTH,
        };

      if (jwtAlgo !== undefined && state.jwtBearerAuth[id].algo !== jwtAlgo)
        state.jwtBearerAuth[id].algo = jwtAlgo;

      if (
        jwtSecret !== undefined &&
        state.jwtBearerAuth[id].secret !== jwtSecret
      )
        state.jwtBearerAuth[id].secret = jwtSecret;

      if (
        jwtPayload !== undefined &&
        state.jwtBearerAuth[id].payload !== jwtPayload
      )
        state.jwtBearerAuth[id].payload = jwtPayload;

      if (
        jwtHeaderPrefix !== undefined &&
        state.jwtBearerAuth[id].headerPrefix !== jwtHeaderPrefix
      )
        state.jwtBearerAuth[id].headerPrefix = jwtHeaderPrefix;

      if (jwtAddTo !== undefined && state.jwtBearerAuth[id].addTo !== jwtAddTo)
        state.jwtBearerAuth[id].addTo = jwtAddTo;
      /* jwt auth end =========== */
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

      Object.assign(state.requestList, payload);

      /* update if parent exist then that's children list */

      /* though not necessary but checking if first requestOrFolder is not folder then return */
      if (
        !action.payload[0].children ||
        !action.payload[0].parentId ||
        state.requestList[action.payload[0].parentId].method
      )
        return;

      /* if children not exist in parent then update with payload folder id as children  */
      /* if children exist in parent then add the payload folder id in children list  */
      if (!state.requestList[action.payload[0].parentId].children)
        state.requestList[action.payload[0].parentId].children = [
          action.payload[0].id,
        ];
      else
        state.requestList[action.payload[0].parentId].children?.push(
          action.payload[0].id
        );
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
    handleChangeCollapseAllRequestOrFolder: (state) => {
      Object.keys(state.requestList).forEach((id) => {
        state.requestList[id].isExpended = false;
      });
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
      const { id, index } = action.payload;

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

    /* ================ MetaTable bulk start =================== */
    handleToggleMetaBulkEditOpen: (state) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;

      if (state.activeMetaTab[selectedTab] === "params")
        state.paramsBulkEditOpen[selectedTab] =
          !state.paramsBulkEditOpen[selectedTab];
      else if (state.activeMetaTab[selectedTab] === "headers")
        state.headersBulkEditOpen[selectedTab] =
          !state.headersBulkEditOpen[selectedTab];
      else if (
        state.activeMetaTab[selectedTab] === "body" &&
        state.requestBodyType[selectedTab] === "form-data"
      )
        state.formDataBulkEditOpen[selectedTab] =
          !state.formDataBulkEditOpen[selectedTab];
      else if (
        state.activeMetaTab[selectedTab] === "body" &&
        state.requestBodyType[selectedTab] === "x-www-form-urlencoded"
      )
        state.xWWWFormEncodedBulkEditOpen[selectedTab] =
          !state.xWWWFormEncodedBulkEditOpen[selectedTab];
    },
    /* ================ MetaTable bulk end =================== */

    /* ================ MetaShowColumn start =================== */
    handleLoadMetaShowColumn: (
      state,
      action: PayloadAction<MetaShowColumnInterface>
    ) => {
      if (!state.selectedTab) return;

      state.metaShowColumn[state.selectedTab] = action.payload;
    },
    handleSetMetaShowColumn: (
      state,
      action: PayloadAction<{
        id?: string;
        payload: Partial<MetaShowColumnInterface>;
      }>
    ) => {
      const { payload } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.params[id] = {
        ...(state.params[id] ?? {}),
        ...payload,
      };
    },
    /* ================ MetaShowColumn end =================== */

    /* ================ ShowHiddenMetaData start =================== */
    handleLoadShowHiddenMetaData: (
      state,
      action: PayloadAction<{
        id?: string;
        payload: ShowHiddenMetaInterface;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.showHiddenParams[id] = action.payload.payload.showHiddenHeaders;
      state.showHiddenHeaders[id] = action.payload.payload.showHiddenHeaders;
    },
    handleSetShowHiddenMetaData: (
      state,
      action: PayloadAction<{
        id?: string;
        payload: Partial<ShowHiddenMetaInterface>;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;
      const { payload } = action.payload;

      if (payload.showHiddenParams !== undefined)
        state.showHiddenParams[id] = payload.showHiddenParams;
      if (payload.showHiddenHeaders !== undefined)
        state.showHiddenHeaders[id] = payload.showHiddenHeaders;
    },
    /* ================ ShowHiddenMetaData end =================== */

    /* ================ Params start =================== */
    handleLoadParams: (
      state,
      action: PayloadAction<Array<ParamHeaderPayloadInterface | ParamInterface>>
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
    handleSetHiddenParams: (
      state,
      action: PayloadAction<{
        id?: string;
        param: Pick<ParamInterface, "key" | "value"> | undefined;
      }>
    ) => {
      const { param } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      if (!param) {
        delete state.hiddenParams[id];
        return;
      }

      if (
        state.hiddenParams[id]?.key === param.key &&
        state.hiddenParams[id]?.value === param.value
      )
        return;

      state.hiddenParams[id] = {
        ...INITIAL_HIDDEN_HEADER_AUTHORIZATION_DATA,
        ...param,
      };
    },
    handleClearHiddenParams: (state, action: PayloadAction<string>) => {
      const id = action.payload ?? state.selectedTab;
      if (!id || !state.hiddenParams[id]) return;
      delete state.hiddenParams[id];
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
    handleUpdateHiddenAuthorizationHeaders: (
      state,
      action: PayloadAction<{
        id?: string;
        key?: string;
        value: string;
      }>
    ) => {
      const selectedTab = action.payload.id ?? state.selectedTab;
      if (!selectedTab) return;

      if (!state.hiddenHeaders[selectedTab])
        state.hiddenHeaders[selectedTab] = [];

      const value = action.payload.value;
      const key = action.payload.key ?? AUTHORIZATION_AUTH_HEADER_KEY;
      const existingHiddenHeaderAuthorization = state.hiddenHeaders[
        selectedTab
      ].find((header) => header.id === "authorization");
      if (value === existingHiddenHeaderAuthorization?.value) return;

      /* because we are fixing if auth have then it will be always in zero'th index (0) */
      if (existingHiddenHeaderAuthorization && !value) {
        state.hiddenHeaders[selectedTab].shift();
        return;
      } else if (!value) return;

      if (!existingHiddenHeaderAuthorization)
        state.hiddenHeaders[selectedTab].unshift({
          ...INITIAL_HIDDEN_HEADER_AUTHORIZATION_DATA,
          key,
          value,
        });
      else state.hiddenHeaders[selectedTab][0].value = value;
    },
    handleClearHiddenAuthorizationHeaders: (
      state,
      action: PayloadAction<string>
    ) => {
      const selectedTab = action.payload ?? state.selectedTab;
      if (!selectedTab || !state.hiddenHeaders[selectedTab]) return;

      const existingHiddenHeaderAuthorization = state.hiddenHeaders[
        selectedTab
      ].find((header) => header.id === "authorization");

      if (!existingHiddenHeaderAuthorization) return;

      /* because we are fixing if auth have then it will be always in zero'th index (0) */

      state.hiddenHeaders[selectedTab].shift();
    },
    handleUpdateHiddenHeadersIsCheck: (
      state,
      action: PayloadAction<{
        keyName: string;
      }>
    ) => {
      const { keyName } = action.payload;
      const selectedTab = state.selectedTab;

      if (!selectedTab || !state.hiddenHeaders[selectedTab]) return;

      state.hiddenHeaders[selectedTab].map((header: ParamInterface) => {
        if (header.id === keyName) header["isCheck"] = !header["isCheck"];

        return header;
      });
    },
    /* ================ Headers end =================== */

    /* ================ Metadata start =================== */
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
    /* ================ Metadata end =================== */

    /* ================ BodyFormData start =================== */
    handleLoadBodyFormData: (
      state,
      action: PayloadAction<Array<ParamHeaderPayloadInterface>>
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;

      state.formData[selectedTab] = action.payload;
    },
    handleSetBodyFormData: (
      state,
      action: PayloadAction<{
        id?: string;
        formData: Array<ParamInterface>;
      }>
    ) => {
      const { formData } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.formData[id] = formData;
    },
    /* ================ BodyFormData end =================== */

    /* ================ BodyXWWWFormUrlencoded start =================== */
    handleLoadBodyXWWWFormUrlencoded: (
      state,
      action: PayloadAction<Array<ParamHeaderPayloadInterface>>
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;

      state.xWWWFormUrlencodedData[selectedTab] = action.payload;
    },
    handleSetBodyXWWWFormUrlencoded: (
      state,
      action: PayloadAction<{
        id?: string;
        bodyXWWWFormUrlencoded: Array<ParamInterface>;
      }>
    ) => {
      const { bodyXWWWFormUrlencoded } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.xWWWFormUrlencodedData[id] = bodyXWWWFormUrlencoded;
    },
    /* ================ BodyXWWWFormUrlencoded end =================== */

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

    /* ================ BodyBinary start =================== */
    handleLoadBodyBinary: (
      state,
      action: PayloadAction<string | null | undefined>
    ) => {
      const payload = action.payload;
      const selectedTab = state.selectedTab;

      if (!selectedTab) return;

      state.binaryData[selectedTab] = payload ?? null;
    },
    /* ================ BodyBinary end =================== */

    /* ================ ReqestMetaTab start =================== */
    handleLoadReqestMetaTab: (
      state,
      action: PayloadAction<RequestTabInterface | undefined | null>
    ) => {
      const { activeMetaTab = "url", requestBodyType = "none" } =
        action.payload ?? {};
      const selectedTab = state.selectedTab;

      if (!selectedTab) return;

      if (state.activeMetaTab[selectedTab] !== activeMetaTab)
        state.activeMetaTab[selectedTab] = activeMetaTab;

      if (state.requestBodyType[selectedTab] !== requestBodyType)
        state.requestBodyType[selectedTab] = requestBodyType;
    },
    handleUpdateReqestMetaTab: (
      state,
      action: PayloadAction<Partial<RequestTabInterface>>
    ) => {
      const payload = action.payload ?? {};
      const selectedTab = state.selectedTab;

      if (!selectedTab) return;

      if (payload.activeMetaTab)
        state.activeMetaTab[selectedTab] = payload.activeMetaTab;

      if (payload.requestBodyType)
        state.requestBodyType[selectedTab] = payload.requestBodyType;
    },
    /* ================ ReqestMetaTab end =================== */

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
        ((size > RESPONSE_PANEL_MIN_LIMIT && !isResponseCollapsed) ||
          (size <= RESPONSE_PANEL_MIN_LIMIT && isResponseCollapsed))
      )
        return;

      state.isResponseCollapsed[id] = !state.isResponseCollapsed[id];
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

    handleChangeIsLoading: (
      state,
      action: PayloadAction<{
        id?: string;
        value: boolean;
      }>
    ) => {
      const { value } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.isLoading[id] = value;
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
    handleChangeAuthType: (
      state,
      action: PayloadAction<{
        id?: string;
        type: TAuthType;
      }>
    ) => {
      const { id = DEFAULT_AUTHORIZATION_ID, type } = action.payload;

      state.authType[id] = type;
    },

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

    /* ================ Request Folder start =================== */
    handleLoadFolder: (
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
      if (
        state.folderTitle[id] === undefined ||
        state.folderTitle[id] !== payload?.title
      )
        state.folderTitle[id] =
          payload?.title ?? state.folderTitle[id] ?? DEFAULT_FOLDER_TITLE;

      if (
        state.folderDescription[id] === undefined ||
        state.folderDescription[id] !== payload?.description
      )
        state.folderDescription[id] =
          payload?.description ??
          state.folderDescription[id] ??
          DEFAULT_FOLDER_DESCRIPTION;

      if (!state.folderDescriptionActiveTab[id])
        state.folderDescriptionActiveTab[id] = "markdown";

      state.loadedRequestList[id] = true;
    },
    handleUpdateFolder: (
      state,
      action: PayloadAction<{
        id?: string;
        payload?: Partial<ResponseFolderDataInterface>;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      const { payload } = action.payload;

      /**
       * If payload have that value then good else check if already loaded data or not if not then assign default value
       * **/
      if (
        typeof payload?.title === "string" &&
        state.folderTitle[id] !== payload?.title
      )
        state.folderTitle[id] = payload?.title ?? "";

      if (
        typeof payload?.description === "string" &&
        state.folderDescription[id] !== payload?.description
      )
        state.folderDescription[id] = payload?.description ?? "";
    },
    handleChangeFolderDescriptionActiveTab: (
      state,
      action: PayloadAction<{
        id?: string;
        value: TRequestFolderDescriptionTab;
      }>
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      if (state.folderDescriptionActiveTab[id] === action.payload.value) return;

      state.folderDescriptionActiveTab[id] = action.payload.value;
    },
    /* ================ Request Folder end =================== */
  },
  extraReducers(builder) {
    /* loadFolder */
    builder.addCase(loadFolder.pending, (state) => {
      if (!state.selectedTab) return;
      state.isLoadingFolder[state.selectedTab] = true;
    });
    builder.addCase(loadFolder.fulfilled, (state) => {
      if (!state.selectedTab) return;
      state.isLoadingFolder[state.selectedTab] = false;
    });
  },
});

export const selectRequestNameById =
  (id: string) => (state: RequestResponseState) =>
    state.requestList[id]?.name;

export const {
  handleLoadProjectsList,
  handleChangeActiveProject,

  handleLoadEnvironmentsList,

  handleAuthorizationsInheritedId,
  handleAuthorizations,

  handleLoadRequestList,
  handleChangeIsRequestListLoaded,
  handleToggleRequestList,
  handleUpdateRequestOrFolder,
  handleDeleteAllRequestOrFolder,
  handleChangeDeleteFolderOrRequestId,
  handleChangeCollapseAllRequestOrFolder,
  handleCreateSingleRequest,
  handleCreateRestApiBasic,

  handleChangeTabList,
  handleChangeIsTabListHovering,
  handleClearTabList,
  handleAddTab,
  handleRemoveTab,
  handleMoveTab,
  handleChangeSelectedTab,

  /* MetaShowColumn start =========== */
  handleLoadMetaShowColumn,
  handleSetMetaShowColumn,
  /* MetaShowColumn end =========== */

  /* ShowHiddenMetaData start =================== */
  handleSetShowHiddenMetaData,
  /* ShowHiddenMetaData end =================== */

  /* MetaBulkEdit start =========== */
  handleToggleMetaBulkEditOpen,
  /* MetaBulkEdit end =========== */

  /* params start =========== */
  handleLoadParams,
  /* params end =========== */

  /* headers start =========== */
  handleLoadHeaders,
  /* headers end =========== */

  handleToggleCollapse,
  handleUpdateRequestResponseSelectedTab,
  handleChangeActiveMetaTab,
  handleSetParams,
  handleSetHiddenParams,
  handleClearHiddenParams,
  handleSetHeaders,
  handleUpdateHiddenAuthorizationHeaders,
  handleClearHiddenAuthorizationHeaders,
  handleUpdateHiddenHeadersIsCheck,

  handleCheckToggleMetaData,

  handleLoadBodyFormData,
  handleSetBodyFormData,

  handleLoadBodyXWWWFormUrlencoded,
  handleSetBodyXWWWFormUrlencoded,

  handleLoadBodyRaw,
  handleLoadBodyBinary,
  handleLoadReqestMetaTab,
  handleUpdateReqestMetaTab,

  handleChangeIsLoading,
  handleSetResponse,

  handleSetFormData,
  handleSetXWWWFormUrlencodedData,
  handleChangeRawData,
  handleChangeRequestBodyType,
  handleChangeRawRequestBodyType,
  handleChangeAuthType,
  handleIsDownloadRequestWithBase64,
  handleClearRequestResponse,

  handleLoadFolder,
  handleUpdateFolder,
  handleChangeFolderDescriptionActiveTab,
} = requestResponseSlice.actions;

export default requestResponseSlice.reducer;
