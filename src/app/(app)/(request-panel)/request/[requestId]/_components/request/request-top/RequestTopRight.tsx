"use client";

import React, { ChangeEvent, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronDown as DownIcon,
  Download as DownloadIcon,
  Save as SaveIcon,
  EllipsisVertical as ThreeDotIcon,
  FileDown as ImportIcon,
} from "lucide-react";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";
import Warning from "@/components/Warning";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const RequestTopRight = () => {
  const {
    requestName,
    isDownloadRequestWithBase64,
    handleIsDownloadRequestWithBase64,
    handleDownloadRequest,
    handleImportRequest,
  } = useRequestResponse();

  const handleDownload = useCallback(async () => {
    await handleDownloadRequest();

    toast("Successfully downloaded!!", {
      description: `${requestName}.json downloaded successfully`,
    });
  }, [requestName, handleDownloadRequest]);

  const handleImport = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return toast("Please select a valid JSON file.");
      await handleImportRequest(file, (message) => {
        toast(message);
      });
    },
    [handleImportRequest]
  );

  return (
    <div className="flex items-center">
      <div>
        <label htmlFor="import-request" className="cursor-pointer">
          <input
            type="file"
            id="import-request"
            accept="application/json"
            onChange={handleImport}
            hidden
          />
          <Button variant={"outline"} className="mr-1 pointer-events-none">
            <ImportIcon /> import
          </Button>
        </label>
      </div>
      <Button variant={"outline"} className="rounded-r-none">
        <SaveIcon /> Save
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"icon"} variant={"ghost"} className="rounded-l-none">
            <DownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-fit flex flex-col [&>button]:justify-start"
          side="bottom"
          align="end"
        >
          <Button variant={"ghost"}>
            <SaveIcon /> Save As
          </Button>
          <div className="flex items-center gap-1">
            <Button variant={"ghost"} onClick={handleDownload}>
              <DownloadIcon /> Download
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size={"iconXs"} className="mr-2">
                  <ThreeDotIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-60 p-2 flex flex-col gap-1"
                side="bottom"
                align="end"
              >
                <div className="w-full flex items-center gap-2">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Checkbox
                      id="terms"
                      checked={isDownloadRequestWithBase64}
                      onCheckedChange={handleIsDownloadRequestWithBase64}
                    />
                    <p>Also download Base64</p>
                  </Label>
                </div>
                <Warning
                  label="Base64 may slow download"
                  className="items-center"
                />
              </PopoverContent>
            </Popover>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
RequestTopRight.displayName = "Request top right";

export default RequestTopRight;
