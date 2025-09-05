import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectActiveMetaTab,
  selectMetaData,
  selectRequestBodyType,
  selectRequestMetaShowColumn,
} from "@/context/redux/request-response/request-response-selector";
import {
  addBodyFormData,
  updateBodyFormData,
  deleteBodyFormData,
  deleteBodyFormDataByRequestMetaId,
  checkAllBodyFormDataByRequestMetaId,
} from "@/context/redux/request-response/thunks/body-form-data";
import {
  addBodyXWWWFormUrlencoded,
  updateBodyXWWWFormUrlencoded,
  deleteBodyXWWWFormUrlencoded,
  deleteBodyXWWWFormUrlencodedByRequestMetaId,
  checkAllBodyXWWWFormUrlencodedByRequestMetaId,
} from "@/context/redux/request-response/thunks/body-x-www-form-urlencoded";
import {
  addHeaders,
  updateHeaders,
  updateHiddenHeaders,
  deleteHeaders,
  deleteHeadersByRequestMetaId,
  checkAllHeadersByRequestMetaId,
} from "@/context/redux/request-response/thunks/headers";
import { updateMetaShowColumn } from "@/context/redux/request-response/thunks/meta-show-column";
import {
  addParams,
  checkAllParamsByRequestMetaId,
  deleteParams,
  deleteParamsByRequestMetaId,
  updateParams,
} from "@/context/redux/request-response/thunks/params";
import type {
  FormDataInterface,
  HiddenHeadersCheckInterface,
  MetaShowColumnInterface,
  ParamInterface,
  TMetaTableType,
} from "@/types/request-response.types";
import { handleCheckToggleMetaData } from "@/context/redux/request-response/request-response-slice";

export const useGetTableData = () => {
  const dispatch = useAppDispatch();
  const activeMetaTab = useAppSelector(selectActiveMetaTab);
  const requestBodyType = useAppSelector(selectRequestBodyType);
  const metaShowColumn = useAppSelector(selectRequestMetaShowColumn);

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

  const showColumn = useMemo(
    () =>
      type === "environments"
        ? null
        : {
            value: metaShowColumn
              ? type === "params"
                ? metaShowColumn?.paramsValue
                : type === "headers"
                  ? metaShowColumn?.headersValue
                  : type === "form-data"
                    ? metaShowColumn?.formDataValue
                    : type === "x-www-form-urlencoded"
                      ? metaShowColumn?.xWWWFormUrlencodedValue
                      : true
              : true,
            description: metaShowColumn
              ? type === "params"
                ? metaShowColumn?.paramsDescription
                : type === "headers"
                  ? metaShowColumn?.headersDescription
                  : type === "form-data"
                    ? metaShowColumn?.formDataDescription
                    : type === "x-www-form-urlencoded"
                      ? metaShowColumn?.xWWWFormUrlencodedDescription
                      : true
              : false,
          },
    [metaShowColumn, type]
  );

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

  const handleCheckToggle = useCallback(
    ({
      id,
      prevent,
      isCheck,
    }: Pick<
      ParamInterface<string> | FormDataInterface,
      "id" | "prevent" | "isCheck"
    >) => {
      if (!prevent && id) return handleUpdate(id, "isCheck", !isCheck);
      else if (prevent && id) handleUpdateHiddenHeader(id);

      dispatch(
        handleCheckToggleMetaData({
          id,
          type:
            prevent && type === "params"
              ? "hiddenParams"
              : prevent && type === "headers"
                ? "hiddenHeaders"
                : type,
        })
      );
    },
    [dispatch, handleUpdate, handleUpdateHiddenHeader, type]
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

  const handleUpdateMetaShowColumn = useCallback(
    (keyName: "value" | "description") => {
      const key:
        | keyof Partial<Omit<MetaShowColumnInterface, "requestOrFolderMetaId">>
        | null =
        type === "environments"
          ? null
          : type === "params"
            ? keyName === "value"
              ? "paramsValue"
              : "paramsDescription"
            : type === "headers"
              ? keyName === "value"
                ? "headersValue"
                : "headersDescription"
              : type === "form-data"
                ? keyName === "value"
                  ? "formDataValue"
                  : "formDataDescription"
                : keyName === "value"
                  ? "xWWWFormUrlencodedValue"
                  : "xWWWFormUrlencodedDescription";

      if (!key) return;

      const payload = {
        /* if null then actually showing default which is for value is true and for description false. so new value will be oppose of it. so new value is value will be false and description will be true */
        [key]: !(metaShowColumn?.[key] ?? keyName === "value"),
      };

      dispatch(updateMetaShowColumn(payload));
    },
    [dispatch, metaShowColumn, type]
  );

  return {
    data,
    type,
    showColumn,
    handleDelete,
    handleUpdate,
    handleUpdateHiddenHeader,
    handleCheckToggle,
    handleCheckAll,
    handleAddNewData,
    handleDeleteAllData,
    handleUpdateMetaShowColumn,
  };
};

export default useGetTableData;
