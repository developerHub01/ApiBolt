import { type ChangeEvent, memo, useCallback } from "react";
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
import { handleRemoveFormDataFile } from "@/context/redux/request-response/request-response-slice";
import { useAppDispatch } from "@/context/redux/hooks";
import LockTooltip from "@/components/app/collections/request/request/meta-data/meta-table/LockTooltip";
import FileTag from "@/components/app/collections/request/request/meta-data/meta-table/FileTag";

interface MetaTableCellProps {
  keyType: string;
  type?: TMetaTableType;
  id: string;
  value: string | Array<File>;
  inputType: "text" | "password";
  onBlur: (id: string, key: string, value: string | File) => void;
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
    const handleUploadFile = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        onBlur(id, keyType, file);
      },
      [onBlur, id, keyType]
    );

    return (
      <TableCell
        className={cn("p-1.5 relative overflow-visible min-w-auto md:min-w-24")}
      >
        <Popover>
          <div className="w-full flex gap-1 items-center">
            {typeof value === "string" ||
            (Array.isArray(value) && !value.length) ? (
              <>
                {keyType === "key" && prevent && <LockTooltip />}
                <MetaItemInput
                  keyType={keyType}
                  id={id}
                  value={Array.isArray(value) ? "" : value}
                  onBlur={onBlur}
                  disabled={prevent}
                  type={inputType}
                />
              </>
            ) : (
              <PopoverTrigger asChild>
                <FileTag
                  className="w-full px-1.5 rounded-md max-w-full"
                  name={`${value.length} Files`}
                />
              </PopoverTrigger>
            )}
            {type === "form-data" && keyType === "value" && !prevent && (
              <>
                <PopoverTrigger asChild>
                  <Button
                    size={"iconXs"}
                    variant={"secondary"}
                    className="size-6"
                  >
                    <AddIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-3xs min-h-full shadow-2xs bg-background p-1 border rounded-md flex flex-col gap-1.5"
                  side="left"
                  align="start"
                >
                  {Array.isArray(value) && !!value.length && (
                    <ScrollArea className="w-full h-full min-h-0">
                      <div className="max-h-24 w-full h-full flex flex-col gap-1.5 select-none">
                        {value.map((file, index) => (
                          <FileTag
                            key={index}
                            name={file.name ?? "unknown"}
                            onClose={() =>
                              dispatch(
                                handleRemoveFormDataFile({
                                  id,
                                  index,
                                })
                              )
                            }
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                  <label className="cursor-pointer">
                    <input type="file" hidden onChange={handleUploadFile} />
                    <Button
                      className="w-full pointer-events-none"
                      size={"sm"}
                      variant={"secondary"}
                    >
                      <AddIcon /> Add new file
                    </Button>
                  </label>
                </PopoverContent>
              </>
            )}
          </div>
        </Popover>
      </TableCell>
    );
  }
);
MetaTableCell.displayName = "Meta table cell";

export default MetaTableCell;
