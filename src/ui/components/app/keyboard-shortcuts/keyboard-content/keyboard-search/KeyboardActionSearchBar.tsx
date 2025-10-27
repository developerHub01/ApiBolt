import { type ChangeEvent, type FocusEvent } from "react";
import { Input } from "@/components/ui/input";
import { useKeyboardShortcuts } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";

const KeyboardActionSearchBar = () => {
  const { searchTerm, handleChangeSearchTerm } = useKeyboardShortcuts();

  const handleActionTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    handleChangeSearchTerm(e.target.value);

  const handleActionTextBlur = (e: FocusEvent<HTMLInputElement>) =>
    handleChangeSearchTerm(e.target.value.trim());

  return (
    <Input
      className="w-full h-full border-none outline-none bg-transparent dark:bg-transparent focus-visible:ring-0 px-0"
      placeholder="Search by action name"
      value={searchTerm}
      onChange={handleActionTextChange}
      onBlur={handleActionTextBlur}
    />
  );
};

export default KeyboardActionSearchBar;
