import type React from "react";
import RequestBodyProvider from "@/context/collections/request/RequestBodyProvider";
import RequestHeaderProvider from "@/context/collections/request/RequestHeaderProvider";

interface ProviderStackProps {
  children: React.ReactNode;
}

const ProviderStack = ({ children }: ProviderStackProps) => (
  <RequestBodyProvider>
    <RequestHeaderProvider>{children}</RequestHeaderProvider>
  </RequestBodyProvider>
);

export default ProviderStack;
