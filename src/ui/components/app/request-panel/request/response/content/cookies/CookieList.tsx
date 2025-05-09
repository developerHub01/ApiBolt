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

interface CookieListProps {
  cookies: Array<CookieInterface>;
}

const CookieList = ({ cookies }: CookieListProps) => {
  return (
    <Table className="w-full h-full border">
      <TableHeader className="[&>tr>th]:border-r [&>tr>th]:last:border-r-0">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Path</TableHead>
          <TableHead>Expires</TableHead>
          <TableHead>HttpOnly</TableHead>
          <TableHead>Secure</TableHead>
          <TableHead>SameSite</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&>tr>td]:border-r [&>tr>td]:last:border-r-0">
        {cookies.map(
          ({
            name = "",
            value = "",
            domain = "",
            path = "",
            expires = "",
            HttpOnly = "",
            secure = "",
            samesite = "",
          }) => (
            <TableRow key={name} className="break-words whitespace-pre-wrap">
              {[
                name,
                value,
                domain,
                path,
                expires,
                HttpOnly,
                secure,
                samesite,
              ].map((value, index) => (
                <TableCell key={index}>
                  <DataTableCellContent value={value} />
                </TableCell>
              ))}
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default CookieList;
