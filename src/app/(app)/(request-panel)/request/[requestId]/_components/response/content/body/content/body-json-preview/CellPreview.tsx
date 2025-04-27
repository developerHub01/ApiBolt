import { TableCell } from "@/components/ui/table";
import React from "react";
import ArrayBodyPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ArrayBodyPreview";
import ObjectPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ObjectPreview";

interface CellPreviewProps {
  data?: Array<Record<string, any>> | Record<string, any> | any;
}

const CellPreview = ({ data }: CellPreviewProps) => {
  if (data === null || data === undefined) return null;

  return (
    <TableCell>
      {typeof data === "object" && Array.isArray(data) && (
        <ArrayBodyPreview data={data} />
      )}
      {typeof data === "object" && !Array.isArray(data) && (
        <ObjectPreview data={data} />
      )}
      {typeof data !== "object" && data}
    </TableCell>
  );
};

export default CellPreview;
