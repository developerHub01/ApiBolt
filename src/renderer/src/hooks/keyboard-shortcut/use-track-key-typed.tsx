import { useCallback, type KeyboardEvent } from "react";
import { MODIFIER_KEY_TRACK_ORDER } from "@/constant/keyboard-shortcut.constant";
import { keyboardNormalizedKey } from "@/utils/keyboard-shortcut.utils";

const modifierKeys = new Set(["control", "shift", "alt", "meta"]);

interface useTrackKeyTypedProps {
  onEnter?: () => void;
  onEscape?: () => void;
  onChange: (keyList: Array<string>) => void;
}

const useTrackKeyTyped = <T extends HTMLElement>({
  onEnter,
  onEscape,
  onChange,
}: useTrackKeyTypedProps) => {
  const handlerKeydown = useCallback(
    (e: KeyboardEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      const key = keyboardNormalizedKey(e.code, e.key).toLowerCase();

      if (key === "escape") return onEscape?.();
      if (key === "enter") return onEnter?.();

      const list: Array<string> = [];
      /* handle modifiere keys */
      MODIFIER_KEY_TRACK_ORDER.forEach(({ eventProperty, key }) => {
        if (e[eventProperty]) list.push(key);
      });
      /* handle normal keys */
      if (key && !modifierKeys.has(key)) list.push(key);

      onChange(list);
    },
    [onChange, onEnter, onEscape],
  );

  return handlerKeydown;
};

export default useTrackKeyTyped;
