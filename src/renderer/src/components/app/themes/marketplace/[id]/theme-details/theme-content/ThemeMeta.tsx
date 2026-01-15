import ExternalLink from "@/components/ux/ExternalLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User as AuthorIcon,
  Download as InstallIcon,
  CloudDownload as TotalInstallIcon,
  Palette as ThemeCategoryIcon,
} from "lucide-react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectSelectedThemeDetails } from "@/context/redux/theme-marketplace/selectors/theme-marketplace";

const ThemeMeta = () => {
  const themeDetails = useAppSelector(selectSelectedThemeDetails);
  if (!themeDetails) return null;

  const { type, author, version, install_count } = themeDetails;

  return (
    <>
      <div className="w-full flex items-center gap-1">
        <div className="flex items-center gap-2">
          <AuthorIcon size={18} />
          <ExternalLink to={"https://jsonplaceholder.typicode.com/"}>
            <Button variant={"link"} className="px-0 underline">
              {author}
            </Button>
          </ExternalLink>
        </div>
        <Badge variant={"secondary"} className="capitalize ml-auto">
          <ThemeCategoryIcon /> {type}
        </Badge>
        <Badge variant={"secondary"} className="capitalize">
          <TotalInstallIcon /> {install_count}
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <Button size={"sm"}>
          <InstallIcon /> Install
        </Button>
        <p className="text-sm">version: {version}</p>
      </div>
    </>
  );
};

export default ThemeMeta;
