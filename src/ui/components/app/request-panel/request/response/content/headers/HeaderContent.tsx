import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableCellContent from "@/components/app/request-panel/request/response/content/DataTableCellContent";

interface HeaderContentProps {
  headers: Record<string, string>;
}

const HeaderContent = ({ headers }: HeaderContentProps) => {
  return (
    <Table className="w-full h-full border">
      <TableHeader className="[&>tr>th]:border-r [&>tr>th]:last:border-r-0">
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&>tr>td]:border-r [&>tr>td]:last:border-r-0">
        {Object.entries(headers).map(([key, value]) => (
          <TableRow key={key}>
            {[key, value].map((value, index) => (
              <TableCell key={index} className="capitalize">
                <DataTableCellContent value={value} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HeaderContent;
