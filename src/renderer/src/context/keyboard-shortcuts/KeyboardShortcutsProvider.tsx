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
import type { KeybaordShortCutInterface } from "@shared/types/keyboard-shortcut.types";
import { areKeyListMatched } from "@/utils/keyboard-shortcut.utils";

export type TKeyboardShortcutsTab = "global" | "local";
export type TSearchByType = "action" | "keyboard";

interface SearchTermInterface {
  global: string;
  local: string;
}

interface SearchKeyListInterface {
  global: Array<string>;
  local: Array<string>;
}

interface SelectedSearchByTypeInterface {
  global: TSearchByType;
  local: TSearchByType;
}

const searchTermInitial: SearchTermInterface = {
  global: "",
  local: "",
};

const searchKeyListInitial: SearchKeyListInterface = {
  global: [],
  local: [],
};

const selectedSearchByTypeInitial: SelectedSearchByTypeInterface = {
  global: "action",
  local: "action",
};

interface KeyboardShortcutsContext {
  activeTab: TKeyboardShortcutsTab;
  searchTerm: string;
  searchByType: TSearchByType;
  searchKeyList: Array<string>;
  handleChangeActiveTab: (value?: TKeyboardShortcutsTab) => void;
  applyingKeybindingMap: Record<string, KeybaordShortCutInterface>;
  searchResult: Record<string, KeybaordShortCutInterface>;
  searchResultCount: number;
  handleChangeSearchTerm: (value?: string) => void;
  handleChangeSearchByType: (value: TSearchByType) => void;
  handleChangeSearchKeyList: (value: Array<string>) => void;
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
    projectId ? "local" : "global"
  );
  const globalMap = useAppSelector(selectGlobalKeyboardShortcuts);
  const localMap = useAppSelector(selectLocalKeyboardShortcuts);
  const [searchTerm, setSearchTerm] =
    useState<SearchTermInterface>(searchTermInitial);
  const [searchKeyList, setSearchKeyList] =
    useState<SearchKeyListInterface>(searchKeyListInitial);
  const [selectedSearchByType, setSelectedSearchByType] =
    useState<SelectedSearchByTypeInterface>(selectedSearchByTypeInitial);
  const [searchResult, setSearchResult] = useState<
    Record<string, KeybaordShortCutInterface>
  >({});

  const applyingKeybindingMap = useMemo(() => {
    if (activeTab === "global") return globalMap;

    return {
      ...globalMap,
      ...localMap,
    };
  }, [activeTab, globalMap, localMap]);

  useEffect(() => {
    const keybindingMap: Record<string, KeybaordShortCutInterface> = {};

    /* if search term or search keys are emtpy then render whole list */
    if (
      (selectedSearchByType[activeTab] === "action" &&
        !searchTerm[activeTab]) ||
      (selectedSearchByType[activeTab] === "keyboard" &&
        !searchKeyList[activeTab].length)
    )
      return setSearchResult(applyingKeybindingMap);

    Object.entries(applyingKeybindingMap).map(([id, data]) => {
      const isSearchTermMatched =
        selectedSearchByType[activeTab] === "action" &&
        (data.id
          .toLowerCase()
          .includes(searchTerm[activeTab].toLowerCase().trim()) ||
          data.label
            .toLowerCase()
            .includes(searchTerm[activeTab].toLowerCase().trim()));

      const isSearchKeybindingMatched =
        selectedSearchByType[activeTab] === "keyboard" &&
        areKeyListMatched(data.key ?? [], searchKeyList[activeTab]);

      if (isSearchTermMatched || isSearchKeybindingMatched) {
        keybindingMap[id] = {
          ...data,
        };
      }
    });

    setSearchResult(keybindingMap);
  }, [
    activeTab,
    applyingKeybindingMap,
    searchKeyList,
    searchTerm,
    selectedSearchByType,
  ]);

  useEffect(() => setActiveTab(projectId ? "local" : "global"), [projectId]);

  const handleChangeActiveTab = useCallback((value?: TKeyboardShortcutsTab) => {
    setActiveTab((prev) => value ?? (prev === "global" ? "local" : "global"));
  }, []);

  const handleChangeSearchTerm = useCallback(
    (value?: string) => {
      setSearchTerm((prev) => ({
        ...prev,
        [activeTab]: value ?? "",
      }));
    },
    [activeTab]
  );

  const handleChangeSearchByType = useCallback(
    (value: TSearchByType) => {
      setSelectedSearchByType((prev) => ({
        ...prev,
        [activeTab]: value,
      }));
    },
    [activeTab]
  );

  const handleChangeSearchKeyList = useCallback(
    (value: Array<string>) => {
      setSearchKeyList((prev) => ({
        ...prev,
        [activeTab]: value,
      }));
    },
    [activeTab]
  );

  const showableSearchTerm = useMemo(
    () => (activeTab === "global" ? searchTerm.global : searchTerm.local),
    [searchTerm, activeTab]
  );

  const showableSearchByType = useMemo(
    () =>
      activeTab === "global"
        ? selectedSearchByType.global
        : selectedSearchByType.local,
    [selectedSearchByType, activeTab]
  );

  const showableSearchKeyList = useMemo(
    () => (activeTab === "global" ? searchKeyList.global : searchKeyList.local),
    [searchKeyList, activeTab]
  );

  const searchResultCount = useMemo(
    () => Object.keys(searchResult).length,
    [searchResult]
  );

  return (
    <KeyboardShortcutsContext.Provider
      value={{
        activeTab,
        searchTerm: showableSearchTerm,
        searchByType: showableSearchByType,
        searchKeyList: showableSearchKeyList,
        handleChangeActiveTab,
        applyingKeybindingMap,
        searchResult,
        searchResultCount,
        handleChangeSearchTerm,
        handleChangeSearchByType,
        handleChangeSearchKeyList,
      }}
    >
      {children}
    </KeyboardShortcutsContext.Provider>
  );
};

export default KeyboardShortcutsProvider;
