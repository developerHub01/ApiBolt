"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown as DownIcon, Save as SaveIcon } from "lucide-react";

const RequestTop = () => {
  const [requestName, setRequestName] = useState<string>("Request name");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && nameInputRef.current) nameInputRef.current.focus();
  }, [isFocused]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [nameInputRef]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    setRequestName(e.target.value);
  }, []);
  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
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
    <div className="w-full flex justify-between items-center gap-4">
      <div className="flex items-center gap-1">
        <span className="bg-muted rounded-md px-3 py-1.5 select-none">
          HTTP
        </span>
        <Input
          className={cn("w-fit max-w-full", {
            "": isFocused,
            "border-transparent bg-transparent": !isFocused,
          })}
          value={requestName}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleBlur}
          onKeyUp={handleKeyDown}
          ref={nameInputRef}
          readOnly={!isFocused}
        />
      </div>
      <div>
        <Button variant={"ghost"} className="rounded-r-none">
          <SaveIcon /> Save
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"icon"} variant={"ghost"} className="rounded-l-none">
              <DownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-fit" side="bottom" align="end">
            <Button variant={"ghost"} size={"lg"}>
              <SaveIcon /> Save As
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default RequestTop;
