"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  memo,
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
import {
  ChevronDown as DownIcon,
  Download as DownloadIcon,
  Save as SaveIcon,
} from "lucide-react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

const RequestTop = memo(() => {
  const {
    requestName = "Request",
    handleChangeRequestName,
    handleDownloadRequest,
  } = useRequestResponse();
  const [requestNameState, setRequestNameState] = useState<string>(requestName);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && nameInputRef.current) nameInputRef.current.focus();
  }, [isFocused]);

  useEffect(() => {
    setRequestNameState(requestName);
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
    <div className="w-full flex justify-between items-center gap-4 pb-2">
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
      <div className="flex items-center">
        <Button variant={"ghost"} className="rounded-r-none">
          <SaveIcon /> Save
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"icon"} variant={"ghost"} className="rounded-l-none">
              <DownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 w-fit flex flex-col [&>button]:justify-start"
            side="bottom"
            align="end"
          >
            <Button variant={"ghost"} size={"lg"}>
              <SaveIcon /> Save As
            </Button>
            <Button
              variant={"ghost"}
              size={"lg"}
              onClick={handleDownloadRequest}
            >
              <DownloadIcon /> Download
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});
RequestTop.displayName = "Request top";

export default RequestTop;
