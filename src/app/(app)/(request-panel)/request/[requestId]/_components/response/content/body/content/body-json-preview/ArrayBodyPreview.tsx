import { Table, TableBody, TableRow } from "@/components/ui/table";
import ArrayHeaderPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ArrayHeaderPreview";
import CellPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/CellPreview";

interface ArrayBodyPreviewProps {
  data: Array<Record<string, any>>;
}

const ArrayBodyPreview = ({ data }: ArrayBodyPreviewProps) => {
  return (
    <Table className="w-full h-full">
      {typeof data === "object" && Array.isArray(data) && (
        <ArrayHeaderPreview data={data} />
      )}
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <CellPreview data={index} />
            {Object.entries(row).map(([key, value]) => (
              <CellPreview key={key} data={value} />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ArrayBodyPreview;
