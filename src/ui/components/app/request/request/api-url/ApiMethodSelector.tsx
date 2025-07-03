import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type THTTPMethods } from "@/context/redux/request-response/request-response-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { changeRequestMethod } from "@/context/redux/request-response/request-response-thunk";

const methodList: Array<{
  id: THTTPMethods;
  label: string;
}> = [
  {
    id: "get",
    label: "GET",
  },
  {
    id: "post",
    label: "POST",
  },
  {
    id: "put",
    label: "PUT",
  },
  {
    id: "patch",
    label: "PATCH",
  },
  {
    id: "delete",
    label: "DELETE",
  },
];

const ApiMethodSelector = memo(() => {
  const dispatch = useAppDispatch();
  const methodType = useAppSelector(
    (state) =>
      state.requestResponse.requestList[state.requestResponse.selectedTab!]
        ?.method ?? "get"
  );

  const handleChange = (value: THTTPMethods) => {
    dispatch(
      changeRequestMethod({
        method: value,
      })
    );
  };

  return (
    <div className="w-[150px] select-none">
      <Select
        defaultValue={methodType ?? methodList[0].id}
        onValueChange={handleChange}
        value={methodType}
      >
        <SelectTrigger
          className={cn("w-full rounded-r-none font-semibold", {
            "text-green-500": methodType === "get",
            "text-blue-500": methodType === "post",
            "text-yellow-500": methodType === "put",
            "text-orange-500": methodType === "patch",
            "text-red-500": methodType === "delete",
          })}
        >
          <SelectValue placeholder="Method" />
        </SelectTrigger>
        <SelectContent>
          {methodList.map(({ id, label }) => (
            <SelectItem
              key={id}
              value={id}
              className={cn("font-semibold", {
                "text-green-500": id === "get",
                "text-blue-500": id === "post",
                "text-yellow-500": id === "put",
                "text-orange-500": id === "patch",
                "text-red-500": id === "delete",
              })}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

ApiMethodSelector.displayName = "API method selector";

export default ApiMethodSelector;
