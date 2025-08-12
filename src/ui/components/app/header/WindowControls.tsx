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

    window.electronAPI.onWindowMaximizeChange((value) => setIsMaximized(value));
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
        <MinimizeIcon size={18} />
      </ActionButton>
      <ActionButton id={isMaximized ? "unmaximize" : "maximize"}>
        {isMaximized ? (
          <UnMaximizeIcon size={18} />
        ) : (
          <MaximizeIcon size={18} />
        )}
      </ActionButton>
      <ActionButton
        id={"close"}
        className="hover:bg-destructive hover:text-white"
      >
        <CloseIcon size={18} />
      </ActionButton>
    </div>
  );
};

interface ActionButtonProps {
  id: TWindowControl;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
const ActionButton = ({
  children,
  id,
  onClick,
  className = "",
}: ActionButtonProps) => {
  return (
    <Button
      variant={"secondary"}
      className={cn(
        "rounded-none h-full aspect-square bg-transparent",
        "hover:bg-foreground/10",
        className
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
