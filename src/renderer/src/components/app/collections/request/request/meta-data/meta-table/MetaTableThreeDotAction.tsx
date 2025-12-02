import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Ellipsis as ThreeDotIcon,
  Plus as AddIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type {
  TMetaShowColumnKey,
  TMetaTableType,
} from "@shared/types/request-response.types";
import { useRequestMetaData } from "@/context/collections/request/RequestMetaDataProvider";

interface MetaTableThreeDotActionProps {
  type: TMetaTableType;
}

const MetaTableThreeDotAction = memo(
  ({ type }: MetaTableThreeDotActionProps) => {
    const {
      showColumn,
      handleAddNewData,
      handleDeleteAllData,
      handleUpdateMetaShowColumn,
    } = useRequestMetaData();

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex justify-center items-center">
            <Button size={"iconXs"} variant={"ghost"}>
              <ThreeDotIcon />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="bottom"
          className="flex flex-col gap-1 p-1.5 max-w-40 select-none"
        >
          <span className="text-xs px-2 pb-1">Show columns</span>
          <div className="flex flex-col pl-3">
            <CheckItem
              type={type}
              id="value"
              label="Value"
              value={showColumn?.value ?? true}
              onChange={() => handleUpdateMetaShowColumn("value")}
            />
            <CheckItem
              type={type}
              id="description"
              label="Description"
              value={showColumn?.description ?? false}
              onChange={() => handleUpdateMetaShowColumn("description")}
            />
          </div>
          <span className="text-xs px-2 pb-1">Actions</span>
          <div className="flex flex-col pl-3">
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={handleAddNewData}
              className="justify-start"
            >
              <AddIcon /> Add New
            </Button>
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={handleDeleteAllData}
              className="justify-start"
            >
              <DeleteIcon /> Delete All
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
MetaTableThreeDotAction.displayName = "Meta table three dot action";

interface CheckItemProps {
  type: TMetaTableType;
  id: TMetaShowColumnKey;
  label: string;
  value: boolean;
  onChange: (id: TMetaShowColumnKey) => void;
}

const CheckItem = ({ type, id, label, value, onChange }: CheckItemProps) => {
  return (
    <Label
      htmlFor={`${type}-${id}`}
      className="w-full flex items-center gap-2 hover:bg-accent p-2 rounded-md cursor-pointer"
    >
      <Checkbox
        id={`${type}-${id}`}
        checked={value}
        className="cursor-pointer"
        onCheckedChange={() => onChange(id)}
      />
      <p className="pb-0.5">{label}</p>
    </Label>
  );
};

export default MetaTableThreeDotAction;
