import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { cn } from "@/lib/utils";

const AuthContentInoutLabel = ({
  children,
  className = "",
  ...props
}: React.ComponentProps<"label">) => {
  return (
    <ButtonLikeDiv variant={"transparent"} className="px-0 justify-start">
      <label className={cn("text-sm select-none", className)} {...props}>
        {children}
      </label>
    </ButtonLikeDiv>
  );
};

export default AuthContentInoutLabel;
