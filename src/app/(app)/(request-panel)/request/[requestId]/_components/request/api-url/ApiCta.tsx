"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Loader as LoaderIcon } from "lucide-react";
import { useRequest } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestProvider";

const ApiCta = memo(() => {
  const { isLoading } = useRequest();

  return (
    <Button disabled={isLoading} className="rounded-l-none uppercase">
      {isLoading && <LoaderIcon size={16} />}
      Send
    </Button>
  );
});

export default ApiCta;
