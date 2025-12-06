import { lazy, Suspense } from "react";
const FolderRoot = lazy(
  () => import("@/components/app/collections/folder/FolderRoot"),
);
import FolderSkeleton from "@/components/app/collections/folder/skeleton/FolderSkeleton";

const FolderPage = () => {
  return (
    <Suspense fallback={<FolderSkeleton />}>
      <FolderRoot />
    </Suspense>
  );
};

export default FolderPage;
