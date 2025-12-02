import { memo } from "react";
import Empty from "@/components/ui/empty";
import animationData from "@/assets/lottie/nodata.json";

const NoAuth = memo(() => {
  return (
    <Empty
      label="No Auth"
      description="This request does not use any authorization."
      animationData={animationData}
      showFallback
      innerClassName="w-64"
      className="h-full"
      key="no-auth"
    />
  );
});

export default NoAuth;
