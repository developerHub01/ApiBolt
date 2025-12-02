import { memo } from "react";
import { X as ClearIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input-transparent";
import ThemeFilter from "@/components/app/themes/marketplace/[id]/theme-list/theme-list-top/ThemeFilter";

const ThemeListTop = memo(() => {
  return (
    <div className="w-full px-2 py-1.5 border-b-2">
      <div className="w-full flex gap-1">
        <Input
          className="w-full bg-secondary flex-1 placeholder:capitalize h-auto border-0 text-sm! placeholder:text-sm px-2"
          placeholder="Search theme in marketplace"
        />
        <Button variant={"secondary"} size={"iconXs"}>
          <ClearIcon />
        </Button>
        <ThemeFilter />
      </div>
    </div>
  );
});

export default ThemeListTop;
