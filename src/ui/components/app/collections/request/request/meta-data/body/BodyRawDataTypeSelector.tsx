import { memo, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import type { TContentType } from "@/types/request-response.types";
import { updateRequestBodyRaw } from "@/context/redux/request-response/thunks/body-raw";

const rawDataTypeList: Array<{
  id: TContentType;
  label: string;
}> = [
  {
    id: "text",
    label: "Text",
  },
  {
    id: "javascript",
    label: "JavaScript",
  },
  {
    id: "json",
    label: "JSON",
  },
  {
    id: "html",
    label: "HTML",
  },
  {
    id: "xml",
    label: "XML",
  },
];

const BodyRawDataTypeSelector = memo(() => {
  const dispatch = useAppDispatch();
  const requestBodyType = useAppSelector(
    (state) =>
      state.requestResponse.requestBodyType[
        state.requestResponse.selectedTab!
      ] ?? "none"
  );
  const rawRequestBodyType = useAppSelector(
    (state) =>
      state.requestResponse.rawRequestBodyType[
        state.requestResponse.selectedTab!
      ] ?? "json"
  );

  const handleChange = useCallback(
    (type: TContentType) => {
      dispatch(
        updateRequestBodyRaw({
          type,
        })
      );
    },
    [dispatch]
  );

  if (requestBodyType !== "raw") return null;

  return (
    <Select
      defaultValue={rawRequestBodyType ?? rawDataTypeList[0].id}
      value={rawRequestBodyType ?? rawDataTypeList[0].id}
      onValueChange={handleChange}
    >
      <SelectTrigger className="border-none ml-auto" size="sm">
        <SelectValue placeholder="Select Raw Body Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {rawDataTypeList.map(({ id, label }) => (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

BodyRawDataTypeSelector.displayName = "Request body raw data type selector";

export default BodyRawDataTypeSelector;
