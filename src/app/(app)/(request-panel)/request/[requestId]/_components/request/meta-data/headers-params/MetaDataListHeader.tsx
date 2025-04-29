"use client";

import React, { memo } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ParamHeaderCheck from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/params/ParamHeaderCheck";
import { useRequestParamsHeaders } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestParamsHeadersProvider";
import HeaderHeaderCheck from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/headers/HeaderHeaderCheck";
import MetaDataListThreeDotAction from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaDataListThreeDotAction";

interface MetaDataListHeaderProps {
  type: "param" | "header";
}

const MetaDataListHeader = memo(({ type }: MetaDataListHeaderProps) => {
  const {
    showColumn: { description, value },
  } = useRequestParamsHeaders();

  return (
    <TableHeader className="select-none">
      <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
        <TableHead className="px-0 min-w-5">
          {type === "header" ? <HeaderHeaderCheck /> : <ParamHeaderCheck />}
        </TableHead>
        <TableHead>Key</TableHead>
        {value && <TableHead>Value</TableHead>}
        {description && <TableHead>Description</TableHead>}
        <TableHead className="p-0">
          <MetaDataListThreeDotAction type={type} />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
});

export default MetaDataListHeader;
