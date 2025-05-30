import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  base64ToFileObject,
  converterFileToMetadata,
  ensureAbsoluteUrl,
  getPayloadSize,
  parseUrlParams,
  requestDataSize,
  sendRequest,
} from "@/utils";
import statusData from "@/data/http_status_details.json";
import type { TMetaTableType } from "@/context/request/RequestMetaTableProvider";
import type { TAuthType, TContentType } from "@/types";
import { isElectron } from "@/utils/electron";
import { useAppSelector } from "@/context/redux/hooks";

const generateNewMetaDataItem = (type?: TMetaTableType) => ({
  id: uuidv4(),
  key: "",
  value: "",
  contentType: type !== "form-data" ? undefined : "",
  description: "",
});

export type TActiveTabType = "params" | "headers" | "body" | "authorization";

export type TRequestBodyType =
  | "none"
  | "form-data"
  | "x-www-form-urlencoded"
  | "raw"
  | "binary";

export type THTTPMethods = "get" | "post" | "put" | "patch" | "delete";

export interface ParamInterface<ValueT = string> {
  id: string;
  key: string;
  value: ValueT;
  description?: string;
  hide?: boolean;
  prevent?: boolean;
  calculateDynamicly?: boolean;
}
export interface FormDataInterface
  extends ParamInterface<string | Array<File>> {
  contentType?: string;
}

export interface CookieInterface {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
  HttpOnly?: boolean;
  secure?: boolean;
  samesite?: string;
}

export interface ResponseInterface {
  data: unknown;
  headers: Record<string, unknown>;
  cookies?: Array<CookieInterface>;
  status: number;
  statusText: string;
  statusDescription?: string;
}

interface RequestResponseSizeInterface {
  header: number;
  body: number;
}

export interface FileMetadataInterface {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  fileName: string;
  mimeType: string;
  base64?: string;
}

interface FormDataFileMetadataInterface
  extends Omit<FormDataInterface, "value"> {
  value: Array<FileMetadataInterface> | string;
}

export interface ResponseFileDataInterface {
  name: string;
  url: string;
  method: THTTPMethods;
  params: Array<ParamInterface>;
  headers: Array<ParamInterface>;
  authorization: {
    type: TAuthType;
    data?:
      | BasicAuthInterface
      | TBearerToken
      | JWTBearerAuthInterface
      | APIKeyInterface;
  };
  body: {
    selected: TRequestBodyType;
    rawData: string;
    formData: Array<FormDataFileMetadataInterface>;
    xWWWFormUrlencodedData: Array<ParamInterface>;
    binaryData: FileMetadataInterface | null;
    rawRequestBodyType: TContentType;
  };
  response: ResponseInterface | null;
  size: {
    requestSize: RequestResponseSizeInterface;
    responseSize: RequestResponseSizeInterface;
  };
}

export interface APIPayloadBody {
  method: THTTPMethods;
  url: string;
  headers: Record<string, string>;
  hiddenHeaders: Record<string, string>;
  bodyType: TRequestBodyType;
  formData?: Array<{
    key: string;
    value: string | Array<File>;
  }>;
  xWWWformDataUrlencoded?: Array<{
    key: string;
    value: string;
  }>;
  rawData?: string;
  binaryData?: File;
  rawSubType?: TContentType;
}

export interface StatusDataInterface {
  [key: string]: {
    reason: string;
    description: string;
  };
}

export interface APIKeyInterface {
  key: string;
  value: string;
  addTo: "header" | "query";
}
export type TBearerToken = string;
export interface BasicAuthInterface {
  username: string;
  password: string;
}
export interface JWTBearerAuthInterface {
  algo: string;
  secret: string;
  payload: string;
  headerPrefix: string;
  addTo: "header" | "query";
}

interface RequestResponseContext {
  selectedTab: string;
  isResponseCollapsed: Record<string, boolean>;
  handleToggleCollapse: (size?: number) => void;
  requestName: Record<string, string>;
  handleChangeRequestName: (name: string) => void;
  handleClearRequestResponse: () => void;
  authType: Record<string, TAuthType>;
  handleChangeAuthType: (authType: TAuthType) => void;
  apiKeyAuth: Record<string, APIKeyInterface>;
  handleChangeAPIKey: (key: "key" | "value" | "addTo", value: string) => void;
  basicAuth: Record<string, BasicAuthInterface>;
  handleChangeBasicAuth: (key: "username" | "password", value: string) => void;
  bearerTokenAuth: Record<string, string>;
  handleChangeBearerTokenAuth: (token: string) => void;
  jwtBearerAuth: Record<string, JWTBearerAuthInterface>;
  handleChangeJWTBearerAuth: (
    key: "algo" | "secret" | "payload" | "headerPrefix" | "addTo",
    value: string
  ) => void;
  isDownloadRequestWithBase64: Record<string, boolean>;
  handleIsDownloadRequestWithBase64: (value: boolean) => void;
  handleDownloadRequest: () => Promise<void>;
  handleImportRequest: (
    file: File,
    cb?: (message: string) => void
  ) => Promise<void>;
  activeMetaTab: Record<string, TActiveTabType>;
  handleChangeActiveMetaTab: (id: TActiveTabType) => void;
  selectedMethod: Record<string, string>;
  handleChangeSelectedMethod: (id: THTTPMethods) => void;
  requestBodyType: Record<string, TRequestBodyType>;
  handleChangeRequestBodyType: (id: TRequestBodyType) => void;
  rawRequestBodyType: Record<string, TContentType>;
  handleChangeRawRequestBodyType: (id: TContentType) => void;
  apiUrl: Record<string, string>;
  handleChangeApiUrl: (api: string) => void;
  response: Record<string, ResponseInterface | null>;
  isApiUrlError: Record<string, boolean>;
  handleIsInputError: (value: boolean) => void;
  handleRequestSend: () => void;
  isResposneError: Record<string, boolean>;
  isLoading: Record<string, boolean>;
  requestSize: Record<string, RequestResponseSizeInterface>;
  responseSize: Record<string, RequestResponseSizeInterface>;

  rawData: Record<string, string>;
  handleChangeRawData: (value: string) => void;

  params: Record<string, Array<ParamInterface>>;
  handleChangeParam: (id: string, key: string, value: string) => void;
  handleDeleteParam: (id: string) => void;
  handleAddNewParam: () => void;
  handleParamCheckToggle: (id?: string) => void;

  hiddenParams: Record<string, Array<ParamInterface>>;

  headers: Record<string, Array<ParamInterface>>;
  handleChangeHeader: (id: string, key: string, value: string) => void;
  handleDeleteHeader: (id: string) => void;
  handleAddNewHeader: () => void;
  handleHeaderCheckToggle: (id?: string) => void;

