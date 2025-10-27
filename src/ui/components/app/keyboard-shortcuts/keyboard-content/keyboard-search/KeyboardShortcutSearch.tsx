import { useMemo } from "react";
import {
  Keyboard as KeyboardIcon,
  X as ClearIcon,
  WholeWord as ActionIcon,
  type LucideIcon,
} from "lucide-react";
import ActionButton from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-search/ActionButton";
import { useKeyboardShortcuts } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";
import KeyboardActionSearchBar from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-search/KeyboardActionSearchBar";
import KeyboardKeyboardSearchBar from "@/components/app/keyboard-shortcuts/keyboard-content/keyboard-search/KeyboardKeyboardSearchBar";

interface ActionItemInterface {
  id: string;
  label: string;
  Icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

const actionList: Array<ActionItemInterface> = [
  {
    id: "action",
    label: "Search by action",
    Icon: ActionIcon,
  },
  {
    id: "keyboard",
    label: "Search by keyboard",
    Icon: KeyboardIcon,
  },
];

const clearAction: ActionItemInterface = {
  id: "clear",
  label: "Clear search",
  Icon: ClearIcon,
};

const KeyboardShortcutSearch = () => {
  const {
    searchByType,
    searchTerm,
    handleChangeSearchByType,
    handleChangeSearchTerm,
    handleChangeSearchKeyList,
    searchKeyList,
  } = useKeyboardShortcuts();

  const menuList = useMemo(() => {
    if (searchByType === "action") {
      actionList[0].isActive = true;
      actionList[1].isActive = false;
    } else {
      actionList[0].isActive = false;
      actionList[1].isActive = true;
    }

    actionList[0].onClick = () => handleChangeSearchByType("action");
    actionList[1].onClick = () => handleChangeSearchByType("keyboard");
    clearAction.onClick = () =>
      searchByType === "action"
        ? handleChangeSearchTerm()
        : handleChangeSearchKeyList([]);

    if (
      (searchByType === "action" && !searchTerm) ||
      (searchByType === "keyboard" && !searchKeyList.length)
    )
      return actionList as Array<Required<ActionItemInterface>>;

    return [...actionList, clearAction] as Array<Required<ActionItemInterface>>;
  }, [
    handleChangeSearchByType,
    handleChangeSearchKeyList,
    handleChangeSearchTerm,
    searchByType,
    searchKeyList.length,
    searchTerm,
  ]);

  return (
    <div className="w-full px-3 py-2">
      <div className="w-full rounded-md flex items-center border-2 border-secondary focus-within:border-primary/50 transition-colors duration-100">
        <div className="flex-1 h-full items-center">
          {searchByType === "keyboard" ? (
            <KeyboardKeyboardSearchBar />
          ) : (
            <KeyboardActionSearchBar />
          )}
        </div>
        <div className="flex items-center gap-1.5 p-1.5">
          {menuList.map((item) => (
            <ActionButton key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutSearch;
