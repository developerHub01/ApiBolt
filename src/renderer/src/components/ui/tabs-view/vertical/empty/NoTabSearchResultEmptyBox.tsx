import { memo } from "react";
import Empty from "@/components/ui/empty";
import animationData from "@/assets/lottie/no-search-item-available.json";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";

const NoTabSearchResultEmptyBox = memo(() => {
  const {
    noTabsSearchResultEmptyContent: { label, description },
  } = useTabsView();

  return (
    <div className="w-full h-full p-2">
      <Empty
        label={label}
        description={description}
        animationData={animationData}
        showFallback
      />
    </div>
  );
});

export default NoTabSearchResultEmptyBox;
