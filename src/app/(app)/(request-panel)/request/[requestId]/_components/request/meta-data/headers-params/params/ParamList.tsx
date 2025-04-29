"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { useCellListToShow } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestParamsHeadersProvider";
import MetaItem from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaItem";
import MetaDataListWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaDataListWrapper";
import MetaDataListHeader from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaDataListHeader";

const ParamList = memo(() => {
  const {
    params,
    handleChangeParam,
    handleDeleteParam,
    handleParamCheckToggle,
  } = useRequestResponse();

  const cellToShow = useCellListToShow();

  return (
    <MetaDataListWrapper header={<MetaDataListHeader type="param" />}>
      {params.map(({ key, ...param }) => (
        <MetaItem
          type="param"
          key={param.id}
          {...param}
          keyName={key}
          handleChangeItem={handleChangeParam}
          handleDeleteItem={handleDeleteParam}
          handleCheckToggle={handleParamCheckToggle}
          cellList={cellToShow}
        />
      ))}
    </MetaDataListWrapper>
  );
});

export default ParamList;
