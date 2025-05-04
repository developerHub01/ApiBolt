"use client";

import React from "react";
import { useFullScreen } from "@/hooks/use-full-screen";
import {
  Expand as FullScreenIcon,
  Minimize as SmallScreenIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const FullScreenToggle = () => {
  const { isFullscreen, toggleFullscreen } = useFullScreen();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={toggleFullscreen} size="sm">
          {isFullscreen ? (
            <SmallScreenIcon size={18} />
          ) : (
            <FullScreenIcon size={18} />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FullScreenToggle;
