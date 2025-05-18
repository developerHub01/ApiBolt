import React, { createContext, useCallback, useContext, useState } from "react";
import type { THTTPMethods } from "../request/RequestResponseProvider";

export interface TabInterface {
  id: string;
  name: string;
  method?: THTTPMethods;
  children?: Array<string>;
}

interface TabSidebarContext {
  tabListState: Array<TabInterface>;
  isTabListHovering: boolean;
  handleTabListHovering: (value: boolean) => void;
}

const TabSidebarContext = createContext<TabSidebarContext | null>(null);

const tabList: Array<TabInterface> = [
  {
    id: "1",
    method: "get",
    name: "Request name Request name Request name Request name Request name Request name",
  },
  {
    id: "2",
    method: "post",
    name: "Request name",
  },
  {
    id: "3",
    name: "Folder",
    children: [],
  },
  {
    id: "4",
    method: "put",
    name: "Request name",
  },
  {
    id: "5",
    method: "patch",
    name: "Request name",
  },
  {
    id: "6",
    method: "delete",
    name: "Request name",
  },
  {
    id: "7",
    method: "get",
    name: "Request name",
  },
  {
    id: "8",
    name: "Folder",
    children: [],
  },
  {
    id: "9",
    method: "get",
    name: "Request name",
  },
  {
    id: "10",
    name: "Folder",
    children: [],
  },
  {
    id: "11",
    method: "get",
    name: "Request name",
  },
  {
    id: "12",
    method: "post",
    name: "Request name",
  },
  {
    id: "13",
    name: "Folder",
    children: [],
  },
  {
    id: "14",
    method: "put",
    name: "Request name",
  },
  {
    id: "15",
    method: "patch",
    name: "Request name",
  },
  {
    id: "16",
    method: "delete",
    name: "Request name",
  },
  {
    id: "17",
    method: "get",
    name: "Request name",
  },
  {
    id: "18",
    name: "Folder",
    children: [],
  },
  {
    id: "19",
    method: "get",
    name: "Request name",
  },
  {
    id: "20",
    name: "Folder",
    children: [],
  },
  {
    id: "21",
    method: "get",
    name: "Request name",
  },
  {
    id: "22",
    method: "post",
    name: "Request name",
  },
  {
    id: "23",
    name: "Folder",
    children: [],
  },
  {
    id: "24",
    method: "put",
    name: "Request name",
  },
  {
    id: "25",
    method: "patch",
    name: "Request name",
  },
  {
    id: "26",
    method: "delete",
    name: "Request name",
  },
  {
    id: "27",
    method: "get",
    name: "Request name",
  },
  {
    id: "28",
    name: "Folder",
    children: [],
  },
  {
    id: "29",
    method: "get",
    name: "Request name",
  },
  {
    id: "30",
    name: "Folder",
    children: [],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const useTabSidebar = () => {
  const context = useContext(TabSidebarContext);

  if (!context) {
    throw new Error("useTabSidebar must be used within a TabSidebarProvider.");
  }

  return context;
};

interface TabSidebarProviderProps {
  children: React.ReactNode;
}

const TabSidebarProvider = ({ children }: TabSidebarProviderProps) => {
  // const [tabListState, setTabListState] =
  //   useState<Array<TabInterface>>(tabList);
  const [tabListState] = useState<Array<TabInterface>>(tabList);
  const [isTabListHovering, setIsTabListHovering] = useState<boolean>(false);

  const handleTabListHovering = useCallback(
    (value: boolean) => {
      if (isTabListHovering !== value)
        setTimeout(() => setIsTabListHovering(value), 100);
    },
    [isTabListHovering]
  );

  return (
    <TabSidebarContext.Provider
      value={{
        tabListState,
        isTabListHovering,
        handleTabListHovering,
      }}
    >
      {children}
    </TabSidebarContext.Provider>
  );
};

export default TabSidebarProvider;
