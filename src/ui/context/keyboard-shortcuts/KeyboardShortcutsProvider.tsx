import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectGlobalKeyboardShortcuts,
  selectLocalKeyboardShortcuts,
} from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import type { KeybaordShortCutInterface } from "@/types/keyboard-shortcut.types";

export type TKeyboardShortcutsTab = "global" | "project";

interface KeyboardShortcutsContext {
  activeTab: TKeyboardShortcutsTab;
  handleChangeActiveTab: (value?: TKeyboardShortcutsTab) => void;
  applyingKeybindingMap: Record<string, KeybaordShortCutInterface>;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContext | null>(
  null
);

// eslint-disable-next-line react-refresh/only-export-components
export const useKeyboardShortcuts = () => {
  const context = useContext(KeyboardShortcutsContext);

  if (!context) {
    throw new Error(
      "useKeyboardShortcuts must be used within a KeyboardShortcutsProvider."
    );
  }

  return context;
};

interface KeyboardShortcutsProviderProps {
  children: React.ReactNode;
}

const KeyboardShortcutsProvider = ({
  children,
}: KeyboardShortcutsProviderProps) => {
  const projectId = useAppSelector(selectActiveProjectId);
  const [activeTab, setActiveTab] = useState<TKeyboardShortcutsTab>(
    projectId ? "project" : "global"
  );
  const globalMap = useAppSelector(selectGlobalKeyboardShortcuts);
  const localMap = useAppSelector(selectLocalKeyboardShortcuts);

  const applyingKeybindingMap = useMemo(() => {
    if (activeTab === "global") return globalMap;

    return {
      ...globalMap,
      ...localMap,
    };
  }, [activeTab, globalMap, localMap]);

  useEffect(() => setActiveTab(projectId ? "project" : "global"), [projectId]);

  const handleChangeActiveTab = useCallback((value?: TKeyboardShortcutsTab) => {
    setActiveTab((prev) => value ?? (prev === "global" ? "project" : "global"));
  }, []);

  return (
    <KeyboardShortcutsContext.Provider
      value={{
        activeTab,
        handleChangeActiveTab,
        applyingKeybindingMap,
      }}
    >
      {children}
    </KeyboardShortcutsContext.Provider>
  );
};

export default KeyboardShortcutsProvider;
