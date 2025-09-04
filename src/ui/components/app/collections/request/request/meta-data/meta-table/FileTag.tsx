import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X as CloseIcon } from "lucide-react";

interface FileTagProps {
  name: string;
  onClose?: () => void;
  className?: string;
  [key: string]: unknown;
}

const FileTag = ({ name, onClose, className = "", ...props }: FileTagProps) => {
  return (
    <div
      className={cn(
        "bg-secondary/80 hover:bg-secondary rounded-sm flex items-center gap-1 py-0.5 px-1 w-60 select-none text-sm mx-auto",
        className
      )}
      {...props}
    >
      <p className="text-muted-foreground w-full truncate">{name}</p>
      {onClose && (
        <Button
          size={"iconXs"}
          variant={"ghost"}
          onClick={onClose}
          className="border-l-2 rounded-none"
        >
          <CloseIcon />
        </Button>
      )}
    </div>
  );
};

FileTag.displayName = "File tag";

export default FileTag;
