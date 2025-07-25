import {
  memo,
  useCallback,
  useEffect,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { changeFolderContent } from "@/context/redux/request-response/request-response-thunk";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";

const FolderTitle = memo(() => {
  const dispatch = useAppDispatch();
  const title =
    useAppSelector(
      (state) =>
        state.requestResponse.folderTitle[state.requestResponse.selectedTab!]
    ) ?? "New Folder";
  const [titleState, setTitleState] = useState<string>(title);

  useEffect(() => {
    setTitleState(title);
  }, [title]);

  const handleKeydown = useCallback((e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.code === "Enter") return e.preventDefault();
  }, []);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLHeadingElement>) => {
      setTitleState(e.target.innerText.trim());

      dispatch(
        changeFolderContent({
          type: "title",
          value: e.target.innerText,
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="w-full">
      <h2
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeydown}
        onBlur={handleBlur}
        className="text-3xl font-semibold hover:bg-accent/50 focus:bg-accent/50 py-1 px-2 rounded-sm"
      >
        {titleState}
      </h2>
    </div>
  );
});

export default FolderTitle;
