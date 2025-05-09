import { memo } from "react";
import {
  useCellListToShow,
  useGetTableData,
  useRequestMetaTable,
} from "@/context/request/RequestMetaTableProvider";
import MetaTableHeader from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableHeader";
import MetaTableWrapper from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableWrapper";
import MetaTableRow from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableRow";

const headersToPreventCheckList = ["Cookie"];

const MetaTable = memo(() => {
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

  if (type === "headers") data = [...getMetaData("hiddenHeaders"), ...data];

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
              param.prevent ? "hiddenHeaders" : type,
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
