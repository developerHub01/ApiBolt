import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requestCodesMap } from "@/constant/request-code.constant";
import type { TRequestCodeType } from "@/types/request-code.type";
import CopyButton from "@/components/ui/copy-button";
import { Copy as CopyIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeSelectedCodeSnippitType } from "@/context/redux/request-response/request-response-slice";
import { selectSelectedCodeSnippit } from "@/context/redux/request-response/selectors/code-snippit";

const codeTypes = Object.keys(requestCodesMap) as Array<TRequestCodeType>;

const RequestCodeTypeSelector = memo(() => {
  const dispatch = useAppDispatch();
  const selectedType = useAppSelector(selectSelectedCodeSnippit);

  const handleChange = (value: TRequestCodeType) =>
    dispatch(
      handleChangeSelectedCodeSnippitType({
        type: value,
      })
    );

  return (
    <div className="flex justify-between items-center gap-3">
      <Select
        defaultValue={selectedType ?? codeTypes[0]}
        value={selectedType ?? codeTypes[0]}
        onValueChange={handleChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a code snippit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {codeTypes.map((codeTypes) => (
              <SelectItem value={codeTypes}>
                {requestCodesMap[codeTypes]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <CopyButton value={""} align="end">
        <CopyIcon size={18} />
      </CopyButton>
    </div>
  );
});

export default RequestCodeTypeSelector;
