import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectHistoryMetaCount,
  selectHistoryMetaList,
  selectIsHistoryMetaHave,
  selectSelectedFilterMethod,
} from "@/context/redux/history/selectors/history";
import type {
  HistoryItemMetaInterface,
  THistoryFilter,
} from "@/types/history.types";
import { loadRequestHistoryMeta } from "@/context/redux/history/thunks/history";

interface HistoryMetaListContext {
  method: THistoryFilter;
  metaList: Array<HistoryItemMetaInterface>;
  metaCount: number;
}

const HistoryMetaListContext = createContext<HistoryMetaListContext | null>(
  null
);

// eslint-disable-next-line react-refresh/only-export-components
export const useHistoryMetaList = () => {
  const context = useContext(HistoryMetaListContext);

  if (!context) {
    throw new Error(
      "useHistoryMetaList must be used within a HistoryMetaListProvider."
    );
  }

  return context;
};

interface HistoryMetaListProviderProps {
  children: React.ReactNode;
}

const HistoryMetaListProvider = ({
  children,
}: HistoryMetaListProviderProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const method = useAppSelector(selectSelectedFilterMethod);
  const metaList = useAppSelector(selectHistoryMetaList);
  const metaCount = useAppSelector(selectHistoryMetaCount);
  const listAlreadyHave = useAppSelector(selectIsHistoryMetaHave);

  const filteredMetaList = useMemo(() => {
    if (method !== "all")
      return metaList.filter((meta) => meta.method === method);
    return metaList;
  }, [method, metaList]);

  useEffect(() => {
    if (listAlreadyHave) return;
    dispatch(loadRequestHistoryMeta());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!id) return null;

  return (
    <HistoryMetaListContext.Provider
      value={{
        method,
        metaList: filteredMetaList,
        metaCount,
      }}
    >
      {children}
    </HistoryMetaListContext.Provider>
  );
};

export default HistoryMetaListProvider;
