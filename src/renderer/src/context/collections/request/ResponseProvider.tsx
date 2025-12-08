import React, { createContext, useCallback, useContext, useMemo } from "react";
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
import { selectApplyingKeyboardShortcuts } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";

interface ResponseContext {
  activeMetaTab: string | null;
  handleChangeActiveMetaTab: (id: TResponseMetaTab) => void;
  responseTab: TResponseDataTab;
  handleChangeActiveResponseTab: (value: TResponseDataTab) => void;
  responseCodeWrap: boolean;
  responsePanelToggleShortcut: string;
  handleToggleResponseCodeWrap: () => void;
}

const ResponseContext = createContext<ResponseContext | null>(null);

export const useResponse = () => {
  const context = useContext(ResponseContext);

  if (!context) {
    throw new Error("useResponse must be used within a ResponseProvider.");
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
  const shortcuts = useAppSelector(selectApplyingKeyboardShortcuts);
  const responsePanelToggleShortcut = useMemo(
    () =>
      shortcuts["toggle_response_panel"]
        ? keyListStringify(shortcuts["toggle_response_panel"])
        : "",
    [shortcuts],
  );

  const handleChangeActiveMetaTab = useCallback(
    (id: TResponseMetaTab) => {
      if (id === activeMetaTab) return;
      dispatch(handleActiveResponseMetaTab(id));
    },
    [activeMetaTab, dispatch],
  );

  const handleChangeActiveResponseTab = useCallback(
    (id: TResponseDataTab) => {
      if (id === responseTab) return;
      dispatch(handleActiveResponseDataTab(id));
    },
    [dispatch, responseTab],
  );

  const handleToggleResponseCodeWrap = useCallback(
    () => dispatch(handleResponseCodeWrap()),
    [dispatch],
  );

  return (
    <ResponseContext.Provider
      value={{
        activeMetaTab,
        handleChangeActiveMetaTab,
        responseTab,
        handleChangeActiveResponseTab,
        responseCodeWrap,
        responsePanelToggleShortcut,
        handleToggleResponseCodeWrap,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export default ResponseProvider;
