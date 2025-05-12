import { memo } from "react";
import {
  useCellListToShow,
  useGetTableData,
  useRequestMetaTable,
} from "@/context/request/RequestMetaTableProvider";
import MetaTableHeader from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableHeader";
import MetaTableWrapper from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableWrapper";
import MetaTableRow from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableRow";

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
  const {
    handleChangeMetaData,
    handleDeleteMetaData,
    handleCheckToggleMetaData,
    getMetaData,
  } = useRequestMetaTable();

  const tableData = useGetTableData();
  const cellToShow = useCellListToShow();

  if (!tableData) return null;

  let data = tableData?.data;
  const type = tableData?.type;

  if (!type || !data) return null;

  if (type === "headers" && showHiddenData) {
    data = [...getMetaData("hiddenHeaders"), ...data].map((header) => ({
      ...header,
      ...(passwordTypeKeyList.includes(header.id)
        ? { inputType: "password" }
        : {}),
    }));
  }
  if (type === "params")
    data = [...getMetaData("hiddenParams"), ...data].map((header) => ({
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
            handleChangeMetaData(type, [id, key, value])
          }
          handleDeleteItem={(id) => handleDeleteMetaData(type, id)}
          handleCheckToggle={(id?: string) =>
            handleCheckToggleMetaData(
              param.prevent && type === "params"
                ? "hiddenParams"
                : param.prevent && type === "headers"
                  ? "hiddenHeaders"
                  : type,
              id
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
