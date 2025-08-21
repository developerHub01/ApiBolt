import { memo } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  useRequestMetaTable,
  type TMetaTableType,
} from "@/context/collections/request/RequestMetaTableProvider";
import MetaTableCheckAll from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableCheckAll";
import MetaTableThreeDotAction from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableThreeDotAction";

interface MetaTableHeaderProps {
  type: TMetaTableType;
}

const MetaTableHeader = memo(({ type }: MetaTableHeaderProps) => {
  const {
    showColumn: { description, value },
  } = useRequestMetaTable();

  return (
    <TableHeader className="select-none">
      <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
        <TableHead
          className="px-0"
          style={{
            width: 45,
          }}
        >
          <MetaTableCheckAll />
        </TableHead>
        <TableHead>Key</TableHead>
        {value && <TableHead>Value</TableHead>}
        {description && <TableHead>Description</TableHead>}
        <TableHead
          className="p-0"
          style={{
            width: 45,
          }}
        >
          <MetaTableThreeDotAction type={type} />
        </TableHead>
      </TableRow>
    </TableHeader>
  );
});
MetaTableHeader.displayName = "Meta table header";

export default MetaTableHeader;
