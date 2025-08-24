import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DescriptionEditor from "@/components/app/collections/folder/description/DescriptionEditor";
import DescriptionPreview from "@/components/app/collections/folder/description/DescriptionPreview";
import DescriptionWrapper from "@/components/app/collections/folder/description/DescriptionWrapper";

const SplitLayout = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border w-full"
    >
      <ResizablePanelWrapper>
        <DescriptionEditor />
      </ResizablePanelWrapper>
      <ResizableHandle />
      <ResizablePanelWrapper>
        <DescriptionPreview />
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
