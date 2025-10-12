import { memo } from "react";
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
  codeSnippitTypes,
  requestCodeSnippitsMap,
  codeSnippitLanguageList,
  codeSnippitByLanguageName,
} from "@/constant/request-code.constant";
import CopyButton from "@/components/ui/copy-button";
import { Copy as CopyIcon } from "lucide-react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedCodeSnippit } from "@/context/redux/request-response/selectors/code-snippit";
import { useRequestCodeSnippit } from "@/context/collections/request/meta-data/code/RequestCodeSnippitProvider";

const RequestCodeTypeSelector = memo(() => {
  const selectedType = useAppSelector(selectSelectedCodeSnippit);
  const { code, handleChangeCodeSnippitLanguageType } = useRequestCodeSnippit();

  return (
    <div className="flex justify-between items-center gap-3">
      <Select
        defaultValue={selectedType ?? codeSnippitTypes[0]}
        value={selectedType ?? codeSnippitTypes[0]}
        onValueChange={handleChangeCodeSnippitLanguageType}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Select a code snippit" />
        </SelectTrigger>
        <SelectContent side="bottom" align="end">
          {codeSnippitLanguageList.map((lang) => (
            <SelectGroup>
              <SelectLabel className="capitalize">{lang}</SelectLabel>
              {codeSnippitByLanguageName[lang].map((codeTypes) => (
                <SelectItem value={codeTypes} className="pl-4">
                  {requestCodeSnippitsMap[codeTypes]}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      <CopyButton value={code} align="end" Icon={CopyIcon} size="sm" />
    </div>
  );
});

export default RequestCodeTypeSelector;
