"use client";

import React, { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader as LoaderIcon } from "lucide-react";
import axios from "axios";
import { useRequest } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestProvider";

const ApiCta = memo(() => {
  const {
    apiUrl = "",
    handleChangeApiUrl,
    isApiUrlError,
    handleIsInputError,
    selectedMethod,
    handleResponse,
  } = useRequest();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleFetch = useCallback(async () => {
    setLoading(true);

    const res = await axios(apiUrl, {
      method: selectedMethod,
    });
    console.log(res);

    handleResponse(res);

    setLoading(false);
  }, [apiUrl, selectedMethod]);

  return (
    <Button disabled={isLoading} className="rounded-l-none uppercase">
      {isLoading && <LoaderIcon size={16} />}
      Send
    </Button>
  );
});

export default ApiCta;
