"use client";

import React, { memo, useMemo } from "react";
import ParamListWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamListWrapper";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { useRequestParamsHeaders } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestParamsHeadersProvider";
import Param from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/Param";

const ParamList = memo(() => {
  const {
    params,
    handleChangeParams,
    handleDeleteParam,
    handleParamCheckToggle,
  } = useRequestResponse();
  const { showColumn } = useRequestParamsHeaders();

  /* ["key", "value", "description"] */
  const cellToShow = useMemo(() => {
    const keyList = Object.entries(showColumn);
    return keyList.reduce(
      (acc, curr) => {
        if (curr[1]) acc.push(curr[0]);
        return acc;
      },
      ["key"] as Array<string>
    );
  }, [showColumn]);

  return (
    <ParamListWrapper>
      {params.map(({ key, ...param }) => (
        <Param
          key={param.id}
          {...param}
          keyName={key}
          handleChangeParams={handleChangeParams}
          handleDeleteParam={handleDeleteParam}
          handleParamCheckToggle={handleParamCheckToggle}
          cellList={cellToShow}
        />
      ))}
    </ParamListWrapper>
  );
});

export default ParamList;
