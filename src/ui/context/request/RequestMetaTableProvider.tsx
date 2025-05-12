import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  useRequestResponse,
  type FormDataInterface,
  type ParamInterface,
} from "@/context/request/RequestResponseProvider";
import { useRequestBody } from "@/context/request/RequestBodyProvider";

export type TMetaTableType =
  | "params"
  | "hiddenParams"
  | "headers"
  | "hiddenHeaders"
  | "form-data"
  | "x-www-form-urlencoded";

export interface ShowColumnInterface {
  value: boolean;
  description: boolean;
  contentType?: boolean;
}

interface RequestMetaTableContext {
  showColumn: ShowColumnInterface;
  toggleShowColumn: (key: keyof ShowColumnInterface) => void;
  handleChangeMetaData: (
    type: TMetaTableType,
    params: [id: string, key: string, value: string | File]
  ) => void;
  handleAddNewMetaData: (type: TMetaTableType) => void;
  handleCheckToggleMetaData: (type: TMetaTableType, id?: string) => void;
  handleDeleteMetaData: (type: TMetaTableType, id: string) => void;
  handleRemoveAllMetaData: (type: TMetaTableType) => void;
  handleRemoveFormDataFile: (id: string, index: number) => void;
  getMetaData: (
    tpe: TMetaTableType
  ) => Array<
    ParamInterface | ParamInterface | FormDataInterface | ParamInterface
  >;
}

const RequestMetaTableContext = createContext<RequestMetaTableContext | null>(
  null
);

