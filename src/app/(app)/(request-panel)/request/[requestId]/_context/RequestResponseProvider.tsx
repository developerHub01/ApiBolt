"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
import { TMetaTableType } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestMetaTableProvider";

const generateNewMetaDataItem = (type?: TMetaTableType) => ({
  id: uuidv4(),
  key: "",
  value: "",
  contentType: type !== "form-data" ? undefined : "",
  description: "",
});

export type TActiveTabType = "params" | "headers" | "body" | "authorization";

export interface ParamInterface<ValueT = string> {
  id: string;
  key: string;
  value: ValueT;
  description?: string;
  hide?: boolean;
}
export interface HeaderInterface extends ParamInterface {}
export interface XWWWFormUrlencodedInterface extends ParamInterface {}
export interface FormDataInterface
  extends ParamInterface<string | Array<File>> {
  contentType?: string;
}

interface ResponseInterface {
  data: any;
  headers: Record<string, any>;
  status: number;
  statusText: string;
  statusDescription: string;
}

interface RequestResponseContext {
  activeMetaTab: TActiveTabType;
  handleChangeActiveMetaTab: (id: TActiveTabType) => void;
  selectedMethod: string;
  handleChangeSelectedMethod: (id: string) => void;
  apiUrl: string;
  handleChangeApiUrl: (api: string) => void;
  response: ResponseInterface | null;
  isApiUrlError: boolean;
  handleIsInputError: (value: boolean) => void;
  handleFetchApi: () => Promise<void>;
  isResposneError: boolean;
  isLoading: boolean;

  params: Array<ParamInterface>;
  handleChangeParam: (id: string, key: string, value: string) => void;
  handleDeleteParam: (id: string) => void;
  handleAddNewParam: () => void;
  handleParamCheckToggle: (id?: string) => void;

  headers: Array<HeaderInterface>;
  handleChangeHeader: (id: string, key: string, value: string) => void;
  handleDeleteHeader: (id: string) => void;
  handleAddNewHeader: () => void;
  handleHeaderCheckToggle: (id?: string) => void;

  formData: Array<FormDataInterface>;
  handleChangeFormData: (id: string, key: string, value: File | string) => void;
  handleDeleteFormData: (id: string) => void;
  handleAddNewFormData: () => void;
  handleFormDataCheckToggle: (id?: string) => void;

  xWWWFormUrlencodedData: Array<XWWWFormUrlencodedInterface>;
  handleChangeXWWWFormEncoded: (id: string, key: string, value: string) => void;
  handleDeleteXWWWFormEncoded: (id: string) => void;
  handleAddNewXWWWFormEncoded: () => void;
  handleXWWWFormEncodedCheckToggle: (id?: string) => void;
  handleRemoveAllMetaData: (type: TMetaTableType) => void;
  handleRemoveFormDataFile: (id: string, index: number) => void;

  binaryData: File | null;
  handleChangeBinaryData: (file?: File | null) => void;
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
  T extends { id: string; hide?: boolean; value: any },
>(
  setState: React.Dispatch<React.SetStateAction<Array<T>>>,
  generateNewItem: () => T
) => {
  const handleChange = useCallback((id: string, key: string, value: any) => {
    setState((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (value instanceof File) {
          const existingFiles = (
            Array.isArray(item[key as keyof T]) ? item[key as keyof T] : []
          ) as Array<any>;

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
  }, []);

  const handleDelete = useCallback((id: string) => {
    setState((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleAdd = useCallback(() => {
    setState((prev) => [...prev, generateNewItem()]);
  }, []);

  const handleCheckToggle = useCallback((id?: string) => {
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
  }, []);

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
  const [selectedMethod, setSelectedMethod] = useState<string>("get");
  const [isApiUrlError, setIsApiUrlError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState<string>("");
  const [response, setResponse] = useState<ResponseInterface | null>(null);
  const [isResposneError, setIsResposneError] = useState<boolean>(false);
  const [binaryData, setBinaryData] = useState<File | null>(null);
  const [params, setParams] = useState<Array<ParamInterface>>([]);
  const [headers, setHeaders] = useState<Array<HeaderInterface>>([]);
  const [formData, setFormData] = useState<Array<FormDataInterface>>([]);
  const [xWWWFormUrlencodedData, setXWWWFormUrlencodedData] = useState<
    Array<XWWWFormUrlencodedInterface>
  >([]);
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
  } = useMetaDataManager<HeaderInterface>(setHeaders, generateNewMetaDataItem);
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
  } = useMetaDataManager<XWWWFormUrlencodedInterface>(
    setXWWWFormUrlencodedData,
    generateNewMetaDataItem
  );

  const handleChangeActiveMetaTab = useCallback((id: TActiveTabType) => {
    setActiveMetaTab(id);
  }, []);
  const handleChangeSelectedMethod = useCallback((id: string) => {
    setSelectedMethod(id);
  }, []);
  const handleChangeApiUrl = useCallback((api: string) => setApiUrl(api), []);

  const handleIsInputError = useCallback((value: boolean) => {
    setIsApiUrlError(value);
  }, []);

  const handleFetchApi = useCallback(async () => {
    setIsLoading(true);

    let responseData = {
      data: undefined,
      headers: {},
      status: 0,
      statusText: "",
      statusDescription: "",
    };
    
    try {
      const res = await axios({
        method: selectedMethod,
        url: apiUrl,
      });
      setIsResposneError(false);

      const statusRes = await axios.get("/data/http_status_details.json");
      const statusList = statusRes.data;

      responseData = {
        data: res.data,
        headers: res.headers,
        status: res.status,
        statusText: res.statusText ?? statusList[res.status].reason,
        statusDescription:
          statusList[res.status].description ?? "Unknown status code",
      };
    } catch (error) {
      console.log(error);

      const statusRes = await axios.get("/data/http_status_details.json");
      const statusList = statusRes.data;

      if (axios.isAxiosError(error) && error.response) {
        responseData = {
          data: error.response.data,
          headers: error.response.headers,
          status: error.response.status,
          statusText:
            error.response.statusText ??
            statusList[error.response.status].reason,
          statusDescription:
            statusList[error.response.status].description ??
            "Unknown status code",
        };
      }
      setIsResposneError(true);
    } finally {
      setIsLoading(false);
      setResponse(responseData);
    }
  }, [apiUrl, selectedMethod]);

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

  return (
    <RequestResponseContext.Provider
      value={{
        activeMetaTab,
        handleChangeActiveMetaTab,
        selectedMethod,
        handleChangeSelectedMethod,
        apiUrl,
        handleChangeApiUrl,
        response,
        isApiUrlError,
        handleIsInputError,
        handleFetchApi,
        isResposneError,
        isLoading,
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
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
