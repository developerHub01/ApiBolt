import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTheme, type Theme } from "@/components/theme-provider";
// import { Button } from "@/components/ui/button";
import {
  Moon as DarkIcon,
  //  Sun as LightIcon
} from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  // const handleToggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  // };

  return (
    <>
      {/* <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={handleToggleTheme} size="icon">
            {theme === "light" ? (
              <DarkIcon size={18} />
            ) : (
              <LightIcon size={18} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Change Theme</p>
        </TooltipContent>
      </Tooltip> */}

      <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
        <SelectTrigger className="w-full">
          {/* <Button variant="outline" size="icon"> */}
          <DarkIcon size={18} />
          {/* </Button> */}
        </SelectTrigger>
        <SelectContent side="right">
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="dracula">Dracula</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default ThemeToggle;
