import { useCallback, type KeyboardEvent } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectApplyingKeyboardShortcutsStrFormated } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { MODIFIER_KEY_TRACK_ORDER } from "@/constant/keyboard-shortcut.constant";

interface Props {
  handleLineWrap?: () => void;
  handleFormat?: () => void;
}

const useCodeKeybaordShortcut = <T extends HTMLElement>({
  handleLineWrap,
  handleFormat,
}: Props) => {
  const keybindingMap = useAppSelector(
    selectApplyingKeyboardShortcutsStrFormated
  );

  const handlerKeydown = useCallback(
    (e: KeyboardEvent<T>) => {
      e.stopPropagation();
      const keyList = [];

      MODIFIER_KEY_TRACK_ORDER.forEach(({ eventProperty, key }) => {
        if (e[eventProperty]) keyList.push(key);
      });
      if (e.key) keyList.push(e.key.toLowerCase());

      const keyString = keyList.join("+");
      const actionId = Object.entries(keybindingMap).find(
        ([, keyBindingString]) =>
          keyBindingString && keyBindingString === keyString
      )?.[0];

      if (!actionId) return;

      switch (actionId) {
        case "code_line_wrap": {
          e.preventDefault();
          if (handleLineWrap) return handleLineWrap();
          return;
        }
        case "code_beautify": {
          e.preventDefault();
          if (handleFormat) return handleFormat();
          return;
        }
      }
    },
    [keybindingMap, handleLineWrap, handleFormat]
  );

  return handlerKeydown;
};

export default useCodeKeybaordShortcut;
