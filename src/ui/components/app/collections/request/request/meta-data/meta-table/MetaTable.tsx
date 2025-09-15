import { memo } from "react";
import MetaTableHeader from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableHeader";
import MetaTableWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableWrapper";
import MetaTableRow from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableRow";
import { useAppSelector } from "@/context/redux/hooks";
import type {
  FormDataInterface,
  ParamInterface,
} from "@/types/request-response.types";
import { useRequestMetaData } from "@/context/collections/request/RequestMetaDataProvider";
import { selectMetaData } from "@/context/redux/request-response/selectors/meta-request";

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
  const { cellToShow, ...tableData } = useRequestMetaData();
  const hiddenHeader = useAppSelector(selectMetaData("hiddenHeaders")) ?? [];
  const hiddenParams = useAppSelector(selectMetaData("hiddenParams")) ?? [];

  if (!tableData) return null;

  const { type, handleDelete, handleUpdate, handleCheckToggle } = tableData;
  let data = tableData?.data;

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
          handleCheckToggle={handleCheckToggle}
          cellList={cellToShow}
        />
      ))}
    </MetaTableWrapper>
  );
});
MetaTable.displayName = "Meta table";

export default MetaTable;
