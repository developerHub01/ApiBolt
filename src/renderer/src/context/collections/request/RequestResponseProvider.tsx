import React, { createContext, useCallback, useContext, useState } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleToggleCollapse } from "@/context/redux/request-response/request-response-slice";

interface RequestResponseContext {
  forceCollapse: boolean;
  handleForceCollapse: (value?: boolean) => void;
  handleCollapse: () => void;
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
  const dispatch = useAppDispatch();
  const [forceCollapse, setForceCollapse] = useState<boolean>(false);
  const handleForceCollapse = useCallback((value?: boolean) => {
    setForceCollapse(prev => value ?? !prev);
  }, []);

  const handleCollapse = () => {
    handleForceCollapse(true);
    dispatch(handleToggleCollapse());
  };

  return (
    <RequestResponseContext.Provider
      value={{
        forceCollapse,
        handleForceCollapse,
        handleCollapse,
      }}
    >
      {children}
    </RequestResponseContext.Provider>
  );
};

export default RequestResponseProvider;
