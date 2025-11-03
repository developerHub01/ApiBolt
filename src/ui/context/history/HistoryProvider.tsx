import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectHistoryMetaList,
  selectSelectedFilterMethod,
} from "@/context/redux/history/selectors/history";
import type {
  HistoryItemMetaInterface,
  THistoryFilter,
} from "@/types/history.types";
import { loadRequestHistoryMeta } from "@/context/redux/history/thunks/history";

interface HistoryContext {
  method: THistoryFilter;
  metaList: Array<HistoryItemMetaInterface>;
}

const HistoryContext = createContext<HistoryContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useHistory = () => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider.");
  }

  return context;
};

interface HistoryProviderProps {
  children: React.ReactNode;
}

const HistoryProvider = ({ children }: HistoryProviderProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const method = useAppSelector(selectSelectedFilterMethod);
  const metaList = useAppSelector(selectHistoryMetaList);

  const filteredMetaList = useMemo(() => {
    if (method !== "all")
      return metaList.filter((meta) => meta.method === method);
    return metaList;
  }, [method, metaList]);

  useEffect(() => {
    dispatch(loadRequestHistoryMeta());
  }, [dispatch]);

  if (!id) return null;

  return (
    <HistoryContext.Provider
      value={{
        method,
        metaList: filteredMetaList,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
