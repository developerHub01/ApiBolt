import React, { createContext, useCallback, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeRawData } from "@/context/redux/request-response/request-response-slice";

interface RequestBodyContext {
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
  const dispatch = useAppDispatch();
  const [codeLineWrap, setCodeLineWrap] = useState<boolean>(false);

  const handleToggleCodeLineWrap = useCallback(() => {
    setCodeLineWrap((prev) => !prev);
  }, []);

  if (!id) return null;

  return (
    <RequestBodyContext.Provider
      value={{
        handleChangeRawData: (raw) => dispatch(handleChangeRawData({ raw })),
        codeLineWrap,
        handleToggleCodeLineWrap,
      }}
    >
      {children}
    </RequestBodyContext.Provider>
  );
};

export default RequestBodyProvider;
