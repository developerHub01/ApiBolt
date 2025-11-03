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
import { toast } from "sonner";
import { useHistory } from "@/context/history/HistoryProvider";

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

const SearchHistory = () => {
  const dispatch = useAppDispatch();
  const { method } = useHistory();
  const handleClear = async () => {
    const response = await dispatch(deleteRequestHistoryByRequestId()).unwrap();
    if (response) toast.success("History Cleared successfully!");
  };

  const handleChangeFilter = (value: string) =>
    dispatch(
      changeHistoryFilterMethod({
        method: value as THistoryFilter,
      })
    );

  return (
    <div className="flex items-center gap-2 justify-end">
      <Select value={method} onValueChange={handleChangeFilter}>
        <SelectTrigger className="w-28" size="sm">
          <SelectValue placeholder="Select method" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Methods</SelectLabel>
            {methodList.map(({ id, label }) => (
              <SelectItem value={id}>{label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant={"secondary"} size={"sm"} onClick={handleClear}>
        Clear All
      </Button>
    </div>
  );
};

export default SearchHistory;
