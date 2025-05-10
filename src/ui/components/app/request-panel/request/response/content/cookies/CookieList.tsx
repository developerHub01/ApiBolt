import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CookieInterface } from "@/context/request/RequestResponseProvider";
import DataTableCellContent from "@/components/app/request-panel/request/response/content/DataTableCellContent";
import { useMemo } from "react";

interface CookieListProps {
  cookies: Array<CookieInterface>;
}

const CookieList = ({ cookies }: CookieListProps) => {
  const colList = useMemo(
    () =>
      Array.from(
        cookies.reduce<Set<string>>((acc, curr) => {
          return new Set([...acc, ...Object.keys(curr)]);
        }, new Set())
      ),
    [cookies]
  );

  return (
    <Table className="w-full h-full border">
      <TableHeader className="[&>tr>th]:border-r [&>tr>th]:last:border-r-0">
        <TableRow>
          {colList.map((item) => (
            <TableHead key={item} className="capitalize">
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="[&>tr>td]:border-r [&>tr>td]:last:border-r-0">
        {cookies.map((cookie) => (
          <TableRow
            key={cookie.name}
            className="break-words whitespace-pre-wrap"
          >
            {colList.map((item) => (
              <TableCell key={item}>
                <DataTableCellContent
                  value={cookie[item as keyof typeof cookie] ?? ""}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CookieList;
