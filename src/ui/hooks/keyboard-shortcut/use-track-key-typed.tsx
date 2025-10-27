import { useCallback, type KeyboardEvent } from "react";

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
      let key = e.key.toLowerCase();

      if (key === "escape") return onEscape?.();
      if (key === "enter") return onEnter?.();

      const list = [];
      /* handle modifiere keys */
      if (e.ctrlKey) list.push("ctrl");
      if (e.altKey) list.push("alt");
      if (e.shiftKey) list.push("shift");
      if (e.metaKey) list.push("meta");
      if (key === " ") key = "space";
      /* handle normal keys */
      if (key && !modifierKeys.has(key)) list.push(key);

      onChange(list);
    },
    [onChange, onEnter, onEscape]
  );

  return handlerKeydown;
};

export default useTrackKeyTyped;
