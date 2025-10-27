import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { Copy as CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { useAppSelector } from "@/context/redux/hooks";
import { selectResponse } from "@/context/redux/request-response/selectors/response";

const BodyTopCopy = () => {
  const response = useAppSelector(selectResponse);

  const handleCopy = useCallback(async () => {
    const data = response?.data ?? "";
    const cleanData =
      typeof data === "object"
        ? JSON.stringify(response?.data)
        : String(data).trim();

    await navigator.clipboard.writeText(cleanData);

    toast("Copied to clipboard!!");
  }, [response?.data]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size={"iconSm"} variant={"ghost"} onClick={handleCopy}>
          <CopyIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" variant={"secondary"}>
        <p>Copy</p>
      </TooltipContent>
    </Tooltip>
  );
};
BodyTopCopy.dispalyName = "Body top copy";

export default BodyTopCopy;
