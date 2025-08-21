import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectActiveMetaTab,
  selectMetaData,
  selectRequestBodyType,
} from "@/context/redux/request-response/request-response-selector";
import type { HiddenHeadersCheckInterface } from "@/types/request-response.types";
import {
  addHeaders,
  checkAllHeadersByRequestMetaId,
  deleteHeaders,
  deleteHeadersByRequestMetaId,
  updateHeaders,
  updateHiddenHeaders,
} from "@/context/redux/request-response/thunks/headers";
import {
  addParams,
  checkAllParamsByRequestMetaId,
  deleteParams,
  deleteParamsByRequestMetaId,
  updateParams,
} from "@/context/redux/request-response/thunks/params";
import {
  addBodyXWWWFormUrlencoded,
  checkAllBodyXWWWFormUrlencodedByRequestMetaId,
  deleteBodyXWWWFormUrlencoded,
  deleteBodyXWWWFormUrlencodedByRequestMetaId,
  updateBodyXWWWFormUrlencoded,
} from "@/context/redux/request-response/thunks/body-x-www-form-urlencoded";
import {
  addBodyFormData,
  checkAllBodyFormDataByRequestMetaId,
  deleteBodyFormData,
  deleteBodyFormDataByRequestMetaId,
  updateBodyFormData,
} from "@/context/redux/request-response/thunks/body-form-data";

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
  const dispatch = useAppDispatch();
  const activeMetaTab = useAppSelector(selectActiveMetaTab);
  const requestBodyType = useAppSelector(selectRequestBodyType);

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

  const handleDelete = useCallback(
    (id: string) => {
      const handler =
        type === "params"
          ? deleteParams
          : type === "headers"
            ? deleteHeaders
            : type === "x-www-form-urlencoded"
              ? deleteBodyXWWWFormUrlencoded
              : type === "form-data"
                ? deleteBodyFormData
                : deleteBodyFormData;
      dispatch(handler(id));
    },
    [dispatch, type]
  );

  const handleUpdate = useCallback(
    (id: string, key: string, value: string | File | boolean) => {
      const handler =
        type === "params"
          ? updateParams
          : type === "headers"
            ? updateHeaders
            : type === "x-www-form-urlencoded"
              ? updateBodyXWWWFormUrlencoded
              : type === "form-data"
                ? updateBodyFormData
                : updateBodyFormData;
      dispatch(
        handler({
          paramId: id,
          payload: {
            [key]: value,
          },
        })
      );
    },
    [dispatch, type]
  );

  const handleCheckAll = useCallback(() => {
    const handler =
      type === "params"
        ? checkAllParamsByRequestMetaId
        : type === "headers"
          ? checkAllHeadersByRequestMetaId
          : type === "x-www-form-urlencoded"
            ? checkAllBodyXWWWFormUrlencodedByRequestMetaId
            : type === "form-data"
              ? checkAllBodyFormDataByRequestMetaId
              : checkAllBodyFormDataByRequestMetaId;
    dispatch(handler());
  }, [dispatch, type]);

  const handleUpdateHiddenHeader = useCallback(
    (keyName: string) =>
      dispatch(
        updateHiddenHeaders({
          keyName: keyName as keyof HiddenHeadersCheckInterface,
        })
      ),
    [dispatch]
  );

  const handleAddNewData = useCallback(() => {
    const handleAdd =
      type === "params"
        ? addParams
        : type === "headers"
          ? addHeaders
          : type === "form-data"
            ? addBodyFormData
            : type === "x-www-form-urlencoded"
              ? addBodyXWWWFormUrlencoded
              : addBodyXWWWFormUrlencoded;
    dispatch(handleAdd());
  }, [dispatch, type]);

  const handleDeleteAllData = useCallback(() => {
    const handleDeleteAll =
      type === "params"
        ? deleteParamsByRequestMetaId
        : type === "headers"
          ? deleteHeadersByRequestMetaId
          : type === "form-data"
            ? deleteBodyFormDataByRequestMetaId
            : type === "x-www-form-urlencoded"
              ? deleteBodyXWWWFormUrlencodedByRequestMetaId
              : deleteBodyXWWWFormUrlencodedByRequestMetaId;
    dispatch(handleDeleteAll());
  }, [dispatch, type]);

  return {
    data,
    type,
    handleDelete,
    handleUpdate,
    handleUpdateHiddenHeader,
    handleCheckAll,
    handleAddNewData,
    handleDeleteAllData,
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
