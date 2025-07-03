import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const EnvironmentTopLeft = () => {
  const [requestNameState, setRequestNameState] =
    useState<string>("Environment");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && nameInputRef.current) nameInputRef.current.focus();
  }, [isFocused]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRequestNameState(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

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
EnvironmentTopLeft.displayName = "Request top left";

export default EnvironmentTopLeft;
