import { memo } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import DescriptionEditor from "@/components/app/collections/folder/description/DescriptionEditor";
import DescriptionPreview from "@/components/app/collections/folder/description/DescriptionPreview";
import DescriptionWrapper from "@/components/app/collections/folder/description/DescriptionWrapper";
import SplitLayout from "@/components/app/collections/folder/description/SplitLayout";
import DescriptionTabs from "@/components/app/collections/folder/description/DescriptionTabs";
import { selectRequestFolderDescriptionActiveTab } from "@/context/redux/request-response/request-response-selector";

const FolderDescription = memo(() => {
  const activeTab = useAppSelector(selectRequestFolderDescriptionActiveTab);

  return (
    <div className="flex-1 flex flex-col w-full h-full min-h-0 gap-4">
      <DescriptionTabs />
      {activeTab === "markdown" ? (
        <DescriptionWrapper>
          <DescriptionEditor />
        </DescriptionWrapper>
      ) : activeTab === "preview" ? (
        <DescriptionWrapper>
          <DescriptionPreview />
        </DescriptionWrapper>
      ) : (
        <SplitLayout />
      )}
    </div>
  );
});

export default FolderDescription;
