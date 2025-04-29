"use client";

import React, { memo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import MetaDataListCheckAll from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaDataListCheckAll";

const HeaderHeaderCheck = memo(() => {
  const { headers, handleHeaderCheckToggle } = useRequestResponse();

  if (!headers.length) return null;

  const isAllChecked = headers.every((header) => !header.hide);

  return (
    <MetaDataListCheckAll
      id="headers-all"
      checked={isAllChecked}
      onChange={handleHeaderCheckToggle}
    />
  );
});

export default HeaderHeaderCheck;
