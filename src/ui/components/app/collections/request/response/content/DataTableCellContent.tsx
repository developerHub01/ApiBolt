import { Input } from "@/components/ui/input-transparent";

interface DataTableCellContentProps {
  value: unknown;
}

const DataTableCellContent = ({ value }: DataTableCellContentProps) => {
  return (
    <Input type="text" value={String(value)} readOnly className="w-full" />
  );
};

export default DataTableCellContent;
