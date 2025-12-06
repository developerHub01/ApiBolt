import { lazy, Suspense } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
const DescriptionEditor = lazy(
  () =>
    import("@/components/app/collections/folder/description/DescriptionEditor"),
);
const DescriptionPreview = lazy(
  () =>
    import("@/components/app/collections/folder/description/DescriptionPreview"),
);
import DescriptionWrapper from "@/components/app/collections/folder/description/DescriptionWrapper";
import FolderEditorFallback from "@/fallback/collection/folder/FolderEditorFallback";

const SplitLayout = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border w-full"
    >
      <ResizablePanelWrapper>
        <Suspense fallback={<FolderEditorFallback />}>
          <DescriptionEditor />
        </Suspense>
      </ResizablePanelWrapper>
      <ResizableHandle />
      <ResizablePanelWrapper>
        <Suspense fallback={<FolderEditorFallback />}>
          <DescriptionPreview />
        </Suspense>
      </ResizablePanelWrapper>
    </ResizablePanelGroup>
  );
};

interface ResizablePanelWrapperProps {
  children: React.ReactNode;
}

const ResizablePanelWrapper = ({ children }: ResizablePanelWrapperProps) => {
  return (
    <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
      <DescriptionWrapper>{children}</DescriptionWrapper>
    </ResizablePanel>
  );
};

export default SplitLayout;
