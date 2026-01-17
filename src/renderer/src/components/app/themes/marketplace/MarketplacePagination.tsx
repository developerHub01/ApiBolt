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
  selectThemeMarketplaceSearchTotalThemes,
  selectThemeMarketplaceThemesListCount,
} from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import {
  THEME_MARKETPLACE_FILTER_LOCAL,
  THEME_MARKETPLACE_PAGE_SIZE,
} from "@/constant/theme.constant";
import {
  handleDecrementPage,
  handleIncrementPage,
} from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

const MarketplacePagination = memo(() => {
  const dispatch = useAppDispatch();
  const searchFilter = useAppSelector(selectThemeMarketplaceSearchFilter);
  const totalThemeInCurrentPage = useAppSelector(
    selectThemeMarketplaceThemesListCount,
  );
  const currentPage = useAppSelector(selectThemeMarketplaceSearchPage);
  const totalPages = useAppSelector(selectThemeMarketplaceSearchTotalPages);
  const totalThemes = useAppSelector(selectThemeMarketplaceSearchTotalThemes);

  const isDisabled = useMemo(
    () => THEME_MARKETPLACE_FILTER_LOCAL.has(searchFilter),
    [searchFilter],
  );

  const isDisabledLeft = useMemo(
    () => isDisabled || currentPage === 1,
    [currentPage, isDisabled],
  );

  const isDisabledRight = useMemo(
    () => isDisabled || currentPage >= totalPages,
    [currentPage, isDisabled, totalPages],
  );

  const totalSeenCount = useMemo(
    () =>
      Math.max(0, currentPage - 1) * THEME_MARKETPLACE_PAGE_SIZE +
      totalThemeInCurrentPage,
    [currentPage, totalThemeInCurrentPage],
  );

  const handleNavigation = useCallback(
    (type: "left" | "right") => () =>
      dispatch(type === "left" ? handleDecrementPage() : handleIncrementPage()),
    [dispatch],
  );

  return (
    <div className="w-full bg-accent/50 flex justify-between items-center p-2 rounded-b-lg border-t-2">
      <Button
        size={"xs"}
        variant={"secondary"}
        disabled={isDisabledLeft}
        onClick={handleNavigation("left")}
      >
        <ArrowLeftIcon /> Previous
      </Button>
      {Boolean(totalPages) && (
        <div className="flex items-center gap-1 pointer-events-none">
          <ButtonLikeDiv size={"xs"} variant={"outline"}>
            Current Page: {currentPage}
          </ButtonLikeDiv>
          <ButtonLikeDiv size={"xs"} variant={"outline"}>
            {totalSeenCount}/{totalThemes}
          </ButtonLikeDiv>
        </div>
      )}
      <Button
        size={"xs"}
        variant={"secondary"}
        disabled={isDisabledRight}
        onClick={handleNavigation("right")}
      >
        Next <ArrowRightIcon />
      </Button>
    </div>
  );
});

export default MarketplacePagination;
