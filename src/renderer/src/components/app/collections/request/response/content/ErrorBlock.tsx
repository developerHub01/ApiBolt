import { CircleAlert as AlertIcon, Bomb as ErrorIcon } from "lucide-react";
import BorderedWrapper from "@/components/ui/bordered-wrapper";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";

interface Props {
  message: string;
  description?: string;
}

const ErrorBlock = ({ message, description }: Props) => {
  return (
    <BorderedWrapper className="flex flex-col gap-2 justify-center items-center p-4 text-center h-full">
      <div className="size-10 rounded-md bg-secondary grid place-items-center mb-1.5">
        <ErrorIcon />
      </div>
      <p className="text-sm font-medium">{message}</p>
      <ButtonLikeDiv variant={"destructiveSecondary"} className="h-auto">
        <AlertIcon size={14} />
        <p className="text-xs font-normal">
          {description || "Something went wrong"}
        </p>
      </ButtonLikeDiv>
    </BorderedWrapper>
  );
};

export default ErrorBlock;
