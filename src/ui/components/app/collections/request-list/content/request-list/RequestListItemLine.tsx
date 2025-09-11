import { memo } from "react";
import type React from "react";
import { REQUEST_ITEM_SPACE_SIZE } from "@/constant/request-response.constant";
import { cn } from "@/lib/utils";

const leftSpace = REQUEST_ITEM_SPACE_SIZE / 2;

interface Props {
  lavel: number;
  isExpended?: boolean;
  isLastChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

const RequestListItemLine = memo(
  ({
    lavel,
    isExpended = false,
    isLastChild = false,
    className,
    children,
  }: Props) => {
    if (!lavel) return children;

    return (
      <div className={cn("relative h-full select-none", className)}>
        <span
          className="inline-block absolute w-5 h-0.5 bg-input -left-1 top-1/2 -translate-x-full -translate-y-1/2"
          style={{
            /* -2 because of avoiding overlap of two line */
            /* this is when vertical line is half, so to remove a smal space between horizontal and vertical line */
            width: leftSpace - (isLastChild && !isExpended ? 0 : 2),
          }}
        />
        {Array.from({
          length: lavel,
        }).map((_, index) => (
          <span
            key={index}
            className={cn("inline-block absolute w-0.5 h-full bg-input top-0", {
              "h-1/2": isLastChild && !isExpended && !index,
            })}
            style={{
              left: -(leftSpace + leftSpace * 2 * index + 4),
            }}
          />
        ))}
        {children}
      </div>
    );
  }
);

export default RequestListItemLine;
