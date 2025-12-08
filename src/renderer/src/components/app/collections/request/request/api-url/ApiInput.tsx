import {
  memo,
  type ChangeEvent,
  type ClipboardEvent,
  type FocusEvent,
} from "react";
import { cn } from "@/lib/utils";

interface ApiInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}

const ApiInput = memo(({ value, onChange, onBlur }: ApiInputProps) => {
  const handleApiUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
  const handleApiUrlBlur = (e: FocusEvent<HTMLInputElement>) =>
    onBlur(e.target.value);

  const handlePaste = (e: ClipboardEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="w-full border-b">
      <input
        placeholder="Enter URL or paste text"
        className="w-full h-full placeholder:text-muted-foreground px-3 bg-transparent rounded-none border-0 tracking-wide"
        value={value}
        onChange={handleApiUrlChange}
        onBlur={handleApiUrlBlur}
        onPaste={handlePaste}
      />
    </div>
  );
});

ApiInput.displayName = "API input box";

export default ApiInput;
