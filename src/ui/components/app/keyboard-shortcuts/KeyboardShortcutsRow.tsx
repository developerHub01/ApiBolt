import { memo } from "react";
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

interface KeyboardShortcutsRowProps {
  id: string;
  label: string;
  keyMap: Array<string> | null;
}

const KeyboardShortcutsRow = memo(
  ({ id, label, keyMap }: KeyboardShortcutsRowProps) => {
    return (
      <TableRow
        key={id}
        className={cn(
          "[&>td]:border-r [&>td]:last:border-r-0",
          "focus-within:bg-accent/60 duration-75 transition-colors",
          "group"
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
          <KeyCellContent keyMap={keyMap} />
        </TableCell>
      </TableRow>
    );
  }
);

interface KeyCellContentProps {
  keyMap: Array<string> | null;
}

const KeyCellContent = ({ keyMap }: KeyCellContentProps) => (
  <div className="w-full flex items-center">
    <KeyList keyMap={keyMap} />
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"ghost"}
          size={"iconXs"}
          className="opacity-0 transition-opacity duration-100 group-hover:opacity-100"
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

interface KeyListProps {
  keyMap: Array<string> | null;
}

const KeyList = ({ keyMap }: KeyListProps) => {
  return (
    <div className="flex-1">
      {Array.isArray(keyMap) ? (
        <KbdGroup>
          {keyMap?.map((key, index) => (
            <>
              <Kbd key={key + index} className="capitalize" variant={"outline"}>
                {key}
              </Kbd>
              {index + 1 < keyMap.length && (
                <span className="text-muted-foreground">+</span>
              )}
            </>
          ))}
        </KbdGroup>
      ) : null}
    </div>
  );
};

export default KeyboardShortcutsRow;
