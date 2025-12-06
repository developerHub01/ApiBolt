import { Button } from "@/components/ui/button";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { cn } from "@/lib/utils";
import { X as CloseIcon } from "lucide-react";

interface FileTagProps {
  name: string;
  onClose?: () => void;
  className?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

const FileTag = ({
  name,
  onClose,
  className = "",
  disabled = false,
  ...props
}: FileTagProps) => {
  return (
    <ButtonLikeDiv
      className={cn(
        "gap-1 py-0 w-60 select-none mx-auto",
        {
          "pr-0": !disabled,
        },
        className,
      )}
      variant={"secondary"}
      size={"xs"}
      {...props}
    >
      <p className="text-muted-foreground w-full truncate">{name}</p>
      {onClose && !disabled && (
        <Button
          size={"iconXs"}
          variant={"ghost"}
          onClick={onClose}
          className="border-l-2 rounded-none"
        >
          <CloseIcon />
        </Button>
      )}
    </ButtonLikeDiv>
  );
};

FileTag.displayName = "File tag";

export default FileTag;
