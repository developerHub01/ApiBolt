import type React from "react";

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="w-full grid grid-cols-[4fr_8fr] md:grid-cols-[5fr_7fr] gap-x-3 gap-y-4">
      {children}
    </div>
  );
};

export default ContentWrapper;
