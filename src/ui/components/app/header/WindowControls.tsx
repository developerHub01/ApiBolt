import { useEffect, useState } from "react";
import { isElectron } from "@/utils/electron";
import {
  Minus as MinimizeIcon,
  Square as MaximizeIcon,
  X as CloseIcon,
  SquareSquare as UnMaximizeIcon,
} from "lucide-react";
import type { TWindowControl } from "@/types";
import ActionButton from "@/components/app/header/ActionButton";

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
    <>
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
    </>
  );
};

export default WindowControls;
