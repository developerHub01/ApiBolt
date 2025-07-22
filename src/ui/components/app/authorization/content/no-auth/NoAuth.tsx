import { memo } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AnimationWrapper from "@/components/ui/AnimationWrapper";

const NoAuth = memo(() => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-1.5 px-3 py-5 md:py-8">
      <AnimationWrapper className="w-52" key="no-auth">
        <DotLottieReact
          src={"./lottie/nodata.lottie"}
          loop
          autoplay
          width={200}
        />
      </AnimationWrapper>
      <h3 className="text-lg font-semibold">No Auth</h3>
      <p className="text-sm text-muted-foreground">
        This request does not use any authorization.
      </p>
    </div>
  );
});

export default NoAuth;
