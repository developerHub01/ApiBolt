import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface MetaDataListWrapperProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const MetaDataListWrapper = ({
  children,
  header,
}: MetaDataListWrapperProps) => {
  return (
    <ScrollArea className="w-full h-full">
      <Table className="border">
        {header}
        <TableBody>{children}</TableBody>
      </Table>
    </ScrollArea>
  );
};

export default MetaDataListWrapper;
