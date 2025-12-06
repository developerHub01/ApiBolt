import React, { createContext, useCallback, useContext, useState } from "react";

interface GlobalContext {
  isFullscreen: boolean;
  toggleFullscreen: (
    containerRef?: React.RefObject<HTMLDivElement | null>,
  ) => void;
}

const GlobalContext = createContext<GlobalContext | null>(null);

export const useGlobal = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider.");
  }

  return context;
};

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(
    (containerRef?: React.RefObject<HTMLDivElement | null>) => {
      const target = containerRef?.current || document.documentElement;

      if (!document.fullscreenElement) {
        target
          ?.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(err => console.error("Failed to enter fullscreen", err));
      } else {
        document
          .exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch(err => console.error("Failed to exit fullscreen", err));
      }
    },
    [],
  );

  return (
    <GlobalContext.Provider
      value={{
        isFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
