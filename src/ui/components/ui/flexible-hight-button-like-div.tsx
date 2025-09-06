import { cn } from "@/lib/utils";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

interface FlexibleHightButtonLikeDivProps {
  className?: string;
  children: React.ReactNode;
}

const FlexibleHightButtonLikeDiv = ({
  className = "",
  children,
}: FlexibleHightButtonLikeDivProps & React.ComponentProps<"button">) => {
  return (
    <ButtonLikeDiv
      variant={"secondary"}
      className={cn("min-h-9 h-auto", className)}
    >
      {children}
    </ButtonLikeDiv>
  );
};

export default FlexibleHightButtonLikeDiv;
