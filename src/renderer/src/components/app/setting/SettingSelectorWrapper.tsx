import React, { ComponentProps } from "react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { cn } from "@renderer/lib/utils";

interface Props extends ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const SettingSelectorWrapper = ({
  children,
  className = "",
  ...props
}: Props) => {
  return (
    <ButtonLikeDiv
      variant={"secondary"}
      size={"sm"}
      className={cn("px-0 py-0", className)}
      {...props}
    >
      {children}
    </ButtonLikeDiv>
  );
};

export default SettingSelectorWrapper;
