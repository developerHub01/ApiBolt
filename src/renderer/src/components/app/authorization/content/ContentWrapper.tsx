import type React from "react";

interface ContentWrapperProps {
  id?: string;
  children: React.ReactNode;
}

const ContentWrapper = ({ id, children }: ContentWrapperProps) => {
  return (
    <div
      key={id}
      className="w-full grid grid-cols-[4fr_8fr] md:grid-cols-[5fr_7fr] gap-x-3 gap-y-4"
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
