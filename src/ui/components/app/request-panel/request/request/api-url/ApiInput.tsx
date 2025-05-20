import { memo, type ChangeEvent, type FocusEvent } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

interface ApiInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: (value: string) => void;
}

const ApiInput = memo(({ value, onChange, onFocus, onBlur }: ApiInputProps) => {
  const { selectedTab, isApiUrlError } = useRequestResponse();

  const isError = Boolean(isApiUrlError[selectedTab]);

  const handleApiUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  const handleApiUrlFocus = () => onFocus();

  const handleApiUrlBlur = (e: FocusEvent<HTMLInputElement>) =>
    onBlur(e.target.value);

  return (
    <Input
      placeholder="Enter URL or paste text"
      className={cn("w-full rounded-none", {
        "border-destructive": isError,
        "border-input": !isError,
      })}
      value={value}
      onChange={handleApiUrlChange}
      onFocus={handleApiUrlFocus}
      onBlur={handleApiUrlBlur}
    />
  );
});

ApiInput.displayName = "API input box";

export default ApiInput;
