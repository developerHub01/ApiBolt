import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { Button } from "@/components/ui/button";
import { RefreshCcw as RefetchIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { loadThemesSearchResult } from "@/context/redux/theme-marketplace/thunks/theme-marketplace";
import { selectThemeMarketplaceSearchFilter } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { THEME_MARKETPLACE_FILTER_LOCAL } from "@/constant/theme.constant";

const ThemeListRefetch = () => {
  const dispatch = useAppDispatch();
  const filterType = useAppSelector(selectThemeMarketplaceSearchFilter);

  const disabled = useMemo(
    () => THEME_MARKETPLACE_FILTER_LOCAL.has(filterType),
    [filterType],
  );

  const handleRefetch = () => dispatch(loadThemesSearchResult());

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"secondary"}
          size={"icon"}
          disabled={disabled}
          onClick={handleRefetch}
        >
          <RefetchIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent variant={"secondary"} align="end" side="bottom">
        <p>Refetch theme list</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeListRefetch;
