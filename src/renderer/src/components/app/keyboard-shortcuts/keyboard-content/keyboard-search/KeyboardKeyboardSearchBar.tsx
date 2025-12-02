import { Fragment, useEffect, useRef } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd-custom";
import useTrackKeyTyped from "@/hooks/keyboard-shortcut/use-track-key-typed";
import { useKeyboardShortcuts } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import { Input } from "@/components/ui/input";

const KeyboardKeyboardSearchBar = () => {
  const { searchKeyList, handleChangeSearchKeyList } = useKeyboardShortcuts();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = useTrackKeyTyped({
    onChange: handleChangeSearchKeyList,
  });

  useEffect(() => {
    if (document.activeElement === searchBarRef.current) return;
    searchBarRef.current?.focus();
  }, [searchKeyList]);

  return (
    <div
      className="w-full p-1.5 pl-2.5 flex items-center focus-visible:border-0 focus-visible:shadow-none focus-visible:ring-0 focus:outline-0"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      ref={searchBarRef}
    >
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
    </div>
  );
};

export default KeyboardKeyboardSearchBar;
