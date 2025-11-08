import { memo, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ParamInterface } from "@/types/request-response.types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  data: Array<ParamInterface<string>>;
}

const XWWWUrlencoded = memo(({ data }: Props) => {
  const showDescription = useMemo(
    () => data.some((item) => item.description),
    [data]
  );

  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full",
        "rounded-lg border"
      )}
    >
      <Table className="w-full h-full border select-text table-fixed">
        <TableHeader className="[&>tr>th]:border-r [&>tr>th]:last:border-r-0 bg-secondary/80">
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
            {showDescription && <TableHead>Description</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody className="[&>tr>td]:border-r [&>tr>td]:last:border-r-0">
          {data.map(({ key, value, description }) => (
            <TableRow key={key}>
              {(showDescription ? [key, value, description] : [key, value]).map(
                (value, index) => (
                  <TableCell
                    key={index}
                    className={cn("whitespace-normal wrap-break-word", {
                      capitalize: !index,
                    })}
                  >
                    {value}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
});

export default XWWWUrlencoded;
