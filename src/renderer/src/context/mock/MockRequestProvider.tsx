import React, { createContext, useContext } from "react";

interface MockRequestContext {}

const MockRequestContext = createContext<MockRequestContext | null>(null);

export const useMockRequest = () => {
  const context = useContext(MockRequestContext);

  if (!context) {
    throw new Error(
      "useMockRequest must be used within a MockRequestProvider.",
    );
  }

  return context;
};

interface MockRequestProviderProps {
  children: React.ReactNode;
}

const MockRequestProvider = ({ children }: MockRequestProviderProps) => {
  return (
    <MockRequestContext.Provider value={{}}>
      {children}
    </MockRequestContext.Provider>
  );
};

export default MockRequestProvider;
