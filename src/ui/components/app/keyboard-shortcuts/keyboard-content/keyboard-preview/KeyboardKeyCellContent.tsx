import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Pencil as EditIcon } from "lucide-react";
import KeyboardKeyList from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-preview/KeyboardKeyList";

interface KeyboardKeyCellContentProps {
  keyMap: Array<string> | null;
  onSelect: () => void;
}

const KeyboardKeyCellContent = memo(
  ({ keyMap, onSelect }: KeyboardKeyCellContentProps) => {
    return (
      <div className="w-full flex items-center">
        <KeyboardKeyList keyMap={keyMap} />
        <Button
          variant={"ghost"}
          size={"iconXs"}
          className="opacity-0 transition-opacity duration-100 group-hover:opacity-100"
          onClick={onSelect}
          title="Edit shortcut"
        >
          <EditIcon />
        </Button>
      </div>
    );
  }
);

export default KeyboardKeyCellContent;
