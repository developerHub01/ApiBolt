import { type ChangeEvent, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Download as DownloadIcon,
  EllipsisVertical as ThreeDotIcon,
  FileDown as ImportIcon,
  BrushCleaning as ClearIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Warning from "@/components/warning";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleIsDownloadRequestWithBase64 } from "@/context/redux/request-response/request-response-slice";
import { useRequestResponse } from "@/context/collections/request/RequestResponseProvider";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { clearRequest } from "@/context/redux/request-response/thunks/request";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

const RequestTopRight = () => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectSelectedTab);
  const { handleDownloadRequest } = useRequestResponse();
  const requestName = useAppSelector(
    (state) =>
      state.requestResponse.requestList[state.requestResponse.selectedTab!]
        ?.name ?? "Request"
  );
  const isDownloadRequestWithBase64 = useAppSelector(
    (state) =>
      state.requestResponse.isDownloadRequestWithBase64[
        state.requestResponse.selectedTab!
      ]
  );

  const handleExport = useCallback(async () => {
    await handleDownloadRequest(selectedTab!);

    toast("Successfully downloaded!!", {
      description: `${requestName}.json downloaded successfully`,
    });
  }, [handleDownloadRequest, requestName, selectedTab]);

  const handleImport = useCallback(async (file: File | undefined) => {
    if (!file) return toast("Please select a valid JSON file.");
    // dispatch(
    //   importRequestFromFile({
    //     file,
    //     selectedTab: selectedTab!,
    //     cb: (message) => {
    //       toast(message);
    //     },
    //   })
    // );
  }, []);
  const handleCheck = (value: boolean) =>
    dispatch(handleIsDownloadRequestWithBase64(value));

  const handleClear = () => dispatch(clearRequest());

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <ThreeDotIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-0 w-fit min-w-40 flex flex-col [&>button]:justify-start"
          side="bottom"
          align="end"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <ImportButton handleImport={handleImport} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ExportButton
                handleExport={handleExport}
                isChecked={Boolean(isDownloadRequestWithBase64)}
                handleChangeCheck={handleCheck}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant={"ghost"}
                onClick={handleClear}
                className="w-full justify-start rounded-none"
              >
                <ClearIcon /> Clear All
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
RequestTopRight.displayName = "Request top right";

interface ExportButtonProps {
  handleExport: () => void;
  isChecked: boolean;
  handleChangeCheck: (value: boolean) => void;
}

const ExportButton = ({
  handleExport,
  isChecked,
  handleChangeCheck,
}: ExportButtonProps) => {
  return (
    <ButtonLikeDiv
      variant={"ghost"}
      className="w-full flex justify-between px-0 gap-0"
    >
      <Button
        variant={"ghost"}
        onClick={handleExport}
        className="flex-1 justify-start rounded-none"
      >
        <DownloadIcon /> Export
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size={"iconXs"}
            className="rounded-none h-full px-2"
          >
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
                checked={isChecked}
                onCheckedChange={handleChangeCheck}
              />
              <p>Also download Base64</p>
            </Label>
          </div>
          <Warning label="Base64 may slow download" className="items-center" />
        </PopoverContent>
      </Popover>
    </ButtonLikeDiv>
  );
};

interface ImportButtonProps {
  handleImport: (file: File | undefined) => void;
}

const ImportButton = ({ handleImport }: ImportButtonProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleImport(e.target.files?.[0]);
    },
    [handleImport]
  );

  return (
    <label htmlFor="import-request" className="cursor-pointer">
      <ButtonLikeDiv className="w-full justify-start px-0" variant={"ghost"}>
        <input
          type="file"
          id="import-request"
          accept="application/json"
          onChange={handleChange}
          hidden
        />
        <Button
          variant={"ghost"}
          className="pointer-events-none w-full justify-start"
        >
          <ImportIcon /> import
        </Button>
      </ButtonLikeDiv>
    </label>
  );
};

export default RequestTopRight;
