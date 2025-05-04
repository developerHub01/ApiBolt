"use client";

import React, { ChangeEvent, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon, X as CloseIcon } from "lucide-react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import { Separator } from "@/components/ui/separator";

const BodyBinary = memo(() => {
  const { binaryData, handleChangeBinaryData } = useRequestResponse();

  const handleFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      handleChangeBinaryData(file);
    },
    [handleChangeBinaryData]
  );

  return (
    <div className="w-full h-full flex justify-center items-center p-2.5">
      <div className="flex justify-center items-center max-w-4/5">
        {binaryData ? (
          <>
            <Button
              variant={"secondary"}
              className="rounded-r-none w-full max-w-96 cursor-auto"
            >
              <span className="w-full overflow-hidden truncate">
                {binaryData?.name}
              </span>
            </Button>
            <Separator orientation="vertical" />
            <Button
              size={"icon"}
              variant={"secondary"}
              className="rounded-l-none"
              onClick={() => handleChangeBinaryData()}
            >
              <CloseIcon />
            </Button>
          </>
        ) : (
          <>
            <input type="file" id="binary-data" hidden onChange={handleFile} />
            <label htmlFor="binary-data" className="cursor-pointer">
              <Button variant={"secondary"} className="pointer-events-none">
                <AddIcon size={16} /> Add new file from local machine
              </Button>
            </label>
          </>
        )}
      </div>
    </div>
  );
});

BodyBinary.displayName = "Request body binary data";

export default BodyBinary;
