import type React from "react";
import RequestBodyProvider from "@/context/collections/request/RequestBodyProvider";
import RequestHeaderProvider from "@/context/collections/request/RequestHeaderProvider";
import CollectionProvider from "@/context/collections/CollectionProvider";

interface ProviderStackProps {
  children: React.ReactNode;
}

const ProviderStack = ({ children }: ProviderStackProps) => (
  <CollectionProvider type="local">
    <RequestBodyProvider>
      <RequestHeaderProvider>{children}</RequestHeaderProvider>
    </RequestBodyProvider>
  </CollectionProvider>
);

export default ProviderStack;
