import { lazy, Suspense } from "react";
import RequestFallback from "@/fallback/collection/request/request/RequestFallback";
const RequestRoot = lazy(
  () => import("@/components/app/collections/request/RequestRoot"),
);

const MockRequestPage = () => {
  return (
    <Suspense fallback={<RequestFallback />}>
      <RequestRoot />
    </Suspense>
  );
};

export default MockRequestPage;
