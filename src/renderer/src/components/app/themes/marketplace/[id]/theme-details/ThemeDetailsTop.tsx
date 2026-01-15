import { AnimatedDialogTop } from "@/components/ui/animated-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemeMarketplaceThemeDetailsLoading } from "@/context/redux/status/selectors/theme-marketplace";
import { selectSelectedThemeDetails } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";

const ThemeDetailsTop = () => {
  const isLoading = useAppSelector(selectThemeMarketplaceThemeDetailsLoading);
  const themeDetails = useAppSelector(selectSelectedThemeDetails);

  return (
    <AnimatedDialogTop>
      <div className="p-2 text-lg font-medium overflow-hidden">
        {isLoading || !themeDetails ? (
          <Skeleton className="h-7 w-4/5 max-w-52" />
        ) : (
          <p className="line-clamp-1 text-ellipsis capitalize">{themeDetails.name}</p>
        )}
      </div>
    </AnimatedDialogTop>
  );
};

export default ThemeDetailsTop;
