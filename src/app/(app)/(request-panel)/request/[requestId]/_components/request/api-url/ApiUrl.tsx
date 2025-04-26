"use client";

import React, { FormEvent, memo, useCallback } from "react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import ApiMethodSelector from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/api-url/ApiMethodSelector";
import ApiInput from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/api-url/ApiInput";
import ApiCta from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/api-url/ApiCta";

const ApiUrl = memo(() => {
  const { apiUrl = "", handleIsInputError, handleFetchApi } = useRequestResponse();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!apiUrl) return handleIsInputError(true);

      handleFetchApi();
    },
    [apiUrl]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <ApiMethodSelector />
      <ApiInput />
      <ApiCta />
    </form>
  );
});

export default ApiUrl;
