import React, { createContext, useContext, useMemo } from "react";
import { RequestListItemInterface } from "@shared/types/request-response.types";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";

interface TabsItemContext {
  id: string;
  index: number;
  tabDetails: RequestListItemInterface;
}

const TabsItemContext = createContext<TabsItemContext | null>(null);

export const useTabsItem = () => {
  const context = useContext(TabsItemContext);

  if (!context) {
    throw new Error("useTabsItem must be used within a TabsItemProvider.");
  }

  return context;
};

interface TabsItemProviderProps {
  id: string;
  index: number;
  children: React.ReactNode;
}

const TabsItemProvider = ({ id, index, children }: TabsItemProviderProps) => {
  const { requestList } = useTabsView();

  const tabDetails = useMemo(() => requestList[id], [id, requestList]);

  const value = useMemo(
    () => ({
      id,
      index,
      tabDetails,
    }),
    [id, index, tabDetails],
  );

  return (
    <TabsItemContext.Provider value={value}>
      {children}
    </TabsItemContext.Provider>
  );
};

export default TabsItemProvider;
