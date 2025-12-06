import React, { createContext, useCallback, useContext, useState } from "react";

interface RequestResponseContext {
  forceCollapse: boolean;
  handleForceCollapse: (value?: boolean) => void;
}

const RequestResponseContext = createContext<RequestResponseContext | null>(
  null,
);

export const useRequestResponse = () => {
  const context = useContext(RequestResponseContext);

  if (!context) {
    throw new Error(
      "useRequestResponse must be used within a RequestResponseProvider.",
    );
  }

  return context;
};

interface RequestResponseProviderProps {
  children: React.ReactNode;
}

const RequestResponseProvider = ({
  children,
}: RequestResponseProviderProps) => {
  const [forceCollapse, setForceCollapse] = useState<boolean>(false);
  const handleForceCollapse = useCallback((value?: boolean) => {
    setForceCollapse(prev => value ?? !prev);
  }, []);

  return (
    <RequestResponseContext.Provider
      value={{
        forceCollapse,
        handleForceCollapse,
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
