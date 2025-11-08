import { memo, useRef, useState, type MouseEvent } from "react";
import type {
  FileDataInterface,
  TMetaTableType,
  TParamContentType,
} from "@/types/request-response.types";
import FileTag from "@/components/app/collections/request/request/meta-data/meta-table/FileTag";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import FormDataValuePopover from "@/components/app/collections/request/request/meta-data/meta-table/FormDataValuePopover";
import ParamsCell from "@/components/app/history-details/content/meta/meta-table/ParamsCell";
import CellTextContent from "@/components/app/history-details/content/meta/meta-table/CellTextContent";

interface Props {
  cellType: "key" | "value" | "description";
  type?: TMetaTableType;
  id: string;
  value: string | Array<FileDataInterface>;
  cellContentType?: TParamContentType;
  inputType: "text" | "password";
}

const MetaTableCell = memo(
  ({ id, value, type, cellType, cellContentType }: Props) => {
    const addButtonRef = useRef<HTMLButtonElement>(null);
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    const openPopover = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setPopoverOpen(true);
    };

    return (
      <TableCell
        className={cn("p-0 relative overflow-hidden min-w-auto md:min-w-24")}
      >
        <div className="p-2 w-full flex gap-1.5 items-center overflow-hidden min-h-11">
          {Array.isArray(value) &&
          Boolean(value.length) &&
          type === "form-data" &&
          cellType === "value" ? (
            <div onClick={openPopover} className="w-full cursor-pointer">
              <FormDataValuePopover
                id={id}
                value={value}
                open={popoverOpen}
                setOpen={setPopoverOpen}
                triggerRef={addButtonRef}
                disabled
              >
                <FileTag
                  className="w-full px-1.5 rounded-md max-w-full min-w-40"
                  name={`${value.length} Files`}
                />
              </FormDataValuePopover>
            </div>
          ) : type === "params" ? (
            <ParamsCell
              cellType={cellType}
              value={value as string}
              cellContentType={cellContentType ?? "text"}
            />
          ) : (
            <CellTextContent>{value as string}</CellTextContent>
          )}
        </div>
      </TableCell>
    );
  }
);

export default MetaTableCell;
