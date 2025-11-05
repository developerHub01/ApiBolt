import React, { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import type { HistoryItemMetaInterface } from "@/types/history.types";
import { useAppSelector } from "@/context/redux/hooks";
import { selectHistoryMeta } from "@/context/redux/history/selectors/history";

interface HistoryDetailsContext {
  meta: HistoryItemMetaInterface | null;
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
  // const dispatch = useAppDispatch();
  const meta = useAppSelector(selectHistoryMeta);

  if (!id) return null;

  return (
    <HistoryDetailsContext.Provider
      value={{
        meta,
      }}
    >
      {children}
    </HistoryDetailsContext.Provider>
  );
};

export default HistoryDetailsProvider;
