"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { TContentType } from "@/types";

export type TRequestBodyType =
  | "none"
  | "form-data"
  | "x-www-form-urlencoded"
  | "raw"
  | "binary";

interface RequestBodyContext {
  requestBodyType: TRequestBodyType;
  handleChangeRequestBodyType: (id: TRequestBodyType) => void;
  rawRequestBodyType: TContentType;
  handleChangeRawRequestBodyType: (id: TContentType) => void;
  rawData: string;
  handleChangeRawData: (data: string) => void;
  codeLineWrap: boolean;
  handleToggleCodeLineWrap: () => void;
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
  const [requestBodyType, setRequestBodyType] =
    useState<TRequestBodyType>("none");
  const [rawRequestBodyType, setRawRequestBodyType] =
    useState<TContentType>("json");
  const [rawData, setRawData] = useState<string>("");
  const [codeLineWrap, setCodeLineWrap] = useState<boolean>(false);

  const handleChangeRequestBodyType = useCallback((id: TRequestBodyType) => {
    if (id !== "raw" && rawData) setRawData("");

    setRequestBodyType(id);
  }, []);

  const handleChangeRawRequestBodyType = useCallback((id: TContentType) => {
    setRawRequestBodyType(id);
  }, []);

  const handleChangeRawData = useCallback((data: string) => {
    setRawData(data);
  }, []);

  const handleToggleCodeLineWrap = useCallback(() => {
    setCodeLineWrap((prev) => !prev);
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
        codeLineWrap,
        handleToggleCodeLineWrap,
      }}
    >
      {children}
    </RequestBodyContext.Provider>
  );
};

export default RequestBodyProvider;