// eslint-disable-next-line react-refresh/only-export-components
export const useRequestMetaTable = () => {
  const context = useContext(RequestMetaTableContext);

  if (!context) {
    throw new Error(
      "useRequestMetaTable must be used within a RequestMetaTableProvider."
    );
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCellListToShow = () => {
  const { showColumn } = useRequestMetaTable();

  return useMemo(() => {
    const keyList = Object.entries(showColumn);
    return keyList.reduce(
      (acc, [key, value]) => {
        if (value) acc.push(key);
        return acc;
      },
      ["key"]
    );
  }, [showColumn]);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGetTableData = () => {
  const { activeMetaTab } = useRequestResponse();
  const { requestBodyType } = useRequestBody();
  const { getMetaData } = useRequestMetaTable();

  const type: TMetaTableType | null = useMemo(() => {
    if (["params", "headers"].includes(activeMetaTab))
      return activeMetaTab as TMetaTableType;

    if (
      activeMetaTab === "body" &&
      ["x-www-form-urlencoded", "form-data"].includes(requestBodyType)
    )
      return requestBodyType as TMetaTableType;

    return null;
  }, [activeMetaTab, requestBodyType]);

  if (!type) return null;

  const data = getMetaData(type);

  return {
    data,
    type,
  };
};

interface RequestMetaTableProviderProps {
  children: React.ReactNode;
}

const RequestMetaTableProvider = ({
  children,
}: RequestMetaTableProviderProps) => {
  const [showColumn, setShowColumn] = useState<ShowColumnInterface>({
    value: true,
    description: true,
    contentType: false,
  });
  const {
    handleChangeParam,
    handleChangeHeader,
    handleChangeHiddenHeader,
    handleChangeFormData,
    handleChangeXWWWFormEncoded,

    handleAddNewParam,
    handleAddNewHeader,
    handleAddNewFormData,
    handleAddNewXWWWFormEncoded,

    handleDeleteParam,
    handleDeleteHeader,
    handleDeleteFormData,
    handleDeleteXWWWFormEncoded,

    handleParamCheckToggle,
    handleHeaderCheckToggle,
    handleHiddenHeaderCheckToggle,
    handleFormDataCheckToggle,
    handleXWWWFormEncodedCheckToggle,

    handleRemoveAllMetaData,
    handleRemoveFormDataFile,

    params,
    hiddenParams,
    headers,
    hiddenHeaders,
    formData,
    xWWWFormUrlencodedData,
  } = useRequestResponse();

  const toggleShowColumn = useCallback((key: keyof ShowColumnInterface) => {
    setShowColumn((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const getMetaData = useCallback(
    (
      type: TMetaTableType
    ): Array<
      ParamInterface | ParamInterface | FormDataInterface | ParamInterface
    > => {
      switch (type) {
        case "params":
          return params;
        case "hiddenParams":
          return hiddenParams;
        case "headers":
          return headers;
        case "hiddenHeaders":
          return hiddenHeaders;
        case "form-data":
          return formData;
        case "x-www-form-urlencoded":
          return xWWWFormUrlencodedData;
      }
    },
    [
      params,
      hiddenParams,
      headers,
      hiddenHeaders,
      formData,
      xWWWFormUrlencodedData,
    ]
  );

  const handleChangeMetaData = useCallback(
    (
      type: TMetaTableType,
      [id, key, value]: [id: string, key: string, value: string | File]
    ) => {
      switch (type) {
        case "params": {
          if (typeof value !== "string") return;
          return handleChangeParam(id, key, value);
        }
        case "headers": {
          if (typeof value !== "string") return;
          return handleChangeHeader(id, key, value);
        }
        case "hiddenHeaders": {
          if (typeof value !== "string") return;
          return handleChangeHiddenHeader(id, key, value);
        }
        case "form-data":
          return handleChangeFormData(id, key, value);
        case "x-www-form-urlencoded": {
          if (typeof value !== "string") return;
          return handleChangeXWWWFormEncoded(id, key, value);
        }
      }
    },
    [
      handleChangeParam,
      handleChangeHeader,
      handleChangeHiddenHeader,
      handleChangeFormData,
      handleChangeXWWWFormEncoded,
    ]
  );
  const handleAddNewMetaData = useCallback(
    (type: TMetaTableType) => {
      switch (type) {
        case "params":
          return handleAddNewParam();
        case "headers":
          return handleAddNewHeader();
        case "form-data":
          return handleAddNewFormData();
        case "x-www-form-urlencoded":
          return handleAddNewXWWWFormEncoded();
      }
    },
    [
      handleAddNewParam,
      handleAddNewHeader,
      handleAddNewFormData,
      handleAddNewXWWWFormEncoded,
    ]
  );
  const handleCheckToggleMetaData = useCallback(
    (type: TMetaTableType, id?: string) => {
      switch (type) {
        case "params":
          return handleParamCheckToggle(id);
        case "headers":
          return handleHeaderCheckToggle(id);
        case "hiddenHeaders":
          return handleHiddenHeaderCheckToggle(id);
        case "form-data":
          return handleFormDataCheckToggle(id);
        case "x-www-form-urlencoded":
          return handleXWWWFormEncodedCheckToggle(id);
      }
    },
    [
      handleParamCheckToggle,
      handleHeaderCheckToggle,
      handleHiddenHeaderCheckToggle,
      handleFormDataCheckToggle,
      handleXWWWFormEncodedCheckToggle,
    ]
  );
  const handleDeleteMetaData = useCallback(
    (type: TMetaTableType, id: string) => {
      switch (type) {
        case "params":
          return handleDeleteParam(id);
        case "headers":
          return handleDeleteHeader(id);
        case "form-data":
          return handleDeleteFormData(id);
        case "x-www-form-urlencoded":
          return handleDeleteXWWWFormEncoded(id);
      }
    },
    [
      handleDeleteParam,
      handleDeleteHeader,
      handleDeleteFormData,
      handleDeleteXWWWFormEncoded,
    ]
  );

  return (
    <RequestMetaTableContext.Provider
      value={{
        showColumn,
        toggleShowColumn,
        handleChangeMetaData,
        handleAddNewMetaData,
        handleCheckToggleMetaData,
        handleDeleteMetaData,
        handleRemoveAllMetaData,
        handleRemoveFormDataFile,
        getMetaData,
      }}
    >
      {children}
    </RequestMetaTableContext.Provider>
  );
};

export default RequestMetaTableProvider;
