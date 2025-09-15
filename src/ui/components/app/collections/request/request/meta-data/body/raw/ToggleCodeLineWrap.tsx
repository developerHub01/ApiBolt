import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useRequestBody } from "@/context/collections/request/RequestBodyProvider";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestBodyType } from "@/context/redux/request-response/selectors/body-raw";

const ToggleCodeLineWrap = memo(() => {
  const { codeLineWrap, handleToggleCodeLineWrap } = useRequestBody();

  const requestBodyType = useAppSelector(selectRequestBodyType);
  if (requestBodyType !== "raw") return null;

  return (
    <Button size={"sm"} variant={"ghost"} onClick={handleToggleCodeLineWrap}>
      Line {codeLineWrap ? "Unwrap" : "Wrap"}
    </Button>
  );
});
ToggleCodeLineWrap.displayName = "Toggle code line wrap";

export default ToggleCodeLineWrap;
