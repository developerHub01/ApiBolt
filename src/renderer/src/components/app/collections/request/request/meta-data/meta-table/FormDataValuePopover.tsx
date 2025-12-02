import { memo, type MouseEvent, type RefObject } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import FileTag from "@/components/app/collections/request/request/meta-data/meta-table/FileTag";
import { Plus as AddIcon } from "lucide-react";
import type { FileDataInterface } from "@shared/types/request-response.types";

interface Props {
  id: string;
  value: string | Array<FileDataInterface>;
  triggerRef?: RefObject<HTMLButtonElement | null>;
  open?: boolean;
  disabled?: boolean;
  setOpen?: (value: boolean) => void;
  onUploadFile?: () => void;
  onDeleteFormFile?: (index: number) => void;
  children?: React.ReactNode;
}

const FormDataValuePopover = memo(
  ({
    value,
    open,
    setOpen,
    disabled = false,
    triggerRef,
    children,
    onUploadFile,
    onDeleteFormFile,
  }: Props) => {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {children ? (
            children
          ) : (
            <Button ref={triggerRef} size={"iconXs"} variant={"secondary"}>
              <AddIcon />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="w-3xs min-h-full shadow-2xs bg-background p-1 border rounded-md flex flex-col gap-1.5"
          side="bottom"
          align="end"
          sideOffset={5}
          onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {Array.isArray(value) && !!value.length && (
            <ScrollArea className="w-full h-full min-h-0 p-0">
              <div className="max-h-28 w-full h-full flex flex-col gap-1.5 select-none">
                {value.map((file, index) => (
                  <FileTag
                    disabled={disabled}
                    key={`${file}-${index}`}
                    name={file.file ?? "unknown"}
                    onClose={() => onDeleteFormFile && onDeleteFormFile(index)}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
          {!disabled && (
            <Button
              className="w-full"
              size={"xs"}
              variant={"secondary"}
              onClick={onUploadFile}
            >
              <AddIcon /> Add new file
            </Button>
          )}
        </PopoverContent>
      </Popover>
    );
  }
);

export default FormDataValuePopover;
