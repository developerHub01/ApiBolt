import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft as ArrowLeftIcon,
  ChevronRight as ArrowRightIcon,
} from "lucide-react";
import { useAppSelector } from "@renderer/context/redux/hooks";
import { selectThemeMarketplaceSearchFilter } from "@renderer/context/redux/theme-marketplace/selectors/theme-marketplace";
import { THEME_MARKETPLACE_FILTER_LOCAL } from "@renderer/constant/theme.constant";

const MarketplacePagination = memo(() => {
  const searchFilter = useAppSelector(selectThemeMarketplaceSearchFilter);
  const isDisabled = useMemo(
    () => THEME_MARKETPLACE_FILTER_LOCAL.has(searchFilter),
    [searchFilter],
  );

  return (
    <div className="w-full bg-accent/50 flex justify-center p-2 rounded-b-lg border-t-2">
      <Button size={"xs"} variant={"secondary"} disabled={isDisabled}>
        <ArrowLeftIcon /> Previous
      </Button>
      <Button
        size={"xs"}
        variant={"secondary"}
        className="ml-auto"
        disabled={isDisabled}
      >
        Next <ArrowRightIcon />
      </Button>
    </div>
  );
});

export default MarketplacePagination;
