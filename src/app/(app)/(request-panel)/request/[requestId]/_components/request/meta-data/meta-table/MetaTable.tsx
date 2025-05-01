"use client";

import React, { memo } from "react";
import {
  useCellListToShow,
  useGetTableData,
  useRequestMetaTable,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestMetaTableProvider";
import MetaDataListWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaTableWrapper";
import MetaDataListHeader from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaTableHeader";
import MetaTableRow from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaTableRow";

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
    <MetaDataListWrapper header={<MetaDataListHeader type={type} />}>
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
    </MetaDataListWrapper>
  );
});

export default MetaTable;
