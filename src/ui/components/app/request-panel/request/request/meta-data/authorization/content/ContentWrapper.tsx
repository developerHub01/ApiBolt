import type React from "react";

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <div className="w-full flex flex-col gap-3 max-w-xl pb-3">{children}</div>;
};

export default ContentWrapper;
