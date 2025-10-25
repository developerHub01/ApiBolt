import { memo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRequestBody } from "@/context/collections/request/RequestBodyProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestBodyType } from "@/context/redux/request-response/selectors/body-raw";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ToggleCodeLineWrap = memo(() => {
  const { codeLineWrap, handleToggleCodeLineWrap } = useRequestBody();
  const requestBodyType = useAppSelector(selectRequestBodyType);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "z") handleToggleCodeLineWrap();
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handleToggleCodeLineWrap]);

  if (requestBodyType !== "raw") return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={handleToggleCodeLineWrap}
        >
          Line {codeLineWrap ? "Unwrap" : "Wrap"}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Alt+Z</p>
      </TooltipContent>
    </Tooltip>
  );
});
ToggleCodeLineWrap.displayName = "Toggle code line wrap";

export default ToggleCodeLineWrap;
