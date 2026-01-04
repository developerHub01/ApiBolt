import React, { memo } from "react";
import TabVerticalSidebar from "@/components/app/tab-sidebar/vertical/TabVerticalSidebar";
import useCheckApplyingTabListLayoutDirection from "@/hooks/setting/use-check-applying-tab-list-layout-direction";
import TabHorizontalSidebar from "@/components/app/tab-sidebar/horizontal/TabHorizontalSidebar";

interface Props {
  children: React.ReactNode;
}

const TabListLayoutWrapper = memo(({ children }: Props) => {
  const tabListLayoutType = useCheckApplyingTabListLayoutDirection();

  return (
    <>
      {tabListLayoutType === "top" ? (
        <section className="w-full flex flex-col">
          <TabHorizontalSidebar />
          <section className="w-full flex-1">{children}</section>
        </section>
      ) : (
        <>
          {children}
          <TabVerticalSidebar />
        </>
      )}
    </>
  );
});

export default TabListLayoutWrapper;
