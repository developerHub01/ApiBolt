import { TableHead, TableHeader, TableRow } from "@/components/ui/table-v2";
import { cn } from "@/lib/utils";

interface ArrayHeaderPreviewProps {
  data: Array<Record<string, unknown>>;
  lavel?: number;
}

const ArrayHeaderPreview = ({ data }: ArrayHeaderPreviewProps) => {
  const headerList = Array.from(
    data.reduce<Set<string>>((acc, curr) => {
      return new Set([...acc, ...Object.keys(curr)]);
    }, new Set())
  );

  return (
    <TableHeader
      className={cn("", {
        // "sticky top-0": lavel === 0,
      })}
    >
      <TableRow>
        <TableHead></TableHead>
        {headerList.map((key) => (
          <TableHead key={key} className="font-semibold">
            {key}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default ArrayHeaderPreview;
