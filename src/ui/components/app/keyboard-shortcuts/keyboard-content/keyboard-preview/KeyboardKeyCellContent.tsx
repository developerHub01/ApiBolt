import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Pencil as EditIcon, RotateCcw as ResetIcon } from "lucide-react";
import KeyboardKeyList from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-preview/KeyboardKeyList";
import type { TShortcutKey } from "@/types/keyboard-shortcut.types";

interface KeyboardKeyCellContentProps {
  keyMap: TShortcutKey;
  onEdit: () => void;
  onReset: () => void;
}

const KeyboardKeyCellContent = memo(
  ({ keyMap, onEdit, onReset }: KeyboardKeyCellContentProps) => {
    const actionList = [
      {
        id: "edit",
        label: "Edit",
        Icon: EditIcon,
        onClick: onEdit,
      },
      {
        id: "reset",
        label: "Reset",
        Icon: ResetIcon,
        onClick: onReset,
      },
    ];

    return (
      <div className="w-full flex items-center">
        <KeyboardKeyList keyMap={keyMap} />
        {actionList.map(({ id, Icon, label, onClick }) => (
          <Button
            key={id}
            variant={"ghost"}
            size={"iconXs"}
            className="opacity-0 transition-opacity duration-100 group-hover:opacity-100"
            onClick={onClick}
            title={label}
          >
            <Icon />
          </Button>
        ))}
      </div>
    );
  }
);

export default KeyboardKeyCellContent;
