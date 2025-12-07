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
  INITIAL_HIDDEN_HEADERS_DATA,
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
  FormDataPayloadInterface,
  TResponseDataTab,
  TResponseMetaTab,
  TBinaryData,
  HiddenHeadersCheckInterface,
} from "@shared/types/request-response.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type {
  APIKeyInterface,
  AuthorizationPayloadInterface,
  BasicAuthInterface,
  JWTBearerAuthInterface,
  TAuthType,
  TBearerToken,
} from "@shared/types/authorization.types";
import {
  DEFAULT_FOLDER_DESCRIPTION,
  DEFAULT_FOLDER_TITLE,
} from "@/constant/folder.constant";
import type { TRequestCodeType } from "@shared/types/code-snippit.types";

export interface RequestResponseState {
  codeSnippitType: TRequestCodeType | null;
  requestList: RequestListInterface;
  loadedRequestList: Record<string, boolean>;
  isRequestListLoaded: boolean;
  deleteFolderOrRequestId: string;
  requestListCollapsed: boolean;

  tabList: Array<string>;
  selectedTab: string | null /* selectedTabId in tabList */;
  isTabListCollapsed: boolean;

  isResponseCollapsed: Record<string, boolean>;
  activeMetaTab: Record<string, TActiveTabType>;

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
  showHiddenParams: Record<string, boolean>;
  headers: Record<string, Array<ParamInterface>>;
  hiddenCookie: ParamInterface;
  hiddenHeaders: Record<string, Array<ParamInterface>>;
  authorizationHeader: Record<string, ParamInterface>;
  authorizationParam: Record<string, ParamInterface>;
  showHiddenHeaders: Record<string, boolean>;
  binaryData: Record<string, TBinaryData>;
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

  activeResponseMetaTab: Record<string, TResponseMetaTab>;
  activeResponseDataTab: Record<string, TResponseDataTab>;
  responseCodeWrap: Record<string, boolean>;

  folderTitle: Record<string, string>;
  folderDescription: Record<string, string>;
  folderDescriptionActiveTab: Record<string, TRequestFolderDescriptionTab>;
  folderDescriptionLineWrap: Record<string, boolean>;
}

// Define the initial state using that type
const initialState: RequestResponseState = {
  codeSnippitType: null,

  requestList: {},
  loadedRequestList: {},
  isRequestListLoaded: false,
  deleteFolderOrRequestId: "",
  requestListCollapsed: false,

  tabList: [],
  selectedTab: null,
  isTabListCollapsed: false,

  isResponseCollapsed: {},
  activeMetaTab: {},

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
  showHiddenParams: {},
  headers: {},
  hiddenCookie: initialHiddenCookie(),
  hiddenHeaders: {},
  authorizationHeader: {},
  authorizationParam: {},
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

  activeResponseMetaTab: {},
  activeResponseDataTab: {},
  responseCodeWrap: {},

  folderTitle: {},
  folderDescription: {},
  folderDescriptionActiveTab: {},
  folderDescriptionLineWrap: {},
};

