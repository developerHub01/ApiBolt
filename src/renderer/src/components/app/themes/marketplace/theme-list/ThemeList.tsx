import { useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeCard from "@renderer/components/app/themes/marketplace/theme-list/ThemeCard";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeMarketplaceSelectedThemeId,
  selectThemeMarketplaceThemesList,
} from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { handleChangeSelectedThemeId } from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import { selectThemesSearchResultLoading } from "@/context/redux/status/selectors/theme-marketplace";
import ThemeCardSkeleton from "@renderer/components/app/themes/marketplace/theme-list/ThemeCardSkeleton";
import { ThemeMetaInterface } from "@shared/types/theme.types";
import { cn } from "@/lib/utils";

const ThemeList = () => {
  const dispatch = useAppDispatch();
  const selectedThemeId = useAppSelector(selectThemeMarketplaceSelectedThemeId);
  const themesList = useAppSelector(selectThemeMarketplaceThemesList);
  const isLoading = useAppSelector(selectThemesSearchResultLoading);

  const handleChangeSelectedTheme = useCallback(
    (theme: ThemeMetaInterface) => {
      if (theme.author === "system") return;
      dispatch(handleChangeSelectedThemeId(theme.id));
    },
    [dispatch],
  );

  return (
    <ScrollArea className="flex-1 w-full min-h-0">
      <section className="grid grid-cols-2 gap-3 p-1">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }, (_, key) => (
              <ThemeCardSkeleton key={key} />
            ))}
          </>
        ) : (
          <>
            {themesList.map(theme => (
              <ThemeCard
                key={theme.id}
                {...theme}
                isSelected={selectedThemeId === theme.id}
                onClick={() => handleChangeSelectedTheme(theme)}
                className={cn({
                  "cursor-auto": theme.author === "system",
                })}
              />
            ))}
          </>
        )}
      </section>
    </ScrollArea>
  );
};

export default ThemeList;
