"use client";

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
import { TMetaTableType } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestMetaTableProvider";
import {
  getPayloadSize,
  parseUrlParams,
  requestDataSize,
  sendRequest,
} from "@/utils";
import { TContentType } from "@/types";
import { getStatusMessage } from "@/utils/statusCode";

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
}
export interface FormDataInterface
  extends ParamInterface<string | Array<File>> {
  contentType?: string;
}

interface ResponseInterface {
  data: unknown;
  headers: Record<string, unknown>;
  status: number;
  statusText: string;
  statusDescription: string;
}

interface RequestResponseSizeInterface {
  header: number;
  body: number;
}

interface RequestResponseContext {
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

export const useRequestResponse = () => {
  const context = useContext(RequestResponseContext);

  if (!context) {
    throw new Error(
      "useRequestResponse must be used within a RequestResponseProvider."
    );
  }

  return context;
};

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
  const [binaryData, setBinaryData] = useState<File | null>(null);
  const [formData, setFormData] = useState<Array<FormDataInterface>>([]);
  const [xWWWFormUrlencodedData, setXWWWFormUrlencodedData] = useState<
    Array<ParamInterface>
  >([]);
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

  const handleFetchApi = useCallback(async () => {
    setIsLoading(true);

    const headersPayload = headers.reduce(
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

    let responseData = {
      data: undefined,
      headers: {},
      status: 0,
      statusText: "",
      statusDescription: "",
    };
    try {
      const res = await sendRequest({
        method: selectedMethod,
        url: apiUrl,
        headers: headersPayload,
        bodyType: requestBodyType,
        binaryData: binaryData ?? undefined,
        formData: formDataPayload,
        xWWWformDataUrlencoded: xWWWFormDataUrlencodedPayload,
        rawData,
        rawSubType: rawRequestBodyType,
      });
      // console.log(res);
      setIsResposneError(false);

      const statusDetails = await getStatusMessage(res.status);

      responseData = {
        data: res.data,
        headers: res.headers,
        status: res.status,
        statusText: res.statusText ?? statusDetails?.reason,
        statusDescription: statusDetails?.description ?? "Unknown status code",
      };
    } catch (error) {
      // console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        const statusDetails = await getStatusMessage(error.response.status);

        responseData = {
          data: error.response.data,
          headers: error.response.headers,
          status: error.response.status,
          statusText: error.response.statusText ?? statusDetails?.reason,
          statusDescription:
            statusDetails?.description ?? "Unknown status code",
        };
      }
      setIsResposneError(true);
    } finally {
      setIsLoading(false);
      setResponse(responseData);

      setResponseSize({
        header: getPayloadSize(responseData?.headers) ?? 0,
        body: getPayloadSize(responseData?.data) ?? 0,
      });
    }
  }, [
    apiUrl,
    selectedMethod,
    headers,
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
    console.log("==========");
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
