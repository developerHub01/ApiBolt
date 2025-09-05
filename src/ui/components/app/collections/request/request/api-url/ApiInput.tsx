import { memo, type ChangeEvent, type FocusEvent } from "react";
import { cn } from "@/lib/utils";

interface ApiInputProps {
  value: string;
  isError: boolean;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}

const ApiInput = memo(({ value, isError, onChange, onBlur }: ApiInputProps) => {
  const handleApiUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
  const handleApiUrlBlur = (e: FocusEvent<HTMLInputElement>) =>
    onBlur(e.target.value);

  return (
    <div
      className={cn("w-full h-full border", {
        "border-destructive": isError,
        "border-input": !isError,
      })}
    >
      <input
        placeholder="Enter URL or paste text"
        className="w-full h-full placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground px-3 bg-background rounded-none border-0 tracking-wide"
        value={value}
        onChange={handleApiUrlChange}
        onBlur={handleApiUrlBlur}
      />
    </div>
  );
});

ApiInput.displayName = "API input box";

export default ApiInput;
