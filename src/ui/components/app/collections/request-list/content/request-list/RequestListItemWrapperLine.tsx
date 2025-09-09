import type { RequestListItemInterface } from "@/types/request-response.types";
import type React from "react";

const leftSpace = 16 + 8;

interface Props {
  children: React.ReactNode;
  lavel: number;
  childrenRequest: RequestListItemInterface["children"];
}

const RequestListItemWrapperLine = ({ lavel, children }: Props) => {
  if (!lavel) return children;
  return (
    <div className="relative">
      <span
        className="inline-block absolute w-5 h-0.5 bg-input -left-1 top-1/2 -translate-x-full -translate-y-1/2"
        style={{
          width: leftSpace,
        }}
      />
      <span
        className="inline-block absolute w-0.5 h-full bg-input top-1/2 -translate-y-1/2"
        style={{
          left: -(leftSpace + 4 + 2),
        }}
      />
      {children}
    </div>
  );
};

export default RequestListItemWrapperLine;
