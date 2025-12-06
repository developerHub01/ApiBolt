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

interface Props {
  list: Array<{
    id: string;
    label: string;
  }>;
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

const FieldSelector = memo(({ list, label, value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <ButtonLikeDiv variant={"secondary"} className="px-0 py-0 w-full">
        <SelectTrigger className="w-full">
          <SelectValue placeholder={label ?? ""} />
        </SelectTrigger>
      </ButtonLikeDiv>
      <SelectContent>
        <SelectGroup>
          {list.map(({ id, label }) => (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default FieldSelector;
