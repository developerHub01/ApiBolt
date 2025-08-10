import type { CSSProperties } from "react";
import { isElectron } from "@/utils/electron";
import WindowControls from "@/components/app/header/WindowControls";
import HeaderSearch from "@/components/app/header/search/HeaderSearch";
import SettingButton from "@/components/app/header/SettingButton";

const Header = () => {
  return (
    <Wrapper>
      <p className="justify-start flex-1 select-none text-lg md:text-xl font-bold tracking-wide px-2.5 py-1.5">
        ApiBolt
      </p>
      <div className="w-full flex-[2] flex justify-center items-center">
        <HeaderSearch />
      </div>
      <div className="justify-end flex-1 flex gap-2 items-center h-full">
        <SettingButton />
        {isElectron() && <WindowControls />}
      </div>
    </Wrapper>
  );
};

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => (
  <div
    className="bg-accent/80 flex justify-center gap-2 min-h-[50px] items-center border-b"
    style={{
      ...(isElectron()
        ? ({
            appRegion: "drag",
          } as CSSProperties)
        : {}),
    }}
  >
    {children}
  </div>
);

export default Header;