  hiddenHeaders: Record<string, Array<ParamInterface>>;
  handleChangeHiddenHeader: (id: string, key: string, value: string) => void;
  handleHiddenHeaderCheckToggle: (id?: string) => void;

  formData: Record<string, Array<FormDataInterface>>;
  handleChangeFormData: (id: string, key: string, value: File | string) => void;
  handleDeleteFormData: (id: string) => void;
  handleAddNewFormData: () => void;
  handleFormDataCheckToggle: (id?: string) => void;

  xWWWFormUrlencodedData: Record<string, Array<ParamInterface>>;
  handleChangeXWWWFormEncoded: (id: string, key: string, value: string) => void;
  handleDeleteXWWWFormEncoded: (id: string) => void;
  handleAddNewXWWWFormEncoded: () => void;
  handleXWWWFormEncodedCheckToggle: (id?: string) => void;
  handleRemoveAllMetaData: (type: TMetaTableType) => void;
  handleRemoveFormDataFile: (id: string, index: number) => void;

  binaryData: Record<string, File | null>;
  handleChangeBinaryData: (file?: File | null) => void;

  activeTabList: Partial<Record<TActiveTabType, boolean>>;
}

const RequestResponseContext = createContext<RequestResponseContext | null>(
  null
);

const handleCheckImportedRequestFileValidator = (
  data: ResponseFileDataInterface
): boolean => {
  // Basic checks
  if ([data.name, data.url].some((v) => typeof v === "undefined")) return false;
  if (!["get", "post", "put", "patch", "delete"].includes(data.method))
    return false;
  if (!data.body || !data.body.selected) return false;

  // Validate params
  if (
    data.params &&
    !data.params.every(
      (v) =>
        typeof v === "object" &&
        "id" in v &&
        "key" in v &&
        "value" in v &&
        "description" in v
    )
  )
    return false;

  // Validate headers
  if (
    data.headers &&
    !data.headers.every(
      (v) =>
        typeof v === "object" &&
        "id" in v &&
        "value" in v &&
        "key" in v &&
        "description" in v
    )
  )
    return false;

  // Validate formData
  if (
    data.body.formData &&
    !data.body.formData.every((formDataItem) => {
      const isStringValue = typeof formDataItem.value === "string";
      const isFileArray =
        Array.isArray(formDataItem.value) &&
        formDataItem.value.every(
          (file) =>
            file &&
            typeof file.name === "string" &&
            typeof file.size === "number" &&
            typeof file.type === "string" &&
            typeof file.lastModified === "number" &&
            typeof file.fileName === "string" &&
            typeof file.mimeType === "string" &&
            (typeof file.base64 === "string" ||
              typeof file.base64 === "undefined")
        );

      return (
        typeof formDataItem === "object" &&
        "id" in formDataItem &&
        "key" in formDataItem &&
        "value" in formDataItem &&
        (isStringValue || isFileArray) &&
        (typeof formDataItem.description === "undefined" ||
          typeof formDataItem.description === "string")
      );
    })
  )
    return false;

  // Validate binaryData
  if (
    data.body.binaryData &&
    !(
      typeof data.body.binaryData === "object" &&
      typeof data.body.binaryData.name === "string" &&
      typeof data.body.binaryData.size === "number" &&
      typeof data.body.binaryData.type === "string" &&
      typeof data.body.binaryData.lastModified === "number" &&
      typeof data.body.binaryData.fileName === "string" &&
      typeof data.body.binaryData.mimeType === "string" &&
      (typeof data.body.binaryData.base64 === "string" ||
        typeof data.body.binaryData.base64 === "undefined")
    )
  )
    return false;

  // Everything passed
  return true;
};

/* eslint-disable react-refresh/only-export-components */
export const useRequestResponse = () => {
  const context = useContext(RequestResponseContext);

  if (!context) {
    throw new Error(
      "useRequestResponse must be used within a RequestResponseProvider."
    );
  }

  return context;
};

const fetchApiAndExtractData = async (payload: APIPayloadBody) => {
  if (isElectron()) {
    const res = await window.electronAPI?.fetchApi(payload);
    return res;
  }
  try {
    const res = await sendRequest(payload);

    return {
      headers: res.headers,
      status: res.status,
      statusText: res.statusText,
      data: res.data,
    };
  } catch (error) {
    return fetchApiUniformError(error);
  }
};

export const fetchApiUniformError = (error: unknown): ResponseInterface => {
  // console.log("error", error);
  if (axios.isAxiosError(error) && error.response) {
    return {
      data: error.response.data,
      headers: error.response.headers,
      status: error.response.status,
      statusText: error.response.statusText,
      statusDescription: "",
    };
  } else {
    return {
      data: null,
      headers: {},
      status: 0,
      statusText: "Network Error",
      statusDescription:
        "Could not connect to the server. Check your internet or API URL.",
    };
  }
};

export const getCookiesByDomain = async (url: string) => {
  return await window.electronAPI.getCookieByDomain(url);
};

export const getCookiesStringByDomain = async (url: string) => {
  return await window.electronAPI.getCookieStringByDomain(url);
};

const generateNextHiddenHeaderOrParam = () => {
  return {
    id: uuidv4(),
    key: "",
    value: "",
    description: "",
    prevent: true,
  };
};

export const AuthTypeList = [
  "no-auth",
  "basic-auth",
  "bearer-token",
  "jwt-bearer",
  "api-key",
];

export const localStorageRequestActiveTabKey = (requestId: string) =>
  `request-active-tab-${requestId}`;

const getRestOfAuthType = (excludes?: string | Array<string>) => {
  if (!excludes) return AuthTypeList;

  return AuthTypeList.filter(
    (item) => !(Array.isArray(excludes) ? excludes : [excludes]).includes(item)
  );
};

export const ResponsePanelMinLimit = 15;

export const defaultRequestResponseSize = {
  header: 0,
  body: 0,
};

export const defaultApiKey: APIKeyInterface = {
  key: "",
  value: "",
  addTo: "header",
};

export const defaultBasicAuth: BasicAuthInterface = {
  username: "",
  password: "",
};
export const defaultJWTBearerAuth: JWTBearerAuthInterface = {
  algo: "HS256",
  secret: "",
  payload: JSON.stringify({}),
  headerPrefix: "Bearer",
  addTo: "header",
};

const initialHiddenHeaderData = () => [
  {
    id: uuidv4(),
    key: "Cookie",
    value: "",
    description: "",
    prevent: true,
    calculateDynamicly: true,
  },
  {
    id: uuidv4(),
    key: "User-Agent",
    value: `${import.meta.env.VITE_APP_NAME}/${import.meta.env.VITE_APP_VERSION}`,
    description: "",
    prevent: true,
  },
  {
    id: uuidv4(),
    key: "Accept",
    value: "*/*",
    description: "",
    prevent: true,
  },
  {
    id: uuidv4(),
    key: "Connection",
    value: "keep-alive",
    description: "",
    prevent: true,
  },
];

