import React, { memo } from "react";
import TabVerticalSidebar from "@/components/app/tab-sidebar/vertical/TabVerticalSidebar";
import useCheckApplyingTabListLayoutDirection from "@/hooks/setting/use-check-applying-tab-list-layout-direction";
import TabHorizontalSidebar from "@/components/app/tab-sidebar/horizontal/TabHorizontalSidebar";
import { TLayoutSetting } from "@shared/types/setting.types";
import useCheckApplyingLayoutDirection from "@/hooks/setting/use-check-applying-layout-direction";

interface Props {
  children: React.ReactNode;
}

const TabListLayoutWrapper = memo(({ children }: Props) => {
  const tabListLayoutType = useCheckApplyingTabListLayoutDirection();
  const layoutTypes: TLayoutSetting = useCheckApplyingLayoutDirection();

  return (
    <>
      {tabListLayoutType === "top" ? (
        <section className="w-full flex flex-col">
          <TabHorizontalSidebar />
          <section className="w-full flex-1">{children}</section>
        </section>
      ) : (
        <>
          {layoutTypes === "rtl" && (
            <>
              <TabVerticalSidebar />
            </>
          )}
          {children}
          {layoutTypes === "ltr" && (
            <>
              <TabVerticalSidebar />
            </>
          )}
        </>
      )}
    </>
  );
});

export default TabListLayoutWrapper;
