"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface RequestBodyContext {
  requestBodyType: string;
  handleChangeRequestBodyType: (id: string) => void;
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
  const [requestBodyType, setRequestBodyType] = useState<string>("");

  const handleChangeRequestBodyType = useCallback((id: string) => {
    setRequestBodyType(id);
  }, []);

  return (
    <RequestBodyContext.Provider
      value={{
        requestBodyType,
        handleChangeRequestBodyType,
      }}
    >
      {children}
    </RequestBodyContext.Provider>
  );
};

export default RequestBodyProvider;
