import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ListFilter as FilterIcon } from "lucide-react";

const MENU_LIST = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "installed",
    label: "Installed",
  },
  {
    id: "active",
    label: "Active",
  },
  {
    id: "dark",
    label: "Dark",
  },
  {
    id: "light",
    label: "Light",
  },
  {
    id: "custom",
    label: "Custom",
  },
];

const ThemeFilter = memo(() => {
  return (
    <Select value={MENU_LIST[0].id} defaultValue={MENU_LIST[0].id}>
      <Button variant={"secondary"} size={"iconXs"} className="overflow-hidden">
        <SelectTrigger size="xs" showIcon={false} className="bg-transparent">
          <FilterIcon />
        </SelectTrigger>
      </Button>
      <SelectContent align="end" sideOffset={10}>
        <SelectGroup>
          {MENU_LIST.map(({ id, label }) => (
            <SelectItem value={id} className="text-sm!">
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default ThemeFilter;
