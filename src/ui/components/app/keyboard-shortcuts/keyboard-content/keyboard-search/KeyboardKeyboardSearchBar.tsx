import { Fragment } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd-custom";
import useTrackKeyTyped from "@/hooks/keyboard-shortcut/use-track-key-typed";
import { useKeyboardShortcuts } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import { Input } from "@/components/ui/input";

const KeyboardKeyboardSearchBar = () => {
  const { searchKeyList, handleChangeSearchKeyList } = useKeyboardShortcuts();
  useTrackKeyTyped({
    onChange: handleChangeSearchKeyList,
  });

  return (
    <>
      {searchKeyList.length ? (
        <KbdGroup>
          {searchKeyList?.map((key, index) => (
            <Fragment key={key + index}>
              <Kbd className="capitalize" variant={"secondary"}>
                {key}
              </Kbd>
              {index + 1 < searchKeyList.length && (
                <span className="text-muted-foreground">+</span>
              )}
            </Fragment>
          ))}
        </KbdGroup>
      ) : (
        <Input
          placeholder="Press Keys to search"
          className="w-full h-full border-none outline-none bg-transparent dark:bg-transparent focus-visible:ring-0 px-0"
          readOnly
        />
      )}
    </>
  );
};

export default KeyboardKeyboardSearchBar;
