import { Table, TableBody, TableRow } from "@/components/ui/table-v2";
import ArrayHeaderPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ArrayHeaderPreview";
import CellPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/CellPreview";
import { cn } from "@/lib/utils";

interface ArrayBodyPreviewProps {
  data: Array<Record<string, unknown>>;
  lavel?: number;
}

const ArrayBodyPreview = ({ data, lavel }: ArrayBodyPreviewProps) => {
  if (!data.length) return null;

  return (
    <Table
      className={cn(
        "w-full h-full",
        "[&_tr]:border-b",
        "[&_td]:border-r [&_td]:last:border-r-0",
        "[&_th]:border-r [&_th]:last:border-r-0",
        {
          border: lavel === 0,
        }
      )}
    >
      {data.every((item) => typeof item === "object") && (
        <ArrayHeaderPreview data={data} lavel={lavel} />
      )}
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {/* index of the array */}
            <CellPreview data={index} />

            {typeof row === "object" ? (
              Object.entries(row).map(([key, value]) => (
                <CellPreview key={key} data={value} />
              ))
            ) : (
              <CellPreview data={row} />
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ArrayBodyPreview;
