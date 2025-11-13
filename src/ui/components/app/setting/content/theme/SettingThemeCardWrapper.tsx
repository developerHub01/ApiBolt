import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "motion/react";

interface Props extends HTMLMotionProps<"div"> {
  isActive: boolean;
  children: React.ReactNode;
}

const SettingThemeCardWrapper = ({
  isActive,
  children,
  className,
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
        "w-full flex flex-col gap-2 rounded-xl bg-transparent hover:bg-secondary/30 transition-all duration-100 cursor-pointer",
        "ring-offset-1",
        {
          "bg-secondary/40 ring-1": isActive,
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
