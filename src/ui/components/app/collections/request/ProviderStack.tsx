import type React from "react";
import RequestListProvider from "@/context/collections/request-list/RequestListProvider";
import RequestBodyProvider from "@/context/collections/request/RequestBodyProvider";
import RequestHeaderProvider from "@/context/collections/request/RequestHeaderProvider";

interface ProviderStackProps {
  children: React.ReactNode;
}

const ProviderStack = ({ children }: ProviderStackProps) => (
  <RequestListProvider>
    <RequestBodyProvider>
      <RequestHeaderProvider>{children}</RequestHeaderProvider>
    </RequestBodyProvider>
  </RequestListProvider>
);

export default ProviderStack;
