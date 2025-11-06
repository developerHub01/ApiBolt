import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import type { HistoryItemMetaInterface } from "@/types/history.types";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectHistoryMeta,
  selectIsHistoryItemOpen,
} from "@/context/redux/history/selectors/history";
import { loadRequestHistory } from "@/context/redux/history/thunks/history";
import type { TActiveTabType } from "@/types/request-response.types";

interface HistoryDetailsContext {
  meta: HistoryItemMetaInterface | null;
  activeMetaTab: TActiveTabType;
  handleChangeActiveMetaTab: (value: TActiveTabType) => void;
}

const HistoryDetailsContext = createContext<HistoryDetailsContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useHistoryDetails = () => {
  const context = useContext(HistoryDetailsContext);

  if (!context) {
    throw new Error(
      "useHistoryDetails must be used within a HistoryDetailsProvider."
    );
  }

  return context;
};

interface HistoryDetailsProviderProps {
  children: React.ReactNode;
}

const HistoryDetailsProvider = ({ children }: HistoryDetailsProviderProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const meta = useAppSelector(selectHistoryMeta);
  const isOpen = useAppSelector(selectIsHistoryItemOpen);
  const [activeMetaTab, setActiveMetaTab] = useState<TActiveTabType>("params");

  const handleChangeActiveMetaTab = useCallback(
    (value: TActiveTabType) => setActiveMetaTab(value),
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    dispatch(loadRequestHistory());
  }, [dispatch, isOpen]);

  if (!id) return null;

  return (
    <HistoryDetailsContext.Provider
      value={{
        meta,
        activeMetaTab,
        handleChangeActiveMetaTab,
      }}
    >
      {children}
    </HistoryDetailsContext.Provider>
  );
};

export default HistoryDetailsProvider;
