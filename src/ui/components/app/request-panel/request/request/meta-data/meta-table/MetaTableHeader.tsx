import { memo } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  useRequestMetaTable,
  type TMetaTableType,
} from "@/context/request/RequestMetaTableProvider";
import MetaTableCheckAll from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableCheckAll";
import MetaTableThreeDotAction from "@/components/app/request-panel/request/request/meta-data/meta-table/MetaTableThreeDotAction";

interface MetaTableHeaderProps {
  type: TMetaTableType;
}

const MetaTableHeader = memo(({ type }: MetaTableHeaderProps) => {
  const {
    showColumn: { description, value, contentType },
  } = useRequestMetaTable();

  const showContentType = contentType && type === "form-data";

  return (
    <TableHeader className="select-none">
      <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
        <TableHead
          className="px-0"
          style={{
            minWidth: 40,
          }}
        >
          <MetaTableCheckAll />
        </TableHead>
        <TableHead>Key</TableHead>
        {value && <TableHead>Value</TableHead>}
        {showContentType && <TableHead>Content-Type</TableHead>}
        {description && <TableHead>Description</TableHead>}
        <TableHead
          className="p-0"
          style={{
            minWidth: 40,
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
