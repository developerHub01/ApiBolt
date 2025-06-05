import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useRequestBody } from "@/context/request/RequestBodyProvider";
import { useAppSelector } from "@/context/redux/hooks";

const ToggleCodeLineWrap = memo(() => {
  const { codeLineWrap, handleToggleCodeLineWrap } = useRequestBody();

  const requestBodyType = useAppSelector(
    (state) =>
      state.requestResponse.requestBodyType[state.requestResponse.selectedTab!]
  );

  if (requestBodyType !== "raw") return null;

  return (
    <Button size={"sm"} variant={"ghost"} onClick={handleToggleCodeLineWrap}>
      Line {codeLineWrap ? "Unwrap" : "Wrap"}
    </Button>
  );
});
ToggleCodeLineWrap.displayName = "Toggle code line wrap";

export default ToggleCodeLineWrap;
