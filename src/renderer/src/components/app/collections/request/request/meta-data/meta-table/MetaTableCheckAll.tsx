import { memo, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useRequestMetaData } from "@/context/collections/request/RequestMetaDataProvider";
import { useRequestMetaTable } from "@/context/collections/request/RequestMetaTableProvider";

interface MetaTableCheckAllProps {
  id?: string;
  className?: string;
}

const MetaTableCheckAll = memo(
  ({ id = "", className = "" }: MetaTableCheckAllProps) => {
    const { data, type, handleCheckAll } = useRequestMetaData();
    const { showCheck } = useRequestMetaTable();

    const isAllChecked = useMemo(() => {
      return data?.length ? data.every(item => item.isCheck) : false;
    }, [data]);

    if (!type || !data || !data.length || !showCheck) return null;

    return (
      <div className={cn("w-full flex justify-center items-center", className)}>
        <Checkbox
          id={id}
          className="cursor-pointer"
          checked={isAllChecked}
          onCheckedChange={handleCheckAll}
        />
      </div>
    );
  },
);
MetaTableCheckAll.displayName = "Meta table check all";

export default MetaTableCheckAll;
