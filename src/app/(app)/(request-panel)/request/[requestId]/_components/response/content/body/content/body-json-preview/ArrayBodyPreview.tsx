import { Table, TableBody, TableRow } from "@/components/ui/table";
import ArrayHeaderPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/ArrayHeaderPreview";
import CellPreview from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/body/content/body-json-preview/CellPreview";

interface ArrayBodyPreviewProps {
  data: Array<Record<string, any>>;
  lavel?: number;
}

const ArrayBodyPreview = ({ data, lavel }: ArrayBodyPreviewProps) => {
  return (
    <Table className="w-full h-full">
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
