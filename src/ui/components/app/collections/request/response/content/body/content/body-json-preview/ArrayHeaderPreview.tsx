import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <TableHeader>
      <TableRow
        style={{
          borderBottomWidth: 1,
        }}
      >
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