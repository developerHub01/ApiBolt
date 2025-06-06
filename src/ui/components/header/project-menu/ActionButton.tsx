import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  label: string;
  link?: string;
  Icon?: LucideIcon;
  onClick?: () => void;
}

const ActionButton = ({ label, link, Icon, onClick }: ActionButtonProps) => {
  const innerContent = () => (
    <Button
      className="w-full rounded-none border-t justify-start"
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
