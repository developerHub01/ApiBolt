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
    id: "keyboard",
    label: "Search by keyboard",
    Icon: KeyboardIcon,
  },
  {
    id: "action",
    label: "Search by action",
    Icon: ActionIcon,
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
    if (searchByType === "keyboard") {
      actionList[0].isActive = true;
      actionList[1].isActive = false;
    } else {
      actionList[0].isActive = false;
      actionList[1].isActive = true;
    }

    actionList[0].onClick = () => handleChangeSearchByType("keyboard");
    actionList[1].onClick = () => handleChangeSearchByType("action");
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
    <div className="w-full border rounded-md p-1.5 flex items-center gap-2 min-h-11">
      <div className="flex-1 h-full px-1 items-center">
        {searchByType === "keyboard" ? (
          <KeyboardKeyboardSearchBar />
        ) : (
          <KeyboardActionSearchBar />
        )}
      </div>
      {menuList.map((item) => (
        <ActionButton key={item.id} {...item} />
      ))}
    </div>
  );
};

export default KeyboardShortcutSearch;
