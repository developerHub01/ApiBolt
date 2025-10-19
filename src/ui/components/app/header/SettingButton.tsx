import { Settings as SettingIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
// import ActionButton from "@/components/app/header/ActionButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { handleChangeIsCookiesOpen } from "@/context/redux/cookies/cookies-slice";
import { selectIsSettingButtonEnabled } from "@/context/redux/common-selectors/selector";

const SettingButton = () => {
  const dispatch = useAppDispatch();
  const isEnabled = useAppSelector(selectIsSettingButtonEnabled);
  const handleToggleSettings = () => dispatch(handleChangeIsSettingOpen());
  const handleToggleCookies = () => dispatch(handleChangeIsCookiesOpen());

  return (
    <Menubar asChild>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button
            variant="secondary"
            className={cn(
              "rounded-none h-full aspect-square bg-transparent",
              "hover:bg-foreground/10"
            )}
            disabled={!isEnabled}
          >
            <SettingIcon />
          </Button>
        </MenubarTrigger>
        <MenubarContent align="end">
          <MenubarItem onClick={handleToggleSettings}>
            Setting<MenubarShortcut>Ctrl+,</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={handleToggleCookies}>
            Cookies<MenubarShortcut>Ctrl+Alt+C</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SettingButton;
