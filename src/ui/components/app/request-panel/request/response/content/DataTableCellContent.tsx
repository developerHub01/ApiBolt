import { cn } from "@/lib/utils";

interface DataTableCellContentProps {
  value: unknown;
}

const DataTableCellContent = ({ value }: DataTableCellContentProps) => {
  return (
    <input
      type="text"
      value={String(value)}
      disabled
      className={cn("w-full p-0.5", "focus:bg-background")}
    />
  );
};

export default DataTableCellContent;
