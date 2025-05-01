"use client";

import React, { memo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaItemInput from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaItemInput";
import { TMetaTableType } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestMetaTableProvider";

interface MetaTableRowProps {
  type?: TMetaTableType;
  id: string;
  keyName?: string;
  value: string | Array<File>;
  description?: string;
  hide?: boolean;
  handleChangeItem: (id: string, key: string, value: string | File) => void;
  handleDeleteItem: (id: string) => void;
  handleCheckToggle: (id?: string) => void;
  cellList: Array<string>;
}

const MetaTableRow = memo(
  ({
    type,
    id,
    keyName = "",
    value = "",
    description = "",
    hide = false,
    handleChangeItem,
    handleDeleteItem,
    handleCheckToggle,
    cellList,
  }: MetaTableRowProps) => {
    const data: Record<string, string | Array<File>> = {
      key: keyName,
      value,
      description,
    };

    const handleDelete = useCallback(() => handleDeleteItem(id), [id]);

    const handleCheckChange = useCallback(() => handleCheckToggle(id), [id]);

    return (
      <TableRow
        key={id}
        className="[&>td]:border-r [&>td]:last:border-r-0 [&>td>input]:outline-none"
      >
        <TableCell className="px-0">
          <div className="w-full flex justify-center items-center">
            <Checkbox
              className="cursor-pointer"
              id={`${type}-hide-${id}`}
              checked={!hide}
              onCheckedChange={handleCheckChange}
            />
          </div>
        </TableCell>
        {cellList.map((keyType) => {
          const value = data[keyType];
          return (
            <TableCell className="p-1.5" key={keyType}>
              {typeof value === "string" && (
                <MetaItemInput
                  keyType={keyType}
                  id={id}
                  value={value}
                  onBlur={handleChangeItem}
                />
              )}
            </TableCell>
          );
        })}
        <TableCell className="p-0">
          <div className="flex justify-center items-center">
            <Button size={"iconXs"} variant={"ghost"} onClick={handleDelete}>
              <DeleteIcon size={16} />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }
);

export default MetaTableRow;
