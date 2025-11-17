import { memo } from "react";
import { X as ClearIcon, ListFilter as FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input-transparent";

const ThemeListTop = memo(() => {
  return (
    <div className="w-full px-2 py-1.5 border-b-2">
      <div className="w-full flex gap-1 border border-border focus-within:border-primary/50 p-1 rounded-md pl-1.5">
        <Input
          className="w-full flex-1 placeholder:capitalize h-auto border-0 bg-transparent text-xs px-1"
          placeholder="Search theme in marketplace"
        />
        <Button variant={"secondary"} size={"iconXs"}>
          <ClearIcon />
        </Button>
        <Button variant={"secondary"} size={"iconXs"}>
          <FilterIcon />
        </Button>
      </div>
    </div>
  );
});

export default ThemeListTop;
