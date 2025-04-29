"use client";

import React, { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

const ParamHeaderCheck = memo(() => {
  const { params, handleParamCheckToggle } = useRequestResponse();

  if (!params.length) return null;

  const isAllChecked = params.every((param) => !param.hide);

  return (
    <div className="w-full min-w-7 flex justify-center items-center">
      <Checkbox
        className="cursor-pointer"
        checked={isAllChecked}
        onCheckedChange={() => handleParamCheckToggle()}
      />
    </div>
  );
});

export default ParamHeaderCheck;
