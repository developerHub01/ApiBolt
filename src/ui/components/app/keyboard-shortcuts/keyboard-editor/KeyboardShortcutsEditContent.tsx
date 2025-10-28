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
import { cn } from "@/lib/utils";
import MatchWarning from "@/components/app/keyboard-shortcuts/keyboard-editor/MatchWarning";
import useTrackKeyTyped from "@/hooks/keyboard-shortcut/use-track-key-typed";
import { toast } from "sonner";

interface Props {
  shortcutId: string;
}

const KeyboardShortcutsEditContent = memo(({ shortcutId }: Props) => {
  const dispatch = useAppDispatch();
  const { activeTab, applyingKeybindingMap } = useKeyboardShortcuts();
  const keyboardShortcutPanelRef = useRef<HTMLDivElement>(null);
  const [isExisting, setIsExisting] = useState<boolean>(false);
  const [keyList, setKeyList] = useState<Array<string>>([]);

  const handleClose = useCallback(
    () => dispatch(handleChangeEditingId()),
    [dispatch]
  );

  const handleUpdate = useCallback(async () => {
    if (isExisting) return;
    if (!keyList.length) return dispatch(handleChangeEditingId());
    const response = await dispatch(
      updateKeyboardShortcuts({
        type: activeTab,
        key: keyList,
      })
    ).unwrap();

    if (response) toast.success("Keybinding updated successfully.");
    else toast.error("Failed to update keybinding. Please try again.");
  }, [activeTab, dispatch, isExisting, keyList]);

  const handleKeyDown = useTrackKeyTyped<HTMLDivElement>({
    onEnter: handleUpdate,
    onEscape: handleClose,
    onChange: setKeyList,
  });

  useEffect(() => {
    keyboardShortcutPanelRef.current?.focus();
  }, []);

  useEffect(() => {
    const keyString = keyList.join("+");
    const matchedKey =
      Object.values(applyingKeybindingMap).findIndex(
        (item) => item.key?.join("+") === keyString && item.id !== shortcutId
      ) >= 0;

    setIsExisting(matchedKey);
  }, [keyList, activeTab, applyingKeybindingMap, shortcutId]);

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center gap-5 p-6 text-center"
      ref={keyboardShortcutPanelRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <p className="w-4/5 text-sm leading-relaxed">
        Press desired keys combination and then press ENTER.
      </p>
      <div
        className={cn(
          "w-4/5 px-2 py-3 bg-background/80 border-2 border-ring rounded-md min-h-11 flex justify-center items-center",
          {
            "border-destructive": isExisting,
          }
        )}
      >
        {keyList.length ? (
          <KbdGroup>
            {keyList?.map((key, index) => (
              <Fragment key={key + index}>
                <Kbd
                  className="capitalize"
                  variant={isExisting ? "destructive" : "outline"}
                >
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
      <MatchWarning show={isExisting} />
    </div>
  );
});

export default KeyboardShortcutsEditContent;
