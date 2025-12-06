import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeActiveId,
  selectThemeMetaLoaded,
} from "@/context/redux/theme/selectors/theme";
import {
  changeActiveThemeId,
  loadThemeMetaList,
} from "@/context/redux/theme/thunks/theme";
import { useSetting } from "@/context/setting/SettingProvider";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";

export type TSettingThemeTab = "global" | "project";

interface SettingThemeContext {
  activeThemeId: string;
  globalThemeId: string;
  localThemeId: string | null;
  handleChangeActiveTheme: (id?: string | null) => void;
}

// const SettingThemeContext = createContext<SettingThemeContext | null>(null);
const SettingThemeContext = createContext<SettingThemeContext | null>(null);

export const useSettingTheme = () => {
  const context = useContext(SettingThemeContext);

  if (!context) {
    throw new Error(
      "useSettingTheme must be used within a SettingThemeProvider.",
    );
  }

  return context;
};

interface SettingThemeProviderProps {
  children: React.ReactNode;
}

const SettingThemeProvider = ({ children }: SettingThemeProviderProps) => {
  const dispatch = useAppDispatch();
  const haveLoaded = useAppSelector(selectThemeMetaLoaded);
  const { activeTab } = useSetting();
  const projectId = useAppSelector(selectActiveProjectId);
  const { global: globalThemeId, local: localThemeId } =
    useAppSelector(selectThemeActiveId);

  const activeThemeId = useMemo(
    () =>
      (activeTab === "global" || (activeTab === "project" && !localThemeId)
        ? globalThemeId
        : localThemeId)!,
    [activeTab, globalThemeId, localThemeId],
  );

  const handleChangeActiveTheme = useCallback(
    (id?: string | null) => {
      dispatch(
        changeActiveThemeId({
          activeTheme: id ?? null,
          projectId: activeTab === "project" ? projectId : null,
        }),
      );
    },
    [dispatch, projectId, activeTab],
  );

  useEffect(() => {
    if (haveLoaded) return;

    (async () => await dispatch(loadThemeMetaList()))();
  }, [dispatch, haveLoaded]);

  return (
    <SettingThemeContext.Provider
      value={{
        activeThemeId,
        handleChangeActiveTheme,
        globalThemeId,
        localThemeId,
      }}
    >
      {children}
    </SettingThemeContext.Provider>
  );
};

export default SettingThemeProvider;
