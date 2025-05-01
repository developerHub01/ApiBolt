import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface MetaTableWrapperProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const MetaTableWrapper = ({ children, header }: MetaTableWrapperProps) => {
  return (
    <ScrollArea className="w-full h-full">
      <Table className="border">
        {header}
        <TableBody>{children}</TableBody>
      </Table>
    </ScrollArea>
  );
};

export default MetaTableWrapper;
