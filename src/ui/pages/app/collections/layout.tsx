import RequestListPanelWrapper from "@/components/app/collections/request-list/RequestListPanelWrapper";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import { Outlet, useParams } from "react-router-dom";
import TabSidebar from "@/components/app/tab-sidebar/TabSidebar";
import LayoutMainPanel from "@/components/app/collections/request/LayoutMainPanel";
import type { TLayoutSetting } from "@/types/setting.types";

const CollectionsLayout = () => {
  const { id: requestId } = useParams<{ id?: string }>();
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  return (
    <section className="w-full h-full flex relative">
      {layoutTypes === "ltr" ? <RequestListPanelWrapper /> : <TabSidebar />}
      <section className="flex w-full flex-1 h-full flex-row">
        {requestId ? <LayoutMainPanel /> : <Outlet />}
      </section>
      {layoutTypes === "rtl" ? <RequestListPanelWrapper /> : <TabSidebar />}
    </section>
  );
};

export default CollectionsLayout;
