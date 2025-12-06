import { ResizablePanel } from "@/components/ui/resizable";
import MetaDataContent from "@/components/app/collections/request/request/meta-data/MetaDataContent";

const RequestPanel = () => {
  return (
    <ResizablePanel id="request-panel" defaultSize={100} className="p-3 pt-1">
      <MetaDataContent />
    </ResizablePanel>
  );
};

export default RequestPanel;
