import React, { createContext, useCallback, useContext, useState } from "react";

export type TResponseTab = "raw" | "preview";

interface ResponseContext {
  activeMetaTab: string;
  handleChangeActiveMetaTab: (id: string) => void;
  responseTab: TResponseTab;
  handleChangeActiveResponseTab: (value: TResponseTab) => void;
  responseCodeWrap: boolean;
  handleToggleResponseCodeWrap: () => void;
}

const ResponseContext = createContext<ResponseContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useResponse = () => {
  const context = useContext(ResponseContext);

  if (!context) {
    throw new Error(
      "useResponseResponse must be used within a ResponseProvider."
    );
  }

  return context;
};

interface ResponseProviderProps {
  children: React.ReactNode;
}

const ResponseProvider = ({ children }: ResponseProviderProps) => {
  const [activeMetaTab, setActiveMetaTab] = useState<string>("body");
  const [responseTab, setResponseTab] = useState<TResponseTab>("raw");
  const [responseCodeWrap, setResponseCodeWrap] = useState<boolean>(false);

  const handleChangeActiveMetaTab = useCallback(
    (id: string) => {
      if (id === activeMetaTab) return;
      setActiveMetaTab(id);
    },
    [activeMetaTab]
  );

  const handleChangeActiveResponseTab = useCallback(
    (id: TResponseTab) => {
      if (id === responseTab) return;
      setResponseTab(id);
    },
    [responseTab]
  );

  const handleToggleResponseCodeWrap = useCallback(
    () => setResponseCodeWrap((prev) => !prev),
    []
  );

  return (
    <ResponseContext.Provider
      value={{
        activeMetaTab,
        handleChangeActiveMetaTab,
        responseTab,
        handleChangeActiveResponseTab,
        responseCodeWrap,
        handleToggleResponseCodeWrap,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export default ResponseProvider;
