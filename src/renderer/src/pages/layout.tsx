import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { isElectron } from "@/utils/electron";
import Redirector from "@/components/app/Redirector";
import LoadBasicData from "@/components/app/LoadBasicData";
import { motion } from "motion/react";
import ProtocolUrlExecutor from "@/components/ux/ProtocolUrlExecutor";

const RootLayout = () => {
  return (
    <motion.section
      initial={{
        opacity: 0.3,
        filter: "blur(20px)",
      }}
      animate={{
        opacity: [0.3, 0.5, 1],
        filter: "blur(0)",
      }}
      transition={{
        delay: 1,
        duration: 2,
      }}
      className={cn("bg-background", {
        "select-none": isElectron(),
      })}
    >
      <Outlet />
      <Redirector />
      <ProtocolUrlExecutor />
      <LoadBasicData />
    </motion.section>
  );
};

export default RootLayout;
