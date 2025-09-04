import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectV1Props {
  list: Array<{
    id: string;
    label: string;
    isActive?: boolean;
    count?: number;
  }>;
  value: string;
  handleChange: (id: string) => void;
  className?: string;
}

const SelectV1 = ({ list, value, handleChange, className }: SelectV1Props) => {
  return (
    <div className={cn("select-none", className)}>
      <Select
        defaultValue={value ?? list[0].id}
        value={value ?? list[0].id}
        onValueChange={handleChange}
      >
        <SelectTrigger size="sm" className="min-w-[120px]">
          <SelectValue placeholder="Select Tab" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {list.map(({ id, label, isActive, count }) => (
              <SelectItem key={id} value={id}>
                {label}
                {Boolean(count) && <p className="text-primary">({count})</p>}
                {isActive && (
                  <span className="inline-block size-1.5 rounded-full bg-green-500 mt-1"></span>
                )}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectV1;
