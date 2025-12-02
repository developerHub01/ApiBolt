import { memo } from "react";
import MetaTableHeader from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableHeader";
import MetaTableWrapper from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableWrapper";
import MetaTableRow from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableRow";
import { useAppSelector } from "@/context/redux/hooks";
import type {
  FormDataInterface,
  ParamInterface,
} from "@shared/types/request-response.types";
import { useRequestMetaData } from "@/context/collections/request/RequestMetaDataProvider";
import { selectMetaData } from "@/context/redux/request-response/selectors/meta-request";
import { AUTHORIZATION_DATA_ID } from "@/constant/authorization.constant";
import { COOKIE_DATA_ID } from "@/constant/request-response.constant";

const headersToPreventCheckList = [COOKIE_DATA_ID, AUTHORIZATION_DATA_ID];

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
  const hiddenHeader =
    useAppSelector((state) =>
      selectMetaData(state, {
        type: "hiddenHeaders",
      })
    ) ?? [];

  const hiddenParams =
    useAppSelector((state) =>
      selectMetaData(state, {
        type: "hiddenParams",
      })
    ) ?? [];

  if (!tableData) return null;

  const { type, handleDelete, handleUpdate, handleCheckToggle } = tableData;
  let data = tableData?.data;

  if (showHiddenData) {
    if (type === "headers")
      data = [...hiddenHeader, ...data].map(checkInputType);
    else if (type === "params")
      data = [...hiddenParams, ...data].map(checkInputType);
  }

  return (
    <MetaTableWrapper header={<MetaTableHeader type={type} />}>
      {data.map(({ key, ...param }) => (
        <MetaTableRow
          preventCheck={headersToPreventCheckList.includes(param.id)}
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
