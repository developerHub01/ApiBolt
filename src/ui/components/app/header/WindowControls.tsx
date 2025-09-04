import { useEffect, useState, type CSSProperties } from "react";
import { isElectron } from "@/utils/electron";
import {
  Minus as MinimizeIcon,
  Square as MaximizeIcon,
  X as CloseIcon,
  SquareSquare as UnMaximizeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TWindowControl } from "@/types";

const WindowControls = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (!isElectron()) return;

    window.electronAPI.isWindowMaximized().then(setIsMaximized);
    window.electronAPI.onWindowMaximizeChange(setIsMaximized);

    return () => {
      window.electronAPI.removeWindowMaximizeChange();
    };
  }, []);

  const handleWindowAction = async (action: TWindowControl) => {
    if (!isElectron()) return;

    switch (action) {
      case "minimize":
        await window.electronAPI.windowMinimize();
        break;
      case "maximize":
        await window.electronAPI.windowMaximize();
        break;
      case "unmaximize":
        await window.electronAPI.windowUnmaximize();
        break;
      case "close":
        await window.electronAPI.windowClose();
        break;
    }
  };

  return (
    <div
      style={isElectron() ? ({ appRegion: "no-drag" } as CSSProperties) : {}}
      className="flex h-full"
    >
      <ActionButton id="minimize" onClick={handleWindowAction}>
        <MinimizeIcon size={18} />
      </ActionButton>

      <ActionButton
        id={isMaximized ? "unmaximize" : "maximize"}
        onClick={handleWindowAction}
      >
        {isMaximized ? (
          <UnMaximizeIcon size={18} />
        ) : (
          <MaximizeIcon size={18} />
        )}
      </ActionButton>

      <ActionButton
        id="close"
        className="hover:bg-destructive hover:text-white"
        onClick={handleWindowAction}
      >
        <CloseIcon size={18} />
      </ActionButton>
    </div>
  );
};

interface ActionButtonProps {
  id: TWindowControl;
  children: React.ReactNode;
  className?: string;
  onClick: (action: TWindowControl) => void;
}

const ActionButton = ({
  children,
  id,
  onClick,
  className,
}: ActionButtonProps) => {
  return (
    <Button
      variant="secondary"
      className={cn(
        "rounded-none h-full aspect-square bg-transparent",
        "hover:bg-foreground/10",
        className
      )}
      onClick={() => onClick(id)}
    >
      {children}
    </Button>
  );
};

export default WindowControls;
