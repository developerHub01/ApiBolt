import { useCallback, useMemo } from "react";
import ExternalLink from "@/components/ux/ExternalLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User as AuthorIcon,
  Download as InstallIcon,
  CloudDownload as TotalInstallIcon,
  Palette as ThemeCategoryIcon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectSelectedThemeDetails } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import { installTheme } from "@renderer/context/redux/theme-marketplace/thunks/theme-marketplace";
import { selectThemeInstallationLoading } from "@renderer/context/redux/status/selectors/theme-marketplace";
import { Spinner } from "@renderer/components/ui/spinner";

const ThemeMeta = () => {
  const dispatch = useAppDispatch();
  const themeDetails = useAppSelector(selectSelectedThemeDetails);
  const isInstalling = useAppSelector(selectThemeInstallationLoading);

  const themeId = useMemo(() => themeDetails?.id, [themeDetails?.id]);

  const handleInstall = useCallback(() => {
    if (!themeId) return;
    dispatch(installTheme(themeId));
  }, [dispatch, themeId]);

  const authorProfileUrl = useMemo(
    () =>
      themeDetails?.authorUsername
        ? `${import.meta.env.VITE_WEBSITE_BASE_URL}/profile/${themeDetails?.authorUsername}`
        : null,
    [themeDetails?.authorUsername],
  );

  if (!themeDetails) return null;
  const { type, author, authorUsername, version, install_count } = themeDetails;

  return (
    <>
      <div className="w-full flex items-center gap-1">
        <div className="flex items-center gap-2">
          <AuthorIcon size={18} />
          {authorProfileUrl ? (
            <ExternalLink
              to={`${import.meta.env.VITE_WEBSITE_BASE_URL}/profile/${authorUsername}`}
            >
              <Button variant={"link"} className="px-0 underline">
                {author}
              </Button>
            </ExternalLink>
          ) : (
            <Button variant={"link"} className="px-0">
              {author}
            </Button>
          )}
        </div>
        <Badge variant={"secondary"} className="capitalize ml-auto">
          <ThemeCategoryIcon /> {type}
        </Badge>
        <Badge variant={"secondary"} className="capitalize">
          <TotalInstallIcon /> {install_count}
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Button size={"sm"} onClick={handleInstall} disabled={isInstalling}>
          {isInstalling ? <Spinner /> : <InstallIcon />}
          Install
        </Button>
        <p className="text-sm">version: {version}</p>
      </div>
    </>
  );
};

export default ThemeMeta;
