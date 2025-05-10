import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { isElectron } from "@/utils/electron";
import { Settings as SettingIcon } from "lucide-react";
import WindowControls from "@/components/header/WindowControls";

const Header = () => {
  return (
    <div
      className="bg-accent flex justify-between items-center gap-2"
      style={{
        ...(isElectron()
          ? ({
              appRegion: "drag",
            } as CSSProperties)
          : {}),
      }}
    >
      <div className="flex items-center justify-between gap-2 w-full flex-1 px-2 py-1.5">
        <p className="select-none text-xl font-bold tracking-wide">ApiBolt</p>
        <Button
          size={"iconSm"}
          style={{
            ...(isElectron()
              ? ({
                  appRegion: "no-drag",
                } as CSSProperties)
              : {}),
          }}
          className="ml-auto"
        >
          <SettingIcon />
        </Button>
      </div>
      {isElectron() && <WindowControls />}
    </div>
  );
};

export default Header;
