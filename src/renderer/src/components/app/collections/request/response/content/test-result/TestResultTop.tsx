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
import { useAppDispatch } from "@/context/redux/hooks";
import useCustomToast from "@/hooks/ui/use-custom-toast";
import { handleClearTestResult } from "@/context/redux/request-response/request-response-slice";
import { TTestResultTab } from "@shared/types/test-script.types";
import { useTestResult } from "@/context/test-result/TestResultProvider";

const tabList: Array<{
  id: TTestResultTab;
  label: string;
}> = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "success",
    label: "Success",
  },
  {
    id: "failed",
    label: "Failed",
  },
];

const TestResultTop = memo(() => {
  const toast = useCustomToast();
  const dispatch = useAppDispatch();
  const { resultTab, resultCount, handleChangeResultTab } = useTestResult();

  const handleClear = useCallback(() => {
    dispatch(handleClearTestResult());
    toast({
      type: "success",
      title: "Cleared",
      description: "Test result cleared successfully",
    });
  }, [dispatch, toast]);

  return (
    <div className="flex items-center gap-2 justify-between">
      <p className="text-sm mr-auto">Total result: {resultCount} </p>
      <Select value={resultTab} onValueChange={handleChangeResultTab}>
        <SelectTrigger className="w-28 text-xs" size="xs">
          <SelectValue placeholder="Filter by method" className="capitalize" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tab</SelectLabel>
            {tabList.map(({ id, label }) => (
              <SelectItem key={id} value={id} className="capitalize text-xs">
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant={"secondary"} size={"xs"} onClick={handleClear}>
        Clear Result
      </Button>
    </div>
  );
});

export default TestResultTop;
