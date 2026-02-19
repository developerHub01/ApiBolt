import React, { createContext, useContext } from "react";

interface RequestMetaTableContext {
  showCheck: boolean;
  showDelete: boolean;
  showBulkEdit: boolean;
  preventKey: boolean;
  showThreeDotAction: boolean;
}

const RequestMetaTableContext = createContext<RequestMetaTableContext | null>(
  null,
);

export const useRequestMetaTable = () => {
  const context = useContext(RequestMetaTableContext);

  if (!context) {
    throw new Error(
      "useRequestMetaTable must be used within a RequestMetaTableProvider.",
    );
  }

  return context;
};

interface RequestMetaTableProviderProps {
  children: React.ReactNode;
  showCheck?: boolean;
  showDelete?: boolean;
  showBulkEdit?: boolean;
  preventKey?: boolean;
  showThreeDotAction?: boolean;
}

const RequestMetaTableProvider = ({
  children,
  showCheck = true,
  showDelete = true,
  showBulkEdit = true,
  preventKey = false,
  showThreeDotAction = true,
}: RequestMetaTableProviderProps) => {
  return (
    <RequestMetaTableContext.Provider
      value={{
        showCheck,
        showDelete,
        showBulkEdit,
        preventKey,
        showThreeDotAction,
      }}
    >
      {children}
    </RequestMetaTableContext.Provider>
  );
};

export default RequestMetaTableProvider;
