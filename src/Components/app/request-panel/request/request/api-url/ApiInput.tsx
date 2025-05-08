import {
  memo,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

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
  }, [isApiUrlError, handleIsInputError]);

  const handleApiUrlBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;

      handleChangeApiUrl(value);
    },
    [handleChangeApiUrl]
  );

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

ApiInput.displayName = "API input box";

export default ApiInput;
