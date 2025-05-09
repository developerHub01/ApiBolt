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
  // sendRequest,
} from "@/utils";
import statusData from "@/data/http_status_details.json";
import type { TMetaTableType } from "@/context/request/RequestMetaTableProvider";
import type { TContentType } from "@/types";
import { isElectron } from "@/utils/electron";

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

interface RequestResponseContext {
  isResponseCollapsed: boolean;
  handleToggleCollapse: (size?: number) => void;
  requestName: string;
  handleChangeRequestName: (name: string) => void;
  isDownloadRequestWithBase64: boolean;
  handleIsDownloadRequestWithBase64: (value: boolean) => void;
  handleDownloadRequest: () => Promise<void>;
  handleImportRequest: (
    file: File,
    cb?: (message: string) => void
  ) => Promise<void>;
  activeMetaTab: TActiveTabType;
  handleChangeActiveMetaTab: (id: TActiveTabType) => void;
  selectedMethod: string;
  handleChangeSelectedMethod: (id: THTTPMethods) => void;
  requestBodyType: TRequestBodyType;
  handleChangeRequestBodyType: (id: TRequestBodyType) => void;
  rawRequestBodyType: TContentType;
  handleChangeRawRequestBodyType: (id: TContentType) => void;
  apiUrl: string;
  handleChangeApiUrl: (api: string) => void;
  response: ResponseInterface | null;
  isApiUrlError: boolean;
  handleIsInputError: (value: boolean) => void;
  handleRequestSend: () => void;
  isResposneError: boolean;
  isLoading: boolean;
  requestSize: RequestResponseSizeInterface;
  responseSize: RequestResponseSizeInterface;

  rawData: string;
  handleChangeRawData: (value: string) => void;

  params: Array<ParamInterface>;
  handleChangeParam: (id: string, key: string, value: string) => void;
  handleDeleteParam: (id: string) => void;
  handleAddNewParam: () => void;
  handleParamCheckToggle: (id?: string) => void;

  headers: Array<ParamInterface>;
  handleChangeHeader: (id: string, key: string, value: string) => void;
  handleDeleteHeader: (id: string) => void;
  handleAddNewHeader: () => void;
  handleHeaderCheckToggle: (id?: string) => void;

  hiddenHeaders: Array<ParamInterface>;
  handleChangeHiddenHeader: (id: string, key: string, value: string) => void;
  handleHiddenHeaderCheckToggle: (id?: string) => void;

  formData: Array<FormDataInterface>;
  handleChangeFormData: (id: string, key: string, value: File | string) => void;
  handleDeleteFormData: (id: string) => void;
  handleAddNewFormData: () => void;
  handleFormDataCheckToggle: (id?: string) => void;

  xWWWFormUrlencodedData: Array<ParamInterface>;
  handleChangeXWWWFormEncoded: (id: string, key: string, value: string) => void;
  handleDeleteXWWWFormEncoded: (id: string) => void;
  handleAddNewXWWWFormEncoded: () => void;
  handleXWWWFormEncodedCheckToggle: (id?: string) => void;
  handleRemoveAllMetaData: (type: TMetaTableType) => void;
  handleRemoveFormDataFile: (id: string, index: number) => void;

