import { memo } from "react";
import {
  useCellListToShow,
  useGetTableData,
} from "@/context/request/RequestMetaTableProvider";
import MetaTableHeader from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableHeader";
import MetaTableWrapper from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableWrapper";
import MetaTableRow from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableRow";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectMetaData } from "@/context/redux/request-response/request-response-selector";
import {
  handleChangeMetaData,
  handleCheckToggleMetaData,
  handleDeleteMetaData,
} from "@/context/redux/request-response/request-response-slice";

const headersToPreventCheckList = ["Cookie", "Authorization"];

interface MetaTableInterface {
  showHiddenData?: boolean;
}

const passwordTypeKeyList = [
  "api-key",
  "basic-auth",
  "bearer-token",
  "jwt-bearer",
];

const MetaTable = memo(({ showHiddenData }: MetaTableInterface) => {
  const dispatch = useAppDispatch();
  const tableData = useGetTableData();
  const cellToShow = useCellListToShow();

  const hiddenHeader = useAppSelector(selectMetaData("headers")) ?? [];

  if (!tableData) return null;

  let data = tableData?.data;
  const type = tableData?.type;

  if (!type || !data) return null;

  if (type === "headers" && showHiddenData) {
    data = [...hiddenHeader, ...data].map((header) => ({
      ...header,
      ...(passwordTypeKeyList.includes(header.id)
        ? { inputType: "password" }
        : {}),
    }));
  }
  if (type === "params")
    data = [...hiddenHeader, ...data].map((header) => ({
      ...header,
      ...(passwordTypeKeyList.includes(header.id)
        ? { inputType: "password" }
        : {}),
    }));

  return (
    <MetaTableWrapper header={<MetaTableHeader type={type} />}>
      {data.map(({ key, ...param }) => (
        <MetaTableRow
          preventCheck={headersToPreventCheckList.includes(key)}
          type={type}
          key={param.id}
          {...param}
          keyName={key}
          handleChangeItem={(id: string, key: string, value: string | File) =>
            dispatch(
              handleChangeMetaData({
                type,
                id,
                key,
                value,
              })
            )
          }
          handleDeleteItem={(id: string) =>
            dispatch(
              handleDeleteMetaData({
                type,
                id,
              })
            )
          }
          handleCheckToggle={(id?: string) =>
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
            )
          }
          cellList={cellToShow}
        />
      ))}
    </MetaTableWrapper>
  );
});
MetaTable.displayName = "Meta table";

export default MetaTable;
