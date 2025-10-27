import { TooltipProvider } from "@/components/ui/tooltip-custom";
import { useResponse } from "@/context/collections/request/ResponseProvider";
import BodyTopCodeWrap from "@/components/app/collections/request/response/content/body/BodyTopCodeWrap";
import BodyTopCopy from "@/components/app/collections/request/response/content/body/BodyTopCopy";

const BodyTopRight = () => {
  const { responseTab } = useResponse();

  if (responseTab !== "raw") return null;

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <BodyTopCodeWrap />
        <BodyTopCopy />
      </TooltipProvider>
    </div>
  );
};

BodyTopRight.displayName = "Body top right";

export default BodyTopRight;