"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon } from "lucide-react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

const AddNewParam = memo(() => {
  const { handleAddNewParam } = useRequestResponse();

  return (
    <Button
      variant={"secondary"}
      size={"sm"}
      className="w-full max-w-60 mx-auto"
      onClick={handleAddNewParam}
    >
      <AddIcon />
      Add New Param
    </Button>
  );
});

export default AddNewParam;
