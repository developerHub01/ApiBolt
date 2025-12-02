import React, { createContext, useContext } from "react";
import { useParams } from "react-router-dom";

// interface RequestHeaderContext {
// }

const RequestHeaderContext = createContext<undefined | null>(null);

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
  if (!id) return;

  return (
    <RequestHeaderContext.Provider value={undefined}>
      {children}
    </RequestHeaderContext.Provider>
  );
};

export default RequestHeaderProvider;
