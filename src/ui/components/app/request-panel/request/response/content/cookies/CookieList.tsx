import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CookieInterface } from "@/context/request/RequestResponseProvider";

interface CookieListProps {
  cookies: Array<CookieInterface>;
}

const CookieList = ({ cookies }: CookieListProps) => {
  return (
    <Table>
      <TableHeader>
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
      <TableBody>
        {cookies.map(
          ({
            name,
            value,
            domain,
            path,
            expires,
            HttpOnly,
            secure,
            samesite,
          }) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{value}</TableCell>
              <TableCell>{domain}</TableCell>
              <TableCell>{path}</TableCell>
              <TableCell>{expires}</TableCell>
              <TableCell>{HttpOnly}</TableCell>
              <TableCell>{secure}</TableCell>
              <TableCell>{samesite}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default CookieList;
