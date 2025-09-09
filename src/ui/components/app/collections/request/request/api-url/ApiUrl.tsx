import { type FormEvent, memo, useEffect, useState } from "react";
import ApiMethodSelector from "@/components/app/collections/request/request/api-url/ApiMethodSelector";
import ApiInput from "@/components/app/collections/request/request/api-url/ApiInput";
import ApiCta from "@/components/app/collections/request/request/api-url/ApiCta";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleRequestSend } from "@/context/redux/request-response/request-response-slice";
import { selectRequestUrl } from "@/context/redux/request-url/request-url-selector";
import {
  changeRequestApiUrl,
  changeRequestApiUrlWithBackend,
} from "@/context/redux/request-url/request-url-thunk";
import { isValidApiUrl } from "@/utils/request-url.utils";
import { cn } from "@/lib/utils";

const ApiUrl = memo(() => {
  const dispatch = useAppDispatch();
  const apiUrl = useAppSelector(selectRequestUrl);
  const [url, setUrl] = useState<string>(apiUrl);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setUrl(apiUrl);
    setIsError(!isValidApiUrl(apiUrl));
  }, [apiUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Enter") dispatch(handleRequestSend());
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (url === apiUrl) return;
    const timeout = setTimeout(() => {
      setIsError(!isValidApiUrl(url));
      dispatch(
        changeRequestApiUrl({
          url,
        })
      );
    }, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleApiUrlChange = (value: string) => setUrl(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(handleRequestSend());
  };

  const handleChange = () => {
    dispatch(
      changeRequestApiUrlWithBackend({
        url,
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full flex items-center p-2 rounded-md bg-accent/50 hover:bg-accent/60 focus-within:bg-accent/70 gap-1.5 border",
        {
          "border-destructive/80": isError,
          "border-input/80": !isError,
        }
      )}
    >
      <ApiMethodSelector />
      <ApiInput
        value={url}
        isError={isError}
        onChange={handleApiUrlChange}
        onBlur={handleChange}
      />
      <ApiCta />
    </form>
  );
});

ApiUrl.displayName = "API url form";

export default ApiUrl;
