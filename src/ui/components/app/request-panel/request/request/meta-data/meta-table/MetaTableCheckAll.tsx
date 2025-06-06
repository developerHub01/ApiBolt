import { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  useGetTableData,
  useRequestMetaTable,
} from "@/context/request/RequestMetaTableProvider";

interface MetaTableCheckAllProps {
  id?: string;
  className?: string;
}

const MetaTableCheckAll = memo(
  ({ id = "", className = "" }: MetaTableCheckAllProps) => {
    const { handleCheckToggleMetaData } = useRequestMetaTable();
    const { data, type } = useGetTableData() ?? {};

    console.log("===MetaTableCheckAll===");
    console.log({ data, type });

    if (!type || !data || !data.length) return null;

    const isAllChecked = data.every((item) => !item.hide);

    return (
      <div className={cn("w-full flex justify-center items-center", className)}>
        <Checkbox
          id={id}
          className="cursor-pointer"
          checked={isAllChecked}
          onCheckedChange={() => handleCheckToggleMetaData(type)}
        />
      </div>
    );
  }
);
MetaTableCheckAll.displayName = "Meta table check all";

export default MetaTableCheckAll;
