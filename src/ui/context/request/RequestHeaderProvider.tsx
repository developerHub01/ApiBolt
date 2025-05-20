import React, { createContext, useCallback, useContext, useState } from "react";
import { useParams } from "react-router-dom";

interface RequestHeaderContext {
  showHiddenHeader: boolean;
  handleChangeShowHiddenHeader: (value?: boolean) => void;
}

const RequestHeaderContext = createContext<RequestHeaderContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useRequestHeader = () => {
  const context = useContext(RequestHeaderContext);

  if (!context) {
    throw new Error(
      "useRequestHeader must be used within a RequestHeaderProvider."
    );
  }

  return context;
};

interface RequestHeaderProviderProps {
  children: React.ReactNode;
}

const RequestHeaderProvider = ({ children }: RequestHeaderProviderProps) => {
  const { id } = useParams();
  const [showHiddenHeader, setShowHiddenHeader] = useState<boolean>(false);

  const handleChangeShowHiddenHeader = useCallback((value?: boolean) => {
    if (value === undefined) return setShowHiddenHeader((prev) => !prev);

    setShowHiddenHeader(value);
  }, []);

  if (!id) return;

  return (
    <RequestHeaderContext.Provider
      value={{
        showHiddenHeader,
        handleChangeShowHiddenHeader,
      }}
    >
      {children}
    </RequestHeaderContext.Provider>
  );
};

export default RequestHeaderProvider;
