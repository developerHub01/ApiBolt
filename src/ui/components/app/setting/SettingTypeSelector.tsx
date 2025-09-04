import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSetting } from "@/context/setting/SettingProvider";
import type { SettingType } from "@/types/setting.types";

const globalSettingsTypeList: Array<SettingType> = ["default", "custom"];

const localSettingsTypeList: Array<SettingType> = [
  "default",
  "global",
  "custom",
];

interface Props {
  value: SettingType;
  onChange: (value: SettingType) => void;
}

const SettingTypeSelector = memo(({ value = "default", onChange }: Props) => {
  const { activeTab } = useSetting();

  const list =
    activeTab === "project" ? localSettingsTypeList : globalSettingsTypeList;

  return (
    <Select value={value} defaultValue={"default"} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-32 capitalize" size="sm">
        <SelectValue placeholder="Setting Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.map((id) => (
            <SelectItem key={id} value={id} className="capitalize">
              {id}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default SettingTypeSelector;
