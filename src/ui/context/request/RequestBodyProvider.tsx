import React, { createContext, useCallback, useContext, useState } from "react";
import {
  useRequestResponse,
  type TRequestBodyType,
} from "@/context/request/RequestResponseProvider";
import type { TContentType } from "@/types";
import { useParams } from "react-router-dom";

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

// eslint-disable-next-line react-refresh/only-export-components
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
  const { id } = useParams();

  const {
    rawData,
    handleChangeRawData: changeRawData,
    requestBodyType,
    handleChangeRequestBodyType,
    rawRequestBodyType,
    handleChangeRawRequestBodyType,
  } = useRequestResponse();
  const [codeLineWrap, setCodeLineWrap] = useState<boolean>(false);

  const handleToggleCodeLineWrap = useCallback(() => {
    setCodeLineWrap((prev) => !prev);
  }, []);

  if (!id) return null;

  return (
    <RequestBodyContext.Provider
      value={{
        requestBodyType: requestBodyType[id],
        handleChangeRequestBodyType,
        rawRequestBodyType: rawRequestBodyType[id],
        handleChangeRawRequestBodyType,
        rawData: rawData[id],
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
