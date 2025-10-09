import { memo, useCallback, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaTableCell from "@/components/app/collections/request/request/meta-data/meta-table/MetaTableCell";
import { cn } from "@/lib/utils";
import type {
  FileDataInterface,
  FormDataInterface,
  ParamInterface,
  TMetaTableType,
  TParamContentType,
} from "@/types/request-response.types";
import { AUTHORIZATION_DATA_ID } from "@/constant/authorization.constant";

const calculateDynamicText = "<calculated when request is sent>";

interface MetaTableRowProps {
  type?: TMetaTableType;
  id: string;
  keyName?: string;
  value: string | Array<FileDataInterface>;
  keyType?: TParamContentType;
  valueType?: TParamContentType;
  description?: string;
  contentType?: string;
  isCheck?: boolean;
  preventCheck?: boolean;
  prevent?: boolean;
  calculateDynamicly?: boolean;
  inputType?: "text" | "password";
  handleChangeItem: (id: string, key: string, value: string) => void;
  handleDeleteItem: (id: string) => void;
  handleCheckToggle: (
    payload: Pick<
      ParamInterface<string> | FormDataInterface,
      "id" | "prevent" | "isCheck"
    >
  ) => void;
  cellList: Array<string>;
}

const MetaTableRow = memo(
  ({
    type,
    id,
    keyName = "",
    value = "",
    keyType = "text",
    valueType = "text",
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
    const data: Record<string, string | Array<FileDataInterface>> = useMemo(
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
      () =>
        handleCheckToggle({
          id,
          prevent,
          isCheck,
        }),
      [handleCheckToggle, id, isCheck, prevent]
    );

    return (
      <TableRow
        key={id}
        className={cn(
          "[&>td]:border-r [&>td]:last:border-r-0 [&>td>input]:outline-none [&>td>div>input]:outline-none [&>td>input]:rounded-md [&>td>div>input]:rounded-md",
          "focus-within:bg-accent/60 duration-75 transition-colors"
        )}
      >
        <TableCell className="px-0">
          <div className="w-full flex justify-center items-center">
            <Checkbox
              className="cursor-pointer"
              id={`${type}-check-${id}`}
              checked={isCheck || preventCheck}
              disabled={preventCheck || id === AUTHORIZATION_DATA_ID}
              onCheckedChange={handleCheckChange}
            />
          </div>
        </TableCell>
        {cellList.map((cellType) => {
          const value = data[cellType];
          return (
            <MetaTableCell
              key={cellType}
              id={id}
              type={type}
              cellContentType={
                cellType === "key"
                  ? keyType
                  : cellType === "value"
                    ? valueType
                    : undefined
              }
              cellType={cellType}
              inputType={cellType === "value" ? inputType : "text"}
              value={
                calculateDynamicly && cellType === "value" && !value
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
