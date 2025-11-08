import { memo } from "react";
import Empty from "@/components/ui/empty";

const NoAuth = memo(() => {
  return (
    <Empty
      label="No Auth"
      description="This request does not use any authorization."
      animationSrc="./lottie/nodata.lottie"
      showFallback
      innerClassName="w-64"
      className="h-full"
      key="no-auth"
    />
  );
});

export default NoAuth;
