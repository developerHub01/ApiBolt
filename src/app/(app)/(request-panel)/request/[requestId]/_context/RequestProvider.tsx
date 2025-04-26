"use client";

import axios, { AxiosResponse } from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";

interface RequestContext {
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
}

const RequestContext = createContext<RequestContext | null>(null);

export const useRequest = () => {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error("useRequest must be used within a RequestProvider.");
  }

  return context;
};

interface RequestProviderProps {
  children: React.ReactNode;
}

const RequestProvider = ({ children }: RequestProviderProps) => {
  const [activeMetaTab, setActiveMetaTab] = useState<string>("params");
  const [selectedMethod, setSelectedMethod] = useState<string>("get");
  const [isApiUrlError, setIsApiUrlError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState<string>("");
  const [response, setResponse] = useState<AxiosResponse<any, any> | null>(
    null
  );

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

    const res = await axios({
      method: selectedMethod,
      url: apiUrl,
    });
    console.log(res);

    handleResponse(res);
    setIsLoading(false);
  }, [apiUrl, selectedMethod]);

  return (
    <RequestContext.Provider
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
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
