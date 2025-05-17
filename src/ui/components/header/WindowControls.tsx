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
  const [isMaximized, setIsMaximized] = useState<boolean>(true);

  useEffect(() => {
    if (!isElectron()) return;

    window.electronAPI.onWindowMaximizeChange((value) => {
      setIsMaximized(value);
    });
  }, []);

  return (
    <div
      style={{
        ...(isElectron()
          ? ({
              appRegion: "no-drag",
            } as CSSProperties)
          : {}),
      }}
      className="flex h-full"
    >
      <ActionButton id={"minimize"}>
        <MinimizeIcon />
      </ActionButton>
      {isMaximized ? (
        <ActionButton id={"unmaximize"}>
          <UnMaximizeIcon />
        </ActionButton>
      ) : (
        <ActionButton id={"maximize"}>
          <MaximizeIcon />
        </ActionButton>
      )}
      <ActionButton id={"close"}>
        <CloseIcon />
      </ActionButton>
    </div>
  );
};

interface ActionButtonProps {
  id: TWindowControl;
  children: React.ReactNode;
  onClick?: () => void;
}
const ActionButton = ({ children, id, onClick }: ActionButtonProps) => {
  return (
    <Button
      variant={"secondary"}
      className={cn(
        "rounded-none h-full aspect-square",
        "hover:bg-foreground/10"
      )}
      onClick={async () => {
        await window.electronAPI.windowControls(id);
        if (onClick) onClick();
      }}
    >
      {children}
    </Button>
  );
};

export default WindowControls;
