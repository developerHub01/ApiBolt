import { useCallback, type KeyboardEvent, type SetStateAction } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectApplyingKeyboardShortcutsStrFormated } from "@/context/redux/keyboard-shortcuts/selectors/keyboard-shortcuts";
import { MODIFIER_KEY_TRACK_ORDER } from "@/constant/keyboard-shortcut.constant";
import { fontSizeLimit } from "@/constant/code.constant";

interface Props {
  handleLineWrap?: () => void;
  handleFormat?: () => void;
  fontSize?: number;
  handleFontSize?: (value: SetStateAction<number>) => void;
}

const useCodeKeybaordShortcut = <T extends HTMLElement>({
  handleLineWrap,
  handleFormat,
  fontSize,
  handleFontSize,
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
      const actionId = Object.entries(keybindingMap)
        .filter(([id]) => id.startsWith("code"))
        .find(
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
        case "code_zoom_in": {
          e.preventDefault();
          if (handleFontSize && typeof fontSize === "number")
            return handleFontSize((prev) =>
              Math.min(prev + 1, fontSizeLimit.max)
            );
          return;
        }
        case "code_zoom_out": {
          e.preventDefault();
          if (handleFontSize && typeof fontSize === "number")
            return handleFontSize((prev) =>
              Math.max(prev - 1, fontSizeLimit.min)
            );
          return;
        }
        case "code_zoom_reset": {
          e.preventDefault();
          if (handleFontSize && typeof fontSize === "number")
            return handleFontSize(fontSize);
          return;
        }
      }
    },
    [keybindingMap, handleLineWrap, handleFormat, handleFontSize, fontSize]
  );

  return handlerKeydown;
};

export default useCodeKeybaordShortcut;
