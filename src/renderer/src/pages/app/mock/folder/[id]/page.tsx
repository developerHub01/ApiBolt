import { Suspense } from "react";

const MockFolderPage = () => {
  return (
    <Suspense fallback={<></>}>
      <>Mock page</>
    </Suspense>
  );
};

export default MockFolderPage;