  binaryData: File | null;
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
    console.log("electronAPI ========= ", window.electronAPI);
    const res = await window.electronAPI?.fetchApi(payload);
    return res;
  }
  try {
    const res = await sendRequest(payload);
    console.log("response", res);
    const cookies = res.headers["set-cookie"];
    console.log("cookies", cookies);

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

export const ResponsePanelMinLimit = 15;

const useMetaDataManager = <
  T extends { id: string; hide?: boolean; value: unknown },
>(
  setState: React.Dispatch<React.SetStateAction<Array<T>>>,
  generateNewItem: () => T
) => {
  const handleChange = useCallback(
    (id: string, key: string, value: unknown) => {
      setState((prev) =>
        prev.map((item) => {
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
        })
      );
    },
    [setState]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setState((prev) => prev.filter((item) => item.id !== id));
    },
    [setState]
  );

  const handleAdd = useCallback(() => {
    setState((prev) => [...prev, generateNewItem()]);
  }, [setState, generateNewItem]);

  const handleCheckToggle = useCallback(
    (id?: string) => {
      if (id) {
        setState((prev) =>
          prev.map((item) => {
            if (item.id !== id) return item;
            return {
              ...item,
              hide: item.hide ? undefined : true,
            };
          })
        );
      } else {
        setState((prev) => {
          const isAllChecked = prev.every((item) => !item.hide);
          return prev.map((item) => ({
            ...item,
            hide: isAllChecked ? true : undefined,
          }));
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
  const [requestName, setRequestname] = useState<string>("Request");
  const [isResponseCollapsed, setIsResponseCollapsed] = useState<boolean>(true);
  const [activeMetaTab, setActiveMetaTab] = useState<TActiveTabType>("params");
  const [selectedMethod, setSelectedMethod] = useState<THTTPMethods>("get");
  const [isApiUrlError, setIsApiUrlError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState<string>("");
  const [rawData, setRawData] = useState<string>("");
  const [response, setResponse] = useState<ResponseInterface | null>(null);
  const [requestSize, setRequestSize] = useState<RequestResponseSizeInterface>({
    header: 0,
    body: 0,
  });
  const [responseSize, setResponseSize] =
    useState<RequestResponseSizeInterface>({
      header: 0,
      body: 0,
    });
  const [isResposneError, setIsResposneError] = useState<boolean>(false);
  const [requestBodyType, setRequestBodyType] =
    useState<TRequestBodyType>("none");
  const [rawRequestBodyType, setRawRequestBodyType] =
    useState<TContentType>("json");

  const [params, setParams] = useState<Array<ParamInterface>>([]);

  const [headers, setHeaders] = useState<Array<ParamInterface>>([]);
  const [hiddenHeaders, setHiddenHeaders] = useState<Array<ParamInterface>>([
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
  ]);
  const [binaryData, setBinaryData] = useState<File | null>(null);
  const [formData, setFormData] = useState<Array<FormDataInterface>>([]);
  const [xWWWFormUrlencodedData, setXWWWFormUrlencodedData] = useState<
    Array<ParamInterface>
  >([]);

  const [isDownloadRequestWithBase64, setIsDownloadRequestWithBase64] =
    useState<boolean>(false);

  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const previousFinalUrlRef = useRef<string>("");

  const {
    handleChange: handleChangeParam,
    handleDelete: handleDeleteParam,
    handleAdd: handleAddNewParam,
    handleCheckToggle: handleParamCheckToggle,
  } = useMetaDataManager<ParamInterface>(setParams, generateNewMetaDataItem);
  const {
    handleChange: handleChangeHeader,
    handleDelete: handleDeleteHeader,
    handleAdd: handleAddNewHeader,
    handleCheckToggle: handleHeaderCheckToggle,
  } = useMetaDataManager<ParamInterface>(setHeaders, generateNewMetaDataItem);
  const {
    handleChange: handleChangeHiddenHeader,
    handleCheckToggle: handleHiddenHeaderCheckToggle,
  } = useMetaDataManager<ParamInterface>(
    setHiddenHeaders,
    generateNewMetaDataItem
  );
  const {
    handleChange: handleChangeFormData,
    handleDelete: handleDeleteFormData,
    handleAdd: handleAddNewFormData,
    handleCheckToggle: handleFormDataCheckToggle,
  } = useMetaDataManager<FormDataInterface>(setFormData, () =>
    generateNewMetaDataItem("form-data")
  );
  const {
    handleChange: handleChangeXWWWFormEncoded,
    handleDelete: handleDeleteXWWWFormEncoded,
    handleAdd: handleAddNewXWWWFormEncoded,
    handleCheckToggle: handleXWWWFormEncodedCheckToggle,
  } = useMetaDataManager<ParamInterface>(
    setXWWWFormUrlencodedData,
    generateNewMetaDataItem
  );

  const handleToggleCollapse = useCallback(
    (size?: number) => {
      if (
        size !== undefined &&
        ((size > ResponsePanelMinLimit && !isResponseCollapsed) ||
          (size <= ResponsePanelMinLimit && isResponseCollapsed))
      )
        return;

      setIsResponseCollapsed((prev) => !prev);
    },
    [isResponseCollapsed]
  );

  const handleChangeRequestName = useCallback((name: string) => {
    setRequestname(name);
  }, []);

  const handleIsDownloadRequestWithBase64 = useCallback(
    (value: boolean) => setIsDownloadRequestWithBase64(value),
    []
  );

  const handleDownloadRequest = useCallback(async () => {
    const formDataWithMetadata: Array<FormDataFileMetadataInterface> =
      await Promise.all(
        formData.map(async (data) => {
          let value: Array<FileMetadataInterface> | string = "";
          if (
            Array.isArray(data.value) &&
            data.value.every((v) => v instanceof File)
          ) {
            value = await Promise.all(
              data.value.map((file) =>
                converterFileToMetadata(file, isDownloadRequestWithBase64)
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

    const downloadData: ResponseFileDataInterface = {
      name: requestName,
      url: apiUrl,
      method: selectedMethod,
      params,
      headers,
      body: {
        selected: requestBodyType,
        rawData,
        formData: formDataWithMetadata,
        xWWWFormUrlencodedData,
        binaryData:
          binaryData &&
          (await converterFileToMetadata(
            binaryData,
            isDownloadRequestWithBase64
          )),
        rawRequestBodyType,
      },
      response,
      size: {
        requestSize,
        responseSize,
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
    requestName,
    apiUrl,
    selectedMethod,
    params,
    headers,
    requestBodyType,
    rawData,
    formData,
    xWWWFormUrlencodedData,
    binaryData,
    rawRequestBodyType,
    response,
    isDownloadRequestWithBase64,
    requestSize,
    responseSize,
  ]);

  const handleImportRequest = useCallback(
    async (file: File, cb?: (message: string) => void) => {
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

        setRequestname(jsonData.name);
        setSelectedMethod(jsonData.method);
        setParams(jsonData.params);
        setResponse(jsonData.response);
        setFormData(formData);
        setBinaryData(binaryData);
        setRawData(jsonData.body.rawData);
        setRequestBodyType(jsonData.body.selected);
        setXWWWFormUrlencodedData(jsonData.body.xWWWFormUrlencodedData);
        setRawRequestBodyType(jsonData.body.rawRequestBodyType);
        setApiUrl(jsonData.url);
        setHeaders(jsonData.headers);
        setRequestSize(jsonData.size.requestSize);
        setResponseSize(jsonData.size.responseSize);

        if (cb) cb("Successfully imported");
      } catch {
        if (cb) cb("Request JSON file is not valid");
      }
    },
    []
  );

  const handleFetchApi = useCallback(async () => {
    setIsLoading(true);

    const headersPayload = headers.reduce(
      (acc, { key, value, hide }) => {
        if (!hide && key) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    const hiddenHeadersPayload = hiddenHeaders.reduce(
      (acc, { key, value, hide }) => {
        if (!hide && key) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const formDataPayload = formData
      .filter((item) => !item.hide)
      .map(({ key, value }) => ({ key, value }));

    const xWWWFormDataUrlencodedPayload = xWWWFormUrlencodedData
      .filter((item) => !item.hide)
      .map(({ key, value }) => ({ key, value }));

    setRequestSize({
      header: getPayloadSize(headersPayload) ?? 0,
      body: requestDataSize({
        bodyType: requestBodyType,
        rawData,
        binaryData: binaryData ?? undefined,
        formData: formDataPayload,
        xWWWformDataUrlencoded: xWWWFormDataUrlencodedPayload,
      }),
    });

    const payload = {
      method: selectedMethod,
      url: ensureAbsoluteUrl(apiUrl),
      headers: headersPayload,
      hiddenHeaders: hiddenHeadersPayload,
      bodyType: requestBodyType,
      binaryData: binaryData ?? undefined,
      formData: formDataPayload,
      xWWWformDataUrlencoded: xWWWFormDataUrlencodedPayload,
      rawData,
      rawSubType: rawRequestBodyType,
    };

    const responseData: ResponseInterface =
      await fetchApiAndExtractData(payload);

    setIsResposneError(false);

    const statusDetails = (statusData as StatusDataInterface)[
      responseData.status
    ];

    responseData!.statusDescription = statusDetails?.description;
    if (!responseData!.statusText)
      responseData!.statusText = statusDetails?.reason;

    setIsLoading(false);
    setResponse(responseData);

    setResponseSize({
      header: getPayloadSize(responseData?.headers) ?? 0,
      body: getPayloadSize(responseData?.data) ?? 0,
    });
  }, [
    apiUrl,
    selectedMethod,
    headers,
    hiddenHeaders,
    requestBodyType,
    rawRequestBodyType,
    rawData,
    formData,
    xWWWFormUrlencodedData,
    binaryData,
  ]);

  useEffect(() => {
    if (!shouldFetch) return;
    handleFetchApi();
    setShouldFetch(false);
  }, [shouldFetch, handleFetchApi]);

  useEffect(() => {
    let finalUrl = "";

    /* finding query params */
    const queryString = params
      .filter(({ hide }) => !hide)
      .map(({ key = "", value = "" }) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    try {
      /* If baseUrl is valid, construct normally */
      const url = new URL(apiUrl);
      url.search = queryString;
      finalUrl = url.toString();
    } catch {
      /* If baseUrl is invalid (like just "?name=abc"), just return query only */

      /* finding url without any query params and # */
      const cleanUrl = apiUrl.split("?")[0].split("#")[0];

      if (!cleanUrl.trim()) finalUrl = queryString ? `?${queryString}` : "";
      else finalUrl = cleanUrl + (queryString ? `?${queryString}` : "");
    }

    if (previousFinalUrlRef.current === finalUrl) return;

    previousFinalUrlRef.current = finalUrl;
    setApiUrl(finalUrl);
  }, [apiUrl, params]);

  const handleSetCookies = useCallback(async (apiUrl: string) => {
    console.log("cookie ======= ", document.cookie);
    const cookies = isElectron()
      ? await window.electronAPI?.getCookiesFromUrl(apiUrl)
      : document.cookie;

    console.log("cookies", cookies);

    // setHiddenHeaders((prev) =>
    //   prev.map((item) =>
    //     item.key === "Cookie" ? { ...item, value: cookies } : item
    //   )
    // );
  }, []);

  useEffect(() => {
    if (!apiUrl)
      return setHiddenHeaders((prev) =>
        prev.map((item) =>
          item.key === "Cookie" ? { ...item, value: "" } : item
        )
      );
    handleSetCookies(apiUrl);
  }, [apiUrl, handleSetCookies]);

  const handleChangeActiveMetaTab = useCallback((id: TActiveTabType) => {
    setActiveMetaTab(id);
  }, []);

  const handleChangeSelectedMethod = useCallback((id: THTTPMethods) => {
    setSelectedMethod(id);
  }, []);

  const handleChangeRequestBodyType = useCallback((id: TRequestBodyType) => {
    setRequestBodyType(id);
  }, []);

  const handleChangeRawRequestBodyType = useCallback((id: TContentType) => {
    setRawRequestBodyType(id);
  }, []);

  const handleChangeApiUrl = useCallback((api: string) => {
    const urlParams: Array<{
      key: string;
      value: string;
    }> = parseUrlParams(api).map(([key, value]) => ({
      key,
      value,
    }));

    setParams((prev) => {
      if (prev.length < urlParams.length)
        return urlParams.map((param, index) => ({
          ...generateNewMetaDataItem("params"),
          ...prev[index],
          ...param,
        }));

      /* 
      if new params size less then previous means some of them have to filter out
      
      so we keep hidden params as it is but for others we checked that is it exist in new param list

      if exist then update it
      else filter out it.
      */
      let index = 0;
      return prev.reduce(
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
    });

    setApiUrl(api);
  }, []);

  const handleIsInputError = useCallback((value: boolean) => {
    setIsApiUrlError(value);
  }, []);

  const handleChangeRawData = useCallback((value: string) => {
    setRawData(value);
  }, []);

  const handleRequestSend = useCallback(() => {
    setShouldFetch(true);
  }, []);

  const handleRemoveAllMetaData = useCallback((type: TMetaTableType) => {
    switch (type) {
      case "params":
        return setParams([]);
      case "headers":
        return setHeaders([]);
      case "form-data":
        return setFormData([]);
      case "x-www-form-urlencoded":
        return setXWWWFormUrlencodedData([]);
    }
  }, []);

  const handleRemoveFormDataFile = useCallback((id: string, index: number) => {
    setFormData((prev) =>
      prev.map((item) => {
        if (item.id !== id || typeof item.value === "string") return item;

        return {
          ...item,
          value: item.value.filter((_, i) => i !== index),
        };
      })
    );
  }, []);

  /* binary data */
  const handleChangeBinaryData = useCallback((file: File | null = null) => {
    setBinaryData(file);
  }, []);

  const activeTabList = useMemo(() => {
    const tabList: Partial<Record<TActiveTabType, boolean>> = {};

    if (params.length && !tabList["params"]) tabList["params"] = true;
    else tabList["params"] = false;

    if (headers.length && !tabList["headers"]) tabList["headers"] = true;
    else tabList["headers"] = false;

    if (
      (formData.length ||
        xWWWFormUrlencodedData.length ||
        rawData ||
        binaryData) &&
      !tabList["body"]
    ) {
      tabList["body"] = true;
    } else tabList["body"] = false;

    return tabList;
  }, [params, headers, formData, xWWWFormUrlencodedData, rawData, binaryData]);

  return (
    <RequestResponseContext.Provider
      value={{
        isResponseCollapsed,
        handleToggleCollapse,
        requestName,
        handleChangeRequestName,
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
