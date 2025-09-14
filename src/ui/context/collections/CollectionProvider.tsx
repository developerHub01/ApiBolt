import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { defaultAuthorizationId } from "@/constant/authorization.constant";
import { loadInheritParentAuthorization } from "../redux/request-response/thunks/auth";
import type { TAuthContextType } from "@/types/authorization.types";
import { selectSelectedTab } from "../redux/request-response/request-response-selector";

interface CollectionContext {
  isLoading: boolean;
  inheritAuthId: string | null;
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
  const [inheritAuthId, setInheritAuthId] = useState<string | null>(null);
  const selectedTab = useAppSelector(selectSelectedTab);
  const id = type === "global" ? defaultAuthorizationId : selectedTab;

  useEffect(() => {
    (async () => {
      if (!id) return;
      setIsLoading(true);
      const targetId =
        (await dispatch(loadInheritParentAuthorization(id)).unwrap()) ??
        defaultAuthorizationId;
      setInheritAuthId(targetId);
      setIsLoading(false);
    })();
  }, [dispatch, id]);

  if (!id) return null;

  return (
    <CollectionContext.Provider
      value={{
        isLoading,
        inheritAuthId,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
