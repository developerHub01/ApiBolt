import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  list: Array<{
    id: string;
    label: string;
  }>;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

const FieldSelector = memo(
  ({ list, label, value, onChange }: Props) => {
    return (
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={label ?? ""} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {list.map(({ id, label }) => (
              <SelectItem value={id}>{label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

export default FieldSelector;
