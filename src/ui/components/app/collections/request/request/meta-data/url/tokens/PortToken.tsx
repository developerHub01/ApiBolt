import { memo } from "react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

const PortToken = memo(() => {
  return (
    <ButtonLikeDiv variant={"secondary"}>
      <input
        placeholder="Port eg. 3000"
        className="w-full border-0 border-b font-normal"
      />
    </ButtonLikeDiv>
  );
});

export default PortToken;
