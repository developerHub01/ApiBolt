import { memo, useCallback, useRef, useState, type MouseEvent } from "react";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import MetaItemInput from "@/components/app/collections/request/request/meta-data/meta-table/MetaItemInput";
import LockTooltip from "@/components/app/collections/request/request/meta-data/meta-table/LockTooltip";
import FileTag from "@/components/app/collections/request/request/meta-data/meta-table/FileTag";
import type {
  TMetaTableType,
  TParamContentType,
} from "@/types/request-response.types";
import FormDataValuePopover from "@/components/app/collections/request/request/meta-data/meta-table/FormDataValuePopover";
import ParamCell from "@/components/app/collections/request/request/meta-data/meta-table/ParamCell";

interface MetaTableCellProps {
  cellType: string;
  type?: TMetaTableType;
  id: string;
  value: string | Array<string>;
  cellContentType?: TParamContentType;
  inputType: "text" | "password";
  onBlur: (id: string, key: string, value: string) => void;
  prevent?: boolean;
}

const MetaTableCell = memo(
  ({
    cellType,
    type,
    id,
    value = "",
    cellContentType,
    onBlur,
    inputType = "text",
    prevent = false,
  }: MetaTableCellProps) => {
    const addButtonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    const openPopover = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (addButtonRef.current) setPopoverOpen(true);
    };

    const handleClickCell = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    return (
      <TableCell
        className={cn("p-2 relative overflow-hidden min-w-auto md:min-w-24")}
        onClick={handleClickCell}
      >
        <div className="w-full flex gap-1.5 items-center overflow-hidden">
          {Array.isArray(value) && value.length ? (
            <div onClick={openPopover} className="w-full cursor-pointer">
              <FileTag
                className="w-full px-1.5 rounded-md max-w-full min-w-40"
                name={`${value.length} Files`}
              />
            </div>
          ) : (
            <>
              {cellType === "key" && prevent && <LockTooltip />}
              {type === "params" && ["key", "value"].includes(cellType) ? (
                <ParamCell
                  id={id}
                  type={cellContentType!}
                  cellType={cellType}
                  value={Array.isArray(value) ? "" : value}
                >
                  <MetaItemInput
                    ref={inputRef}
                    cellType={cellType}
                    id={id}
                    value={Array.isArray(value) ? "" : value}
                    onBlur={onBlur}
                    disabled={prevent}
                    type={inputType}
                  />
                </ParamCell>
              ) : (
                <MetaItemInput
                  ref={inputRef}
                  cellType={cellType}
                  id={id}
                  value={Array.isArray(value) ? "" : value}
                  onBlur={onBlur}
                  disabled={prevent}
                  type={inputType}
                />
              )}
            </>
          )}
          {type === "form-data" && cellType === "value" && !prevent && (
            <FormDataValuePopover
              id={id}
              value={value}
              open={popoverOpen}
              setOpen={setPopoverOpen}
              triggerRef={addButtonRef}
            />
          )}
        </div>
      </TableCell>
    );
  }
);
MetaTableCell.displayName = "Meta table cell";

export default MetaTableCell;
