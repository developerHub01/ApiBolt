import { memo } from "react";
import Empty from "@/components/ui/empty";

const EmptyBox = memo(() => (
  <div className="w-full p-2">
    <Empty
      label="No tab open"
      description="Your currently tab list is empty. You can start by selecting a request or folder or clicking on the '+' add button to add new tab."
      showFallback
    />
  </div>
));

export default EmptyBox;
