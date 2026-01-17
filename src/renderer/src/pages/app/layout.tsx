import { memo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/sidebar/Sidebar";
// import CopyRight from "@/components/copy-right";
import TabSidebarProvider from "@/context/tab-sidebar/TabSidebarProvider";
import Header from "@/components/app/header/header/Header";
import Setting from "@/components/app/setting/Setting";
import KeyboardEvents from "@/components/app/KeyboardEvents";
import type { TLayoutSetting } from "@shared/types/setting.types";
import { cn } from "@/lib/utils";
import useCheckApplyingLayoutDirection from "@/hooks/setting/use-check-applying-layout-direction";
import GlobalProvider from "@/context/global/GlobalProvider";
import BackgroundWallpaper from "@/components/app/BackgroundWallpaper";
import LoadBasicReduxState from "@/components/app/LoadBasicReduxState";
import Cookies from "@/components/app/cookies/Cookies";
import KeyboardShortcuts from "@/components/app/keyboard-shortcuts/KeyboardShortcuts";
import History from "@/components/app/history-details/History";
import LocalPassword from "@/components/app/local-password/LocalPassword";
import ThemePreviewMode from "@/components/ThemePreviewMode";

const AppLayout = () => {
  return (
    <>
      <CustomizedBgWrapper>
        <ProviderStack>
          <Header />
          <div className="relative z-10 min-h-0 h-full flex-1 flex content-stretch">
            <InnerLayout>
              <Sidebar />
              <Outlet />
            </InnerLayout>
            <DialogsAnchor />
          </div>
        </ProviderStack>
        {/* <CopyRight /> */}
        <ThemePreviewMode />
      </CustomizedBgWrapper>
      <LoadBasicReduxState />
    </>
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
    <section className="h-dvh w-dvw overflow-hidden relative">
      <section className="h-full relative z-2 flex flex-col">
        {children}
      </section>
      <BackgroundWallpaper />
    </section>
  );
});

const InnerLayout = ({ children }: CustomizedBgWrapperProps) => {
  const layoutTypes: TLayoutSetting = useCheckApplyingLayoutDirection();

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

const DialogsAnchor = memo(() => {
  return (
    <>
      <LocalPassword />
      <Setting />
      <Cookies />
      <KeyboardShortcuts />
      <History />
    </>
  );
});

export default AppLayout;
