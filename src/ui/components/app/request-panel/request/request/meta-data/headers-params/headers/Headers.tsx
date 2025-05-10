import { memo } from "react";
import RequestHeaderProvider from "@/context/request/RequestHeaderProvider";
import HeadersContent from "@/components/app/request-panel/request/request/meta-data/headers-params/headers/HeadersContent";

const Headers = memo(() => {
  return (
    <RequestHeaderProvider>
      <HeadersContent />
    </RequestHeaderProvider>
  );
});
Headers.displayName = "Headers";

export default Headers;
