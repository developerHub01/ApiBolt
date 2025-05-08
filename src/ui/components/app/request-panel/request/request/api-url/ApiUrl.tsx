import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import { type FormEvent, memo, useCallback } from "react";
import ApiMethodSelector from "@/components/app/request-panel/request/request/api-url/ApiMethodSelector";
import ApiInput from "@/components/app/request-panel/request/request/api-url/ApiInput";
import ApiCta from "@/components/app/request-panel/request/request/api-url/ApiCta";

const ApiUrl = memo(() => {
  const {
    apiUrl = "",
    handleIsInputError,
    handleRequestSend,
  } = useRequestResponse();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!apiUrl) return handleIsInputError(true);

      handleRequestSend();
    },
    [apiUrl, handleIsInputError, handleRequestSend]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <ApiMethodSelector />
      <ApiInput />
      <ApiCta />
    </form>
  );
});

ApiUrl.displayName = "API url form";

export default ApiUrl;
