import ThemePreview from "@/components/app/themes/marketplace/theme-details/theme-content/ThemePreview";
import ThemeMeta from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeMeta";
import ThemeDetailsContentSkeleton from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeDetailsContentSkeleton";
import { useAppSelector } from "@/context/redux/hooks";
import {
  selectThemeMarketplaceThemeDetailsError,
  selectThemeMarketplaceThemeDetailsLoading,
} from "@/context/redux/status/selectors/theme-marketplace";
import ThemeDescription from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeDescription";
import ThemePalette from "@/components/app/themes/marketplace/theme-details/theme-content/ThemePalette";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import Empty from "@renderer/components/ui/empty";
import noInernetAnimationData from "@/assets/lottie/no-internet.json";
import notFoundAnimationData from "@/assets/lottie/no-data-found.json";

const ThemeDetailsContent = () => {
  const isLoading = useAppSelector(selectThemeMarketplaceThemeDetailsLoading);
  const detailsError = useAppSelector(selectThemeMarketplaceThemeDetailsError);
  const showSkeleton = useShowSkeleton(isLoading);

  if (detailsError === "NOT_FOUND")
    return (
      <Empty
        label="Not found"
        description="Following theme not found. This theme might be deleted from the author"
        animationData={notFoundAnimationData}
        showFallback
        innerClassName="w-80"
        fallbackClassName="w-65"
        className="h-full"
        key="theme-not-found"
      />
    );
  else if (detailsError === "ERR_NETWORK")
    return (
      <Empty
        label="Network Error"
        description="Check your internet connection and try again"
        animationData={noInernetAnimationData}
        showFallback
        innerClassName="w-80"
        fallbackClassName="w-65"
        className="h-full"
        key="network-error"
      />
    );

  return (
    <section className="w-full flex flex-col gap-4 p-2">
      {showSkeleton ? (
        <ThemeDetailsContentSkeleton />
      ) : (
        <>
          <ThemePreview />
          <ThemeMeta />
          <ThemeDescription />
          <ThemePalette />
        </>
      )}
    </section>
  );
};

export default ThemeDetailsContent;
