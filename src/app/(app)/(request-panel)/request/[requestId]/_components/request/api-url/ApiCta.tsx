"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Loader as LoaderIcon } from "lucide-react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

const ApiCta = memo(() => {
  const { isLoading } = useRequestResponse();

  return (
    <Button disabled={isLoading} className="rounded-l-none uppercase">
      {isLoading && <LoaderIcon size={16} />}
      Send
    </Button>
  );
});

export default ApiCta;
