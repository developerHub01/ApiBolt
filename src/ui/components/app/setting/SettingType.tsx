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
import type { SettingsType } from "@/types/setting.types";

const globalSettingsTypeList: Array<SettingsType> = ["default", "custom"];

const localSettingsTypeList: Array<SettingsType> = [
  "default",
  "global",
  "custom",
];

interface Props {
  value: SettingsType;
  onChange: (value: SettingsType) => void;
}

const SettingType = memo(({ value = "default", onChange }: Props) => {
  const { activeTab } = useSetting();

  const list =
    activeTab === "project" ? localSettingsTypeList : globalSettingsTypeList;

  return (
    <Select value={value} defaultValue={"default"} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] capitalize" size="sm">
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

export default SettingType;
