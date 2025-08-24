import {
  memo,
  useCallback,
  useEffect,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectRequestFolderTitle } from "@/context/redux/request-response/request-response-selector";
import { updateFolder } from "@/context/redux/request-response/thunks/folder";

const MAX_TITLE_LENGTH = 50;

const FolderTitle = memo(() => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(selectRequestFolderTitle) ?? "New Folder";
  const [titleState, setTitleState] = useState<string>(title);

  useEffect(() => {
    if (title === titleState) return;
    setTitleState(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const handleKeydown = useCallback((e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.code === "Enter") return e.preventDefault();

    // prevent input beyond MAX_TITLE_LENGTH
    const el = e.currentTarget;
    if (
      el.innerText.length >= MAX_TITLE_LENGTH &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      e.preventDefault();
    }
  }, []);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLHeadingElement>) => {
      const newTitle = e.target.innerText.trim().slice(0, MAX_TITLE_LENGTH);
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
        onBlur={handleBlur}
        className="w-full text-xl md:text-3xl font-semibold hover:bg-accent/50 focus:bg-accent/50 py-1 px-2 rounded-t-sm border-b outline-none"
      >
        {titleState}
      </h2>
      <p className="text-xs text-muted-foreground px-2">
        {titleState.length}/{MAX_TITLE_LENGTH}
      </p>
    </div>
  );
});

export default FolderTitle;
