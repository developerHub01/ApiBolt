"use client";

import React, { memo } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ParamsThreeDotAction from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamsThreeDotAction";
import ParamHeaderCheck from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamHeaderCheck";
import { useRequestParams } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestParamsProvider";

const ParamListHeader = memo(() => {
  const {
    showColumn: { description, value },
  } = useRequestParams();

  return (
    <TableHeader className="select-none">
      <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
        <TableHead className="px-0">
          <ParamHeaderCheck />
        </TableHead>
        <TableHead>Key</TableHead>
        {value && <TableHead>Value</TableHead>}
        {description && <TableHead>Description</TableHead>}
        <TableHead className="p-0">
          <ParamsThreeDotAction />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
});

export default ParamListHeader;
