import { Settings as SettingIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
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
import { handleChangeIsSettingOpen } from "@/context/redux/setting/setting-slice";
import { handleChangeIsCookiesOpen } from "@/context/redux/cookies/cookies-slice";
import { handleChangeIsKeyboardShortcutPanelOpen } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import { selectIsSettingButtonEnabled } from "@/context/redux/common-selectors/selector";
import { selectApplyingKeyboardShortcutsById } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { keyListStringify } from "@/utils/keyboard-shortcut.utils";
import type { TShortcutKey } from "@/types/keyboard-shortcut.types";

const SettingButton = () => {
  const dispatch = useAppDispatch();
  const isEnabled = useAppSelector(selectIsSettingButtonEnabled);

  const cookiesShortcuts = useAppSelector((state) =>
    selectApplyingKeyboardShortcutsById(state, "open_cookies")
  );
  const keyboardShortcuts = useAppSelector((state) =>
    selectApplyingKeyboardShortcutsById(state, "open_keyboard_shortcut")
  );
  const settingsShortcuts = useAppSelector((state) =>
    selectApplyingKeyboardShortcutsById(state, "open_settings")
  );

  const shortcutsMap: Record<string, TShortcutKey> = {
    open_cookies: cookiesShortcuts,
    open_keyboard_shortcut: keyboardShortcuts,
    open_settings: settingsShortcuts,
  };

  const getShortcutString = (id: string) => {
    const shortcuts = shortcutsMap[id];
    return Array.isArray(shortcuts) && shortcuts.length
      ? ` (${keyListStringify(shortcuts)})`
      : "";
  };

  const menuItems = [
    {
      id: "open_cookies",
      label: "Cookies",
      onClick: () => dispatch(handleChangeIsCookiesOpen()),
    },
    {
      id: "open_keyboard_shortcut",
      label: "Keyboard Shortcuts",
      onClick: () => dispatch(handleChangeIsKeyboardShortcutPanelOpen()),
    },
    {
      id: "open_settings",
      label: "Setting",
      onClick: () => dispatch(handleChangeIsSettingOpen()),
      isSeparatorAbove: true,
    },
  ];

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
          {menuItems.map(({ id, label, onClick, isSeparatorAbove }) => {
            const shortcutString = getShortcutString(id);
            return (
              <div key={id}>
                {isSeparatorAbove && <MenubarSeparator />}
                <MenubarItem onClick={onClick}>
                  {label}
                  {shortcutString && (
                    <MenubarShortcut>{shortcutString}</MenubarShortcut>
                  )}
                </MenubarItem>
              </div>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SettingButton;
