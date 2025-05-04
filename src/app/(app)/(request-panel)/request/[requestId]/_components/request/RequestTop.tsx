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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  ChevronDown as DownIcon,
  Download as DownloadIcon,
  Save as SaveIcon,
  EllipsisVertical as ThreeDotIcon,
} from "lucide-react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import Warning from "@/components/Warning";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const RequestTop = memo(() => {
  const {
    requestName,
    handleChangeRequestName,
    isDownloadRequestWithBase64,
    handleIsDownloadRequestWithBase64,
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

  const handleDownload = async () => {
    await handleDownloadRequest();

    toast("Successfully downloaded!!", {
      description: `${requestName}.json downloaded successfully`,
    });
  };

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
            <Button variant={"ghost"}>
              <SaveIcon /> Save As
            </Button>
            <div className="flex items-center gap-1">
              <Button variant={"ghost"} onClick={handleDownload}>
                <DownloadIcon /> Download
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size={"iconXs"} className="mr-2">
                    <ThreeDotIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-60 p-2 flex flex-col gap-1"
                  side="bottom"
                  align="end"
                >
                  <div className="w-full flex items-center gap-2">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <Checkbox
                        id="terms"
                        checked={isDownloadRequestWithBase64}
                        onCheckedChange={handleIsDownloadRequestWithBase64}
                      />
                      <p>Also download Base64</p>
                    </Label>
                  </div>
                  <Warning
                    label="Base64 may slow download"
                    className="items-center"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});
RequestTop.displayName = "Request top";

export default RequestTop;
