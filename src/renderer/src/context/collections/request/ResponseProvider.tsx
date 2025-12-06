import React, { createContext, useCallback, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectActiveResponseDataTab,
  selectActiveResponseMetaTab,
  selectResponseCodeWrap,
} from "@/context/redux/request-response/selectors/response";
import type {
  TResponseDataTab,
  TResponseMetaTab,
} from "@shared/types/request-response.types";
import {
  handleActiveResponseDataTab,
  handleActiveResponseMetaTab,
  handleToggleResponseCodeWrap as handleResponseCodeWrap,
} from "@/context/redux/request-response/request-response-slice";

interface ResponseContext {
  activeMetaTab: string | null;
  handleChangeActiveMetaTab: (id: TResponseMetaTab) => void;
  responseTab: TResponseDataTab;
  handleChangeActiveResponseTab: (value: TResponseDataTab) => void;
  responseCodeWrap: boolean;
  handleToggleResponseCodeWrap: () => void;
}

const ResponseContext = createContext<ResponseContext | null>(null);

export const useResponse = () => {
  const context = useContext(ResponseContext);

  if (!context) {
    throw new Error(
      "useResponseResponse must be used within a ResponseProvider."
    );
  }

  return context;
};

interface ResponseProviderProps {
  children: React.ReactNode;
}

const ResponseProvider = ({ children }: ResponseProviderProps) => {
  const dispatch = useAppDispatch();
  const activeMetaTab = useAppSelector(selectActiveResponseMetaTab);
  const responseTab = useAppSelector(selectActiveResponseDataTab);
  const responseCodeWrap = useAppSelector(selectResponseCodeWrap);

  const handleChangeActiveMetaTab = useCallback(
    (id: TResponseMetaTab) => {
      if (id === activeMetaTab) return;
      dispatch(handleActiveResponseMetaTab(id));
    },
    [activeMetaTab, dispatch]
  );

  const handleChangeActiveResponseTab = useCallback(
    (id: TResponseDataTab) => {
      if (id === responseTab) return;
      dispatch(handleActiveResponseDataTab(id));
    },
    [dispatch, responseTab]
  );

  const handleToggleResponseCodeWrap = useCallback(
    () => dispatch(handleResponseCodeWrap()),
    [dispatch]
  );

  return (
    <ResponseContext.Provider
      value={{
        activeMetaTab,
        handleChangeActiveMetaTab,
        responseTab,
        handleChangeActiveResponseTab,
        responseCodeWrap,
        handleToggleResponseCodeWrap,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export default ResponseProvider;