export const requestResponseSlice = createSlice({
  name: "request-response",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    /* =============== CodeSnippit reducers start ============= */
    handleChangeCodeSnippitType: (
      state,
      action: PayloadAction<TRequestCodeType | null>,
    ) => {
      if (state.codeSnippitType === action.payload) return;
      state.codeSnippitType = action.payload;
    },
    /* =============== CodeSnippit reducers end ============= */

    /* =============== Authorization reducers start ============= */
    handleAuthorizationsInheritedId: (
      state,
      action: PayloadAction<{
        requestId: string;
        inheritedId: string;
      }>,
    ) => {
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
      }>,
    ) => {
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
    handleAuthorizationsDefault: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      /* auth type start =========== */
      state.authType[id] = "inherit-parent";
      /* auth type end =========== */

      /* api key start =========== */
      state.apiKeyAuth[id] = {
        ...DEFAULT_API_KEY,
      };
      /* api key end =========== */

      /* bearer token start =========== */
      state.bearerTokenAuth[id] = "";
      /* bearer token end =========== */

      /* basic auth start =========== */
      state.basicAuth[id] = {
        ...DEFAULT_BASIC_AUTH,
      };
      /* basic auth end =========== */

      /* jwt auth start =========== */

      state.jwtBearerAuth[id] = {
        ...DEFAULT_JWT_BEARER_AUTH,
      };
      /* jwt auth end =========== */
    },
    /* =============== Authorization reducers end ============= */

    /* ================ Requestlist start =================== */
    handleLoadRequestList: (
      state,
      action: PayloadAction<RequestListInterface>,
    ) => {
      state.requestList = action.payload;
    },
    handleUpdateRequestOrFolderMeta: (
      state,
      action: PayloadAction<
        Partial<RequestListItemInterface> & Pick<RequestListItemInterface, "id">
      >,
    ) => {
      const id = action.payload.id;

      state.requestList[id] = {
        ...(state.requestList[id] ?? {}),
        ...action.payload,
      };
    },
    handleChangeIsRequestListLoaded: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.isRequestListLoaded = action.payload ?? !state.isRequestListLoaded;
    },
    handleToggleRequestList: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      if (action.payload === state.requestListCollapsed) return;

      state.requestListCollapsed =
        action.payload ?? !state.requestListCollapsed;
    },
    handleCreateSingleRequest: (
      state,
      action: PayloadAction<RequestListItemInterface>,
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
      action: PayloadAction<Array<RequestListItemInterface>>,
    ) => {
      const payload = (action.payload ?? [])?.reduce(
        (acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        },
        {} as Record<string, RequestListItemInterface>,
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
          action.payload[0].id,
        );
    },
    handleUpdateRequestOrFolder: (
      state,
      action: PayloadAction<RequestListItemUpdatePayloadInterface>,
    ) => {
      const { id } = action.payload;

      if (!state.requestList[id]) return;

      state.requestList[id] = {
        ...state.requestList[id],
        ...action.payload,
      };
    },
    handleDeleteAllRequestOrFolder: state => {
      state.requestList = {};
    },
    handleChangeDeleteFolderOrRequestId: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteFolderOrRequestId = action.payload;
    },
    handleChangeCollapseAllRequestOrFolder: state => {
      Object.keys(state.requestList).forEach(id => {
        state.requestList[id].isExpended = false;
      });
    },
    /* ================ Requestlist end =================== */

    /* ================ TabList start =================== */
    handleClearTabList: state => {
      state.tabList = [];
      state.selectedTab = null;
    },
    handleChangeTabList: (state, action: PayloadAction<Array<string>>) => {
      state.tabList = action.payload;
    },
    handleAddTab: (
      state,
      action: PayloadAction<{ id?: string; index?: number } | undefined>,
    ) => {
      const id = action.payload?.id ?? uuidv4();
      const index = action.payload?.index;

      /** prevent duplicates */
      if (state.tabList.includes(id)) return;

      let addIndex = state.tabList.length;

      /** if index is provided -> highest priority */
      if (typeof index === "number")
        addIndex = Math.max(0, Math.min(index, state.tabList.length));
      else {
        const selectedIdIndex = state.tabList.findIndex(
          tabId => tabId === state.selectedTab,
        );

        /** insert after selected tab if exists */
        if (selectedIdIndex >= 0) addIndex = selectedIdIndex + 1;
      }

      /** insert tab */
      state.tabList.splice(addIndex, 0, id);
    },

    handleRemoveTab: (state, action: PayloadAction<string | undefined>) => {
      const id = action.payload ?? state.selectedTab;
      if (!id) return;

      const idIndex = state.tabList.findIndex(tabId => tabId === id);
      const newTabList = state.tabList.filter(tabId => tabId !== id);
      state.tabList = newTabList;

      // If the removed tab isn't the selected one, no need to touch selectedTab
      if (id !== state.selectedTab) return;

      const nextSelectedTabIndex = Math.max(
        Math.min(idIndex, newTabList.length - 1),
        0,
      );

      // If no tabs left, set to null
      state.selectedTab =
        newTabList.length === 0 ? null : newTabList[nextSelectedTabIndex];
    },
    handleRemoveOtherTabs: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const id = action.payload ?? state.selectedTab;
      if (!id) return;

      state.tabList = state.tabList.filter(tabId => tabId === id);
    },
    handleRemoveAllRightTabs: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const id = action.payload ?? state.selectedTab;
      if (!id) return;

      const idIndex = state.tabList.findIndex(tabId => tabId === id);
      if (idIndex === -1) return;

      /* Keep LEFT + the selected one */
      state.tabList = state.tabList.slice(0, idIndex + 1);
    },
    handleRemoveAllLeftTabs: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const id = action.payload ?? state.selectedTab;
      if (!id) return;

      const idIndex = state.tabList.findIndex(tabId => tabId === id);
      if (idIndex === -1) return;

      /* Keep RIGHT */
      state.tabList = state.tabList.slice(idIndex);
    },
    handleMoveTab: (
      state,
      action: PayloadAction<{
        id: string;
        index?: number;
      }>,
    ) => {
      const { id, index } = action.payload;

      let tabList = state.tabList;

      const idIndex = tabList.findIndex(tabId => tabId === id);
      if (idIndex >= 0) tabList = tabList.filter(tabId => tabId !== id);

      tabList.splice(index ?? tabList.length, 0, id);
      state.tabList = [...tabList];
    },
    handleChangeSelectedTab: (
      state,
      action: PayloadAction<string | undefined | null>,
    ) => {
      const id = action.payload;

      if (!id) {
        state.selectedTab = null;
        return;
      }

      const newSelectedTabIndex = state.tabList.findIndex(
        tabId => tabId === id,
      );
      const oldSelectedTabIndex = state.tabList.findIndex(
        tabId => tabId === state.selectedTab,
      );

      /* if new selected tab index doesnt exist in tabList (in open tabs) then add it next to old selected tab if old exist else last */
      if (newSelectedTabIndex < 0) {
        const newTabList = state.tabList;
        newTabList.splice(
          oldSelectedTabIndex < 0
            ? state.tabList.length
            : oldSelectedTabIndex + 1,
          0,
          id,
        );
        state.tabList = newTabList;
      }

      state.selectedTab = id;
    },
    handleToggleTabListCollapse: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.isTabListCollapsed = action.payload ?? !state.isTabListCollapsed;
    },
    /* ================ TabsList end =================== */

    /* ================ MetaTable bulk start =================== */
    handleToggleMetaBulkEditOpen: state => {
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
      action: PayloadAction<MetaShowColumnInterface>,
    ) => {
      if (!state.selectedTab) return;

      state.metaShowColumn[state.selectedTab] = action.payload;
    },
    handleSetMetaShowColumn: (
      state,
      action: PayloadAction<{
        id?: string;
        payload: Partial<MetaShowColumnInterface>;
      }>,
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
      }>,
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
      }>,
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
      action: PayloadAction<
        Array<ParamHeaderPayloadInterface | ParamInterface>
      >,
    ) => {
      if (!state.selectedTab) return;

      state.params[state.selectedTab] = action.payload;
    },
    handleSetParams: (
      state,
      action: PayloadAction<{
        id?: string;
        params: Array<ParamInterface>;
      }>,
    ) => {
      const { params } = action.payload;
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      state.params[id] = params;
    },
    handleUpdateHiddenAuthorizationParams: (
      state,
      action: PayloadAction<{
        id?: string;
        key?: string;
        value: string;
      }>,
    ) => {
      const selectedTab = action.payload.id ?? state.selectedTab;
      if (!selectedTab) return;

      const value = action.payload.value;
      const key = action.payload.key ?? AUTHORIZATION_AUTH_HEADER_KEY;

      state.authorizationParam[selectedTab] = {
        ...INITIAL_HIDDEN_HEADER_AUTHORIZATION_DATA,
        key,
        value,
      };
    },
    handleClearHiddenAuthorizationParams: (
      state,
      action: PayloadAction<string>,
    ) => {
      const selectedTab = action.payload ?? state.selectedTab;
      if (!selectedTab) return;
      delete state.authorizationParam[selectedTab];
    },
    /* ================ Params end =================== */

    /* ================ Headers start =================== */
    handleLoadHeaders: (
      state,
      action: PayloadAction<Array<ParamHeaderPayloadInterface>>,
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;

      state.headers[selectedTab] = action.payload;

      if (!state.hiddenHeaders[selectedTab])
        state.hiddenHeaders[selectedTab] = INITIAL_HIDDEN_HEADERS_DATA;
    },
    handleSetHeaders: (
      state,
      action: PayloadAction<{
        id?: string;
        headers: Array<ParamInterface>;
      }>,
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
      }>,
    ) => {
      const selectedTab = action.payload.id ?? state.selectedTab;
      if (!selectedTab) return;

      const value = action.payload.value;
      const key = action.payload.key ?? AUTHORIZATION_AUTH_HEADER_KEY;

      state.authorizationHeader[selectedTab] = {
        ...INITIAL_HIDDEN_HEADER_AUTHORIZATION_DATA,
        key,
        value,
      };
    },
    handleClearHiddenAuthorizationHeaders: (
      state,
      action: PayloadAction<string>,
    ) => {
      const selectedTab = action.payload ?? state.selectedTab;
      if (!selectedTab) return;

      delete state.authorizationHeader[selectedTab];
    },
    handleUpdateHiddenHeadersIsCheck: (
      state,
      action: PayloadAction<{
        keyName: string;
      }>,
    ) => {
      const { keyName } = action.payload;
      const selectedTab = state.selectedTab;

      if (!selectedTab || !state.hiddenHeaders[selectedTab]) return;

      state.hiddenHeaders[selectedTab] = (
        state.hiddenHeaders[selectedTab] ?? []
      ).map((header: ParamInterface) => {
        if (header.id === keyName) header["isCheck"] = !header["isCheck"];

        return header;
      });
    },
    handleLoadHiddenHeadersIsCheck: (
      state,
      action: PayloadAction<HiddenHeadersCheckInterface>,
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab || !state.hiddenHeaders[selectedTab]) return;

      state.hiddenHeaders[selectedTab] = (
        state.hiddenHeaders[selectedTab] ?? []
      ).map((header: ParamInterface) => {
        if (header.id in action.payload)
          header["isCheck"] = action.payload[header.id];

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
      }>,
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
        targetList[requestId] = targetList[requestId].map(item => {
          if (item.id !== id) return item;
          return {
            ...item,
            hide: item.isCheck ? undefined : true,
          };
        });
      } else {
        const isAllChecked = Boolean(
          (targetList[requestId] ?? [])?.every(item => !item.isCheck),
        );

        targetList[requestId] = targetList[requestId].map(item => ({
          ...item,
          hide: isAllChecked ? true : undefined,
        }));
      }
    },
    /* ================ Metadata end =================== */

    /* ================ BodyFormData start =================== */
    handleLoadBodyFormData: (
      state,
      action: PayloadAction<Array<FormDataPayloadInterface>>,
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
      }>,
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
      action: PayloadAction<Array<ParamHeaderPayloadInterface>>,
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
      }>,
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
    handleClearBodyRaw: (state, action: PayloadAction<string | undefined>) => {
      const selectedTab = action.payload ?? state.selectedTab;
      if (!selectedTab) return;

      delete state.rawData[selectedTab];
    },
    /* ================ BodyRaw end =================== */

    /* ================ BodyBinary start =================== */
    handleLoadBodyBinary: (
      state,
      action: PayloadAction<
        | {
            path: string;
            file: string;
          }
        | null
        | undefined
      >,
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;

      if (!action.payload) {
        delete state.binaryData[selectedTab];
        return;
      }
      state.binaryData[selectedTab] = action.payload;
    },
    handleClearBodyBinary: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const selectedTab = action.payload ?? state.selectedTab;
      if (!selectedTab) return;
      delete state.binaryData[selectedTab];
    },
    /* ================ BodyBinary end =================== */

    /* ================ ReqestMetaTab start =================== */
    handleLoadReqestMetaTab: (
      state,
      action: PayloadAction<RequestTabInterface | undefined | null>,
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
    handleClearReqestMetaTab: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const selectedTab = action.payload ?? state.selectedTab;
      if (!selectedTab) return;
      delete state.activeMetaTab[selectedTab];
      delete state.requestBodyType[selectedTab];
    },
    handleUpdateReqestMetaTab: (
      state,
      action: PayloadAction<Partial<RequestTabInterface>>,
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
      >,
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
      action: PayloadAction<string | null>,
    ) => {
      state.selectedTab = action.payload;
    },
    handleChangeActiveMetaTab: (
      state,
      action: PayloadAction<{
        id?: string;
        type: TActiveTabType;
      }>,
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
      }>,
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
      }>,
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
      }>,
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
      }>,
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
      }>,
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
      }>,
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
      }>,
    ) => {
      const { id = DEFAULT_AUTHORIZATION_ID, type } = action.payload;

      state.authType[id] = type;
    },

    handleIsDownloadRequestWithBase64: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;

      state.isDownloadRequestWithBase64[selectedTab] = action.payload;
    },

    handleActiveResponseMetaTab: (
      state,
      action: PayloadAction<TResponseMetaTab | undefined>,
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;

      if (!action.payload) delete state.activeResponseMetaTab[selectedTab];
      else state.activeResponseMetaTab[selectedTab] = action.payload;
    },

    handleActiveResponseDataTab: (
      state,
      action: PayloadAction<TResponseDataTab>,
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;
      state.activeResponseDataTab[selectedTab] = action.payload;
    },

    handleToggleResponseCodeWrap: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      const selectedTab = state.selectedTab;
      if (!selectedTab) return;
      state.responseCodeWrap[selectedTab] =
        action.payload ?? !state.responseCodeWrap[selectedTab];
    },

    /* ================ Request Folder start =================== */
    handleLoadFolder: (
      state,
      action: PayloadAction<{
        id?: string;
        payload?: ResponseFolderDataInterface;
      }>,
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
      }>,
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
      }>,
    ) => {
      const id = action.payload.id ?? state.selectedTab;
      if (!id) return;

      if (state.folderDescriptionActiveTab[id] === action.payload.value) return;

      state.folderDescriptionActiveTab[id] = action.payload.value;
    },
    handleToggleFolderDescriptionLineWrap: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const id = action.payload ?? state.selectedTab;
      if (!id) return;

      state.folderDescriptionLineWrap[id] =
        !state.folderDescriptionLineWrap[id];
    },
    /* ================ Request Folder end =================== */

    handleClearRequestResponse: state => {
      state.codeSnippitType = null;

      state.requestList = {};
      state.loadedRequestList = {};
      state.isRequestListLoaded = false;
      state.deleteFolderOrRequestId = "";
      state.requestListCollapsed = false;

      state.tabList = [];

      state.selectedTab = null;
      state.isResponseCollapsed = {};
      state.activeMetaTab = {};

      state.metaShowColumn = {};
      state.paramsBulkEditOpen = {};
      state.headersBulkEditOpen = {};
      state.formDataBulkEditOpen = {};
      state.xWWWFormEncodedBulkEditOpen = {};

      state.rawData = {};
      state.rawDataLineWrap = {};
      state.response = {};
      state.isResposneError = {};
      state.requestBodyType = {};
      state.rawRequestBodyType = {};
      state.params = {};
      state.showHiddenParams = {};
      state.headers = {};
      state.hiddenCookie = initialHiddenCookie();
      state.hiddenHeaders = {};
      state.authorizationHeader = {};
      state.authorizationParam = {};
      state.showHiddenHeaders = {};
      state.binaryData = {};
      state.formData = {};
      state.xWWWFormUrlencodedData = {};
      state.isDownloadRequestWithBase64 = {};

      state.authType = {};
      state.authInheritedId = {};
      state.apiKeyAuth = {};
      state.basicAuth = {};
      state.bearerTokenAuth = {};
      state.jwtBearerAuth = {};

      state.activeResponseMetaTab = {};
      state.activeResponseDataTab = {};
      state.responseCodeWrap = {};

      state.folderTitle = {};
      state.folderDescription = {};
      state.folderDescriptionActiveTab = {};
      state.folderDescriptionLineWrap = {};
    },
  },
});

