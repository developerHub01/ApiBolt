"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { TContentType } from "@/types";
import {
  TRequestBodyType,
  useRequestResponse,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

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
  const {
    rawData,
    handleChangeRawData: changeRawData,
    requestBodyType,
    handleChangeRequestBodyType,
  } = useRequestResponse();
  const [rawRequestBodyType, setRawRequestBodyType] =
    useState<TContentType>("json");
  const [codeLineWrap, setCodeLineWrap] = useState<boolean>(false);

  const handleChangeRawRequestBodyType = useCallback((id: TContentType) => {
    setRawRequestBodyType(id);
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
        handleChangeRawData: changeRawData,
        codeLineWrap,
        handleToggleCodeLineWrap,
      }}
    >
      {children}
    </RequestBodyContext.Provider>
  );
};

export default RequestBodyProvider;
