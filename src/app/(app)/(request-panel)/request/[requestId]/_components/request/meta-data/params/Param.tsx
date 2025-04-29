"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParamInput from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/params/ParamInput";

interface ParamProps {
  id: string;
  keyName?: string;
  value?: string;
  description?: string;
  hide?: boolean;
  handleChangeParams: (id: string, key: string, value: string) => void;
  handleDeleteParam: (id: string) => void;
  handleParamCheckToggle: (id?: string) => void;
  cellList: Array<string>;
}

const Param = memo(
  ({
    id,
    keyName = "",
    value = "",
    description = "",
    hide = false,
    handleChangeParams,
    handleDeleteParam,
    handleParamCheckToggle,
    cellList,
  }: ParamProps) => {
    const [paramState, setParamState] = useState<{
      key: string;
      value: string;
      description: string;
    }>({
      key: keyName,
      value,
      description,
    });

    useEffect(() => {
      setParamState((prevState) => ({
        ...prevState,
        key: keyName,
        value,
        description,
      }));
    }, [keyName, value, description]);

    const handleChange = useCallback((key: string, value: string) => {
      setParamState((prev) => ({
        ...prev,
        [key]: value,
      }));
    }, []);

    const handleBlur = useCallback(
      (id: string, key: string) => {
        handleChangeParams(id, key, paramState[key as keyof typeof paramState]);
      },
      [id, paramState]
    );

    const handleDelete = useCallback(() => handleDeleteParam(id), [id]);

    const handleCheckChange = useCallback(
      () => handleParamCheckToggle(id),
      [id]
    );

    return (
      <TableRow
        key={id}
        className="[&>td]:border-r [&>td]:last:border-r-0 [&>td>input]:outline-none"
      >
        <TableCell className="px-0">
          <div className="w-full flex justify-center items-center">
            <Checkbox
              className="cursor-pointer"
              id={`param-hide-${id}`}
              checked={!hide}
              onCheckedChange={handleCheckChange}
            />
          </div>
        </TableCell>
        {cellList.map((id) => (
          <TableCell className="p-1.5" key={id}>
            <ParamInput
              id={id}
              value={paramState[id as keyof typeof paramState]}
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

export default Param;
