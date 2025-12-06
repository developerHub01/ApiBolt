import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TWindowControl } from "@/types";

interface ActionButtonProps {
  id?: TWindowControl;
  children: React.ReactNode;
  className?: string;
  onClick?: (action: TWindowControl) => void;
}

const ActionButton = ({
  children,
  id,
  onClick,
  className,
}: ActionButtonProps) => {
  return (
    <Button
      variant="secondary"
      className={cn(
        "rounded-none h-full aspect-square bg-transparent",
        "hover:bg-foreground/10",
        className,
      )}
      onClick={() => onClick && id && onClick(id)}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
