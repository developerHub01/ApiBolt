import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";

export type TSettingTab = "global" | "project";

interface SettingContext {
  activeTab: TSettingTab;
  handleChangeActiveTab: (value?: TSettingTab) => void;
}

// const SettingContext = createContext<SettingContext | null>(null);
const SettingContext = createContext<SettingContext | null>(null);

export const useSetting = () => {
  const context = useContext(SettingContext);

  if (!context) {
    throw new Error("useSetting must be used within a SettingProvider.");
  }

  return context;
};

interface SettingProviderProps {
  children: React.ReactNode;
}

const SettingProvider = ({ children }: SettingProviderProps) => {
  const projectId = useAppSelector(selectActiveProjectId);
  const [activeTab, setActiveTab] = useState<TSettingTab>(
    projectId ? "project" : "global",
  );

  useEffect(() => setActiveTab(projectId ? "project" : "global"), [projectId]);

  const handleChangeActiveTab = useCallback((value?: TSettingTab) => {
    setActiveTab(prev => value ?? (prev === "global" ? "project" : "global"));
  }, []);

  return (
    <SettingContext.Provider
      value={{
        activeTab,
        handleChangeActiveTab,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
