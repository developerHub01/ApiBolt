import React from "react";
import { TableCell } from "@/components/ui/table-v2";
import ArrayBodyPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ArrayBodyPreview";
import ObjectPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ObjectPreview";
import { cn } from "@/lib/utils";

interface CellPreviewProps {
  data?: Array<Record<string, any>> | Record<string, any> | any;
}

type TCellDataType = "array" | "object" | "raw";

const CellPreview = ({ data }: CellPreviewProps) => {
  if (data === null || data === undefined) return null;

  const cellDataType: TCellDataType =
    typeof data === "object" && Array.isArray(data)
      ? "array"
      : typeof data === "object" && !Array.isArray(data)
        ? "object"
        : "raw";

  return (
    <TableCell
      className={cn("", {
        "p-0": cellDataType !== "raw",
      })}
    >
      {cellDataType == "array" ? (
        <ArrayBodyPreview data={data} />
      ) : cellDataType === "object" ? (
        <ObjectPreview data={data} />
      ) : (
        data
      )}
    </TableCell>
  );
};

export default CellPreview;
