import { memo } from "react";
import {
  useCellListToShow,
  useGetTableData,
  useRequestMetaTable,
} from "@/context/request/RequestMetaTableProvider";
import MetaTableHeader from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableHeader";
import MetaTableWrapper from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableWrapper";
import MetaTableRow from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableRow";

const MetaTable = memo(() => {
  const {
    handleChangeMetaData,
    handleDeleteMetaData,
    handleCheckToggleMetaData,
  } = useRequestMetaTable();

  const { data, type } = useGetTableData() ?? {};
  const cellToShow = useCellListToShow();

  if (!type || !data) return null;

  return (
    <MetaTableWrapper header={<MetaTableHeader type={type} />}>
      {data.map(({ key, ...param }) => (
        <MetaTableRow
          type={type}
          key={param.id}
          {...param}
          keyName={key}
          handleChangeItem={(id: string, key: string, value: string | File) =>
            handleChangeMetaData(type, [id, key, value])
          }
          handleDeleteItem={(id) => handleDeleteMetaData(type, id)}
          handleCheckToggle={(id?: string) =>
            handleCheckToggleMetaData(type, id)
          }
          cellList={cellToShow}
        />
      ))}
    </MetaTableWrapper>
  );
});
MetaTable.displayName = "Meta table";

export default MetaTable;
