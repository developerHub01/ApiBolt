import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { isElectron } from "@/utils/electron";
import { Settings as SettingIcon } from "lucide-react";
import WindowControls from "@/components/header/WindowControls";
import ProjectMenu from "@/components/header/project-menu/ProjectMenu";
import ProjectMenuProvider from "@/context/redux/project-menu/ProjectMenuProvider";

const Header = () => {
  return (
    <ProjectMenuProvider>
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
          <p className="select-none text-lg md:text-xl font-bold tracking-wide">
            ApiBolt
          </p>
          <div
            style={{
              ...(isElectron()
                ? ({
                    appRegion: "no-drag",
                  } as CSSProperties)
                : {}),
            }}
          >
            <ProjectMenu />
          </div>
          <Button
            size={"iconSm"}
            variant={"ghost"}
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
    </ProjectMenuProvider>
  );
};

export default Header;
