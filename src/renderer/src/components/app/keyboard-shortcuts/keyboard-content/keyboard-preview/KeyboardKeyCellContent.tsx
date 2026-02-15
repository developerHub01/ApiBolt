import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Pencil as EditIcon,
  RotateCcw as ResetIcon,
  ListEnd as IneritFromThemeIcon,
  LucideIcon,
} from "lucide-react";
import KeyboardKeyList from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-preview/KeyboardKeyList";
import type { TShortcutKey } from "@shared/types/keyboard-shortcut.types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";

interface KeyboardKeyCellContentProps {
  keyMap: TShortcutKey;
  onEdit: () => void;
  onReset: () => void;
  onGlobal?: () => void;
}

interface MenuItemInterface {
  id: string;
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
}

const KeyboardKeyCellContent = memo(
  ({ keyMap, onEdit, onReset, onGlobal }: KeyboardKeyCellContentProps) => {
    const actionList = useMemo<Array<MenuItemInterface>>(
      () =>
        [
          {
            id: "edit",
            label: "Edit",
            Icon: EditIcon,
            onClick: onEdit,
          },
          {
            id: "reset",
            label: "Reset To Default",
            Icon: ResetIcon,
            onClick: onReset,
          },
          onGlobal && {
            id: "inherit",
            label: "Inherit Global",
            Icon: IneritFromThemeIcon,
            onClick: onGlobal,
          },
        ].filter(Boolean) as Array<MenuItemInterface>,
      [onEdit, onGlobal, onReset],
    );

    return (
      <div className="w-full flex items-center gap-1">
        <KeyboardKeyList keyMap={keyMap} />
        {actionList.map(({ id, Icon, label, onClick }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                size={"iconXs"}
                className="opacity-0 transition-opacity duration-100 group-hover:opacity-100"
                onClick={onClick}
                title={label}
              >
                <Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              variant={"secondary"}
              side="bottom"
              align="end"
              className="pointer-events-none"
            >
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  },
);

export default KeyboardKeyCellContent;
