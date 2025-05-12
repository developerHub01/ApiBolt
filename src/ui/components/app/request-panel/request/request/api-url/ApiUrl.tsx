import { type FormEvent, memo, useEffect, useState } from "react";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import ApiMethodSelector from "@/components/app/request-panel/request/request/api-url/ApiMethodSelector";
import ApiInput from "@/components/app/request-panel/request/request/api-url/ApiInput";
import ApiCta from "@/components/app/request-panel/request/request/api-url/ApiCta";

const ApiUrl = memo(() => {
  const {
    apiUrl = "",
    handleIsInputError,
    handleRequestSend,
    handleChangeApiUrl,
    isApiUrlError,
  } = useRequestResponse();
  const [url, setUrl] = useState<string>(apiUrl);

  useEffect(() => {
    setUrl(apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Enter") handleRequestSend();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApiUrlChange = (value: string) => setUrl(value);

  const handleApiUrlFocus = () => {
    if (isApiUrlError) handleIsInputError(false);
  };

  const handleApiUrlBlur = (value: string) => handleChangeApiUrl(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url) return handleIsInputError(true);

    handleRequestSend();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <ApiMethodSelector />
      <ApiInput
        value={url}
        onChange={handleApiUrlChange}
        onBlur={handleApiUrlBlur}
        onFocus={handleApiUrlFocus}
      />
      <ApiCta />
    </form>
  );
});

ApiUrl.displayName = "API url form";

export default ApiUrl;
