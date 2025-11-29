import { lazy, Suspense } from "react";
import RequestFallback from "@/fallback/collection/request/RequestFallback";
const RequestRoot = lazy(
  () => import("@/components/app/collections/request/RequestRoot")
);

const RequestPage = () => {
  return (
    <Suspense fallback={<RequestFallback />}>
      <RequestRoot />
    </Suspense>
  );
};

export default RequestPage;
