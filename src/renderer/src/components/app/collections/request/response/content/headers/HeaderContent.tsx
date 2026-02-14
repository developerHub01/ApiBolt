import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface HeaderContentProps {
  headers: Record<string, string>;
}

const HeaderContent = ({ headers }: HeaderContentProps) => {
  return (
    <Table className="w-full h-full border select-text table-fixed">
      <TableHeader className="[&>tr>th]:border-r [&>tr>th]:last:border-r-0 bg-secondary/80">
        <TableRow>
          <TableHead className="select-text">Key</TableHead>
          <TableHead className="select-text">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&>tr>td]:border-r [&>tr>td]:last:border-r-0">
        {Object.entries(headers).map(([key, value]) => (
          <TableRow key={key}>
            {[key, value].map((value, index) => (
              <TableCell
                key={index}
                className={cn("whitespace-normal wrap-break-word select-text", {
                  capitalize: !index,
                })}
              >
                {value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HeaderContent;
