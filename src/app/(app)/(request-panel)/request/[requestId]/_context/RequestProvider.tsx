"use client";

import { AxiosResponse } from "axios";
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
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export default RequestProvider;
