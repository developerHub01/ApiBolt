"use client";

import React, { FormEvent, memo, useCallback } from "react";
import { useRequest } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestProvider";
import ApiMethodSelector from "@/app/(app)/(request-panel)/request/[requestId]/_components/api-url/ApiMethodSelector";
import ApiInput from "@/app/(app)/(request-panel)/request/[requestId]/_components/api-url/ApiInput";
import ApiCta from "@/app/(app)/(request-panel)/request/[requestId]/_components/api-url/ApiCta";

const ApiUrl = memo(() => {
  const { apiUrl = "", handleIsInputError, handleFetchApi } = useRequest();

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
