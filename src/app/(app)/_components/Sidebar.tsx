"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sun as LightIcon, Moon as DarkIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const Sidebar = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  const handleToggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    []
  );

  return (
    <div className="max-w-14 bg-accent py-2.5 px-2 flex flex-col gap-2">
      <Link
        href={"/"}
        className="bg-primary rounded-md text-foreground aspect-square flex justify-center items-center font-bold select-none"
      >
        AB
      </Link>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={handleToggleTheme}
            >
              {theme === "light" ? <DarkIcon /> : <LightIcon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Switch to{theme === "light" ? "Dark" : "Light"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Sidebar;
