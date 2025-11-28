import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  changeHistoryFilterMethod,
  deleteRequestHistoryByRequestId,
} from "@/context/redux/history/thunks/history";
import { useAppDispatch } from "@/context/redux/hooks";
import type { THistoryFilter } from "@/types/history.types";
import { useHistoryMetaList } from "@/context/history/HistoryMetaListProvider";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const methodList: Array<{
  id: THistoryFilter;
  label: string;
}> = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "get",
    label: "Get",
  },
  {
    id: "post",
    label: "Post",
  },
  {
    id: "put",
    label: "Put",
  },
  {
    id: "patch",
    label: "Patch",
  },
  {
    id: "delete",
    label: "Delete",
  },
];

const HistoryTop = memo(() => {
  const toast = useCustomToast();
  const dispatch = useAppDispatch();
  const { method, metaCount } = useHistoryMetaList();
  const handleClear = useCallback(async () => {
    const response = await dispatch(deleteRequestHistoryByRequestId()).unwrap();
    if (response) {
      toast({
        type: "success",
        title: "Cleared",
        description: "History cleared successfully",
      });
    }
  }, [dispatch, toast]);

  const handleChangeFilter = useCallback(
    (value: string) =>
      dispatch(
        changeHistoryFilterMethod({
          method: value as THistoryFilter,
        })
      ),
    [dispatch]
  );

  return (
    <div className="flex items-center gap-2 justify-between">
      <p className="text-sm mr-auto">Total history: {metaCount} </p>
      <Select value={method} onValueChange={handleChangeFilter}>
        <SelectTrigger className="w-28 text-xs" size="xs">
          <SelectValue placeholder="Filter by method" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Methods</SelectLabel>
            {methodList.map(({ id, label }) => (
              <SelectItem value={id} className="uppercase text-xs">
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant={"secondary"} size={"xs"} onClick={handleClear}>
        Clear History
      </Button>
    </div>
  );
});

export default HistoryTop;
