import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AuthContentSelectProps {
  items: Array<{
    id: string;
    label: string;
  }>;
  value: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  [key: string]: unknown;
}

const AuthContentSelect = memo(
  ({
    items,
    value,
    disabled = false,
    defaultValue,
    onChange,
    placeholder,
    className = "",
    ...props
  }: AuthContentSelectProps) => {
    return (
      <Select
        value={value}
        disabled={disabled}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <SelectTrigger className={cn("w-full max-w-80", className)} {...props}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            {items.map(({ id, label }) => (
              <SelectItem key={id} value={id}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

export default AuthContentSelect;
