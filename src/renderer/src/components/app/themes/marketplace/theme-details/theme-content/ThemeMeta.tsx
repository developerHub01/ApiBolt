import { useMemo } from "react";
import ExternalLink from "@/components/ux/ExternalLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User as AuthorIcon,
  CloudDownload as TotalInstallIcon,
  Palette as ThemeCategoryIcon,
} from "lucide-react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedThemeDetails } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";
import ThemeActions from "@/components/app/themes/marketplace/theme-details/theme-content/ThemeActions";
import { DEFAULT_THEME_ID } from "@shared/constant/theme";

const ThemeMeta = () => {
  const themeDetails = useAppSelector(selectSelectedThemeDetails);

  const authorProfileUrl = useMemo(
    () =>
      themeDetails?.authorUsername
        ? `${import.meta.env.VITE_WEBSITE_BASE_URL}/profile/${themeDetails?.authorUsername}`
        : null,
    [themeDetails?.authorUsername],
  );

  const isDefaultTheme = useMemo(
    () => themeDetails?.id === DEFAULT_THEME_ID,
    [themeDetails?.id],
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
              <Button variant={"link"} className="px-0 underline capitalize">
                {author}
              </Button>
            </ExternalLink>
          ) : (
            <Button variant={"link"} className="px-0 capitalize">
              {author}
            </Button>
          )}
        </div>
        <Badge variant={"secondary"} className="capitalize ml-auto">
          <ThemeCategoryIcon /> {type}
        </Badge>
        {isDefaultTheme || (
          <Badge variant={"secondary"} className="capitalize">
            <TotalInstallIcon /> {install_count}
          </Badge>
        )}
      </div>
      <ThemeActions version={version} />
    </>
  );
};

export default ThemeMeta;
