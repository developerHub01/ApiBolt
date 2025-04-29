"use client";

import { TContentType } from "@/types";
import React, { createContext, useCallback, useContext, useState } from "react";

interface RequestParamsContext {}

const RequestParamsContext = createContext<RequestParamsContext | null>(null);

export const useRequestParams = () => {
  const context = useContext(RequestParamsContext);

  if (!context) {
    throw new Error(
      "useRequestParams must be used within a RequestParamsProvider."
    );
  }

  return context;
};

interface RequestParamsProviderProps {
  children: React.ReactNode;
}

const RequestParamsProvider = ({ children }: RequestParamsProviderProps) => {

  return (
    <RequestParamsContext.Provider value={{}}>
      {children}
    </RequestParamsContext.Provider>
  );
};

export default RequestParamsProvider;
