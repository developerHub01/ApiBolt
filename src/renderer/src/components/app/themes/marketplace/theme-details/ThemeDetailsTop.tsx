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
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import { selectThemeActiveId } from "@/context/redux/theme/selectors/theme";
import { DEFAULT_THEME_ID } from "@shared/constant/theme";
import { WEBSITE_BASE_URL } from "@shared/constant/api-bolt";

const ThemeDetailsTop = memo(() => {
  const isLoading = useAppSelector(selectThemeMarketplaceThemeDetailsLoading);
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const themeDetails = useAppSelector(selectSelectedThemeDetails);
  const activeThemesId = useAppSelector(selectThemeActiveId);

  const themeUrl = useMemo(() => {
    if (!themeDetails?.id) return null;

    return `${WEBSITE_BASE_URL}/theme/${themeDetails.id}`;
  }, [themeDetails?.id]);

  const suffix = useMemo(() => {
    if (!themeDetails?.id) return null;

    const appliedThemeId = activeProjectId
      ? (activeThemesId.local ?? activeThemesId.global ?? DEFAULT_THEME_ID)
      : (activeThemesId.global ?? DEFAULT_THEME_ID);

    if (themeDetails.id !== appliedThemeId) return null;

    const source =
      activeProjectId && activeThemesId.local === appliedThemeId
        ? "local"
        : activeThemesId.global === appliedThemeId
          ? "global"
          : "default";

    if (source === "local") return "Active";

    if (source === "global") return activeProjectId ? "Global" : "Active";

    return "Default";
  }, [activeProjectId, activeThemesId, themeDetails]);

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
            {suffix && (
              <span className="text-primary text-xs border-2 border-dashed px-3 py-0.5 rounded-md bg-accent/50 tracking-wider capitalize">
                {suffix}
              </span>
            )}
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
