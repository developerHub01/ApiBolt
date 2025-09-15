import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { DEFAULT_AUTHORIZATION_ID } from "@/constant/authorization.constant";
import { loadInheritParentAuthorization } from "../redux/request-response/thunks/auth";
import type { TAuthContextType } from "@/types/authorization.types";
import { selectSelectedTab } from "../redux/request-response/request-response-selector";

interface CollectionContext {
  isLoading: boolean;
}

const CollectionContext = createContext<CollectionContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useCollection = () => {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error("useCollection must be used within a CollectionProvider.");
  }

  return context;
};

interface CollectionProviderProps {
  type: TAuthContextType;
  children: React.ReactNode;
}

const CollectionProvider = ({ children, type }: CollectionProviderProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const selectedTab = useAppSelector(selectSelectedTab);
  const id = type === "global" ? DEFAULT_AUTHORIZATION_ID : selectedTab;

  const handleLoadInheritParentAuthorization = useCallback(
    async (id?: string | null) => {
      if (!id) return;
      setIsLoading(true);
      await dispatch(loadInheritParentAuthorization(id));
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    handleLoadInheritParentAuthorization(id);
  }, [dispatch, handleLoadInheritParentAuthorization, id]);

  if (!id) return null;

  return (
    <CollectionContext.Provider
      value={{
        isLoading,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
