import { memo } from "react";
import RequestCodeTypeSelector from "@/components/app/collections/request/request/meta-data/code/RequestCodeTypeSelector";
import RequestCodeContent from "@/components/app/collections/request/request/meta-data/code/RequestCodeContent";

const RequestCode = memo(() => {
  return (
    <>
      <p className="text-foreground text-sm select-none">Code Snippit</p>
      <div className="flex-1 w-full h-full flex flex-col gap-2 pt-1 pb-5">
        <RequestCodeTypeSelector />
        <RequestCodeContent />
      </div>
    </>
  );
});

export default RequestCode;
