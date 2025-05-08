import { Table, TableBody, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import CellPreview from "@/components/app/request-panel/request/response/content/body/content/body-json-preview/CellPreview";

interface ObjectPreviewProps {
  data: Record<string, unknown>;
  lavel?: number;
}

const ObjectPreview = ({ data, lavel }: ObjectPreviewProps) => {
  const tableData = Object.entries(data);

  if (!tableData) return null;

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
      <TableBody>
        {tableData.map(([key, value]) => (
          <TableRow key={key}>
            <CellPreview data={key} />
            <CellPreview data={value} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ObjectPreview;