import AppMainContentLayoutWrapper from "@/components/app/AppMainContentLayoutWrapper";
import LTRLayout from "@/components/app/collections/request/LTRLayout";
import RTLLayout from "@/components/app/collections/request/RTLLayout";
import RequestListPanelWrapper from "@/components/app/collections/request-list/RequestListPanelWrapper";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import { ResizableHandle } from "@/components/ui/resizable";
import type { TLayoutSetting } from "@/types/setting.types";

const CollectionsLayout = () => {
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  return (
    <AppMainContentLayoutWrapper>
      {layoutTypes === "ltr" && (
        <>
          <RequestListPanelWrapper />
          <ResizableHandle />
        </>
      )}
      {layoutTypes === "ltr" ? <LTRLayout /> : <RTLLayout />}
      {layoutTypes === "rtl" && (
        <>
          <ResizableHandle />
          <RequestListPanelWrapper />
        </>
      )}
    </AppMainContentLayoutWrapper>
  );
};

export default CollectionsLayout;
