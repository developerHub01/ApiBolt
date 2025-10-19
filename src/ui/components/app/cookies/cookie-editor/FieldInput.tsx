import {
  memo,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const debounceDelay = 300;

interface Props {
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

const FieldInput = memo(
  ({ placeholder, value, className = "", onChange }: Props) => {
    const [fieldValue, setFieldValue] = useState<string>(value);

    useEffect(() => {
      setFieldValue(value);
    }, [value]);

    useEffect(() => {
      const handler = setTimeout(() => {
        if (fieldValue === value) return;
        onChange(fieldValue.trim());
      }, debounceDelay);

      return () => clearTimeout(handler);
    }, [fieldValue, value, onChange]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      setFieldValue(e.target.value);

    const handleBlur = (e: FocusEvent<HTMLInputElement>) =>
      onChange(e.target.value.trim());

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key?.toLowerCase() === "enter") onChange(fieldValue);
    };

    return (
      <Input
        type="text"
        placeholder={placeholder}
        value={fieldValue}
        className={cn(
          "w-full border-0 border-b border-transparent focus-within:border-primary placeholder:capitalize focus-visible:ring-0 focus-visible:rounded-br-none focus-visible:rounded-bl-none",
          className
        )}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    );
  }
);

export default FieldInput;
