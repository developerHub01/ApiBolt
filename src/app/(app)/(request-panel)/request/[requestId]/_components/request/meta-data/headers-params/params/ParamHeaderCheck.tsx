"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import MetaDataListCheckAll from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaDataListCheckAll";

const ParamHeaderCheck = memo(() => {
  const { params, handleParamCheckToggle } = useRequestResponse();

  if (!params.length) return null;

  const isAllChecked = params.every((param) => !param.hide);

  return (
    <MetaDataListCheckAll
      id="params-all"
      checked={isAllChecked}
      onChange={handleParamCheckToggle}
    />
  );
});

export default ParamHeaderCheck;
