import { Fragment, memo } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd-custom";

interface KeyListProps {
  keyMap: Array<string> | null;
}

const KeyboardKeyList = memo(({ keyMap }: KeyListProps) => {
  return (
    <div className="flex-1">
      {Array.isArray(keyMap) ? (
        <KbdGroup>
          {keyMap?.map((key, index) => (
            <Fragment key={key + index}>
              <Kbd className="capitalize" variant={"outline"}>
                {key}
              </Kbd>
              {index + 1 < keyMap.length && (
                <span className="text-muted-foreground">+</span>
              )}
            </Fragment>
          ))}
        </KbdGroup>
      ) : null}
    </div>
  );
});

export default KeyboardKeyList;
