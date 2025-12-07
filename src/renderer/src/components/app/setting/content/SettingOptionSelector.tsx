import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SettingSelectorWrapper from "@/components/app/setting/SettingSelectorWrapper";

interface Props {
  list: Array<string>;
  value: string;
  label?: string;
  placeholder?: string;
  onChange: (value?: string) => void;
}

const SettingOptionSelector = ({
  list,
  value,
  onChange,
  label,
  placeholder,
}: Props) => (
  <Select value={value} onValueChange={onChange}>
    <SettingSelectorWrapper>
      <SelectTrigger className="w-full max-w-32 capitalize" size="sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
    </SettingSelectorWrapper>
    <SelectContent>
      <SelectGroup>
        {label && <SelectLabel>{label}</SelectLabel>}
        {list.map((size: string) => (
          <SelectItem key={size} value={size} className="capitalize">
            {size}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default SettingOptionSelector;
