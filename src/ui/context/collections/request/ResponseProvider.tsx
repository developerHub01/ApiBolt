import { useAppSelector } from "@/context/redux/hooks";
import { selectResponse } from "@/context/redux/request-response/selectors/response";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type TResponseTab = "raw" | "preview";

interface ResponseContext {
  activeMetaTab: string | null;
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

const localStorageResponseActiveTabKey = "response-active-tab";

interface ResponseProviderProps {
  children: React.ReactNode;
}

const ResponseProvider = ({ children }: ResponseProviderProps) => {
  const [activeMetaTab, setActiveMetaTab] = useState<string | null>(
    () => localStorage.getItem(localStorageResponseActiveTabKey) ?? "body"
  );
  const [responseTab, setResponseTab] = useState<TResponseTab>("raw");
  const [responseCodeWrap, setResponseCodeWrap] = useState<boolean>(false);
  const response = useAppSelector(selectResponse);
  const responseStatus = response?.status;

  useEffect(() => {
    setActiveMetaTab(null);
  }, []);

  useEffect(() => {
    if (!activeMetaTab) return;
    localStorage.setItem(localStorageResponseActiveTabKey, activeMetaTab);
  }, [activeMetaTab]);

  useEffect(() => {
    if (responseStatus && activeMetaTab !== "error") return;
    if (responseStatus && activeMetaTab === "error")
      return setActiveMetaTab("body");
    setActiveMetaTab("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseStatus]);

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
