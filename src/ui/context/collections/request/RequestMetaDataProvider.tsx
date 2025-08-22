import React, { createContext, useContext } from "react";
import useGetTableData from "@/hooks/request-response/meta-table/use-get-table-data";
import { useParams } from "react-router-dom";
import type {
  FormDataInterface,
  ParamInterface,
  TMetaTableType,
} from "@/types/request-response.types";

interface RequestMetaDataContext {
  data: Array<ParamInterface<string> | FormDataInterface>;
  type: TMetaTableType;
  showColumn: {
    value: boolean;
    description: boolean;
  } | null;
  cellToShow: Array<string>;
  handleAddNewData: () => void;
  handleCheckAll: () => void;
  handleDeleteAllData: () => void;
  handleDelete: (id: string) => void;
  handleUpdate: (
    id: string,
    key: string,
    value: string | File | boolean
  ) => void;
  handleUpdateHiddenHeader: (keyName: string) => void;
  handleUpdateMetaShowColumn: (keyName: "value" | "description") => void;
}

const RequestMetaDataContext = createContext<RequestMetaDataContext | null>(
  null
);

// eslint-disable-next-line react-refresh/only-export-components
export const useRequestMetaData = () => {
  const context = useContext(RequestMetaDataContext);

  if (!context) {
    throw new Error(
      "useRequestMetaData must be used within a RequestMetaDataProvider."
    );
  }

  return context;
};

interface RequestMetaDataProviderProps {
  children: React.ReactNode;
}

const RequestMetaDataProvider = ({
  children,
}: RequestMetaDataProviderProps) => {
  const { id } = useParams();
  const {
    data,
    type,
    showColumn,
    handleAddNewData,
    handleCheckAll,
    handleDeleteAllData,
    handleDelete,
    handleUpdate,
    handleUpdateHiddenHeader,
    handleUpdateMetaShowColumn,
  } = useGetTableData();

  const cellToShow = ["key"];
  if (showColumn?.value) cellToShow.push("value");
  if (showColumn?.description) cellToShow.push("description");

  if (!id) return;

  return (
    <RequestMetaDataContext.Provider
      value={{
        data,
        type,
        showColumn,
        cellToShow,
        handleAddNewData,
        handleCheckAll,
        handleDeleteAllData,
        handleDelete,
        handleUpdate,
        handleUpdateHiddenHeader,
        handleUpdateMetaShowColumn,
      }}
    >
      {children}
    </RequestMetaDataContext.Provider>
  );
};

export default RequestMetaDataProvider;