const setStatekeyValue = <T,>(
  setState: React.Dispatch<React.SetStateAction<Record<string, T>>>,
  key: string,
  value: T | ((prev: Record<string, T>) => T)
) => {
  if (!key) return;

  return setState((prev) => ({
    ...prev,
    [key]:
      typeof value === "function"
        ? (value as (prev: Record<string, T>) => T)(prev)
        : value,
  }));
};

const useMetaDataManager = <
  T extends { id: string; hide?: boolean; value: unknown },
>(
  setState: React.Dispatch<React.SetStateAction<Record<string, Array<T>>>>,
  generateNewItem: () => T
) => {
  const handleChange = useCallback(
    (requestId: string | null, id: string, key: string, value: unknown) => {
      if (!requestId) return;

      setState((prev) => ({
        ...prev,
        [requestId]: (prev[requestId] ?? []).map((item) => {
          if (item.id !== id) return item;

          if (value instanceof File) {
            const existingFiles = (
              Array.isArray(item[key as keyof T]) ? item[key as keyof T] : []
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
        }),
      }));
    },
    [setState]
  );

  const handleDelete = useCallback(
    (requestId: string | null, id: string) => {
      if (!requestId) return;

      setState((prev) => ({
        ...prev,
        [requestId]: prev[requestId]?.filter((item) => item.id !== id),
      }));
    },
    [setState]
  );

  const handleAdd = useCallback(
    (requestId: string | null) => {
      if (!requestId) return;

      setState((prev) => ({
        ...prev,
        [requestId]: [...(prev[requestId] ?? []), generateNewItem()],
      }));
    },
    [setState, generateNewItem]
  );

  const handleCheckToggle = useCallback(
    (requestId: string | null, id?: string) => {
      if (!requestId) return;

      if (id) {
        setState((prev) => ({
          ...prev,
          [requestId]: (prev[requestId] ?? []).map((item) => {
            if (item.id !== id) return item;
            return {
              ...item,
              hide: item.hide ? undefined : true,
            };
          }),
        }));
      } else {
        setState((prev) => {
          const isAllChecked = Boolean(
            (prev[requestId] ?? [])?.every((item) => !item.hide)
          );

          return {
            ...prev,
            [requestId]: (prev[requestId] ?? []).map((item) => ({
              ...item,
              hide: isAllChecked ? true : undefined,
            })),
          };
        });
      }
    },
    [setState]
  );

  return {
    handleChange,
    handleDelete,
    handleAdd,
    handleCheckToggle,
  };
};

interface RequestResponseProviderProps {
  children: React.ReactNode;
}

const RequestResponseProvider = ({
  children,
}: RequestResponseProviderProps) => {
  const selectedTab = useAppSelector((state) => state.tabSidebar.selectedTab);
  const [requestName, setRequestname] = useState<Record<string, string>>({});
  const [isResponseCollapsed, setIsResponseCollapsed] = useState<
    Record<string, boolean>
  >({});
  const [activeMetaTab, setActiveMetaTab] = useState<
    Record<string, TActiveTabType>
  >({});
  const [selectedMethod, setSelectedMethod] = useState<
    Record<string, THTTPMethods>
  >({});
  const [isApiUrlError, setIsApiUrlError] = useState<Record<string, boolean>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [apiUrl, setApiUrl] = useState<Record<string, string>>({});
  const [rawData, setRawData] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<
    Record<string, ResponseInterface | null>
  >({});
  const [requestSize, setRequestSize] = useState<
    Record<string, RequestResponseSizeInterface>
  >({});
  const [responseSize, setResponseSize] = useState<
    Record<string, RequestResponseSizeInterface>
  >({});
  const [isResposneError, setIsResposneError] = useState<
    Record<string, boolean>
  >({});
  const [requestBodyType, setRequestBodyType] = useState<
    Record<string, TRequestBodyType>
  >({});
  const [rawRequestBodyType, setRawRequestBodyType] = useState<
    Record<string, TContentType>
  >({});

  const [params, setParams] = useState<Record<string, Array<ParamInterface>>>(
    {}
  );
  const [hiddenParams, setHiddenParams] = useState<
    Record<string, Array<ParamInterface>>
  >({});

  const [headers, setHeaders] = useState<Record<string, Array<ParamInterface>>>(
    {}
  );
  const [hiddenHeaders, setHiddenHeaders] = useState<
    Record<string, Array<ParamInterface>>
  >(
    {}
    // initialHiddenHeaderData()
  );
  const [binaryData, setBinaryData] = useState<Record<string, File | null>>({});
  const [formData, setFormData] = useState<
    Record<string, Array<FormDataInterface>>
  >({});
  const [xWWWFormUrlencodedData, setXWWWFormUrlencodedData] = useState<
    Record<string, Array<ParamInterface>>
  >({});

  const [isDownloadRequestWithBase64, setIsDownloadRequestWithBase64] =
    useState<Record<string, boolean>>({});

  const [requestIdShouldFetch, setRequestIdShouldFetch] = useState<string>("");

  const [authType, setAuthType] = useState<Record<string, TAuthType>>({});
  const [apiKeyAuth, setApiKeyAuth] = useState<Record<string, APIKeyInterface>>(
    {}
  );

  /**
   * convert
   * const token = btoa(`${username}:${password}`);
   * headers["Authorization"] = `Basic ${token}`;
   * when to request the API
   */
  const [basicAuth, setBasicAuth] = useState<
    Record<string, BasicAuthInterface>
  >({});

  /**
   * convert
   * Authorization: `Bearer ${bearerToken}`
   * when to request the API
   */
  const [bearerTokenAuth, setBearerTokenAuth] = useState<
    Record<string, TBearerToken>
  >({});

  /**
   * convert
   * Authorization: `Bearer ${bearerToken}`
   * based on the data
   * when to request the API
   */
  const [jwtBearerAuth, setJwtBearerAuth] = useState<
    Record<string, JWTBearerAuthInterface>
  >({});

  const previousFinalUrlRef = useRef<Record<string, string>>({});

  /* params =========== */
  const pamrasMetaDataManager = useMetaDataManager<ParamInterface>(
    setParams,
    generateNewMetaDataItem
  );
  const handleChangeParam = (id: string, key: string, value: string) =>
    pamrasMetaDataManager.handleChange(selectedTab, id, key, value);
  const handleDeleteParam = (id: string) =>
    pamrasMetaDataManager.handleDelete(selectedTab, id);
  const handleAddNewParam = () => pamrasMetaDataManager.handleAdd(selectedTab);
  const handleParamCheckToggle = (id?: string) =>
    pamrasMetaDataManager.handleCheckToggle(selectedTab, id);

  /* header =========== */
  const headersMetaDataManager = useMetaDataManager<ParamInterface>(
    setHeaders,
    generateNewMetaDataItem
  );
  const handleChangeHeader = (id: string, key: string, value: string) =>
    headersMetaDataManager.handleChange(selectedTab, id, key, value);
  const handleDeleteHeader = (id: string) =>
    headersMetaDataManager.handleDelete(selectedTab, id);
  const handleAddNewHeader = () =>
    headersMetaDataManager.handleAdd(selectedTab);
  const handleHeaderCheckToggle = (id?: string) =>
    headersMetaDataManager.handleCheckToggle(selectedTab, id);

  /* hidden header =========== */
  const hiddenHeadersMetaDataManager = useMetaDataManager<ParamInterface>(
    setHiddenHeaders,
    generateNewMetaDataItem
  );
  const handleChangeHiddenHeader = (id: string, key: string, value: string) =>
    hiddenHeadersMetaDataManager.handleChange(selectedTab, id, key, value);
  const handleHiddenHeaderCheckToggle = (id?: string) =>
    hiddenHeadersMetaDataManager.handleCheckToggle(selectedTab, id);

  /* form data =========== */
  const formDataMetaDataManager = useMetaDataManager<FormDataInterface>(
    setFormData,
    () => generateNewMetaDataItem("form-data")
  );
  const handleChangeFormData = (
    id: string,
    key: string,
    value: string | File
  ) => formDataMetaDataManager.handleChange(selectedTab, id, key, value);
  const handleDeleteFormData = (id: string) =>
    formDataMetaDataManager.handleDelete(selectedTab, id);
  const handleAddNewFormData = () =>
    formDataMetaDataManager.handleAdd(selectedTab);
  const handleFormDataCheckToggle = (id?: string) =>
    formDataMetaDataManager.handleCheckToggle(selectedTab, id);

  /* xWWW Form UrlencodedData =========== */
  const xWWWFormUrlencodedDataMetaDataManager =
    useMetaDataManager<ParamInterface>(
      setXWWWFormUrlencodedData,
      generateNewMetaDataItem
    );
  const handleChangeXWWWFormEncoded = (
    id: string,
    key: string,
    value: string
  ) =>
    xWWWFormUrlencodedDataMetaDataManager.handleChange(
      selectedTab,
      id,
      key,
      value
    );
  const handleDeleteXWWWFormEncoded = (id: string) =>
    xWWWFormUrlencodedDataMetaDataManager.handleDelete(selectedTab, id);
  const handleAddNewXWWWFormEncoded = () =>
    xWWWFormUrlencodedDataMetaDataManager.handleAdd(selectedTab);
  const handleXWWWFormEncodedCheckToggle = (id?: string) =>
    xWWWFormUrlencodedDataMetaDataManager.handleCheckToggle(selectedTab, id);

  const handleToggleCollapse = useCallback(
    (size?: number) => {
      if (!selectedTab) return;

      if (
        size !== undefined &&
        ((size > ResponsePanelMinLimit && !isResponseCollapsed) ||
          (size <= ResponsePanelMinLimit && isResponseCollapsed))
      )
        return;

      setIsResponseCollapsed((prev) => ({
        ...prev,
        [selectedTab]: !prev[selectedTab],
      }));
    },
    [isResponseCollapsed, selectedTab]
  );

  const handleChangeRequestName = useCallback(
    (name: string) => {
      if (!selectedTab) return;
      setStatekeyValue<string>(setRequestname, selectedTab, name);
    },
    [selectedTab]
  );

  const handleClearRequestResponse = useCallback(() => {
    if (!selectedTab) return;

    setStatekeyValue<boolean>(setIsLoading, selectedTab, false);
    setStatekeyValue<boolean>(setIsApiUrlError, selectedTab, false);
    setStatekeyValue<boolean>(setIsResposneError, selectedTab, false);
    setStatekeyValue<THTTPMethods>(setSelectedMethod, selectedTab, "get");
    setStatekeyValue<string>(setApiUrl, selectedTab, "");
    setStatekeyValue<Array<ParamInterface>>(setParams, selectedTab, []);
    setStatekeyValue<Array<ParamInterface>>(setHeaders, selectedTab, []);
    setStatekeyValue<TAuthType>(setAuthType, selectedTab, "no-auth");
    setStatekeyValue<BasicAuthInterface>(
      setBasicAuth,
      selectedTab,
      defaultBasicAuth
    );
    setStatekeyValue<string>(setBearerTokenAuth, selectedTab, "");
    setStatekeyValue<JWTBearerAuthInterface>(
      setJwtBearerAuth,
      selectedTab,
      defaultJWTBearerAuth
    );
    setStatekeyValue<APIKeyInterface>(
      setApiKeyAuth,
      selectedTab,
      defaultApiKey
    );
    setStatekeyValue<TRequestBodyType>(setRequestBodyType, selectedTab, "none");
    setStatekeyValue<string>(setRawData, selectedTab, "");
    setStatekeyValue<TContentType>(setRawRequestBodyType, selectedTab, "json");
    setStatekeyValue<Array<FormDataInterface>>(setFormData, selectedTab, []);
    setStatekeyValue<File | null>(setBinaryData, selectedTab, null);
    setStatekeyValue<Array<ParamInterface>>(
      setXWWWFormUrlencodedData,
      selectedTab,
      []
    );
    setStatekeyValue<ResponseInterface | null>(setResponse, selectedTab, null);
    setStatekeyValue<RequestResponseSizeInterface>(
      setRequestSize,
      selectedTab,
      defaultRequestResponseSize
    );
    setStatekeyValue<RequestResponseSizeInterface>(
      setResponseSize,
      selectedTab,
      defaultRequestResponseSize
    );
    setStatekeyValue<Array<ParamInterface>>(setHiddenParams, selectedTab, []);
    setStatekeyValue<Array<ParamInterface>>(
      setHiddenHeaders,
      selectedTab,
      initialHiddenHeaderData()
    );
  }, [selectedTab]);

  const handleChangeAuthType = useCallback(
    (authType: TAuthType) => {
      if (!selectedTab) return;
      setStatekeyValue<TAuthType>(setAuthType, selectedTab, authType);
    },
    [selectedTab]
  );

  const handleChangeAPIKey = useCallback(
    (key: "key" | "value" | "addTo", value: string) => {
      if (!selectedTab) return;
      setStatekeyValue<APIKeyInterface>(setApiKeyAuth, selectedTab, (prev) => ({
        ...prev[selectedTab],
        [key]: value,
      }));
    },
    [selectedTab]
  );

  const handleChangeBasicAuth = useCallback(
    (key: "username" | "password", value: string) => {
      if (!selectedTab) return;
      setStatekeyValue<BasicAuthInterface>(
        setBasicAuth,
        selectedTab,
        (prev) => ({
          ...prev[selectedTab],
          [key]: value,
        })
      );
    },
    [selectedTab]
  );

  const handleChangeBearerTokenAuth = useCallback(
    (token: string) => {
      if (!selectedTab) return;
      setStatekeyValue<string>(setBearerTokenAuth, selectedTab, token);
    },
    [selectedTab]
  );

  const handleChangeJWTBearerAuth = useCallback(
    (
      key: "algo" | "secret" | "payload" | "headerPrefix" | "addTo",
      value: string
    ) => {
      if (!selectedTab) return;
      setStatekeyValue<JWTBearerAuthInterface>(
        setJwtBearerAuth,
        selectedTab,
        (prev) => ({
          ...prev[selectedTab],
          [key]: value,
        })
      );
    },
    [selectedTab]
  );

  const handleIsDownloadRequestWithBase64 = useCallback(
    (value: boolean) => {
      if (!selectedTab) return;
      setStatekeyValue<boolean>(
        setIsDownloadRequestWithBase64,
        selectedTab,
        value
      );
    },
    [selectedTab]
  );

  const handleDownloadRequest = useCallback(async () => {
    if (!selectedTab) return;

    const formDataWithMetadata: Array<FormDataFileMetadataInterface> =
      await Promise.all(
        (formData[selectedTab] ?? []).map(async (data) => {
          let value: Array<FileMetadataInterface> | string = "";
          if (
            Array.isArray(data.value) &&
            data.value.every((v) => v instanceof File)
          ) {
            value = await Promise.all(
              data.value.map((file) =>
                converterFileToMetadata(
                  file,
                  isDownloadRequestWithBase64[selectedTab]
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
      authType[selectedTab] === "api-key"
        ? apiKeyAuth[selectedTab]
        : authType[selectedTab] === "basic-auth"
          ? basicAuth[selectedTab]
          : authType[selectedTab] === "bearer-token"
            ? bearerTokenAuth[selectedTab]
            : authType[selectedTab] === "jwt-bearer"
              ? jwtBearerAuth[selectedTab]
              : undefined;

    const downloadData: ResponseFileDataInterface = {
      name: requestName[selectedTab],
      url: apiUrl[selectedTab],
      method: selectedMethod[selectedTab],
      params: params[selectedTab],
      headers: headers[selectedTab],
      authorization: {
        type: authType[selectedTab],
        data: authorizationData,
      },
      body: {
        selected: requestBodyType[selectedTab],
        rawData: rawData[selectedTab],
        formData: formDataWithMetadata,
        xWWWFormUrlencodedData: xWWWFormUrlencodedData[selectedTab],
        binaryData:
          binaryData[selectedTab] &&
          (await converterFileToMetadata(
            binaryData[selectedTab],
            isDownloadRequestWithBase64[selectedTab]
          )),
        rawRequestBodyType: rawRequestBodyType[selectedTab],
      },
      response: response[selectedTab],
      size: {
        requestSize: requestSize[selectedTab],
        responseSize: responseSize[selectedTab],
      },
    };

    const blob = new Blob([JSON.stringify(downloadData)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${requestName || "request"}.json`;
    link.click();

    URL.revokeObjectURL(url);
  }, [
    selectedTab,
    formData,
    authType,
    apiKeyAuth,
    basicAuth,
    bearerTokenAuth,
    jwtBearerAuth,
    requestName,
    apiUrl,
    selectedMethod,
    params,
    headers,
    requestBodyType,
    rawData,
    xWWWFormUrlencodedData,
    binaryData,
    isDownloadRequestWithBase64,
    rawRequestBodyType,
    response,
    requestSize,
    responseSize,
  ]);

  const handleImportRequest = useCallback(
    async (file: File, cb?: (message: string) => void) => {
      if (!selectedTab) return;

      try {
        const text = await file.text();
        const jsonData: ResponseFileDataInterface = JSON.parse(text);

        if (!handleCheckImportedRequestFileValidator(jsonData))
          throw new Error("File json are not valid");

        const formData: Array<FormDataInterface> = jsonData.body.formData.map(
          (data): FormDataInterface => {
            if (typeof data.value === "string")
              return data as FormDataInterface;

            if (Array.isArray(data.value)) {
              if (data.value.some((v) => !v.base64)) {
                return {
                  ...data,
                  value: "",
                };
              }

              const files = data.value.map((file) =>
                base64ToFileObject(file.base64!, file.fileName, file.mimeType)
              );

              return {
                ...data,
                value: files,
              };
            }

            return {
              ...data,
              value: "",
            };
          }
        );

        const binaryData = jsonData.body.binaryData?.base64
          ? base64ToFileObject(
              jsonData.body.binaryData?.base64,
              jsonData.body.binaryData?.fileName,
              jsonData.body.binaryData?.mimeType
            )
          : null;

        const authorizationType = jsonData.authorization.type;
        const authorizationData = jsonData.authorization.data;

        // setRequestname(jsonData.name);
        setStatekeyValue<string>(setRequestname, selectedTab, jsonData.name);
        setStatekeyValue<THTTPMethods>(
          setSelectedMethod,
          selectedTab,
          jsonData.method
        );
        setStatekeyValue<Array<ParamInterface>>(
          setParams,
          selectedTab,
          jsonData.params
        );
        setStatekeyValue<ResponseInterface | null>(
          setResponse,
          selectedTab,
          jsonData.response
        );
        setStatekeyValue<Array<FormDataInterface>>(
          setFormData,
          selectedTab,
          formData
        );
        setStatekeyValue<File | null>(setBinaryData, selectedTab, binaryData);
        setStatekeyValue<string>(
          setRawData,
          selectedTab,
          jsonData.body.rawData
        );
        setStatekeyValue<TRequestBodyType>(
          setRequestBodyType,
          selectedTab,
          jsonData.body.selected
        );
        setStatekeyValue<Array<ParamInterface>>(
          setXWWWFormUrlencodedData,
          selectedTab,
          jsonData.body.xWWWFormUrlencodedData
        );
        setStatekeyValue<TContentType>(
          setRawRequestBodyType,
          selectedTab,
          jsonData.body.rawRequestBodyType
        );
        setStatekeyValue<string>(setApiUrl, selectedTab, jsonData.url);
        setStatekeyValue<Array<ParamInterface>>(
          setHeaders,
          selectedTab,
          jsonData.headers
        );
        setStatekeyValue<RequestResponseSizeInterface>(
          setRequestSize,
          selectedTab,
          jsonData.size.requestSize
        );
        setStatekeyValue<RequestResponseSizeInterface>(
          setResponseSize,
          selectedTab,
          jsonData.size.responseSize
        );
        setStatekeyValue<TAuthType>(
          setAuthType,
          selectedTab,
          authorizationType
        );

        switch (authorizationType as TAuthType) {
          case "api-key": {
            setStatekeyValue<APIKeyInterface>(
              setApiKeyAuth,
              selectedTab,
              authorizationData as APIKeyInterface
            );
            break;
          }
          case "basic-auth": {
            setStatekeyValue<BasicAuthInterface>(
              setBasicAuth,
              selectedTab,
              authorizationData as BasicAuthInterface
            );
            break;
          }
          case "bearer-token": {
            setStatekeyValue<TBearerToken>(
              setBearerTokenAuth,
              selectedTab,
              authorizationData as TBearerToken
            );
            break;
          }
          case "jwt-bearer": {
            setStatekeyValue<JWTBearerAuthInterface>(
              setJwtBearerAuth,
              selectedTab,
              authorizationData as JWTBearerAuthInterface
            );
            break;
          }
        }

        if (cb) cb("Successfully imported");
      } catch {
        if (cb) cb("Request JSON file is not valid");
      }
    },
    [selectedTab]
  );

  const handleFetchApi = useCallback(async () => {
    if (!selectedTab) return;

    setStatekeyValue<boolean>(setIsLoading, selectedTab, true);

    const headersPayload = headers[selectedTab]?.reduce(
      (acc, { key, value, hide }) => {
        if (!hide && key) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    const hiddenHeadersPayload = hiddenHeaders[selectedTab]?.reduce(
      (acc, { key, value, hide }) => {
        if (!hide && key) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const formDataPayload = (formData[selectedTab] ?? [])
      .filter((item) => !item.hide)
      .map(({ key, value }) => ({ key, value }));

    const xWWWFormDataUrlencodedPayload = (
      xWWWFormUrlencodedData[selectedTab] ?? []
    )
      .filter((item) => !item.hide)
      .map(({ key, value }) => ({ key, value }));

    setRequestSize((prev) => ({
      ...prev,
      [selectedTab]: {
        header: getPayloadSize(headersPayload) ?? 0,
        body: requestDataSize({
          bodyType: requestBodyType[selectedTab],
          rawData: rawData[selectedTab],
          binaryData: binaryData[selectedTab] ?? undefined,
          formData: formDataPayload,
          xWWWformDataUrlencoded: xWWWFormDataUrlencodedPayload,
        }),
      },
    }));

    const payload = {
      method: selectedMethod[selectedTab],
      url: ensureAbsoluteUrl(apiUrl[selectedTab]),
      headers: headersPayload,
      hiddenHeaders: hiddenHeadersPayload,
      bodyType: requestBodyType[selectedTab],
      binaryData: binaryData?.[selectedTab] ?? undefined,
      formData: formDataPayload,
      xWWWformDataUrlencoded: xWWWFormDataUrlencodedPayload,
      rawData: rawData[selectedTab],
      rawSubType: rawRequestBodyType[selectedTab],
    };

    const responseData: ResponseInterface =
      await fetchApiAndExtractData(payload);

    setStatekeyValue<boolean>(setIsResposneError, selectedTab, false);

    const statusDetails = (statusData as StatusDataInterface)[
      responseData.status
    ];

    responseData!.statusDescription = statusDetails?.description;
    if (!responseData!.statusText)
      responseData!.statusText = statusDetails?.reason;

    setStatekeyValue<boolean>(setIsLoading, selectedTab, false);
    setStatekeyValue<ResponseInterface | null>(
      setResponse,
      selectedTab,
      responseData
    );
    setStatekeyValue<RequestResponseSizeInterface>(
      setResponseSize,
      selectedTab,
      () => ({
        header: getPayloadSize(responseData?.headers) ?? 0,
        body: getPayloadSize(responseData?.data) ?? 0,
      })
    );
  }, [
    selectedTab,
    headers,
    hiddenHeaders,
    formData,
    xWWWFormUrlencodedData,
    selectedMethod,
    apiUrl,
    requestBodyType,
    binaryData,
    rawData,
    rawRequestBodyType,
  ]);

  useEffect(() => {
    if (!selectedTab) return;

    if (!apiUrl[selectedTab])
      setStatekeyValue<string>(setApiUrl, selectedTab, "");

    if (!rawData[selectedTab])
      setStatekeyValue<string>(setRawData, selectedTab, "");

    if (!requestName[selectedTab])
      setStatekeyValue<string>(setRequestname, selectedTab, "New Request");

    if (!activeMetaTab[selectedTab])
      setStatekeyValue<TActiveTabType>(setActiveMetaTab, selectedTab, "params");

    if (!params[selectedTab])
      setStatekeyValue<Array<ParamInterface>>(setParams, selectedTab, []);

    if (!hiddenParams[selectedTab])
      setStatekeyValue<Array<ParamInterface>>(setHiddenParams, selectedTab, []);

    if (!headers[selectedTab])
      setStatekeyValue<Array<ParamInterface>>(setHeaders, selectedTab, []);

    if (!hiddenHeaders[selectedTab])
      setStatekeyValue<Array<ParamInterface>>(
        setHiddenHeaders,
        selectedTab,
        []
      );

    if (!formData[selectedTab])
      setStatekeyValue<Array<FormDataInterface>>(setFormData, selectedTab, []);

    if (!xWWWFormUrlencodedData[selectedTab])
      setStatekeyValue<Array<ParamInterface>>(
        setXWWWFormUrlencodedData,
        selectedTab,
        []
      );

    if (!binaryData[selectedTab])
      setStatekeyValue<File | null>(setBinaryData, selectedTab, null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    if (!requestIdShouldFetch) return;
    handleFetchApi();
    setRequestIdShouldFetch("");
  }, [requestIdShouldFetch, handleFetchApi]);

  useEffect(() => {
    if (!selectedTab) return;

    let finalUrl = "";
    const mainUrl = apiUrl[selectedTab] ?? "";

    /* finding query params */
    const queryString = (params[selectedTab] ?? [])
      .filter(({ hide }) => !hide)
      .map(({ key = "", value = "" }) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    try {
      /* If baseUrl is valid, construct normally */
      const url = new URL(mainUrl);
      url.search = queryString;
      finalUrl = url.toString();
    } catch {
      /* If baseUrl is invalid (like just "?name=abc"), just return query only */

      /* finding url without any query params and # */
      const cleanUrl = mainUrl.split("?")[0].split("#")[0];

      if (!cleanUrl.trim()) finalUrl = queryString ? `?${queryString}` : "";
      else finalUrl = cleanUrl + (queryString ? `?${queryString}` : "");
    }

    if (previousFinalUrlRef.current[selectedTab] === finalUrl) return;

    previousFinalUrlRef.current[selectedTab] = finalUrl;
    setStatekeyValue<string>(setApiUrl, selectedTab, finalUrl);
  }, [apiUrl, params, selectedTab]);

  useEffect(() => {
    if (!selectedTab) return;

    if (!apiUrl)
      return setStatekeyValue<Array<ParamInterface>>(
        setHiddenHeaders,
        selectedTab,
        (prev) => {
          return (prev[selectedTab] ?? []).map((item) =>
            item.key === "Cookie" ? { ...item, value: "" } : item
          );
        }
      );

    /* load cookies in header */
    (async () => {
      const url = apiUrl[selectedTab] ?? "";
      const cookies = ((await getCookiesStringByDomain(
        ensureAbsoluteUrl(url)
      )) ?? "") as string;

      return setStatekeyValue<Array<ParamInterface>>(
        setHiddenHeaders,
        selectedTab,
        (prev) => {
          return (prev[selectedTab] ?? []).map((header) => ({
            ...header,
            ...(header.key === "Cookie" ? { value: cookies } : {}),
          }));
        }
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, response]);

  const addHiddenData = useCallback(
    (
      setState: React.Dispatch<
        React.SetStateAction<Record<string, Array<ParamInterface>>>
      >,
      keyName: string,
      payload: Record<string, string> = {}
    ) => {
      if (!selectedTab) return;

      return setStatekeyValue<Array<ParamInterface>>(
        setState,
        selectedTab,
        (prev) => {
          if ((prev[selectedTab] ?? [])?.some((item) => item.id === keyName)) {
            return (prev[selectedTab] ?? []).map((item) =>
              item.id === keyName ? { ...item, ...payload } : item
            );
          } else {
            const filtered = (prev[selectedTab] ?? []).filter(
              (h) => h.id !== keyName
            );
            return [
              {
                ...generateNextHiddenHeaderOrParam(),
                id: keyName,
                ...payload,
              },
              ...filtered,
            ];
          }
        }
      );
    },
    [selectedTab]
  );

  const removeHiddenData = useCallback(
    (
      setState: React.Dispatch<
        React.SetStateAction<Record<string, Array<ParamInterface>>>
      >,
      keyName: string | Array<string>
    ) => {
      if (!selectedTab) return;

      /* filter out those data which are not in keyName list or not keyName */
      return setStatekeyValue<Array<ParamInterface>>(
        setState,
        selectedTab,
        (prev) =>
          (prev[selectedTab] ?? []).filter(
            (param) =>
              !(Array.isArray(keyName) ? keyName : [keyName]).includes(param.id)
          )
      );
    },
    [selectedTab]
  );

  useEffect(() => {
    if (!selectedTab) return;

    /* if jwt-bearer */
    const handleJWTBearer = async () => {
      try {
        removeHiddenData(setHiddenHeaders, getRestOfAuthType());
        removeHiddenData(setHiddenParams, "jwt-bearer");

        if (!jwtBearerAuth.secret) return;

        const token = await window.electronAPI.generateJWTToken({
          payload: jwtBearerAuth[selectedTab].payload,
          secret: jwtBearerAuth[selectedTab].secret,
          algorithm: jwtBearerAuth[selectedTab].algo,
        });

        if (jwtBearerAuth[selectedTab].addTo === "header") {
          removeHiddenData(setHiddenParams, "jwt-bearer");
          addHiddenData(setHiddenHeaders, "jwt-bearer", {
            key: "Authorization",
            value: `${jwtBearerAuth.headerPrefix} ${token}`,
          });
        } else {
          removeHiddenData(setHiddenHeaders, getRestOfAuthType("jwt-bearer"));
          addHiddenData(setHiddenParams, "jwt-bearer", {
            key: "Authorization",
            value: token,
          });
        }
      } catch (error) {
        removeHiddenData(setHiddenHeaders, getRestOfAuthType());
        removeHiddenData(setHiddenParams, "jwt-bearer");
        console.log(error);
      }
    };

    /**
     * if api-key active and query params
     * --- remove from header add into header
     * else if api-key active and header
     * --- add in header and remove from params
     * else remove from both header and params
     * **/
    if (
      authType[selectedTab] === "api-key" &&
      apiKeyAuth[selectedTab].addTo === "query"
    ) {
      removeHiddenData(setHiddenHeaders, getRestOfAuthType());
      addHiddenData(setHiddenParams, "api-key", {
        key: apiKeyAuth[selectedTab].key,
        value: apiKeyAuth[selectedTab].value,
      });
    } else if (
      authType[selectedTab] === "api-key" &&
      apiKeyAuth[selectedTab].addTo === "header"
    ) {
      removeHiddenData(setHiddenParams, "api-key");
      addHiddenData(setHiddenHeaders, "api-key", {
        key: apiKeyAuth[selectedTab].key,
        value: apiKeyAuth[selectedTab].value,
      });
      removeHiddenData(setHiddenHeaders, getRestOfAuthType("api-key"));
    } else if (authType[selectedTab] === "basic-auth") {
      removeHiddenData(setHiddenHeaders, getRestOfAuthType("basic-auth"));
      const token = btoa(`${basicAuth.username}:${basicAuth.password}`);
      addHiddenData(setHiddenHeaders, "basic-auth", {
        key: "Authorization",
        value: `Basic ${token}`,
      });
    } else if (authType[selectedTab] === "bearer-token") {
      removeHiddenData(setHiddenHeaders, getRestOfAuthType("bearer-token"));
      addHiddenData(setHiddenHeaders, "bearer-token", {
        key: "Authorization",
        value: `Bearer ${bearerTokenAuth}`,
      });
    } else if (authType[selectedTab] === "jwt-bearer") {
      (async () => {
        await handleJWTBearer();
      })();
    } else {
      removeHiddenData(setHiddenParams, ["api-key", "jwt-bearer"]);
      removeHiddenData(setHiddenHeaders, getRestOfAuthType());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKeyAuth, basicAuth, bearerTokenAuth, jwtBearerAuth, authType]);

  const handleChangeActiveMetaTab = useCallback(
    (id: TActiveTabType) => {
      if (!selectedTab) return;
      setStatekeyValue<TActiveTabType>(setActiveMetaTab, selectedTab, id);
    },
    [selectedTab]
  );

  const handleChangeSelectedMethod = useCallback(
    (id: THTTPMethods) => {
      if (!selectedTab) return;
      setStatekeyValue<THTTPMethods>(setSelectedMethod, selectedTab, id);
    },
    [selectedTab]
  );

  const handleChangeRequestBodyType = useCallback(
    (id: TRequestBodyType) => {
      if (!selectedTab) return;
      setStatekeyValue<TRequestBodyType>(setRequestBodyType, selectedTab, id);
    },
    [selectedTab]
  );

  const handleChangeRawRequestBodyType = useCallback(
    (id: TContentType) => {
      if (!selectedTab) return;
      setStatekeyValue<TContentType>(setRawRequestBodyType, selectedTab, id);
    },
    [selectedTab]
  );

  const handleChangeApiUrl = useCallback(
    (api: string) => {
      if (!selectedTab) return;

      const urlParams: Array<{
        key: string;
        value: string;
      }> = parseUrlParams(api).map(([key, value]) => ({
        key,
        value,
      }));

      setStatekeyValue<Array<ParamInterface>>(
        setParams,
        selectedTab,
        (prev) => {
          if (prev[selectedTab]?.length < urlParams.length)
            return urlParams.map((param, index) => ({
              ...generateNewMetaDataItem("params"),
              ...prev[selectedTab]?.[index],
              ...param,
            }));

          /* 
      if new params size less then previous means some of them have to filter out
      
      so we keep hidden params as it is but for others we checked that is it exist in new param list

      if exist then update it
      else filter out it.
      */
          let index = 0;
          return prev[selectedTab]?.reduce(
            (acc, curr) =>
              curr.hide
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
      );

      setStatekeyValue<string>(setApiUrl, selectedTab, api);
    },
    [selectedTab]
  );

  const handleIsInputError = useCallback(
    (value: boolean) => {
      if (!selectedTab) return;
      setStatekeyValue<boolean>(setIsApiUrlError, selectedTab, value);
    },
    [selectedTab]
  );

  const handleChangeRawData = useCallback(
    (value: string) => {
      if (!selectedTab) return;
      setStatekeyValue<string>(setRawData, selectedTab, value);
    },
    [selectedTab]
  );

  const handleRequestSend = useCallback(() => {
    if (!selectedTab) return;
    setRequestIdShouldFetch(selectedTab);
  }, [selectedTab]);

  const handleRemoveAllMetaData = useCallback(
    (type: TMetaTableType) => {
      if (!selectedTab) return;

      switch (type) {
        case "params":
          return setStatekeyValue<Array<ParamInterface>>(
            setParams,
            selectedTab,
            []
          );
        case "headers":
          return setStatekeyValue<Array<ParamInterface>>(
            setHeaders,
            selectedTab,
            []
          );
        case "form-data":
          return setStatekeyValue<Array<FormDataInterface>>(
            setFormData,
            selectedTab,
            []
          );
        case "x-www-form-urlencoded":
          return setStatekeyValue<Array<ParamInterface>>(
            setXWWWFormUrlencodedData,
            selectedTab,
            []
          );
      }
    },
    [selectedTab]
  );

  const handleRemoveFormDataFile = useCallback(
    (id: string, index: number) => {
      if (!selectedTab) return;

      setStatekeyValue<Array<FormDataInterface>>(
        setFormData,
        selectedTab,
        (prev) => {
          return (prev[selectedTab] ?? []).map((item) => {
            if (item.id !== id || typeof item.value === "string") return item;

            console.log("item.value === ", item.value);
            return {
              ...item,
              value: item.value.filter((_, i) => i !== index),
            };
          });
        }
      );
    },
    [selectedTab]
  );

  /* binary data */
  const handleChangeBinaryData = useCallback(
    (file: File | null = null) => {
      if (!selectedTab) return;
      setStatekeyValue<File | null>(setBinaryData, selectedTab, file);
    },
    [selectedTab]
  );

  const activeTabList = useMemo((): Partial<
    Record<TActiveTabType, boolean>
  > => {
    if (!selectedTab) return {};

    const tabList: Partial<Record<TActiveTabType, boolean>> = {};

    console.log("headers[selectedTab] ==== ", headers[selectedTab]);

    if (params[selectedTab]?.length && !tabList["params"])
      tabList["params"] = true;
    else tabList["params"] = false;

    if (headers[selectedTab]?.length && !tabList["headers"])
      tabList["headers"] = true;
    else tabList["headers"] = false;

    console.log("formData[selectedTab] === ", formData[selectedTab]);
    console.log(
      "xWWWFormUrlencodedData[selectedTab] === ",
      xWWWFormUrlencodedData[selectedTab]
    );
    if (
      (formData[selectedTab]?.length ||
        xWWWFormUrlencodedData[selectedTab]?.length ||
        rawData[selectedTab] ||
        binaryData[selectedTab]) &&
      !tabList["body"]
    ) {
      tabList["body"] = true;
    } else tabList["body"] = false;

    return tabList;
  }, [
    selectedTab,
    params,
    headers,
    formData,
    xWWWFormUrlencodedData,
    rawData,
    binaryData,
  ]);

  return (
    <RequestResponseContext.Provider
      value={{
        selectedTab: selectedTab!,
        isResponseCollapsed,
        handleToggleCollapse,
        requestName,
        handleChangeRequestName,
        handleClearRequestResponse,
        authType,
        handleChangeAuthType,
        apiKeyAuth,
        handleChangeAPIKey,
        basicAuth,
        handleChangeBasicAuth,
        bearerTokenAuth,
        handleChangeBearerTokenAuth,
        jwtBearerAuth,
        handleChangeJWTBearerAuth,
        isDownloadRequestWithBase64,
        handleIsDownloadRequestWithBase64,
        handleDownloadRequest,
        handleImportRequest,
        activeMetaTab,
        handleChangeActiveMetaTab,
        selectedMethod,
        handleChangeSelectedMethod,
        requestBodyType,
        handleChangeRequestBodyType,
        rawRequestBodyType,
        handleChangeRawRequestBodyType,
        apiUrl,
        handleChangeApiUrl,
        response,
        isApiUrlError,
        handleIsInputError,
        handleRequestSend,
        isResposneError,
        requestSize,
        responseSize,
        isLoading,
        rawData,
        handleChangeRawData,
        params,
        handleChangeParam,
        handleDeleteParam,
        handleAddNewParam,
        handleParamCheckToggle,
        hiddenParams,
        headers,
        handleChangeHeader,
        handleDeleteHeader,
        handleAddNewHeader,
        handleHeaderCheckToggle,

        hiddenHeaders,
        handleChangeHiddenHeader,
        handleHiddenHeaderCheckToggle,

        formData,
        handleChangeFormData,
        handleDeleteFormData,
        handleAddNewFormData,
        handleFormDataCheckToggle,
        xWWWFormUrlencodedData,
        handleChangeXWWWFormEncoded,
        handleDeleteXWWWFormEncoded,
        handleAddNewXWWWFormEncoded,
        handleXWWWFormEncodedCheckToggle,
        handleRemoveAllMetaData,
        handleRemoveFormDataFile,
        binaryData,
        handleChangeBinaryData,
        activeTabList,
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
