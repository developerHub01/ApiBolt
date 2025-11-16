import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface Props extends HTMLMotionProps<"div"> {
  isActive: boolean;
  isInheritedFrom?: boolean;
  children: React.ReactNode;
}

const SettingThemeCardWrapper = ({
  isActive,
  children,
  className,
  isInheritedFrom = false,
  ...props
}: Props) => {
  return (
    <motion.div
      whileHover={{
        padding: 15,
      }}
      animate={{
        padding: isActive ? 15 : 0,
        scale: isActive ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={cn(
        "w-full flex flex-col gap-2 rounded-xl bg-transparent cursor-pointer",
        "hover:bg-secondary/40 transition-all duration-100",
        {
          "bg-secondary/80 shadow-2xl": isActive,
          "ring-ring ring-offset-2 ring-0": isActive && !isInheritedFrom,
        },
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SettingThemeCardWrapper;