export const selectRequestNameById =
  (id: string) => (state: RequestResponseState) =>
    state.requestList[id]?.name;

export const {
  handleChangeCodeSnippitType,

  handleAuthorizationsInheritedId,
  handleAuthorizations,
  handleAuthorizationsDefault,

  handleLoadRequestList,
  handleUpdateRequestOrFolderMeta,
  handleChangeIsRequestListLoaded,
  handleToggleRequestList,
  handleUpdateRequestOrFolder,
  handleDeleteAllRequestOrFolder,
  handleChangeDeleteFolderOrRequestId,
  handleChangeCollapseAllRequestOrFolder,
  handleCreateSingleRequest,
  handleCreateRestApiBasic,

  handleChangeTabList,
  handleClearTabList,
  handleAddTab,
  handleRemoveTab,
  handleRemoveOtherTabs,
  handleRemoveAllRightTabs,
  handleRemoveAllLeftTabs,
  handleMoveTab,
  handleChangeSelectedTab,
  handleToggleTabListCollapse,

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
  handleUpdateHiddenAuthorizationParams,
  handleClearHiddenAuthorizationParams,
  handleSetHeaders,
  handleUpdateHiddenAuthorizationHeaders,
  handleClearHiddenAuthorizationHeaders,
  handleUpdateHiddenHeadersIsCheck,
  handleLoadHiddenHeadersIsCheck,

  handleCheckToggleMetaData,

  handleLoadBodyFormData,
  handleSetBodyFormData,

  handleLoadBodyXWWWFormUrlencoded,
  handleSetBodyXWWWFormUrlencoded,

  handleLoadBodyRaw,
  handleClearBodyRaw,
  handleLoadBodyBinary,
  handleClearBodyBinary,
  handleLoadReqestMetaTab,
  handleClearReqestMetaTab,
  handleUpdateReqestMetaTab,

  handleSetResponse,

  handleSetFormData,
  handleSetXWWWFormUrlencodedData,
  handleChangeRawData,
  handleChangeRequestBodyType,
  handleChangeRawRequestBodyType,
  handleChangeAuthType,
  handleIsDownloadRequestWithBase64,

  handleActiveResponseMetaTab,
  handleActiveResponseDataTab,
  handleToggleResponseCodeWrap,

  handleLoadFolder,
  handleUpdateFolder,
  handleChangeFolderDescriptionActiveTab,
  handleToggleFolderDescriptionLineWrap,
  handleClearRequestResponse,
} = requestResponseSlice.actions;

export default requestResponseSlice.reducer;
