import ThemePreview from "@/components/app/themes/marketplace/theme-details/theme-content/ThemePreview";
import ThemeMeta from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeMeta";
import ThemeDetailsContentSkeleton from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeDetailsContentSkeleton";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemeMarketplaceThemeDetailsLoading } from "@/context/redux/status/selectors/theme-marketplace";
import ThemeDescription from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeDescription";
import ThemePalette from "@/components/app/themes/marketplace/theme-details/theme-content/ThemePalette";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";

const ThemeDetailsContent = () => {
  const isLoading = useAppSelector(selectThemeMarketplaceThemeDetailsLoading);
  const showSkeleton = useShowSkeleton(isLoading);

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
