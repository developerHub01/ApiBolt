"use client";

import React, { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import ParamListWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamListWrapper";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import Param from "./Param";

const ParamList = memo(() => {
  const { params } = useRequestResponse();

  return (
    <ParamListWrapper>
      {params.map(({ key, ...param }) => (
        <Param key={param.id} {...param} keyName={key} />
      ))}
    </ParamListWrapper>
  );
});

export default ParamList;
