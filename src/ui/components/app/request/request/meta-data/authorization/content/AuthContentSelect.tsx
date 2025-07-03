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
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  [key: string]: unknown;
}

const AuthContentSelect = ({
  items,
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}: AuthContentSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
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
};

export default AuthContentSelect;
