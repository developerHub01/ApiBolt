import { memo, useCallback, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TMetaTableType } from "@/context/collections/request/RequestMetaTableProvider";
import MetaTableCell from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableCell";
import { cn } from "@/lib/utils";

const calculateDynamicText = "<calculated when request is sent>";

interface MetaTableRowProps {
  type?: TMetaTableType;
  id: string;
  keyName?: string;
  value: string | Array<File>;
  description?: string;
  contentType?: string;
  isCheck?: boolean;
  preventCheck?: boolean;
  prevent?: boolean;
  calculateDynamicly?: boolean;
  inputType?: "text" | "password";
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
    contentType = "",
    isCheck = false,
    preventCheck = false,
    prevent = false,
    calculateDynamicly = false,
    inputType = "text",
    handleChangeItem,
    handleDeleteItem,
    handleCheckToggle,
    cellList,
  }: MetaTableRowProps) => {
    const data: Record<string, string | Array<File>> = useMemo(
      () => ({
        key: keyName,
        value,
        contentType,
        description,
      }),
      [keyName, value, contentType, description]
    );

    const handleDelete = useCallback(
      () => handleDeleteItem(id),
      [handleDeleteItem, id]
    );

    const handleCheckChange = useCallback(
      () => handleCheckToggle(id),
      [id, handleCheckToggle]
    );

    return (
      <TableRow
        key={id}
        className={cn(
          "[&>td]:border-r [&>td]:last:border-r-0 [&>td>input]:outline-none [&>td>div>input]:outline-none [&>td>input]:rounded-md [&>td>div>input]:rounded-md",
          "focus-within:bg-accent/80 duration-75 transition-colors"
        )}
      >
        <TableCell className="px-0">
          <div className="w-full flex justify-center items-center">
            <Checkbox
              className="cursor-pointer"
              id={`${type}-check-${id}`}
              checked={isCheck || preventCheck}
              disabled={preventCheck}
              onCheckedChange={handleCheckChange}
            />
          </div>
        </TableCell>
        {cellList.map((keyType) => {
          const value = data[keyType];
          return (
            <MetaTableCell
              key={keyType}
              id={id}
              type={type}
              keyType={keyType}
              inputType={keyType === "value" ? inputType : "text"}
              value={
                calculateDynamicly && keyType === "value" && !value
                  ? calculateDynamicText
                  : value
              }
              prevent={prevent}
              onBlur={handleChangeItem}
            />
          );
        })}
        <TableCell className="p-0">
          {!prevent && (
            <div className="flex justify-center items-center">
              <Button size={"iconXs"} variant={"ghost"} onClick={handleDelete}>
                <DeleteIcon size={16} />
              </Button>
            </div>
          )}
        </TableCell>
      </TableRow>
    );
  }
);
MetaTableRow.displayName = "Meta table row";

export default MetaTableRow;
