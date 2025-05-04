"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const themeList = [
  {
    id: "forest-light",
    label: "Forest Light",
  },
  {
    id: "forest-dark",
    label: "Forest Dark",
  },
  {
    id: "ice-wave",
    label: "Ice Wave",
  },
  {
    id: "storm-blue",
    label: "Storm Blue",
  },
  {
    id: "violet-blaze",
    label: "Violet Blaze",
  },
  {
    id: "void-violet",
    label: "Void Violet",
  },
  {
    id: "white-smoke",
    label: "White Smoke",
  },
  {
    id: "blackout",
    label: "Blackout",
  },
];

const ThemeDialog = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme: theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleChangeTheme = (id: string) => setTheme(id);

  if (!mounted) return null;

  return (
    <ScrollArea className="w-full min-h-0">
      <RadioGroup
        defaultValue={theme ?? themeList[0].id}
        onValueChange={handleChangeTheme}
        className="w-full grid grid-cols-2 gap-2 px-4 pt-1 pb-2"
      >
        {themeList.map(({ id, label }) => (
          <label
            htmlFor={`theme-${id}`}
            key={id}
            className="select-none cursor-pointer"
          >
            <RadioGroupItem value={id} id={`theme-${id}`} hidden />
            <Card
              className={cn(
                "w-full ring-1 aspect-square flex justify-center items-center text-center",
                {
                  "ring-primary": theme === id,
                  "ring-transparent": theme !== id,
                }
              )}
            >
              <CardTitle>{label}</CardTitle>
            </Card>
          </label>
        ))}
      </RadioGroup>
    </ScrollArea>
  );
};

export default ThemeDialog;
