import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/context/redux/hooks";
import { selectMetaData } from "@/context/redux/request-response/request-response-selector";

export type TMetaTableType =
  | "params"
  | "hiddenParams"
  | "headers"
  | "hiddenHeaders"
  | "form-data"
  | "x-www-form-urlencoded"
  | "environments";

export interface ShowColumnInterface {
  value: boolean;
  description: boolean;
  contentType?: boolean;
}

interface RequestMetaTableContext {
  showColumn: ShowColumnInterface;
  toggleShowColumn: (key: keyof ShowColumnInterface) => void;
  // handleChangeMetaData: (
  //   type: TMetaTableType,
  //   params: [id: string, key: string, value: string | File]
  // ) => void;
  // handleCheckToggleMetaData: (type: TMetaTableType, id?: string) => void;
  // handleDeleteMetaData: (type: TMetaTableType, id: string) => void;
  // handleRemoveAllMetaData: (type: TMetaTableType) => void;
  // handleRemoveFormDataFile: (id: string, index: number) => void;
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
  const activeMetaTab = useAppSelector(
    (state) =>
      state.requestResponse.activeMetaTab[state.requestResponse.selectedTab!] ??
      "params"
  );
  const requestBodyType = useAppSelector(
    (state) =>
      state.requestResponse.requestBodyType[state.requestResponse.selectedTab!]
  );

  const type: TMetaTableType = useMemo(() => {
    if (["params", "headers"].includes(activeMetaTab))
      return activeMetaTab as TMetaTableType;

    if (
      activeMetaTab === "body" &&
      ["x-www-form-urlencoded", "form-data"].includes(requestBodyType)
    )
      return requestBodyType as TMetaTableType;

    return "params";
  }, [activeMetaTab, requestBodyType]);

  const data = useAppSelector(selectMetaData(type)) ?? [];

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
  const { id = "" } = useParams();

  const [showColumn, setShowColumn] = useState<ShowColumnInterface>({
    value: true,
    description: true,
    contentType: false,
  });

  // const {
  //   handleChangeParam,
  //   handleChangeHeader,
  //   handleChangeHiddenHeader,
  //   handleChangeFormData,
  //   handleChangeXWWWFormEncoded,

  //   handleDeleteParam,
  //   handleDeleteHeader,
  //   handleDeleteFormData,
  //   handleDeleteXWWWFormEncoded,

  //   handleParamCheckToggle,
  //   handleHeaderCheckToggle,
  //   handleHiddenHeaderCheckToggle,
  //   handleFormDataCheckToggle,
  //   handleXWWWFormEncodedCheckToggle,

  //   handleRemoveAllMetaData,
  //   handleRemoveFormDataFile,

  //   params,
  //   hiddenParams,
  //   headers,
  //   hiddenHeaders,
  //   formData,
  //   xWWWFormUrlencodedData,
  // } = useRequestResponse();

  const toggleShowColumn = useCallback((key: keyof ShowColumnInterface) => {
    setShowColumn((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // const handleCheckToggleMetaData = useCallback(
  //   (type: TMetaTableType, id?: string) => {
  //     switch (type) {
  //       case "params":
  //         return handleParamCheckToggle(id);
  //       case "headers":
  //         return handleHeaderCheckToggle(id);
  //       case "hiddenHeaders":
  //         return handleHiddenHeaderCheckToggle(id);
  //       case "form-data":
  //         return handleFormDataCheckToggle(id);
  //       case "x-www-form-urlencoded":
  //         return handleXWWWFormEncodedCheckToggle(id);
  //     }
  //   },
  //   [
  //     handleParamCheckToggle,
  //     handleHeaderCheckToggle,
  //     handleHiddenHeaderCheckToggle,
  //     handleFormDataCheckToggle,
  //     handleXWWWFormEncodedCheckToggle,
  //   ]
  // );
  // const handleDeleteMetaData = useCallback(
  //   (type: TMetaTableType, id: string) => {
  //     switch (type) {
  //       case "params":
  //         return handleDeleteParam(id);
  //       case "headers":
  //         return handleDeleteHeader(id);
  //       case "form-data":
  //         return handleDeleteFormData(id);
  //       case "x-www-form-urlencoded":
  //         return handleDeleteXWWWFormEncoded(id);
  //     }
  //   },
  //   [
  //     handleDeleteParam,
  //     handleDeleteHeader,
  //     handleDeleteFormData,
  //     handleDeleteXWWWFormEncoded,
  //   ]
  // );

  if (!id) return null;

  return (
    <RequestMetaTableContext.Provider
      value={{
        showColumn,
        toggleShowColumn,
        // handleChangeMetaData,
        // handleCheckToggleMetaData,
        // handleDeleteMetaData,
        // handleRemoveAllMetaData,
        // handleRemoveFormDataFile,
      }}
    >
      {children}
    </RequestMetaTableContext.Provider>
  );
};

export default RequestMetaTableProvider;
