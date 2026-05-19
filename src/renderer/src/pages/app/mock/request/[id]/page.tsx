import { Suspense } from "react";

const MockRequestPage = () => {
  return (
    <Suspense fallback={<></>}>
      <>Mock page</>
    </Suspense>
  );
};

export default MockRequestPage;
