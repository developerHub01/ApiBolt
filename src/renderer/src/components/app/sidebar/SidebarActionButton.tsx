import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props extends ComponentProps<"button"> {
  isActive?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "background"
    | "accent"
    | "warningSecondary"
    | "destructiveSecondary"
    | "ghost"
    | "transparent"
    | null;
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "iconSm" | "iconXs" | null;
  onClick?: () => void;
  Icon: LucideIcon;
}

const SidebarActionButton = ({
  isActive,
  onClick,
  className,
  variant,
  size,
  Icon,
  ...props
}: Props) => {
  return (
    <Button
      size={size ?? "icon"}
      variant={variant ?? "transparent"}
      className={cn(
        "mt-auto h-auto size-13 px-0 py-0 rounded-none border-x-2 border-transparent text-foreground/70 transition-all duration-100",
        "hover:bg-secondary/25 hover:text-foreground",
        "has-[>svg]:px-0 [&_svg:not([class*='size-'])]:size-auto",
        {
          "border-primary bg-secondary/80 text-foreground": isActive,
        },
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <Icon size={21} strokeWidth={1.6} />
    </Button>
  );
};

export default SidebarActionButton;
