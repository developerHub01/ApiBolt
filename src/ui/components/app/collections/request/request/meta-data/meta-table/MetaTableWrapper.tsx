import React from "react";
import { Table, TableBody } from "@/components/ui/table";

interface MetaTableWrapperProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const MetaTableWrapper = ({ children, header }: MetaTableWrapperProps) => {
  return (
    <section className="w-full rounded-lg border border-t-0 overflow-hidden flex-1">
      <Table className="w-full h-full table-fixed border-0 border-b">
        {header}
        <TableBody>{children}</TableBody>
      </Table>
    </section>
  );
};

export default MetaTableWrapper;
