import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableCellContent from "@/components/app/collections/request/response/content/DataTableCellContent";
import { getCookiePropertyList } from "@/utils/cookie";
import type { CookieInterface } from "@/types/request-response.types";

interface CookieListProps {
  cookies: Array<CookieInterface>;
}

const CookieList = ({ cookies }: CookieListProps) => {
  const colList = useMemo(
    () =>
      getCookiePropertyList(
        Array.from(
          cookies.reduce<Set<string>>((acc, curr) => {
            return new Set([...acc, ...Object.keys(curr)]);
          }, new Set())
        )
      ),
    [cookies]
  );

  return (
    <Table className="w-full h-full border select-text">
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
              <TableCell key={item} className="whitespace-normal break-words">
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
