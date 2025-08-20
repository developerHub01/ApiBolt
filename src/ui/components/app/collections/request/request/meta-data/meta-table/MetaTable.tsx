import { memo, useCallback } from "react";
import {
  useCellListToShow,
  useGetTableData,
} from "@/context/collections/request/RequestMetaTableProvider";
import MetaTableHeader from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableHeader";
import MetaTableWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableWrapper";
import MetaTableRow from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableRow";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectMetaData } from "@/context/redux/request-response/request-response-selector";
import { handleCheckToggleMetaData } from "@/context/redux/request-response/request-response-slice";
import type {
  FormDataInterface,
  HiddenHeadersCheckInterface,
  ParamInterface,
} from "@/types/request-response.types";
import { deleteParams, updateParams } from "@/context/redux/request-response/thunks/params";
import { deleteHeaders, updateHeaders, updateHiddenHeaders } from "@/context/redux/request-response/thunks/headers";

const headersToPreventCheckList = ["Cookie", "Authorization"];

const passwordTypeKeyList = [
  "api-key",
  "basic-auth",
  "bearer-token",
  "jwt-bearer",
];

const checkInputType = (item: ParamInterface | FormDataInterface) => ({
  ...item,
  ...(passwordTypeKeyList.includes(item.id) ? { inputType: "password" } : {}),
});

interface MetaTableInterface {
  showHiddenData?: boolean;
}

const MetaTable = memo(({ showHiddenData }: MetaTableInterface) => {
  const dispatch = useAppDispatch();
  const tableData = useGetTableData();
  const cellToShow = useCellListToShow();
  const hiddenHeader = useAppSelector(selectMetaData("hiddenHeaders")) ?? [];
  const hiddenParams = useAppSelector(selectMetaData("hiddenParams")) ?? [];

  let data = tableData.data;
  const type = tableData.type;

  const handleDelete = useCallback(
    (id: string) => {
      const handler =
        type === "params"
          ? deleteParams
          : type === "headers"
            ? deleteHeaders
            : deleteHeaders;
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
            : updateHeaders;
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

  const handleUpdateHiddenHeader = useCallback(
    (keyName: string) => {
      dispatch(
        updateHiddenHeaders({
          keyName: keyName as keyof HiddenHeadersCheckInterface,
        })
      );
    },
    [dispatch]
  );

  // const handleCheckToggle = useCallback( (id: string, value: boolean)=>{
  //    const handler =
  //       type === "params"
  //         ? updateParams
  //         : type === "headers"
  //           ? updateHeaders
  //           : updateHeaders;
  // }, [])

  if (type === "headers" && showHiddenData)
    data = [...hiddenHeader, ...data].map(checkInputType);
  if (type === "params") data = [...hiddenParams, ...data].map(checkInputType);

  return (
    <MetaTableWrapper header={<MetaTableHeader type={type} />}>
      {data.map(({ key, ...param }) => (
        <MetaTableRow
          preventCheck={headersToPreventCheckList.includes(key)}
          type={type}
          key={param.id}
          {...param}
          keyName={key}
          handleChangeItem={handleUpdate}
          handleDeleteItem={handleDelete}
          handleCheckToggle={(id?: string) => {
            if (!param.prevent && id)
              return handleUpdate(id, "isCheck", !param.isCheck);
            else if (param.prevent && id) handleUpdateHiddenHeader(param.id);

            dispatch(
              handleCheckToggleMetaData({
                id,
                type:
                  param.prevent && type === "params"
                    ? "hiddenParams"
                    : param.prevent && type === "headers"
                      ? "hiddenHeaders"
                      : type,
              })
            );
          }}
          cellList={cellToShow}
        />
      ))}
    </MetaTableWrapper>
  );
});
MetaTable.displayName = "Meta table";

export default MetaTable;
