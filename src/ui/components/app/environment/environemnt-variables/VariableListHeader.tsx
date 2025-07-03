import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const VariableListHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead
          className="px-0"
          style={{
            minWidth: 40,
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
