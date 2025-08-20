import { memo, useCallback, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useGetTableData } from "@/context/collections/request/RequestMetaTableProvider";
import { useAppDispatch } from "@/context/redux/hooks";
import { checkAllParamsByRequestMetaId } from "@/context/redux/request-response/thunks/params";
import { checkAllHeadersByRequestMetaId } from "@/context/redux/request-response/thunks/headers";
import { checkAllBodyXWWWFormUrlencodedByRequestMetaId } from "@/context/redux/request-response/thunks/body-x-www-form-urlencoded";

interface MetaTableCheckAllProps {
  id?: string;
  className?: string;
}

const MetaTableCheckAll = memo(
  ({ id = "", className = "" }: MetaTableCheckAllProps) => {
    const dispatch = useAppDispatch();
    const { data, type } = useGetTableData() ?? {};

    const isAllChecked = useMemo(() => {
      return data?.length ? data.every((item) => item.isCheck) : false;
    }, [data]);

    const handleCheck = useCallback(() => {
      const handler =
        type === "params"
          ? checkAllParamsByRequestMetaId
          : type === "headers"
            ? checkAllHeadersByRequestMetaId
            : type === "x-www-form-urlencoded"
              ? checkAllBodyXWWWFormUrlencodedByRequestMetaId
              : checkAllBodyXWWWFormUrlencodedByRequestMetaId;
      dispatch(handler());
    }, [dispatch, type]);

    if (!type || !data || !data.length) return null;

    return (
      <div className={cn("w-full flex justify-center items-center", className)}>
        <Checkbox
          id={id}
          className="cursor-pointer"
          checked={isAllChecked}
          onCheckedChange={handleCheck}
        />
      </div>
    );
  }
);
MetaTableCheckAll.displayName = "Meta table check all";

export default MetaTableCheckAll;
