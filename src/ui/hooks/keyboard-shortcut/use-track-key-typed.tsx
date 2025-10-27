import { useCallback, useEffect } from "react";

const modifierKeys = new Set(["control", "shift", "alt", "meta"]);

interface useTrackKeyTypedProps {
  onEnter?: () => void;
  onEscape?: () => void;
  onChange: (keyList: Array<string>) => void;
}

const useTrackKeyTyped = ({
  onEnter,
  onEscape,
  onChange,
}: useTrackKeyTypedProps) => {
  const handlerKeydown = useCallback(
    (e: KeyboardEvent) => {
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

  useEffect(() => {
    document.addEventListener("keydown", handlerKeydown);

    return () => {
      document.removeEventListener("keydown", handlerKeydown);
    };
  }, [handlerKeydown]);
};

export default useTrackKeyTyped;
