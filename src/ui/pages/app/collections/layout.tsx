import AppMainContentLayoutWrapper from "@/components/app/AppMainContentLayoutWrapper";
import RequestListPanelWrapper from "@/components/app/collections/request-list/RequestListPanelWrapper";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import { ResizableHandle } from "@/components/ui/resizable";
import { Outlet, useParams } from "react-router-dom";
import TabSidebar from "@/components/app/tab-sidebar/TabSidebar";
import { ResizablePanel } from "@/components/ui/resizable";
import LayoutMainPanel from "@/components/app/collections/request/LayoutMainPanel";
import type { TLayoutSetting } from "@/types/setting.types";

const CollectionsLayout = () => {
  const { id: requestId } = useParams<{ id?: string }>();
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  return (
    <AppMainContentLayoutWrapper>
      {layoutTypes === "ltr" ? (
        <>
          <RequestListPanelWrapper />
          <ResizableHandle />
          <ResizablePanel defaultSize={70} minSize={30}>
            <section className="flex w-full h-full flex-row">
              {requestId ? <LayoutMainPanel /> : <Outlet />}
            </section>
          </ResizablePanel>
          <TabSidebar />
        </>
      ) : (
        <>
          <TabSidebar />
          <ResizablePanel defaultSize={70} minSize={30}>
            <section className="flex w-full h-full flex-row">
              {requestId ? <LayoutMainPanel /> : <Outlet />}
            </section>
          </ResizablePanel>
          <ResizableHandle />
          <RequestListPanelWrapper />
        </>
      )}
    </AppMainContentLayoutWrapper>
  );
};

export default CollectionsLayout;
