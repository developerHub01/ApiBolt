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
import ThemeActions from "@/components/app/themes/marketplace/[id]/theme-details/theme-content/ThemeActions";

const ThemeMeta = () => {
  const themeDetails = useAppSelector(selectSelectedThemeDetails);

  const authorProfileUrl = useMemo(
    () =>
      themeDetails?.authorUsername
        ? `${import.meta.env.VITE_WEBSITE_BASE_URL}/profile/${themeDetails?.authorUsername}`
        : null,
    [themeDetails?.authorUsername],
  );

  if (!themeDetails) return null;
  const { id, type, author, authorUsername, version, install_count } =
    themeDetails;

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
      <ThemeActions id={id} version={version} />
    </>
  );
};

export default ThemeMeta;
