import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { useRequestListItem } from "@/context/collections/request-list/RequestListItemProvider";

const RequestListItemName = memo(() => {
  const { id, name, isRenameActive, handleChangeName } = useRequestListItem();
  const [nameState, setNameState] = useState<string>(name ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (name === nameState) return;
    setNameState(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (isRenameActive) inputRef.current?.focus();
  }, [isRenameActive]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setNameState(e.target.value),
    [],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!value) return setNameState(name);
      handleChangeName(id, e.target.value);
      window.getSelection()?.removeAllRanges();
    },
    [handleChangeName, id, name],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        window.getSelection()?.removeAllRanges();
        handleChangeName(id, nameState.trim() || name);
      }
    },
    [handleChangeName, id, name, nameState],
  );

  return (
    <>
      {isRenameActive ? (
        <input
          value={nameState}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          draggable={false}
          onClick={e => e.stopPropagation()}
          onDragStart={e => e.stopPropagation()}
          id={`request_list_item_input_${id}`}
          ref={inputRef}
          className="w-full h-full outline-0 focus:bg-background/20 py-1 text-sm border-b border-foreground/80 cursor-text"
        />
      ) : (
        <input
          id={`request_list_item_${id}`}
          value={name}
          readOnly
          className="w-full h-full outline-0 text-sm py-1 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer select-none border-b border-transparent pointer-events-none"
        />
      )}
    </>
  );
});

export default RequestListItemName;
