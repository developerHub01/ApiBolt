import { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft as ArrowLeftIcon,
  ChevronRight as ArrowRightIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeMarketplaceSearchFilter,
  selectThemeMarketplaceSearchPage,
  selectThemeMarketplaceSearchTotalPages,
} from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { THEME_MARKETPLACE_FILTER_LOCAL } from "@/constant/theme.constant";
import {
  handleDecrementPage,
  handleIncrementPage,
} from "@/context/redux/theme-marketplace/theme-marketplace-slice";

const MarketplacePagination = memo(() => {
  const dispatch = useAppDispatch();
  const searchFilter = useAppSelector(selectThemeMarketplaceSearchFilter);
  const currentPage = useAppSelector(selectThemeMarketplaceSearchPage);
  const totalPages = useAppSelector(selectThemeMarketplaceSearchTotalPages);
  const isDisabled = useMemo(
    () => THEME_MARKETPLACE_FILTER_LOCAL.has(searchFilter),
    [searchFilter],
  );

  const isDisabledLeft = useMemo(
    () => isDisabled || !currentPage,
    [currentPage, isDisabled],
  );

  const isDisabledRight = useMemo(
    () => isDisabled || currentPage >= totalPages,
    [currentPage, isDisabled, totalPages],
  );

  const handleNavigation = useCallback(
    (type: "left" | "right") => () => {
      dispatch(type === "left" ? handleDecrementPage() : handleIncrementPage());
    },
    [dispatch],
  );

  return (
    <div className="w-full bg-accent/50 flex justify-center p-2 rounded-b-lg border-t-2">
      <Button
        size={"xs"}
        variant={"secondary"}
        disabled={isDisabledLeft}
        onClick={handleNavigation("left")}
      >
        <ArrowLeftIcon /> Previous
      </Button>
      <Button
        size={"xs"}
        variant={"secondary"}
        className="ml-auto"
        disabled={isDisabledRight}
        onClick={handleNavigation("right")}
      >
        Next <ArrowRightIcon />
      </Button>
    </div>
  );
});

export default MarketplacePagination;
