import { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useGetTableData } from "@/context/request/RequestMetaTableProvider";
import { handleCheckToggleMetaData } from "@/context/redux/request-response/request-response-slice";
import { useAppDispatch } from "@/context/redux/hooks";

interface MetaTableCheckAllProps {
  id?: string;
  className?: string;
}

const MetaTableCheckAll = memo(
  ({ id = "", className = "" }: MetaTableCheckAllProps) => {
    const dispatch = useAppDispatch();
    const { data, type } = useGetTableData() ?? {};

    if (!type || !data || !data.length) return null;

    const isAllChecked = data.every((item) => !item.hide);

    return (
      <div className={cn("w-full flex justify-center items-center", className)}>
        <Checkbox
          id={id}
          className="cursor-pointer"
          checked={isAllChecked}
          onCheckedChange={() =>
            dispatch(
              handleCheckToggleMetaData({
                type,
              })
            )
          }
        />
      </div>
    );
  }
);
MetaTableCheckAll.displayName = "Meta table check all";

export default MetaTableCheckAll;
