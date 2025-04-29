"use client";

import React, { memo, useMemo } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const Headers = memo(() => {
  const { response } = useRequestResponse();

  const headers = useMemo(
    () => Object.entries(response?.headers ?? {}),
    [response]
  );

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
          {headers.map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="capitalize">{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
});

export default Headers;
