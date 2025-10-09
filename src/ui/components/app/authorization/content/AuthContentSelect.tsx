import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
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
  innerClassName?: string;
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
    innerClassName = "",
    ...props
  }: AuthContentSelectProps) => {
    return (
      <Select
        value={value}
        disabled={disabled}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <ButtonLikeDiv
          variant={"secondary"}
          className={cn(
            "border-2 border-accent rounded-lg text-sm w-full flex items-center gap-1 flex-1 px-0",
            className
          )}
          tabIndex={-1}
          disabled={disabled}
          {...props}
        >
          <SelectTrigger
            className={cn("w-full focus-visible:ring-0", innerClassName)}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </ButtonLikeDiv>
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
