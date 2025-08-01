import { memo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/sidebar/Sidebar";
import CopyRight from "@/components/copy-right";
import TabSidebarProvider from "@/context/tab-sidebar/TabSidebarProvider";
import Header from "@/components/app/header/Header";
import Setting from "@/components/app/setting/Setting";
import KeyboardEvents from "@/components/app/KeyboardEvents";
import type { TLayoutSetting } from "@/types/setting.types";
import { cn } from "@/lib/utils";
import useCheckApplyingLayout from "@/hooks/use-check-applying-layout";
import GlobalProvider from "@/context/global/GlobalProvider";

const bg =
  "https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const AppLayout = () => {
  return (
    <CustomizedBgWrapper>
      <ProviderStack>
        <Header />
        <div className="relative z-10 min-h-0 h-full flex-1 flex content-stretch">
          <InnerLayout>
            <Sidebar />
            <Outlet />
          </InnerLayout>
          <Setting />
        </div>
      </ProviderStack>
      <CopyRight />
    </CustomizedBgWrapper>
  );
};

const ProviderStack = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalProvider>
      <TabSidebarProvider>
        {children}
        <KeyboardEvents />
      </TabSidebarProvider>
    </GlobalProvider>
  );
};

interface CustomizedBgWrapperProps {
  children: React.ReactNode;
}

const CustomizedBgWrapper = memo(({ children }: CustomizedBgWrapperProps) => {
  return (
    <section
      className="h-dvh overflow-hidden relative"
      style={{
        background: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="h-full relative z-[1] flex flex-col">
        {children}
      </section>
      <span
        className="absolute top-0 left-0 w-full h-full bg-background -z-0 pointer-events-none"
        style={{
          opacity: 0.9,
        }}
      ></span>
    </section>
  );
});

const InnerLayout = ({ children }: CustomizedBgWrapperProps) => {
  const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

  return (
    <div
      className={cn("w-full h-full flex", {
        "flex-row-reverse": layoutTypes === "rtl",
      })}
    >
      {children}
    </div>
  );
};

export default AppLayout;
