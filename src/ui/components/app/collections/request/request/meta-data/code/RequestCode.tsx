import { memo } from "react";
import RequestCodeTypeSelector from "@/components/app/collections/request/request/meta-data/code/RequestCodeTypeSelector";
import RequestCodeContent from "@/components/app/collections/request/request/meta-data/code/RequestCodeContent";
import RequestCodeSnippitProvider from "@/context/collections/request/meta-data/code/RequestCodeSnippitProvider";

const RequestCode = memo(() => {
  return (
    <RequestCodeSnippitProvider>
      <p className="text-foreground text-sm select-none">Code Snippit</p>
      <div className="flex-1 w-full h-full flex flex-col gap-2 pt-1 pb-5">
        <RequestCodeTypeSelector />
        <RequestCodeContent />
      </div>
    </RequestCodeSnippitProvider>
  );
});

export default RequestCode;
