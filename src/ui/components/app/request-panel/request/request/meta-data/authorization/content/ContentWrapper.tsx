import type React from "react";

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <div className="w-full flex flex-col gap-2.5 max-w-xl">{children}</div>;
};

export default ContentWrapper;
