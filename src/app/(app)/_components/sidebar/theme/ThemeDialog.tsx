"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const themeList = [
  {
    id: "black-light",
    label: "Black Light",
  },
  {
    id: "black-dark",
    label: "Black Dark",
  },
  {
    id: "nature-light",
    label: "Nature Light",
  },
  {
    id: "nature-dark",
    label: "Nature Dark",
  },
  {
    id: "ocean-light",
    label: "Ocean Light",
  },
  {
    id: "ocean-dark",
    label: "Ocean Dark",
  },
  {
    id: "violate-light",
    label: "Violate Light",
  },
  {
    id: "violate-dark",
    label: "Violate Dark",
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
