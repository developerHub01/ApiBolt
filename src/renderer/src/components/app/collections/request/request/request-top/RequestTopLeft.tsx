import React, {
  type ChangeEvent,
  type FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import { selectRequestName } from "@/context/redux/request-response/selectors/request-list";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";

const RequestTopLeft = () => {
  const dispatch = useAppDispatch();
  const requestName = useAppSelector(selectRequestName);
  const selectedTab = useAppSelector(selectSelectedTab)!;
  const [requestNameState, setRequestNameState] = useState<string>(requestName);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && nameInputRef.current) nameInputRef.current.focus();
  }, [isFocused]);

  useEffect(() => {
    setRequestNameState(requestName);
  }, [requestName]);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setRequestNameState(e.target.value),
    [],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      dispatch(
        updateRequestOrFolder({
          name: e.target.value,
          id: selectedTab,
        }),
      );
    },
    [dispatch, selectedTab],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        setIsFocused(false);
        nameInputRef.current?.blur();
      }
    },
    [],
  );

  return (
    <div className="flex items-stretch gap-1">
      <span className="bg-muted rounded-md px-3 py-1.5 select-none text-sm flex justify-center items-center">
        HTTP
      </span>
      <Input
        className={cn("w-fit h-auto max-w-full border-0", {
          "bg-transparent": !isFocused,
        })}
        value={requestNameState}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        onKeyUp={handleKeyDown}
        ref={nameInputRef}
        readOnly={!isFocused}
      />
    </div>
  );
};
RequestTopLeft.displayName = "Request top left";

export default RequestTopLeft;
