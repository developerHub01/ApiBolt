import { memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface TabBottomCTAProps {
  isHovering: boolean;
  onClick: () => void;
  Icon?: LucideIcon;
  label?: string;
}

const TabBottomCTA = memo(
  ({ isHovering, onClick, Icon, label }: TabBottomCTAProps) => {
    return (
      <Button
        variant={"background"}
        size={"sm"}
        className={cn("w-full gap-0 overflow-hidden", {
          "justify-start": isHovering,
          "justify-center": !isHovering,
        })}
        onClick={onClick}
      >
        {Icon && <Icon />}
        <motion.span
          className="transition-all duration-300 text-left"
          style={{ transformOrigin: "left" }}
          animate={{
            opacity: isHovering ? 1 : 0,
            width: isHovering ? "100%" : "0px",
            paddingLeft: isHovering ? "8px" : "0px",
            scaleX: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {label}
        </motion.span>
      </Button>
    );
  }
);

export default TabBottomCTA;
