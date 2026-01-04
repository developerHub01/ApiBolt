import { ButtonHTMLAttributes, ComponentType, memo, SVGProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TabBottomCTAProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  onClick: () => void;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  label?: string;
}

const TabBottomCTA = memo(
  ({
    isOpen,
    onClick,
    Icon,
    label,
    className,
    ...props
  }: TabBottomCTAProps) => {
    return (
      <Button
        variant={"background"}
        size={"sm"}
        className={cn(
          "w-full gap-0 overflow-hidden",
          {
            "justify-start": isOpen,
            "justify-center": !isOpen,
          },
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {Icon && <Icon />}
        <motion.span
          className="transition-all duration-300 text-left"
          style={{ transformOrigin: "left" }}
          animate={{
            opacity: isOpen ? 1 : 0,
            width: isOpen ? "100%" : "0px",
            paddingLeft: isOpen ? "8px" : "0px",
            scaleX: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {label}
        </motion.span>
      </Button>
    );
  },
);

export default TabBottomCTA;
