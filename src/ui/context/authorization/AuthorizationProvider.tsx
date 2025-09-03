import React, { createContext, useContext } from "react";
// interface AuthorizationContext {}

const AuthorizationContext = createContext<null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthorization = () => {
  const context = useContext(AuthorizationContext);

  if (!context) {
    throw new Error(
      "useAuthorization must be used within a AuthorizationProvider."
    );
  }

  return context;
};

interface AuthorizationProviderProps {
  children: React.ReactNode;
}

const AuthorizationProvider = ({ children }: AuthorizationProviderProps) => {
  return (
    <AuthorizationContext.Provider value={null}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationProvider;
