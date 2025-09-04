import { memo } from "react";
import Empty from "@/components/ui/empty";

const EmptySearchTermBox = memo(() => (
  <div className="w-full px-2">
    <Empty
      label="No search term"
      description="Start searching."
      className="min-h-60"
    />
  </div>
));

export default EmptySearchTermBox;
