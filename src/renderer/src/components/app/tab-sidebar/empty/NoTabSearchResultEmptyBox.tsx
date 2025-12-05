import { memo } from "react";
import Empty from "@/components/ui/empty";
import animationData from "@/assets/lottie/no-search-item-available.json";

const NoTabSearchResultEmptyBox = memo(() => (
  <div className="w-full h-full p-2">
    <Empty
      label="No tab found"
      description="No tabs found with search term"
      animationData={animationData}
      showFallback
    />
  </div>
));

export default NoTabSearchResultEmptyBox;
