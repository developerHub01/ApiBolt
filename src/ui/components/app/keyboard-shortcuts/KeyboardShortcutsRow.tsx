import React, { Fragment, memo, useCallback } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Kbd, KbdGroup } from "@/components/ui/kbd-custom";
import { Button } from "@/components/ui/button";
import { Pencil as EditIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeEditingId } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";

interface KeyboardShortcutsRowProps {
  id: string;
  label: string;
  keyMap: Array<string> | null;
}

const KeyboardShortcutsRow = memo(
  ({ id, label, keyMap }: KeyboardShortcutsRowProps) => {
    const dispatch = useAppDispatch();
    const handleSelectEdit = useCallback(
      () => dispatch(handleChangeEditingId(id)),
      [dispatch, id]
    );

    return (
      <TableRow
        key={id}
        className={cn(
          "[&>td]:border-r [&>td]:last:border-r-0",
          "focus-within:bg-accent/60 duration-75 transition-colors",
          "group"
        )}
      >
        <Cell>{label}</Cell>
        <Cell>
          <KeyCellContent keyMap={keyMap} onSelect={handleSelectEdit} />
        </Cell>
      </TableRow>
    );
  }
);

interface CellProps {
  children: React.ReactNode;
}

const Cell = ({ children }: CellProps) => (
  <TableCell
    className={cn(
      "font-normal whitespace-normal wrap-break-word break-all min-h-16 px-3 py-2"
    )}
  >
    {children}
  </TableCell>
);

interface KeyListProps {
  keyMap: Array<string> | null;
}

const KeyList = memo(({ keyMap }: KeyListProps) => {
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

interface KeyCellContentProps {
  keyMap: Array<string> | null;
  onSelect: () => void;
}

const KeyCellContent = memo(({ keyMap, onSelect }: KeyCellContentProps) => {
  return (
    <div className="w-full flex items-center">
      <KeyList keyMap={keyMap} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"iconXs"}
            className="opacity-0 transition-opacity duration-100 group-hover:opacity-100"
            onClick={onSelect}
          >
            <EditIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          <p>Change Keybinding</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
});

export default KeyboardShortcutsRow;
