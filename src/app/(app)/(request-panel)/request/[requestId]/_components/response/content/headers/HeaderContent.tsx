import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HeaderContentProps {
  headers: Record<string, string>;
}

const HeaderContent = ({ headers }: HeaderContentProps) => {
  return (
    <ScrollArea className="w-full h-full">
      <Table className="w-full h-full">
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(headers).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="capitalize">{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default HeaderContent;
