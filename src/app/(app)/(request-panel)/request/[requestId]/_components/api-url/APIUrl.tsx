"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRequest } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader as LoaderIcon } from "lucide-react";

const methodList = [
  {
    id: "get",
    label: "GET",
  },
  {
    id: "post",
    label: "POST",
  },
  {
    id: "put",
    label: "PUT",
  },
  {
    id: "patch",
    label: "PATCH",
  },
  {
    id: "delete",
    label: "DELETE",
  },
];

const APIUrl = memo(() => {
  const {
    selectedMethod,
    handleChangeSelectedMethod,
    apiUrl = "",
    handleChangeApiUrl,
    handleResponse,
  } = useRequest();
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(apiUrl);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setUrl(apiUrl);
  }, [apiUrl]);

  const handleApiUrlChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (isInputError) setIsInputError(false);

      setUrl(value);
    },
    [isInputError]
  );

  const handleApiUrlFocus = useCallback(() => {
    if (isInputError) setIsInputError(false);
  }, [isInputError]);

  const handleApiUrlBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (!value && isInputError) setIsInputError(false);

      handleChangeApiUrl(value);
    },
    [isInputError]
  );

  const handleFetch = useCallback(async () => {
    setLoading(true);

    const res = await axios({
      method: selectedMethod,
      url,
    });
    console.log(res);

    handleResponse(res);

    setLoading(false);
  }, [url, selectedMethod]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!url) return setIsInputError(true);

      handleFetch();
    },
    [url]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <Select
        defaultValue={selectedMethod ?? methodList[0].id}
        onValueChange={handleChangeSelectedMethod}
      >
        <SelectTrigger
          className={cn("w-[150px] rounded-r-none font-semibold", {
            "text-green-500": selectedMethod === "get",
            "text-yellow-500": selectedMethod === "post",
            "text-blue-500": selectedMethod === "put",
            "text-pink-500": selectedMethod === "patch",
            "text-red-500": selectedMethod === "delete",
          })}
        >
          <SelectValue placeholder="Method" />
        </SelectTrigger>
        <SelectContent>
          {methodList.map(({ id, label }) => (
            <SelectItem
              key={id}
              value={id}
              className={cn("font-semibold", {
                "text-green-500": id === "get",
                "text-yellow-500": id === "post",
                "text-blue-500": id === "put",
                "text-pink-500": id === "patch",
                "text-red-500": id === "delete",
              })}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Enter URL or paste text"
        className={cn("w-full rounded-none", {
          "border-destructive": isInputError,
          "border-input": !isInputError,
        })}
        value={url}
        onChange={handleApiUrlChange}
        onFocus={handleApiUrlFocus}
        onBlur={handleApiUrlBlur}
      />
      <Button disabled={isLoading} className="rounded-l-none uppercase">
        {isLoading && <LoaderIcon size={16} />}
        Send
      </Button>
    </form>
  );
});

export default APIUrl;
