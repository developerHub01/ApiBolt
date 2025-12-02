import { memo } from "react";
import Empty from "@/components/ui/empty";

const EmptyBox = memo(() => (
  <div className="w-full h-full p-2">
    <Empty
      label="No request available. Create one."
      description="Your currently request list is empty. You can start by clicking on the '+' add button or from right side tab list."
      showFallback
    />
  </div>
));

export default EmptyBox;
