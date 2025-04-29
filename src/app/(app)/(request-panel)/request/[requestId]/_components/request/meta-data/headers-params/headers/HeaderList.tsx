"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { useCellListToShow } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestParamsHeadersProvider";
import MetaItem from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaItem";
import MetaDataListWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaDataListWrapper";
import MetaDataListHeader from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaDataListHeader";

const HeaderList = memo(() => {
  const {
    headers,
    handleChangeHeader,
    handleDeleteHeader,
    handleHeaderCheckToggle,
  } = useRequestResponse();
  const cellToShow = useCellListToShow();

  return (
    <MetaDataListWrapper header={<MetaDataListHeader type="header" />}>
      {headers.map(({ key, ...param }) => (
        <MetaItem
          type="header"
          key={param.id}
          {...param}
          keyName={key}
          handleChangeItem={handleChangeHeader}
          handleDeleteItem={handleDeleteHeader}
          handleCheckToggle={handleHeaderCheckToggle}
          cellList={cellToShow}
        />
      ))}
    </MetaDataListWrapper>
  );
});

export default HeaderList;
