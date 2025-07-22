import { memo } from "react";
import Empty from "@/components/ui/empty";

const NoAuth = memo(() => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-1.5 px-3 py-5 md:py-8">
      <Empty
        label="No Auth"
        description="This request does not use any authorization."
        animationSrc="./lottie/nodata.lottie"
        showFallback
        innerClassName="w-56"
        key="no-auth"
      />
      <h3 className="text-lg font-semibold"></h3>
      <p className="text-sm text-muted-foreground"></p>
    </div>
  );
});

export default NoAuth;
