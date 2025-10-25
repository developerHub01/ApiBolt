import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";

export type TKeyboardShortcutsTab = "global" | "project";

interface KeyboardShortcutsContext {
  activeTab: TKeyboardShortcutsTab;
  handleChangeActiveTab: (value?: TKeyboardShortcutsTab) => void;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useKeyboardShortcuts = () => {
  const context = useContext(KeyboardShortcutsContext);

  if (!context) {
    throw new Error("useKeyboardShortcuts must be used within a KeyboardShortcutsProvider.");
  }

  return context;
};

interface KeyboardShortcutsProviderProps {
  children: React.ReactNode;
}

const KeyboardShortcutsProvider = ({ children }: KeyboardShortcutsProviderProps) => {
  const projectId = useAppSelector(selectActiveProjectId);
  const [activeTab, setActiveTab] = useState<TKeyboardShortcutsTab>(
    projectId ? "project" : "global"
  );

  useEffect(() => setActiveTab(projectId ? "project" : "global"), [projectId]);

  const handleChangeActiveTab = useCallback((value?: TKeyboardShortcutsTab) => {
    setActiveTab((prev) => value ?? (prev === "global" ? "project" : "global"));
  }, []);

  return (
    <KeyboardShortcutsContext.Provider
      value={{
        activeTab,
        handleChangeActiveTab,
      }}
    >
      {children}
    </KeyboardShortcutsContext.Provider>
  );
};

export default KeyboardShortcutsProvider;
