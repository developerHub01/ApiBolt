import { memo, useMemo } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  ParamInterface,
  TMetaTableType,
} from "@shared/types/request-response.types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import MetaTableRow from "@/components/app/history-details/content/meta/meta-table/MetaTableRow";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  type: TMetaTableType;
  data: Array<ParamInterface<string>>;
}

const MetaTable = memo(({ type, data }: Props) => {
  const showDescription = useMemo(
    () => data.some(item => item.description),
    [data],
  );

  const isAllChecked = useMemo(() => data.every(item => item.isCheck), [data]);

  return (
    <ScrollArea
      className={cn(
        "flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full",
        "rounded-lg border",
      )}
    >
      <Table className="w-full h-full select-text table-fixed">
        <TableHeader className="[&>tr>th]:border-r [&>tr>th]:last:border-r-0 bg-secondary/80">
          <TableRow>
            <TableHead
              className="px-0"
              style={{
                width: 45,
              }}
            >
              <div className="w-full flex justify-center items-center">
                <Checkbox
                  className="cursor-pointer"
                  checked={isAllChecked}
                  disabled
                />
              </div>
            </TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
            {showDescription && <TableHead>Description</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody className="[&>tr>td]:border-r [&>tr>td]:last:border-r-0 [&>tr>td]:border-b">
          {data.map(rowData => (
            <MetaTableRow
              type={type}
              keyName={rowData.key}
              {...rowData}
              key={rowData.id}
              showDescription={showDescription}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
});

export default MetaTable;
