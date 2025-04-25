"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface RequestBodyContext {
  requestBodyType: string;
  handleChangeRequestBodyType: (id: string) => void;
  rawRequestBodyType: string;
  handleChangeRawRequestBodyType: (id: string) => void;
  rawData: string;
  handleChangeRawData: (data: string) => void;
}

const RequestBodyContext = createContext<RequestBodyContext | null>(null);

export const useRequestBody = () => {
  const context = useContext(RequestBodyContext);

  if (!context) {
    throw new Error(
      "useRequestBody must be used within a RequestBodyProvider."
    );
  }

  return context;
};

interface RequestBodyProviderProps {
  children: React.ReactNode;
}

const RequestBodyProvider = ({ children }: RequestBodyProviderProps) => {
  const [requestBodyType, setRequestBodyType] = useState<string>("none");
  const [rawRequestBodyType, setRawRequestBodyType] = useState<string>("json");
  const [rawData, setRawData] = useState<string>("");

  const handleChangeRequestBodyType = useCallback((id: string) => {
    if (id !== "raw" && rawData) setRawData("");

    setRequestBodyType(id);
  }, []);

  const handleChangeRawRequestBodyType = useCallback((id: string) => {
    setRawRequestBodyType(id);
  }, []);

  const handleChangeRawData = useCallback((data: string) => {
    setRawData(data);
  }, []);

  return (
    <RequestBodyContext.Provider
      value={{
        requestBodyType,
        handleChangeRequestBodyType,
        rawRequestBodyType,
        handleChangeRawRequestBodyType,
        rawData,
        handleChangeRawData,
      }}
    >
      {children}
    </RequestBodyContext.Provider>
  );
};

export default RequestBodyProvider;
