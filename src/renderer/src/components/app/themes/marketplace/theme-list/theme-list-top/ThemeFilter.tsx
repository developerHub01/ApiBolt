import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilter as FilterIcon } from "lucide-react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { TThemeMarketplaceSearchFilter } from "@shared/types/theme.types";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectThemeMarketplaceSearchFilter } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { handleChangeSearchFilter } from "@/context/redux/theme-marketplace/theme-marketplace-slice";

const MENU_LIST: Array<{
  label: string;
  subList: Array<{
    id: TThemeMarketplaceSearchFilter;
    label: string;
  }>;
}> = [
  {
    label: "Appearance",
    subList: [
      {
        id: "all",
        label: "All",
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
      {
        id: "id",
        label: "Id",
      },
    ],
  },
  {
    label: "Local",
    subList: [
      {
        id: "installed",
        label: "Installed",
      },
      {
        id: "active",
        label: "Active",
      },
    ],
  },
];

const ThemeFilter = memo(() => {
  const dispatch = useAppDispatch();
  const filterType = useAppSelector(selectThemeMarketplaceSearchFilter);

  const handleChange = (value: string) =>
    dispatch(handleChangeSearchFilter(value as TThemeMarketplaceSearchFilter));

  return (
    <Select
      value={filterType}
      defaultValue={filterType}
      onValueChange={handleChange}
    >
      <ButtonLikeDiv
        variant={"secondary"}
        className="overflow-hidden w-25 px-0"
      >
        <SelectTrigger
          showIcon={false}
          className="bg-transparent justify-between flex-1"
        >
          <SelectValue />
          <FilterIcon />
        </SelectTrigger>
      </ButtonLikeDiv>
      <SelectContent align="end" sideOffset={10}>
        <SelectGroup>
          {MENU_LIST.map(({ label, subList }) => (
            <SelectGroup key={label}>
              <SelectLabel>{label}</SelectLabel>
              {subList.map(({ id, label }) => (
                <SelectItem key={id} value={id} className="text-sm!">
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default ThemeFilter;
