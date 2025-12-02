import React, { createContext, useContext } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemeHaveError } from "@/context/redux/theme/selectors/theme";

interface ThemeEditorContext {
  haveError: boolean;
}

const ThemeEditorContext = createContext<ThemeEditorContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeEditor = () => {
  const context = useContext(ThemeEditorContext);

  if (!context) {
    throw new Error(
      "useThemeEditor must be used within a ThemeEditorProvider."
    );
  }

  return context;
};

interface ThemeEditorProviderProps {
  children: React.ReactNode;
}

const ThemeEditorProvider = ({ children }: ThemeEditorProviderProps) => {
  const haveError = useAppSelector(selectThemeHaveError);

  return (
    <ThemeEditorContext.Provider
      value={{
        haveError,
      }}
    >
      {children}
    </ThemeEditorContext.Provider>
  );
};

export default ThemeEditorProvider;
