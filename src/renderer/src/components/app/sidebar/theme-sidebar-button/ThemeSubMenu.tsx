import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import {
  Store as ThemeMarketIcon,
  PencilRuler as ThemeEditorIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MENU_ITEMS = [
  {
    id: "theme_marketplace",
    label: "Theme marketplace",
    link: "/themes/marketplace",
    Icon: ThemeMarketIcon,
  },
  {
    id: "theme_editor",
    label: "Theme Editor",
    link: "/themes/editor",
    Icon: ThemeEditorIcon,
  },
];

const ThemeSubMenu = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-center items-center gap-1.5">
      {MENU_ITEMS.map(({ id, label, link, Icon }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Link to={link}>
              <Button
                size={"iconSm"}
                variant={location.pathname === link ? "default" : "background"}
                className="mt-auto"
              >
                <Icon />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" variant={"secondary"}>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default ThemeSubMenu;
