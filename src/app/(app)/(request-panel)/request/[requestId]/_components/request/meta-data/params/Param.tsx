"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const cellList = ["key", "value", "description"];

interface ParamProps {
  id: string;
  keyName?: string;
  value?: string;
  description?: string;
  hide?: boolean;
}

const Param = memo(
  ({ id, keyName = "", value = "", description = "", hide }: ParamProps) => {
    const { handleChangeParams, handleDeleteParam, handleParamCheckToggle } =
      useRequestResponse();
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
        <TableCell>
          <div className="w-full flex items-center">
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
            <Input
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

interface InputProps {
  id: string;
  value?: string;
  onChange: (key: string, value: string) => void;
  onBlur: (id: string, key: string) => void;
}

const Input = memo(({ id, value = "", onChange, onBlur }: InputProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.dataset.paramType) return;

      onChange(e.target.dataset.paramType, e.target.value);
    },
    [onChange]
  );
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (!e.target.dataset.paramType) return;

      onBlur(id, e.target.dataset.paramType);
    },
    [onBlur]
  );

  return (
    <input
      type="text"
      data-param-type={id}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-full focus:bg-background p-0.5"
    />
  );
});

export default Param;
