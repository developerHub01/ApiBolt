"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface ResponseBodyContext {
  requestBodyType: string;
  handleChangeRequestBodyType: (id: string) => void;
  rawRequestBodyType: string;
  handleChangeRawRequestBodyType: (id: string) => void;
  rawData: string;
  handleChangeRawData: (data: string) => void;
}

const ResponseBodyContext = createContext<ResponseBodyContext | null>(null);

export const useResponseBody = () => {
  const context = useContext(ResponseBodyContext);

  if (!context) {
    throw new Error(
      "useResponseBody must be used within a ResponseBodyProvider."
    );
  }

  return context;
};

interface ResponseBodyProviderProps {
  children: React.ReactNode;
}

const ResponseBodyProvider = ({ children }: ResponseBodyProviderProps) => {
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
    <ResponseBodyContext.Provider
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
    </ResponseBodyContext.Provider>
  );
};

export default ResponseBodyProvider;
