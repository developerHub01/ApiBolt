import { Settings as SettingIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { handleChangeIsCookiesOpen } from "@/context/redux/cookies/cookies-slice";
import { selectIsSettingButtonEnabled } from "@/context/redux/common-selectors/selector";
import { handleChangeIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";

const SettingButton = () => {
  const dispatch = useAppDispatch();
  const isEnabled = useAppSelector(selectIsSettingButtonEnabled);
  const handleToggleSettings = () => dispatch(handleChangeIsSettingOpen());
  const handleToggleCookies = () => dispatch(handleChangeIsCookiesOpen());
  const handleToggleKeyboardShortcut = () =>
    dispatch(handleChangeIsKeyboardShortcutPanelOpen());

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
          <MenubarItem onClick={handleToggleCookies}>
            Cookies<MenubarShortcut>Ctrl+Alt+C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={handleToggleKeyboardShortcut}>
            Keyboard Shortcuts<MenubarShortcut>Ctrl+Alt+K</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={handleToggleSettings}>
            Setting<MenubarShortcut>Ctrl+,</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SettingButton;
