import type React from "react";

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="w-full flex flex-col gap-x-3 gap-y-4 pb-3 max-w-2xl mx-auto">
      {children}
    </div>
  );
};

export default ContentWrapper;
