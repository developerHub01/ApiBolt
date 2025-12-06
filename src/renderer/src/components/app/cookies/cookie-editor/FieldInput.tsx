import {
  memo,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { CookieInterface } from "@shared/types/cookies.types";
import { normalizePath } from "@/utils/helper";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const debounceDelay = 300;

interface Props {
  placeholder?: string;
  value: string;
  className?: string;
  fieldKey: keyof CookieInterface;
  onChange: (value: string) => void;
}

const FieldInput = memo(
  ({ placeholder, value, className = "", onChange, fieldKey }: Props) => {
    const toast = useCustomToast();
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

    const cleanValue = (input: string): string => {
      /* Clean input based on field type */
      switch (fieldKey) {
        case "key":
          return input.replace(/[ ,;=]/g, "");
        case "domain":
          return input.replace(/[^a-zA-Z0-9.-]/g, "");
        case "path":
          return normalizePath(input.replace(/[^a-zA-Z0-9\-._~/]/g, ""));
        case "maxAge":
          return input.replace(/[^0-9]/g, "");
        case "value":
        default:
          return input.replace(/[\n]/g, "");
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      setFieldValue(e.target.value);

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      let value = e.target.value.trim();
      const cleaned = cleanValue(value);

      /* Show toast if cleaned */
      if (cleaned !== value) {
        toast({
          type: "info",
          title: "Clean Success",
          description: "Invalid characters were removed automatically.",
        });
      }

      /* Special handling for maxAge and path */
      if (fieldKey === "maxAge" && cleaned) {
        value = String(Number(cleaned));
      } else if (fieldKey === "path") {
        value = normalizePath(cleaned);
      } else {
        value = cleaned;
      }

      onChange(value);
      setFieldValue(value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      /* Allow control keys always */
      const controlKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];
      if (controlKeys.includes(key)) return;

      /* Field-specific validation */
      switch (fieldKey) {
        case "key":
          /* No spaces or separators */
          if ([" ", ";", ",", "="].includes(key)) e.preventDefault();
          break;
        case "value":
          /* Disallow newlines */
          if (key === "\n") e.preventDefault();
          break;
        case "domain":
          /* Only letters, digits, "-", "." */
          if (!/[a-zA-Z0-9.-]/.test(key)) e.preventDefault();
          break;
        case "path":
          /* Only "/", letters, digits, "_", "-", ".", "~" */
          if (!/[a-zA-Z0-9\-._~/]/.test(key)) e.preventDefault();
          break;
        case "maxAge":
          /* Only digits */
          if (!/[0-9]/.test(key)) e.preventDefault();
          break;
        default:
          break;
      }

      if (key === "Enter") onChange(fieldValue.trim());
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData?.getData("text") ?? "";
      const cleaned = cleanValue(pasteData);

      if (cleaned === pasteData) {
        /* Valid paste */
        setFieldValue(cleaned);
        onChange(cleaned);
      } else if (cleaned.length > 0) {
        /* Cleaned paste */
        setFieldValue(cleaned);
        onChange(cleaned);
        toast({
          type: "info",
          title: "Clean Success",
          description: "Some invalid characters were removed automatically.",
        });
      } else {
        /* Entire paste invalid */
        toast({
          type: "error",
          title: "Invalid paste",
          description: "Pasted content contains only invalid characters.",
        });
      }
    };

    return (
      <Input
        type="text"
        placeholder={placeholder}
        value={fieldValue}
        className={cn(
          "w-full border-0 border-b border-border/80 focus-within:border-border placeholder:capitalize focus-visible:ring-0 focus-visible:ring-transparent rounded-b-none px-0",
          className,
        )}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
    );
  },
);

export default FieldInput;
