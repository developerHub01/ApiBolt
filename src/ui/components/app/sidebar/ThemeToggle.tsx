import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";
import { Moon as DarkIcon, Sun as LightIcon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={handleToggleTheme} size="icon">
          {theme === "light" ? <DarkIcon size={18} /> : <LightIcon size={18} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Change Theme</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
