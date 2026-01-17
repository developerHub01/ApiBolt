import { AnimatedDialogBottom } from "@/components/ui/animated-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemeMarketplaceThemeDetailsLoading } from "@/context/redux/status/selectors/theme-marketplace";

const ThemeDetailsBottom = () => {
  const isLoading = useAppSelector(selectThemeMarketplaceThemeDetailsLoading);

  return (
    <AnimatedDialogBottom>
      <div className="w-full max-w-lg text-sm text-center">
        {isLoading ? (
          <Skeleton className="h-5 w-full" />
        ) : (
          <p className="line-clamp-1">
            Click install button to install theme in local
          </p>
        )}
      </div>
    </AnimatedDialogBottom>
  );
};

export default ThemeDetailsBottom;
