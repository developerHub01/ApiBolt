import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { HistoryItemMetaInterface } from "@shared/types/history.types";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectHistoryItemOpenId,
  selectHistoryMeta,
  selectIsHistoryItemOpen,
} from "@/context/redux/history/selectors/history";
import { loadRequestHistory } from "@/context/redux/history/thunks/history";
import type { TActiveTabType } from "@shared/types/request-response.types";
import {
  selectHistoryDetailsLoading,
  selectHistoryReplacingIsLoading,
} from "@/context/redux/status/selectors/history";

interface HistoryDetailsContext {
  meta: HistoryItemMetaInterface | null;
  activeMetaTab: TActiveTabType;
  isLoading: boolean;
  codeWrap: boolean;
  handleChangeActiveMetaTab: (value: TActiveTabType) => void;
  handleToggleCodeWrap: (value?: boolean) => void;
  isReplaceAlertOpen: boolean;
  handleToggleReplaceAlert: (value?: boolean) => void;
}

const HistoryDetailsContext = createContext<HistoryDetailsContext | null>(null);

export const useHistoryDetails = () => {
  const context = useContext(HistoryDetailsContext);

  if (!context) {
    throw new Error(
      "useHistoryDetails must be used within a HistoryDetailsProvider.",
    );
  }

  return context;
};

interface HistoryDetailsProviderProps {
  children: React.ReactNode;
}

const HistoryDetailsProvider = ({ children }: HistoryDetailsProviderProps) => {
  const dispatch = useAppDispatch();
  const meta = useAppSelector(selectHistoryMeta);
  const isOpen = useAppSelector(selectIsHistoryItemOpen);
  const historyId = useAppSelector(selectHistoryItemOpenId);
  const isHistoryDetailsLoading = useAppSelector(selectHistoryDetailsLoading);
  const isHistoryReplacinglsLoading = useAppSelector(
    selectHistoryReplacingIsLoading,
  );
  const isLoading = isHistoryDetailsLoading || isHistoryReplacinglsLoading;
  const [prevHistoryId, setPrevHistoryId] = useState<string | null>(historyId);
  const [activeMetaTab, setActiveMetaTab] = useState<TActiveTabType>("params");
  const [codeWrap, setCodeWrap] = useState<boolean>(false);
  const [isReplaceAlertOpen, setIsReplaceAlertOpen] = useState<boolean>(false);

  const handleChangeActiveMetaTab = useCallback(
    (value: TActiveTabType) => setActiveMetaTab(value),
    [],
  );
  const handleToggleCodeWrap = useCallback(
    (value?: boolean) => setCodeWrap(prev => value ?? !prev),
    [],
  );
  const handleToggleReplaceAlert = useCallback(
    (value?: boolean) => setIsReplaceAlertOpen(prev => value ?? !prev),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    dispatch(loadRequestHistory());
  }, [dispatch, isOpen]);

  if (prevHistoryId !== historyId) {
    setActiveMetaTab("params");
    setPrevHistoryId(historyId);
  }

  return (
    <HistoryDetailsContext.Provider
      value={{
        meta,
        activeMetaTab,
        codeWrap,
        handleChangeActiveMetaTab,
        handleToggleCodeWrap,
        isReplaceAlertOpen,
        handleToggleReplaceAlert,
        isLoading,
      }}
    >
      {children}
    </HistoryDetailsContext.Provider>
  );
};

export default HistoryDetailsProvider;
