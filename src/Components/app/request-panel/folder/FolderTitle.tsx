import { useFolder } from "@/context/folder/FolderProvider";
import {
  useCallback,
  useEffect,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";

const FolderTitle = () => {
  const { title, handleChangeTitle } = useFolder();
  const [titleState, setTitleState] = useState<string>(title || "New Folder");

  useEffect(() => {
    setTitleState(title);
  }, [title]);

  const handleKeydown = useCallback((e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.code === "Enter") return e.preventDefault();
  }, []);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLHeadingElement>) => {
      setTitleState(e.target.innerText.trim());
      handleChangeTitle(e.target.innerText);
    },
    [handleChangeTitle]
  );

  return (
    <div className="w-full">
      <h2
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeydown}
        onBlur={handleBlur}
        className="text-3xl font-semibold hover:bg-accent focus:bg-accent py-1 px-2 rounded-sm"
      >
        {titleState}
      </h2>
    </div>
  );
};

export default FolderTitle;
