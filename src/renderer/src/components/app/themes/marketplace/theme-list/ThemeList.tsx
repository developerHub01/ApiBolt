import { useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeCard from "@/components/app/themes/marketplace/theme-list/ThemeCard";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeMarketplaceSelectedThemeId,
  selectThemeMarketplaceThemesList,
} from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { handleChangeSelectedThemeId } from "@/context/redux/theme-marketplace/theme-marketplace-slice";
import {
  selectThemesSearchResultError,
  selectThemesSearchResultLoading,
} from "@/context/redux/status/selectors/theme-marketplace";
import ThemeCardSkeleton from "@/components/app/themes/marketplace/theme-list/ThemeCardSkeleton";
import { ThemeMetaInterface } from "@shared/types/theme.types";
import { cn } from "@/lib/utils";
import ThemeListError from "@/components/app/themes/marketplace/theme-list/ThemeListError";
import { motion, AnimatePresence } from "motion/react";
import Empty from "@/components/ui/empty";
import notFoundAnimationData from "@/assets/lottie/no-data-found.json";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";

const ThemeList = () => {
  const dispatch = useAppDispatch();
  const selectedThemeId = useAppSelector(selectThemeMarketplaceSelectedThemeId);
  const themesList = useAppSelector(selectThemeMarketplaceThemesList);
  const isLoading = useAppSelector(selectThemesSearchResultLoading);
  const showSkeleton = useShowSkeleton(isLoading);
  const errorMessage = useAppSelector(selectThemesSearchResultError);

  const handleChangeSelectedTheme = useCallback(
    (theme: ThemeMetaInterface) => {
      if (theme.author === "system") return;
      dispatch(handleChangeSelectedThemeId(theme.id));
    },
    [dispatch],
  );

  return (
    <ScrollArea className="flex-1 w-full min-h-0 h-full [&>div>div]:h-full">
      <AnimatePresence>
        {showSkeleton ? (
          <Wrapper>
            {Array.from({ length: 6 }, (_, key) => (
              <ThemeCardSkeleton key={key} />
            ))}
          </Wrapper>
        ) : errorMessage ? (
          <ThemeListError />
        ) : !themesList?.length ? (
          <Empty
            label="Not found"
            description="No themes found for following search params. Try to adjust theme for better result."
            animationData={notFoundAnimationData}
            showFallback
            innerClassName="w-80"
            fallbackClassName="w-65"
            className="h-full"
            key="themes-not-found"
          />
        ) : (
          <Wrapper>
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
          </Wrapper>
        )}
      </AnimatePresence>
    </ScrollArea>
  );
};

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => (
  <motion.section
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    exit={{
      opacity: 0,
    }}
    transition={{
      duration: 0.3,
    }}
    className="grid grid-cols-2 gap-3 p-1"
  >
    {children}
  </motion.section>
);

export default ThemeList;
