"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaItemInput from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/headers-params/MetaItemInput";

interface MetaItemProps {
  type?: "header" | "param";
  id: string;
  keyName?: string;
  value?: string;
  description?: string;
  hide?: boolean;
  handleChangeItem: (id: string, key: string, value: string) => void;
  handleDeleteItem: (id: string) => void;
  handleCheckToggle: (id?: string) => void;
  cellList: Array<string>;
}

const MetaItem = memo(
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
  }: MetaItemProps) => {
    const [metaItemState, setMetaItemState] = useState<{
      key: string;
      value: string;
      description: string;
    }>({
      key: keyName,
      value,
      description,
    });

    useEffect(() => {
      setMetaItemState((prevState) => ({
        ...prevState,
        key: keyName,
        value,
        description,
      }));
    }, [keyName, value, description]);

    const handleChange = useCallback((key: string, value: string) => {
      setMetaItemState((prev) => ({
        ...prev,
        [key]: value,
      }));
    }, []);

    const handleBlur = useCallback(
      (id: string, key: string) => {
        handleChangeItem(
          id,
          key,
          metaItemState[key as keyof typeof metaItemState]
        );
      },
      [id, metaItemState]
    );

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
        {cellList.map((id) => (
          <TableCell className="p-1.5" key={id}>
            <MetaItemInput
              id={id}
              value={metaItemState[id as keyof typeof metaItemState]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </TableCell>
        ))}
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

export default MetaItem;
