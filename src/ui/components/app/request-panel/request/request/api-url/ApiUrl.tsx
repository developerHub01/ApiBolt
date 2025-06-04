import { type FormEvent, memo, useEffect, useState } from "react";
import ApiMethodSelector from "@/components/app/request-panel/request/request/api-url/ApiMethodSelector";
import ApiInput from "@/components/app/request-panel/request/request/api-url/ApiInput";
import ApiCta from "@/components/app/request-panel/request/request/api-url/ApiCta";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  handleChangeApiUrl,
  handleIsInputError,
  handleRequestSend,
} from "@/context/redux/request-response/request-response-slice";

const ApiUrl = memo(() => {
  const dispatch = useAppDispatch();
  const apiUrl = useAppSelector(
    (state) => state.requestResponse.apiUrl[state.tabSidebar.selectedTab!] ?? ""
  );
  const isApiUrlError = useAppSelector(
    (state) =>
      state.requestResponse.isApiUrlError[state.tabSidebar.selectedTab!]
  );
  const [url, setUrl] = useState<string>(apiUrl);

  useEffect(() => {
    setUrl(apiUrl);
  }, [apiUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Enter") dispatch(handleRequestSend());
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApiUrlChange = (value: string) => setUrl(value);
  const handleApiUrlFocus = () => {
    if (isApiUrlError) dispatch(handleIsInputError(false));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url) return dispatch(handleIsInputError(true));

    dispatch(handleRequestSend());
  };
  const handleChange = () =>
    dispatch(
      handleChangeApiUrl({
        url,
      })
    );

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <ApiMethodSelector />
      <ApiInput
        value={url}
        onChange={handleApiUrlChange}
        onBlur={handleChange}
        onFocus={handleApiUrlFocus}
      />
      <ApiCta />
    </form>
  );
});

ApiUrl.displayName = "API url form";

export default ApiUrl;
