import { memo, useCallback, useRef, useState, type MouseEvent } from "react";
import { TableCell } from "@/components/ui/table";
import { Plus as AddIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { type TMetaTableType } from "@/context/collections/request/RequestMetaTableProvider";
import MetaItemInput from "@/components/app/collections/request/request/meta-data/meta-table/MetaItemInput";
import { useAppDispatch } from "@/context/redux/hooks";
import LockTooltip from "@/components/app/collections/request/request/meta-data/meta-table/LockTooltip";
import FileTag from "@/components/app/collections/request/request/meta-data/meta-table/FileTag";
import {
  deleteBodyFormDataFile,
  updateBodyFormDataFile,
} from "@/context/redux/request-response/thunks/body-form-data";

interface MetaTableCellProps {
  keyType: string;
  type?: TMetaTableType;
  id: string;
  value: string | Array<string>;
  inputType: "text" | "password";
  onBlur: (id: string, key: string, value: string) => void;
  prevent?: boolean;
}

const MetaTableCell = memo(
  ({
    keyType,
    type,
    id,
    value = "",
    onBlur,
    inputType = "text",
    prevent = false,
  }: MetaTableCellProps) => {
    const dispatch = useAppDispatch();
    const addButtonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    const handleUploadFile = useCallback(
      () => dispatch(updateBodyFormDataFile(id)),
      [dispatch, id]
    );

    const handleDeleteFormFile = useCallback(
      (id: string, index: number) =>
        dispatch(
          deleteBodyFormDataFile({
            id,
            index,
          })
        ),
      [dispatch]
    );

    const openPopover = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (addButtonRef.current) setPopoverOpen(true);
    };

    const handleClickCell = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    return (
      <TableCell
        className={cn("p-1.5 relative overflow-visible min-w-auto md:min-w-24 group")}
        onClick={handleClickCell}
      >
        <div className="w-full flex gap-1.5 items-center">
          {Array.isArray(value) && value.length ? (
            <div onClick={openPopover} className="w-full cursor-pointer">
              <FileTag
                className="w-full px-1.5 rounded-md max-w-full min-w-40"
                name={`${value.length} Files`}
              />
            </div>
          ) : (
            <>
              {keyType === "key" && prevent && <LockTooltip />}
              <MetaItemInput
                ref={inputRef}
                keyType={keyType}
                id={id}
                value={Array.isArray(value) ? "" : value}
                onBlur={onBlur}
                disabled={prevent}
                type={inputType}
              />
            </>
          )}
          {type === "form-data" && keyType === "value" && !prevent && (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  ref={addButtonRef}
                  size={"iconXs"}
                  variant={"secondary"}
                  className="size-6"
                >
                  <AddIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-3xs min-h-full shadow-2xs bg-background p-1 border rounded-md flex flex-col gap-1.5"
                side="bottom"
                align="end"
                sideOffset={5}
                onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              >
                {Array.isArray(value) && !!value.length && (
                  <ScrollArea className="w-full h-full min-h-0">
                    <div className="max-h-24 w-full h-full flex flex-col gap-1.5 select-none">
                      {value.map((file, index) => (
                        <FileTag
                          key={`${file}-${index}`}
                          name={file ?? "unknown"}
                          onClose={() => handleDeleteFormFile(id, index)}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                )}
                <Button
                  className="w-full"
                  size={"sm"}
                  variant={"secondary"}
                  onClick={handleUploadFile}
                >
                  <AddIcon /> Add new file
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </TableCell>
    );
  }
);
MetaTableCell.displayName = "Meta table cell";

export default MetaTableCell;
