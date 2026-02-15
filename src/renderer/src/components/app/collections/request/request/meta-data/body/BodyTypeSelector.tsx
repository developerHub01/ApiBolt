import { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import type { TRequestBodyType } from "@shared/types/request-response.types";
import { updateRequestMetaTab } from "@/context/redux/request-response/thunks/request-meta-tab";
import { selectRequestBodyType } from "@/context/redux/request-response/selectors/body-raw";

const bodyList: Array<{
  id: TRequestBodyType;
  label: string;
}> = [
  {
    id: "none",
    label: "none",
  },
  {
    id: "form-data",
    label: "form-data",
  },
  {
    id: "x-www-form-urlencoded",
    label: "x-www-form-urlencoded",
  },
  {
    id: "binary",
    label: "binary",
  },
  {
    id: "raw",
    label: "raw",
  },
];

const BodyTypeSelector = () => {
  const dispatch = useAppDispatch();
  const requestBodyType = useAppSelector(selectRequestBodyType);

  const handleChange = useCallback(
    (type: TRequestBodyType) => {
      dispatch(
        updateRequestMetaTab({
          requestBodyType: type,
        }),
      );
    },
    [dispatch],
  );

  return (
    <>
      <div className="block md:hidden">
        <Select
          defaultValue={requestBodyType ?? bodyList[0].id}
          value={requestBodyType ?? bodyList[0].id}
          onValueChange={handleChange}
        >
          <SelectTrigger className="min-w-30" size="sm">
            <SelectValue placeholder="Select body type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {bodyList.map(({ id, label }) => (
                <SelectItem key={id} value={id}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <RadioGroup
        defaultValue={requestBodyType ?? bodyList[0].id}
        value={requestBodyType ?? bodyList[0].id}
        onValueChange={handleChange}
        className="hidden md:flex items-center flex-wrap gap-3 py-2"
      >
        {bodyList.map(({ id, label }) => (
          <Label
            key={id}
            htmlFor={id}
            className="whitespace-nowrap inline-flex items-center justify-center gap-2 cursor-pointer [&>button]:cursor-pointer"
          >
            <RadioGroupItem value={id} id={id} />
            <p>{label}</p>
          </Label>
        ))}
      </RadioGroup>
    </>
  );
};

export default BodyTypeSelector;
