import React, { createContext, useContext, useEffect } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { loadAuthorization } from "@/context/redux/request-response/thunks/auth";

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(loadAuthorization());
    })();
  }, [dispatch]);

  return (
    <AuthorizationContext.Provider value={null}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationProvider;
