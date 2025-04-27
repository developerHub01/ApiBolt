import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ArrayHeaderPreviewProps {
  data: Array<Record<string, any>>;
}

const ArrayHeaderPreview = ({ data }: ArrayHeaderPreviewProps) => {
  const headerList = Array.from(
    data.reduce<Set<string>>((acc, curr) => {
      return new Set([...acc, ...Object.keys(curr)]);
    }, new Set())
  );

  return (
    <TableHeader>
      <TableRow>
        <TableHead></TableHead>
        {headerList.map((key) => (
          <TableHead key={key}>{key}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default ArrayHeaderPreview;
