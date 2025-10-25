import { memo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

interface Props {
  id: string;
  label: string;
  keyMap: Array<string> | null;
}

const KeyboardShortcutsRow = memo(({ id, label, keyMap }: Props) => {
  return (
    <TableRow
      key={id}
      className={cn(
        "[&>td]:border-r [&>td]:last:border-r-0",
        "focus-within:bg-accent/60 duration-75 transition-colors"
      )}
    >
      <TableCell
        className={cn(
          "font-normal whitespace-normal wrap-break-word break-all min-h-16 p-3"
        )}
      >
        {id}
      </TableCell>
      <TableCell
        className={cn(
          "font-normal whitespace-normal wrap-break-word break-all min-h-16 p-3"
        )}
      >
        {label}
      </TableCell>
      <TableCell
        className={cn(
          "font-normal whitespace-normal wrap-break-word break-all min-h-16 p-3"
        )}
      >
        {Array.isArray(keyMap) ? (
          <KbdGroup>
            {keyMap?.map((key, index) => (
              <>
                <Kbd key={key + index} className="capitalize">
                  {key}
                </Kbd>
                {index + 1 < keyMap.length && (
                  <span className="text-muted-foreground">+</span>
                )}
              </>
            ))}
          </KbdGroup>
        ) : null}
      </TableCell>
    </TableRow>
  );
});

export default KeyboardShortcutsRow;
