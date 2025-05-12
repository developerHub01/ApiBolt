import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type TSidebarTab = "collections" | "environments" | null;

interface SidebarContext {
  activeTab: TSidebarTab;
  lastActiveTab: TSidebarTab;
  handleChangeActiveTab: (id?: TSidebarTab) => void;
  handleToggleSidebar: () => void;
}

const localStorageSidebarActiveTabKey = "sidebar-active-tab";
const localStorageSidebarLastActiveTabKey = "sidebar-last-active-tab";

const handleLocalStorageOnSidebarToggle = (
  currentActiveTab: string | null,
  lastActiveTab: string | null
) => {
  if (currentActiveTab)
    localStorage.setItem(localStorageSidebarActiveTabKey, currentActiveTab);
  else localStorage.removeItem(localStorageSidebarActiveTabKey);
  if (lastActiveTab)
    localStorage.setItem(localStorageSidebarLastActiveTabKey, lastActiveTab);
  else localStorage.removeItem(localStorageSidebarLastActiveTabKey);
};

const SidebarContext = createContext<SidebarContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [activeTab, setActiveTab] = useState<TSidebarTab>("collections");
  const [lastActiveTab, setLastActiveTab] =
    useState<TSidebarTab>("collections");

  const handleChangeActiveTab = useCallback(
    (id: TSidebarTab = null) => {
      setLastActiveTab(activeTab);

      let currentActiveTab = id;
      if (id === activeTab) currentActiveTab = null;

      setActiveTab(currentActiveTab);

      handleLocalStorageOnSidebarToggle(currentActiveTab, id);
    },
    [activeTab, setActiveTab]
  );

  const handleToggleSidebar = useCallback(() => {
    let currentActiveTab: TSidebarTab = null;

    if (!activeTab) currentActiveTab = lastActiveTab;

    setLastActiveTab(activeTab);
    setActiveTab(currentActiveTab);

    handleLocalStorageOnSidebarToggle(currentActiveTab, activeTab);
  }, [activeTab, lastActiveTab]);

  useEffect(() => {
    setActiveTab(
      localStorage.getItem(localStorageSidebarActiveTabKey) as TSidebarTab
    );
    setLastActiveTab(
      localStorage.getItem(localStorageSidebarLastActiveTabKey) as TSidebarTab
    );
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        activeTab,
        lastActiveTab,
        handleChangeActiveTab,
        handleToggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
