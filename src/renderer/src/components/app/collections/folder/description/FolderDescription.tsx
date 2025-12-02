import { memo, lazy, Suspense } from "react";
import { useAppSelector } from "@/context/redux/hooks";
const DescriptionEditor = lazy(
  () =>
    import("@/components/app/collections/folder/description/DescriptionEditor")
);
const DescriptionPreview = lazy(
  () =>
    import("@/components/app/collections/folder/description/DescriptionPreview")
);
import DescriptionWrapper from "@/components/app/collections/folder/description/DescriptionWrapper";
import SplitLayout from "@/components/app/collections/folder/description/SplitLayout";
import DescriptionTabs from "@/components/app/collections/folder/description/DescriptionTabs";
const FolderAuthorization = lazy(
  () =>
    import("@/components/app/collections/folder/description/FolderAuthorization")
);
import { selectRequestFolderDescriptionActiveTab } from "@/context/redux/request-response/selectors/folder";
import FolderAuthorizationFallback from "@/fallback/collection/folder/FolderAuthorizationFallback";
import FolderEditorFallback from "@/fallback/collection/folder/FolderEditorFallback";

const FolderDescription = memo(() => {
  const activeTab = useAppSelector(selectRequestFolderDescriptionActiveTab);

  return (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 gap-4">
      <DescriptionTabs />
      {activeTab === "markdown" ? (
        <DescriptionWrapper>
          <Suspense fallback={<FolderEditorFallback />}>
            <DescriptionEditor />
          </Suspense>
        </DescriptionWrapper>
      ) : activeTab === "preview" ? (
        <DescriptionWrapper>
          <Suspense fallback={<FolderEditorFallback />}>
            <DescriptionPreview />
          </Suspense>
        </DescriptionWrapper>
      ) : activeTab === "authorization" ? (
        <DescriptionWrapper>
          <Suspense fallback={<FolderAuthorizationFallback />}>
            <FolderAuthorization />
          </Suspense>
        </DescriptionWrapper>
      ) : (
        <SplitLayout />
      )}
    </div>
  );
});

export default FolderDescription;
