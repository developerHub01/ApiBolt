"use client";

import React, { ChangeEvent, memo, useCallback } from "react";
import { TableCell } from "@/components/ui/table";
import { Plus as AddIcon, X as CloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaItemInput from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/meta-table/MetaItemInput";
import {
  TMetaTableType,
  useRequestMetaTable,
} from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestMetaTableProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MetaTableCellProps {
  keyType: string;
  type?: TMetaTableType;
  id: string;
  value: string | Array<File>;
  onBlur: (id: string, key: string, value: string | File) => void;
}

const MetaTableCell = memo(
  ({ keyType, type, id, value = "", onBlur }: MetaTableCellProps) => {
    const { handleRemoveFormDataFile } = useRequestMetaTable();

    const handleUploadFile = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        onBlur(id, keyType, file);
      },
      [onBlur, id, keyType]
    );

    return (
      <TableCell className="p-1.5 relative overflow-visible min-w-auto md:min-w-24">
        <Popover>
          <div className="w-full flex gap-1 items-center">
            {typeof value === "string" ||
            (Array.isArray(value) && !value.length) ? (
              <MetaItemInput
                keyType={keyType}
                id={id}
                value={Array.isArray(value) ? "" : value}
                onBlur={onBlur}
              />
            ) : (
              <PopoverTrigger asChild>
                <FileTag
                  className="w-full px-1.5 rounded-md max-w-full"
                  name={`${value.length} Files`}
                />
              </PopoverTrigger>
            )}
            {type === "form-data" && keyType === "value" && (
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
                            onClose={() => handleRemoveFormDataFile(id, index)}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                  <label>
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

interface FileTagProps {
  name: string;
  onClose?: () => void;
  className?: string;
  [key: string]: unknown;
}

const FileTag = ({ name, onClose, className = "", ...props }: FileTagProps) => {
  return (
    <div
      className={cn(
        "bg-secondary/80 hover:bg-secondary rounded-sm flex items-center gap-1 p-0.5 w-60 select-none text-sm mx-auto",
        className
      )}
      {...props}
    >
      <p className="text-muted-foreground w-full truncate">{name}</p>
      {onClose && (
        <>
          <Button
            size={"iconXs"}
            variant={"ghost"}
            onClick={onClose}
            className="border-l-2 rounded-none"
          >
            <CloseIcon />
          </Button>
        </>
      )}
    </div>
  );
};
FileTag.displayName = "File tag";

export default MetaTableCell;
