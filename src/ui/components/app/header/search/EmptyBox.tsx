import { memo } from "react";
import Empty from "@/components/ui/empty";

const EmptyBox = memo(() => (
  <div className="w-full px-2">
    <Empty
      className="min-h-60"
      label="No result matched"
      description="No result matched with your search term."
      showFallback
    />
  </div>
));

export default EmptyBox;
