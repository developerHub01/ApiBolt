import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { useRequestList } from "@/context/collections/request-list/RequestListProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
}

const RequestListItemName = memo(({ id, ...props }: Props) => {
  const { isRenameActive, handleChangeName, handleRenameAction } =
    useRequestList();
  const name = useAppSelector(
    (state) => state.requestResponse.requestList[id].name ?? props.name
  );
  const [nameState, setNameState] = useState<string>(name ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (name === nameState) return;
    setNameState(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (isRenameActive) {
      inputRef.current?.focus();
    }
  }, [isRenameActive]);

  const handleNameDoubleClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      handleRenameAction();
    },
    [handleRenameAction]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setNameState(e.target.value),
    []
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!value) return setNameState(name);
      handleChangeName(id, e.target.value);
      window.getSelection()?.removeAllRanges();
    },
    [handleChangeName, id, name]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        window.getSelection()?.removeAllRanges();
        handleChangeName(id, nameState.trim() || name);
      }
    },
    [handleChangeName, id, name, nameState]
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
          onClick={(e) => e.stopPropagation()}
          onDragStart={(e) => e.stopPropagation()}
          id={`request_list_item_input_${id}`}
          ref={inputRef}
          className={cn(
            "w-full h-full outline-0 focus:bg-background/20 px-1 rounded-md text-sm ring-1 ring-primary/80",
            {
              "bg-background cursor-text": isRenameActive,
              "bg-transparent cursor-pointer": !isRenameActive,
            }
          )}
        />
      ) : (
        <input
          id={`request_list_item_${id}`}
          value={name}
          readOnly
          onDoubleClick={handleNameDoubleClick}
          className="w-full h-full outline-0 px-1 rounded-md text-sm p-1 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer select-none"
        />
      )}
    </>
  );
});

export default RequestListItemName;
