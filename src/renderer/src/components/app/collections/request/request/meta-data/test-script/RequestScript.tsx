import { memo } from "react";
import RequestTestScriptProvider from "@/context/collections/request/meta-data/test-script/RequestTestScriptProvider";
import RequestScriptContent from "@/components/app/collections/request/request/meta-data/test-script/RequestScriptContent";

const RequestScript = memo(() => {
  return (
    <RequestTestScriptProvider>
      <div className="flex justify-between items-center gap-3">
        <p className="text-foreground text-sm select-none">Test Script</p>
      </div>
      <RequestScriptContent />
    </RequestTestScriptProvider>
  );
});

export default RequestScript;
