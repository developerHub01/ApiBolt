import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  codeSnippitTypes,
  requestCodeSnippitsMap,
} from "@/constant/request-code.constant";
import type { TRequestCodeType } from "@/types/request-code.type";
import CopyButton from "@/components/ui/copy-button";
import { Copy as CopyIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeSelectedCodeSnippitType } from "@/context/redux/request-response/request-response-slice";
import { selectSelectedCodeSnippit } from "@/context/redux/request-response/selectors/code-snippit";
import { useRequestCodeSnippit } from "@/context/collections/request/meta-data/code/RequestCodeSnippitProvider";

const RequestCodeTypeSelector = memo(() => {
  const dispatch = useAppDispatch();
  const selectedType = useAppSelector(selectSelectedCodeSnippit);
  const { code } = useRequestCodeSnippit();

  const handleChange = (value: TRequestCodeType) =>
    dispatch(
      handleChangeSelectedCodeSnippitType({
        type: value,
      })
    );

  return (
    <div className="flex justify-between items-center gap-3">
      <Select
        defaultValue={selectedType ?? codeSnippitTypes[0]}
        value={selectedType ?? codeSnippitTypes[0]}
        onValueChange={handleChange}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Select a code snippit" />
        </SelectTrigger>
        <SelectContent side="bottom" align="end">
          <SelectGroup>
            {codeSnippitTypes.map((codeTypes) => (
              <SelectItem value={codeTypes}>
                {requestCodeSnippitsMap[codeTypes]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <CopyButton value={code} align="end">
        <CopyIcon size={18} />
      </CopyButton>
    </div>
  );
});

export default RequestCodeTypeSelector;
