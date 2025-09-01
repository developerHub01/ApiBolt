import { memo } from "react";
import Empty from "@/components/ui/empty";

const NoTabSearchResultEmptyBox = memo(() => (
  <div className="w-full p-2">
    <Empty
      label="No tab found"
      description="No tabs found with search term"
      animationSrc="./lottie/no-search-item-available.lottie"
      showFallback
    />
  </div>
));

export default NoTabSearchResultEmptyBox;
