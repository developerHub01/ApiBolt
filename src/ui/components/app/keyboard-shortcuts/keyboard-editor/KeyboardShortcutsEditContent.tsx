import { Fragment, memo, useEffect, useState } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd-custom";

const modifierKeys = new Set(["control", "shift", "alt", "meta"]);

interface Props {
  shortcutId: string;
}

const KeyboardShortcutsEditContent = memo(({ shortcutId }: Props) => {
  const [keyList, setKeyList] = useState<Array<string>>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "enter") return;

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

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  console.log(shortcutId);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 p-6 text-center">
      <p className="text-sm leading-relaxed">
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
