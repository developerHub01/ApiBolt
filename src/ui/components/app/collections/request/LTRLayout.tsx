import { memo } from "react";
import { Outlet, useParams } from "react-router-dom";
import TabSidebar from "@/components/app/tab-sidebar/TabSidebar";
import { ResizablePanel } from "@/components/ui/resizable";
import LayoutMainPanel from "@/components/app/collections/request/LayoutMainPanel";

const LTRLayout = memo(() => {
  const { id: requestId } = useParams<{ id?: string }>();

  return (
    <ResizablePanel defaultSize={70}>
      <section className="flex w-full h-full">
        {requestId ? (
          <>
            <LayoutMainPanel />
            <TabSidebar />
          </>
        ) : (
          <Outlet />
        )}
      </section>
    </ResizablePanel>
  );
});

export default LTRLayout;
