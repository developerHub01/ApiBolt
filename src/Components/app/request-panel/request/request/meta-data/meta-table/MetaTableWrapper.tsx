import React from "react";
import { Table, TableBody } from "@/components/ui/table";

interface MetaTableWrapperProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const MetaTableWrapper = ({ children, header }: MetaTableWrapperProps) => {
  return (
    <Table className="border w-full h-full">
      {header}
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export default MetaTableWrapper;
