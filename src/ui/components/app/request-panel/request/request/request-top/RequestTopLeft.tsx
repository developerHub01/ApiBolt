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
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

const RequestTopLeft = () => {
  const { selectedTab, requestName, handleChangeRequestName } =
    useRequestResponse();
  const [requestNameState, setRequestNameState] = useState<string>(
    requestName[selectedTab] ?? "Request"
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && nameInputRef.current) nameInputRef.current.focus();
  }, [isFocused]);

  useEffect(() => {
    setRequestNameState(requestName[selectedTab] ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestName]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRequestNameState(e.target.value);
  }, []);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      handleChangeRequestName(e.target.value);
    },
    [handleChangeRequestName]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        setIsFocused(false);
        nameInputRef.current?.blur();
      }
    },
    []
  );

  return (
    <div className="flex items-center gap-1">
      <span className="bg-muted rounded-md px-3 py-1.5 select-none border-2 text-sm">
        HTTP
      </span>
      <Input
        className={cn("w-fit max-w-full", {
          "": isFocused,
          "border-transparent bg-transparent": !isFocused,
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
