"use client";

import axios, { AxiosResponse } from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";

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
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
