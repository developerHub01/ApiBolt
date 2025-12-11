import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useTheme } from "@/components/theme-provider";
import { Moon as DarkIcon, Sun as LightIcon } from "lucide-react";
import SidebarActionButton from "@/components/app/sidebar/SidebarActionButton";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarActionButton
          variant="outline"
          onClick={handleToggleTheme}
          size="icon"
          Icon={theme === "light" ? DarkIcon : LightIcon}
        />
      </TooltipTrigger>
      <TooltipContent side="right" variant={"secondary"}>
        <p>Change Theme</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
