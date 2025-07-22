import { memo } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "motion/react";

const NoAuth = memo(() => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-1.5 px-3 py-5 md:py-8">
      <motion.div
        className="w-52"
        key="no-auth"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "backOut",
        }}
      >
        <DotLottieReact
          src={"./lottie/nodata.lottie"}
          loop
          autoplay
          width={200}
        />
      </motion.div>
      <h3 className="text-lg font-semibold">No Auth</h3>
      <p className="text-sm text-muted-foreground">
        This request does not use any authorization.
      </p>
    </div>
  );
});

export default NoAuth;
