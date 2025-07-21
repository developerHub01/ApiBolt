import Sidebar from "@/components/app/sidebar/Sidebar";
import CopyRight from "@/components/copy-right";
import Header from "@/components/header/Header";
import TabSidebarProvider from "@/context/tab-sidebar/TabSidebarProvider";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <section className="h-dvh overflow-hidden flex flex-col">
      <ProviderStack>
        <Header />
        <section className="min-h-0 h-full flex-1 flex content-stretch">
          <Sidebar />
          <Outlet />
        </section>
      </ProviderStack>
      <CopyRight />
    </section>
  );
};

const ProviderStack = ({ children }: { children: React.ReactNode }) => {
  return <TabSidebarProvider>{children}</TabSidebarProvider>;
};

export default AppLayout;
