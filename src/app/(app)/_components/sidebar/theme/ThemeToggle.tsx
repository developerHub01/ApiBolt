import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Palette as ThemePaletteIcon } from "lucide-react";
import ThemeDialog from "@/app/(app)/_components/sidebar/theme/ThemeDialog";

const ThemeToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span>
          <Button size={"icon"} variant={"outline"} className="mt-auto">
            <ThemePaletteIcon />
          </Button>
        </span>
      </SheetTrigger>
      <SheetContent className="w-11/12 max-w-96">
        <SheetHeader>
          <SheetTitle>Choose Theme</SheetTitle>
        </SheetHeader>
        <ThemeDialog />
      </SheetContent>
    </Sheet>
  );
};

export default ThemeToggle;
