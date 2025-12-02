import { memo } from "react";
import Empty from "@/components/ui/empty";

const EmptyBox = memo(() => (
  <div className="w-full px-2">
    <Empty
      className="min-h-60"
      label="No results found"
      description="Try adjusting your search term or check your spelling"
      showFallback
    />
  </div>
));

export default EmptyBox;
