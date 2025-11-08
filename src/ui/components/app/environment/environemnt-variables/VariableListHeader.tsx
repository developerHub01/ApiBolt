import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const VariableListHeader = () => {
  return (
    <TableHeader className="select-none bg-secondary/80">
      <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
        <TableHead
          className="px-0"
          style={{
            width: 45,
          }}
        ></TableHead>
        <TableHead>Variable</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Value</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default VariableListHeader;
