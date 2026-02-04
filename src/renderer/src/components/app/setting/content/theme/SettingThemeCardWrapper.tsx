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
    <div
      className={cn(
        "w-full rounded-xl bg-transparent cursor-pointer group",
        "hover:bg-secondary/40 transition-all duration-100",
        {
          "bg-secondary/80 shadow-2xl": isActive,
          "ring-ring ring-offset-2 ring-0": isActive && !isInheritedFrom,
        },
        className,
      )}
    >
      <motion.div
        className={cn(
          "w-full flex flex-col gap-2 group-hover:scale-90 transition-all duration-150",
          {
            "scale-95 p-4": isActive,
          },
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SettingThemeCardWrapper;
