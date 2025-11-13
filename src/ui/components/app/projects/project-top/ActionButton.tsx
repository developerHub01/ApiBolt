import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  label: string;
  link?: string;
  Icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

const ActionButton = ({
  label,
  link,
  Icon,
  onClick,
  className = "",
}: ActionButtonProps) => {
  const innerContent = () => (
    <Button
      className={cn("w-full justify-start", className)}
      variant={"ghost"}
      onClick={onClick}
    >
      {Icon && <Icon />} {label}
    </Button>
  );

  if (!link) return innerContent();

  return (
    <Link to="/" className="w-full">
      {innerContent()}
    </Link>
  );
};

export default ActionButton;
