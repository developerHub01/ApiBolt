"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

const generateNewParam = () => ({
  id: uuidv4(),
  key: "",
  value: "",
  description: "",
});

export interface ParamInterface {
  id: string;
  key: string;
  value?: string;
  description?: string;
  hide?: boolean;
}

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
  params: Array<ParamInterface>;
  handleChangeParams: (id: string, key: string, value: string) => void;
  handleDeleteParam: (id: string) => void;
  handleAddNewParam: () => void;
  handleParamCheckToggle: (id?: string) => void;
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
  const [params, setParams] = useState<Array<ParamInterface>>([]);

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

  /* params start ==================== */
  const handleChangeParams = useCallback(
    (id: string, key: string, value: string) => {
      setParams((prev) =>
        prev.map((param) => {
          if (param.id !== id) return param;
          return {
            ...param,
            [key]: value,
          };
        })
      );
    },
    []
  );

  const handleDeleteParam = useCallback((id: string) => {
    setParams((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleAddNewParam = useCallback(() => {
    setParams((prev) => [...prev, generateNewParam()]);
  }, []);

  const handleParamCheckToggle = useCallback((id?: string) => {
    if (id) {
      return setParams((prev) =>
        prev.map((param) => {
          if (param.id !== id) return param;
          return {
            ...param,
            hide: param.hide ? undefined : true,
          };
        })
      );
    } else {
      return setParams((prev) => {
        const isAllChecked = prev.every((param) => !param.hide);

        if (isAllChecked)
          return prev.map((param) => ({
            ...param,
            hide: true,
          }));
        else
          return prev.map((param) => {
            if (param.hide) delete param.hide;
            return param;
          });
      });
    }
  }, []);
  /* params end ==================== */

  const handleFetchApi = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await axios({
        method: selectedMethod,
        url: apiUrl,
      });
      console.log(res);
      handleResponse(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        params,
        handleChangeParams,
        handleDeleteParam,
        handleAddNewParam,
        handleParamCheckToggle,
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
