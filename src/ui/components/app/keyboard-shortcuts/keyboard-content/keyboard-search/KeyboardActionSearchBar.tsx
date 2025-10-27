import { useEffect, useRef, type ChangeEvent, type FocusEvent } from "react";
import { Input } from "@/components/ui/input-transparent";
import { useKeyboardShortcuts } from "@/context/keyboard-shortcuts/KeyboardShortcutsProvider";

const KeyboardActionSearchBar = () => {
  const { searchTerm, handleChangeSearchTerm } = useKeyboardShortcuts();
  const searchBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.activeElement === searchBarRef.current) return;
    searchBarRef.current?.focus();
  }, [searchTerm]);

  const handleActionTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    handleChangeSearchTerm(e.target.value);

  const handleActionTextBlur = (e: FocusEvent<HTMLInputElement>) =>
    handleChangeSearchTerm(e.target.value.trim());

  return (
    <Input
      className="w-full p-1.5 pl-2.5"
      placeholder="Search by action name"
      value={searchTerm}
      ref={searchBarRef}
      onChange={handleActionTextChange}
      onBlur={handleActionTextBlur}
    />
  );
};

export default KeyboardActionSearchBar;
