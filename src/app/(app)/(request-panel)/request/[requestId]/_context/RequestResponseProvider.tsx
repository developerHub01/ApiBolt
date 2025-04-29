"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

const generateNewMetaDataItem = () => ({
  id: uuidv4(),
  key: "",
  value: "",
  description: "",
});

export interface ParamInterface {
  id: string;
  key: string;
  value?: string;
  description?: string;
  hide?: boolean;
}
export interface HeaderInterface extends ParamInterface {}

interface RequestResponseContext {
  activeMetaTab: string;
  handleChangeActiveMetaTab: (id: string) => void;
  selectedMethod: string;
  handleChangeSelectedMethod: (id: string) => void;
  apiUrl: string;
  handleChangeApiUrl: (api: string) => void;
  response: AxiosResponse<any, any> | null;
  handleResponse: (res: AxiosResponse<any, any> | null) => void;
  isApiUrlError: boolean;
  handleIsInputError: (value: boolean) => void;
  handleFetchApi: () => Promise<void>;
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

const useMetaDataManager = <T extends { id: string; hide?: boolean }>(
  setState: React.Dispatch<React.SetStateAction<Array<T>>>,
  generateNewItem: () => T
) => {
  const handleChange = useCallback((id: string, key: string, value: string) => {
    setState((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
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
        console.log({ isAllChecked });
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
  const [activeMetaTab, setActiveMetaTab] = useState<string>("params");
  const [selectedMethod, setSelectedMethod] = useState<string>("get");
  const [isApiUrlError, setIsApiUrlError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState<string>("");
  const [response, setResponse] = useState<AxiosResponse<any, any> | null>(
    null
  );
  const [params, setParams] = useState<Array<ParamInterface>>([]);
  const [headers, setHeaders] = useState<Array<HeaderInterface>>([]);
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

  const handleChangeActiveMetaTab = useCallback((id: string) => {
    setActiveMetaTab(id);
  }, []);
  const handleChangeSelectedMethod = useCallback((id: string) => {
    setSelectedMethod(id);
  }, []);
  const handleChangeApiUrl = useCallback((api: string) => setApiUrl(api), []);

  const handleResponse = useCallback(
    (res: AxiosResponse<any, any> | null = null) => {
      setResponse(res);
    },
    []
  );

  const handleIsInputError = useCallback((value: boolean) => {
    setIsApiUrlError(value);
  }, []);

  const handleFetchApi = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await axios({
        method: selectedMethod,
        url: apiUrl,
      });
      console.log(res);
      handleResponse(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, selectedMethod]);

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
        handleResponse,
        isApiUrlError,
        handleIsInputError,
        handleFetchApi,
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
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
