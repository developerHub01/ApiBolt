"use client";

import React, { memo } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  TMetaTableType,
  useRequestMetaTable,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestMetaTableProvider";
import MetaDataListThreeDotAction from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaTableThreeDotAction";
import MetaTableCheckAll from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaTableCheckAll";

interface MetaTableHeaderProps {
  type: TMetaTableType;
}

const MetaTableHeader = memo(({ type }: MetaTableHeaderProps) => {
  const {
    showColumn: { description, value, contentType },
  } = useRequestMetaTable();

  const showContentType = contentType && type === "form-data";

  return (
    <TableHeader className="select-none">
      <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
        <TableHead
          className="px-0"
          style={{
            minWidth: 40,
          }}
        >
          <MetaTableCheckAll />
        </TableHead>
        <TableHead>Key</TableHead>
        {value && <TableHead>Value</TableHead>}
        {showContentType && <TableHead>Content-Type</TableHead>}
        {description && <TableHead>Description</TableHead>}
        <TableHead
          className="p-0"
          style={{
            minWidth: 40,
          }}
        >
          <MetaDataListThreeDotAction type={type} />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
});
MetaTableHeader.displayName = "Meta table header";

export default MetaTableHeader;
