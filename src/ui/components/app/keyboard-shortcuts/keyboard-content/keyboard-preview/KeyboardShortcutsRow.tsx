import { memo, useCallback } from "react";
import { TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeEditingId } from "@/context/redux/keyboard-shortcuts/keyboard-shortcuts-slice";
import KeyboardKeyCellContent from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-preview/KeyboardKeyCellContent";
import KeyboardCell from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-preview/KeyboardCell";

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
        <KeyboardCell>{label}</KeyboardCell>
        <KeyboardCell>
          <KeyboardKeyCellContent keyMap={keyMap} onSelect={handleSelectEdit} />
        </KeyboardCell>
      </TableRow>
    );
  }
);

export default KeyboardShortcutsRow;
