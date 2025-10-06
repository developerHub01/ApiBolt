import { memo, useCallback, type MouseEvent, type RefObject } from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  deleteBodyFormDataFile,
  updateBodyFormDataFile,
} from "@/context/redux/request-response/thunks/body-form-data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import FileTag from "@/components/app/collections/request/request/meta-data/meta-table/FileTag";
import { Plus as AddIcon } from "lucide-react";
import type { FileDataInterface } from "@/types/request-response.types";

interface Props {
  id: string;
  value: string | Array<FileDataInterface>;
  triggerRef?: RefObject<HTMLButtonElement | null>;
  open?: boolean;
  setOpen?: (value: boolean) => void;
}

const FormDataValuePopover = memo(
  ({ id, value, open, setOpen, triggerRef }: Props) => {
    const dispatch = useAppDispatch();
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

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
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
            <ScrollArea className="w-full h-full min-h-0 p-0">
              <div className="max-h-28 w-full h-full flex flex-col gap-1.5 select-none">
                {value.map((file, index) => (
                  <FileTag
                    key={`${file}-${index}`}
                    name={file.file ?? "unknown"}
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
    );
  }
);

export default FormDataValuePopover;
