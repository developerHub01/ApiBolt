import { Table, TableBody, TableRow } from "@/components/ui/table-v2";
import CellPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/CellPreview";

interface ObjectPreviewProps {
  data: Record<string, unknown>;
}

const ObjectPreview = ({ data }: ObjectPreviewProps) => {
  const tableData = Object.entries(data);

  if (!tableData) return null;

  return (
    <Table className="w-full h-full">
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
