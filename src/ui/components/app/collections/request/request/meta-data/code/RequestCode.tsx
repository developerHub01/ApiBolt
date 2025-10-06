import { memo } from "react";
import RequestCodeTypeSelector from "@/components/app/collections/request/request/meta-data/code/RequestCodeTypeSelector";
import RequestCodeContent from "@/components/app/collections/request/request/meta-data/code/RequestCodeContent";
import RequestCodeSnippitProvider from "@/context/collections/request/meta-data/code/RequestCodeSnippitProvider";

const RequestCode = memo(() => {
  return (
    <RequestCodeSnippitProvider>
      <div className="flex justify-between items-center gap-3">
        <p className="text-foreground text-sm select-none">Code Snippit</p>
        <RequestCodeTypeSelector />
      </div>
      <RequestCodeContent />
    </RequestCodeSnippitProvider>
  );
});

export default RequestCode;
