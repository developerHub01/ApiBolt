import { memo } from "react";
import MetaTableHeader from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableHeader";
import MetaTableWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableWrapper";
import MetaTableRow from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableRow";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectMetaData } from "@/context/redux/request-response/request-response-selector";
import { handleCheckToggleMetaData } from "@/context/redux/request-response/request-response-slice";
import type {
  FormDataInterface,
  ParamInterface,
} from "@/types/request-response.types";
import useGetTableData from "@/hooks/request-response/meta-table/use-get-table-data";
import { useCellListToShow } from "@/hooks/request-response/meta-table/use-cell-list-to-show";

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

  if (!tableData) return null;

  const { type, handleDelete, handleUpdate, handleUpdateHiddenHeader } =
    tableData;
  let { data } = tableData;

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
