import {
  memo,
  useCallback,
  useEffect,
  useState,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectRequestFolderTitle } from "@/context/redux/request-response/request-response-selector";
import { updateFolder } from "@/context/redux/request-response/thunks/folder";
import { cn } from "@/lib/utils";

const MAX_TITLE_LENGTH = 50;

const FolderTitle = memo(() => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(selectRequestFolderTitle) ?? "New Folder";
  const [titleState, setTitleState] = useState<string>(title);
  const [titleLength, setTitleLength] = useState<number>(title.length ?? 0);

  useEffect(() => {
    if (title === titleState) return;
    setTitleState(title);
    setTitleLength(title.length ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const handleKeydown = useCallback((e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.code === "Enter") return e.preventDefault();

    // prevent input beyond MAX_TITLE_LENGTH
    const el = e.currentTarget;
    if (
      el.innerText.length >= MAX_TITLE_LENGTH &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)
    )
      e.preventDefault();
  }, []);

  const handlePaste = useCallback((e: ClipboardEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  const handleCopy = useCallback((e: ClipboardEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : "";
    e.clipboardData.setData("text/plain", selectedText);
  }, []);

  const handleInput = useCallback((e: React.FormEvent<HTMLHeadingElement>) => {
    const length = e.currentTarget?.innerText.trim().length ?? 0;
    setTitleLength(length);
    /* this is actually for removing some extra thing that browser by default add like </br> */
    if (!length) e.currentTarget.innerHTML = "";
  }, []);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLHeadingElement>) => {
      const newTitle = e.target.innerText.trim().slice(0, MAX_TITLE_LENGTH);
      setTitleLength(newTitle.length ?? 0);
      setTitleState(newTitle);

      dispatch(
        updateFolder({
          title: newTitle,
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="w-full flex flex-col gap-1">
      <h2
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeydown}
        onInput={handleInput}
        onBlur={handleBlur}
        onPaste={handlePaste}
        onCopy={handleCopy}
        className={cn(
          "relative w-full text-xl md:text-3xl font-semibold  bg-accent/50 focus:bg-accent/50 py-1 px-2 rounded-t-sm border-b outline-none",
          "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:absolute empty:before:pointer-events-none"
        )}
        data-placeholder="Enter title..."
      >
        {titleState}
      </h2>
      <p className="text-xs text-muted-foreground px-2">
        {titleLength}/{MAX_TITLE_LENGTH}
      </p>
    </div>
  );
});

export default FolderTitle;
