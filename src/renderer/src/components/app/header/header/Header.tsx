import type { CSSProperties } from "react";
import { isElectron } from "@/utils/electron";
import WindowControls from "@/components/app/header/WindowControls";
import HeaderSearch from "@/components/app/header/search/HeaderSearch";
import SettingButton from "@/components/app/header/SettingButton";
import { cn } from "@/lib/utils";
// import { useGlobal } from "@/context/global/GlobalProvider";
import HeaderWrapper from "@/components/app/header/header/HeaderWrapper";
import { AnimatePresence } from "motion/react";

const Header = () => {
  // const { isFullscreen } = useGlobal();
  const isFullscreen = false;

  return (
    <>
      <AnimatePresence>
        {isFullscreen || (
          <HeaderWrapper
            className={cn({
              "min-h-0 h-0 ": isFullscreen,
            })}
          >
            <p className="justify-start flex-1 select-none text-lg md:text-xl font-bold tracking-wide px-2.5 py-1.5">
              ApiBolt
            </p>
            <div className="w-full flex-2 flex justify-center items-center">
              <HeaderSearch />
            </div>
            <div
              className="justify-end flex-1 flex items-center h-full"
              style={
                isElectron() ? ({ appRegion: "no-drag" } as CSSProperties) : {}
              }
            >
              <SettingButton />
              {isElectron() && <WindowControls />}
            </div>
          </HeaderWrapper>
        )}
      </AnimatePresence>
      {isFullscreen && <HeaderSearch />}
    </>
  );
};

export default Header;
