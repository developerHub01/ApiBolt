import React from "react";

interface RequestPanelLayoutProps {
  children: React.ReactNode;
}

const RequestPanelLayout = ({ children }: RequestPanelLayoutProps) => {
  return <section className="w-full h-full flex flex-col">{children}</section>;
};

export default RequestPanelLayout;
