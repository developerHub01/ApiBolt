import React, { createContext, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateRequestBodyRaw } from "@/context/redux/request-response/thunks/body-raw";

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
  const codeLineWrap = useAppSelector(
    (state) =>
      state.requestResponse.rawDataLineWrap?.[
        state.requestResponse.selectedTab!
      ] ?? true
  );

  const handleToggleCodeLineWrap = useCallback(() => {
    dispatch(
      updateRequestBodyRaw({
        lineWrap: !codeLineWrap,
      })
    );
  }, [codeLineWrap, dispatch]);

  if (!id) return null;

  return (
    <RequestBodyContext.Provider
      value={{
        handleChangeRawData: (rawData) =>
          dispatch(
            updateRequestBodyRaw({
              rawData,
            })
          ),
        codeLineWrap,
        handleToggleCodeLineWrap,
      }}
    >
      {children}
    </RequestBodyContext.Provider>
  );
};

export default RequestBodyProvider;
