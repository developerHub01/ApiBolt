import { memo } from "react";
import Empty from "@/components/ui/empty";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";

const NoTabOpenEmptyBox = memo(() => {
  const {
    noTabsOpenEmptyContent: { label, description },
  } = useTabsView();

  return (
    <div className="w-full h-full p-2">
      <Empty label={label} description={description} showFallback />
    </div>
  );
});

export default NoTabOpenEmptyBox;
