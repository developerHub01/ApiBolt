import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd-custom";
import { useAppDispatch } from "@/context/redux/hooks";
import { updateKeyboardShortcuts } from "@/context/redux/keyboard-shortcuts/thunks/keyboard-shortcuts";
import { useKeyboardShortcuts } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import { handleChangeEditingId } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";

const modifierKeys = new Set(["control", "shift", "alt", "meta"]);

const KeyboardShortcutsEditContent = memo(() => {
  const dispatch = useAppDispatch();
  const [keyList, setKeyList] = useState<Array<string>>([]);
  const { activeTab } = useKeyboardShortcuts();
  const keyboardShortcutPanelRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(
    () => dispatch(handleChangeEditingId()),
    [dispatch]
  );

  const handleUpdate = useCallback(async () => {
    if (!keyList.length) return handleClose();
    await dispatch(
      updateKeyboardShortcuts({
        type: activeTab,
        key: keyList,
      })
    );
  }, [activeTab, dispatch, handleClose, keyList]);

  useEffect(() => {
    const handlerKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key.toLowerCase() === "escape") return handleClose();
      if (e.key.toLowerCase() === "enter") return handleUpdate();

      const list = [];
      /* handle modifiere keys */
      if (e.ctrlKey) list.push("ctrl");
      if (e.altKey) list.push("alt");
      if (e.shiftKey) list.push("shift");
      if (e.metaKey) list.push("meta");
      /* handle normal keys */
      const key = e.key.toLowerCase();
      if (key && !modifierKeys.has(key)) list.push(key);

      setKeyList(list);
    };

    document.addEventListener("keydown", handlerKeydown);

    return () => {
      document.removeEventListener("keydown", handlerKeydown);
    };
  }, [handleClose, handleUpdate]);

  useEffect(() => {
    keyboardShortcutPanelRef.current?.focus();

    const handler = (e: KeyboardEvent) => e.stopPropagation();
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center gap-5 p-6 text-center"
      ref={keyboardShortcutPanelRef}
      tabIndex={0}
    >
      <p className="w-4/5 text-sm leading-relaxed">
        Press desired keys combination and then press ENTER.
      </p>
      <div className="w-4/5 px-2 py-3 bg-background/80 border-2 border-ring rounded-md min-h-11 flex justify-center items-center">
        {keyList.length ? (
          <KbdGroup>
            {keyList?.map((key, index) => (
              <Fragment key={key + index}>
                <Kbd className="capitalize" variant={"outline"}>
                  {key}
                </Kbd>
                {index + 1 < keyList.length && (
                  <span className="text-muted-foreground">+</span>
                )}
              </Fragment>
            ))}
          </KbdGroup>
        ) : (
          <p className="text-sm text-secondary-foreground">Press keys</p>
        )}
      </div>
    </div>
  );
});

export default KeyboardShortcutsEditContent;
