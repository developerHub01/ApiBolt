import type { CSSProperties } from "react";
import { Settings as SettingIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isElectron } from "@/utils/electron";
import WindowControls from "@/components/app/header/WindowControls";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import HeaderNavigation from "@/components/header/HeaderNavigation";

const Header = () => {
  return (
    <div
      className="bg-accent/80 flex justify-between items-center gap-2"
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
        {/* <HeaderNavigation /> */}
        <SettingButton />
      </div>
      {isElectron() && <WindowControls />}
    </div>
  );
};

const SettingButton = () => {
  const dispatch = useAppDispatch();

  const handleToggle = () => dispatch(handleChangeIsSettingOpen());

  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
          onClick={handleToggle}
        >
          <SettingIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Setting (Ctrl+,)</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Header;
