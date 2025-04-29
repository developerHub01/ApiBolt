"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sun as LightIcon, Moon as DarkIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme: theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleToggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [theme]
  );

  if (!mounted) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={handleToggleTheme}
          className="mt-auto"
        >
          {theme === "light" ? <DarkIcon /> : <LightIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Switch to {theme === "light" ? "dark" : "light"}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
