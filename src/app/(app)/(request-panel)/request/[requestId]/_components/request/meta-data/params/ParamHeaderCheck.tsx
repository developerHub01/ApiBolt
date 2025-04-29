"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

const ParamHeaderCheck = () => {
  const { params, handleParamCheckToggle } = useRequestResponse();

  const isAllChecked = params.every((param) => !param.hide);

  console.log({ isAllChecked });

  return (
    <div className="w-full flex items-center">
      <Checkbox
        className="cursor-pointer"
        checked={isAllChecked}
        onCheckedChange={() => handleParamCheckToggle()}
      />
    </div>
  );
};

export default ParamHeaderCheck;
