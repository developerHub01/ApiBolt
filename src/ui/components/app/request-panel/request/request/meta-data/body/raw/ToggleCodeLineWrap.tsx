import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useRequestBody } from "@/context/request/RequestBodyProvider";

const ToggleCodeLineWrap = memo(() => {
  const { requestBodyType, codeLineWrap, handleToggleCodeLineWrap } =
    useRequestBody();

  if (requestBodyType !== "raw") return null;

  return (
    <Button size={"sm"} variant={"ghost"} onClick={handleToggleCodeLineWrap}>
      Line {codeLineWrap ? "Unwrap" : "Wrap"}
    </Button>
  );
});
ToggleCodeLineWrap.displayName = "Toggle code line wrap";

export default ToggleCodeLineWrap;
