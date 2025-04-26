"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

const ApiInput = memo(() => {
  const {
    apiUrl = "",
    handleChangeApiUrl,
    isApiUrlError,
    handleIsInputError,
  } = useRequestResponse();
  const [url, setUrl] = useState<string>(apiUrl);

  useEffect(() => {
    setUrl(apiUrl);
  }, [apiUrl]);

  const handleApiUrlChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setUrl(value);
  }, []);

  const handleApiUrlFocus = useCallback(() => {
    if (isApiUrlError) handleIsInputError(false);
  }, [isApiUrlError]);

  const handleApiUrlBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    handleChangeApiUrl(value);
  }, []);

  return (
    <Input
      placeholder="Enter URL or paste text"
      className={cn("w-full rounded-none", {
        "border-destructive": isApiUrlError,
        "border-input": !isApiUrlError,
      })}
      value={url}
      onChange={handleApiUrlChange}
      onFocus={handleApiUrlFocus}
      onBlur={handleApiUrlBlur}
    />
  );
});

export default ApiInput;
