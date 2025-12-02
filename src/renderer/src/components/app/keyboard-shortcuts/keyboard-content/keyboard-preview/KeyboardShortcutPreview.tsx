import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useKeyboardShortcuts } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import type { KeybaordShortCutInterface } from "@shared/types/keyboard-shortcut.types";
import KeyboardShortcutsRow from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-preview/KeyboardShortcutsRow";
import Empty from "@/components/ui/empty";

const KeyboardShortcutPreview = () => {
  const { searchResult, searchResultCount } = useKeyboardShortcuts();

  return (
    <>
      {searchResultCount ? (
        <div className="w-full h-full border rounded-lg">
          <Table className="w-full table-fixed overflow-hidden">
            <TableHeader className="bg-secondary/80 font-bold">
              <TableRow className="[&>th]:border-r [&>th]:last:border-r-0">
                {["Action", "Keyboard Shortcut"].map(label => (
                  <TableHead
                    key={label}
                    className="whitespace-normal p-3 capitalize"
                  >
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(
                Object.entries(searchResult) as Array<
                  [string, KeybaordShortCutInterface]
                >
              ).map(([id, { key, ...rest }]) => (
                <KeyboardShortcutsRow key={id} {...rest} keyMap={key} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Empty
          className="min-h-60"
          label="No shortcuts found"
          description="Try adjusting your search term or check your spelling"
          showFallback
        />
      )}
    </>
  );
};

export default KeyboardShortcutPreview;
