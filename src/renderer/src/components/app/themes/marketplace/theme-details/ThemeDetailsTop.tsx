import { memo, useMemo } from "react";
import { AnimatedDialogTop } from "@/components/ui/animated-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/context/redux/hooks";
import { selectThemeMarketplaceThemeDetailsLoading } from "@/context/redux/status/selectors/theme-marketplace";
import { selectSelectedThemeDetails } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { Button } from "@/components/ui/button";
import { ArrowUpRight as OpenInWebIcon } from "lucide-react";
import ExternalLink from "@/components/ux/ExternalLink";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";

const ThemeDetailsTop = memo(() => {
  const isLoading = useAppSelector(selectThemeMarketplaceThemeDetailsLoading);
  const themeDetails = useAppSelector(selectSelectedThemeDetails);

  const themeUrl = useMemo(() => {
    if (!themeDetails?.id) return null;

    return `${import.meta.env.VITE_WEBSITE_BASE_URL}/theme/${themeDetails.id}`;
  }, [themeDetails?.id]);

  return (
    <AnimatedDialogTop>
      <div className="p-2 text-lg font-medium overflow-hidden flex items-center gap-3">
        {isLoading || !themeDetails ? (
          <Skeleton className="h-7 w-4/5 max-w-52" />
        ) : (
          <>
            <p className="line-clamp-1 text-ellipsis capitalize">
              {themeDetails.name}
            </p>
            <OpenInWebButton link={themeUrl} />
          </>
        )}
      </div>
    </AnimatedDialogTop>
  );
});

interface OpenInWebButtonProps {
  link?: string | null;
}

const OpenInWebButton = memo(({ link }: OpenInWebButtonProps) => (
  <>
    {link && (
      <Tooltip>
        <TooltipTrigger asChild>
          <ExternalLink to={link} className="ml-auto">
            <Button variant={"outline"} size={"icon"} className="rounded-full">
              <OpenInWebIcon />
            </Button>
          </ExternalLink>
        </TooltipTrigger>
        <TooltipContent variant={"outline"} side="bottom" align="end">
          <p>Open in web</p>
        </TooltipContent>
      </Tooltip>
    )}
  </>
));

export default ThemeDetailsTop;
