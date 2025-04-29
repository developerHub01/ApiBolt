import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import ParamListHeader from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamListHeader";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ParamListWrapperProps {
  children: React.ReactNode;
}

const ParamListWrapper = ({ children }: ParamListWrapperProps) => {
  return (
    <ScrollArea className="w-full h-full">
      <Table className="border">
        <ParamListHeader />
        <TableBody>{children}</TableBody>
      </Table>
    </ScrollArea>
  );
};

export default ParamListWrapper;
