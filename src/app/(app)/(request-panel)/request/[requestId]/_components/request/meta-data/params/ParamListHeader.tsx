import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ParamsThreeDotAction from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamsThreeDotAction";
import ParamHeaderCheck from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamHeaderCheck";

const ParamListHeader = () => {
  return (
    <TableHeader className="select-none">
      <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
        <TableHead>
          <ParamHeaderCheck />
        </TableHead>
        <TableHead>Key</TableHead>
        <TableHead>Value</TableHead>
        <TableHead>
          <div className="flex justify-between items-center">
            <p>Description</p>
          </div>
        </TableHead>
        <TableHead className="p-0">
          <ParamsThreeDotAction />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ParamListHeader;
