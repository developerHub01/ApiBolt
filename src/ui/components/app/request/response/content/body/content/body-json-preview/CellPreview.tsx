import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import ArrayBodyPreview from "@/components/app/request/response/content/body/content/body-json-preview/ArrayBodyPreview";
import ObjectPreview from "@/components/app/request/response/content/body/content/body-json-preview/ObjectPreview";

interface CellPreviewProps {
  data?: Array<Record<string, unknown>> | Record<string, unknown> | unknown;
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
      className={cn("whitespace-normal break-words", {
        "p-0": cellDataType !== "raw",
      })}
    >
      {cellDataType == "array" ? (
        <ArrayBodyPreview data={data as Array<Record<string, unknown>>} />
      ) : cellDataType === "object" ? (
        <ObjectPreview data={data as Record<string, unknown>} />
      ) : (
        String(data)
      )}
    </TableCell>
  );
};

export default CellPreview;
