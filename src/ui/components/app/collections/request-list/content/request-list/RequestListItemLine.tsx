import { memo } from "react";
import type React from "react";
import { REQUEST_ITEM_SPACE_SIZE } from "@/constant/request-response.constant";
import { cn } from "@/lib/utils";

const leftSpace = REQUEST_ITEM_SPACE_SIZE / 2;

interface Props {
  lavel: number;
  isExpended?: boolean;
  isLastChild?: boolean;
  isRootLastChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

const RequestListItemLine = memo(
  ({
    lavel,
    isExpended = false,
    isLastChild = false,
    isRootLastChild = false,
    className,
    children,
  }: Props) => {
    if (!lavel) return children;

    /* is this is the last collapsed or request of the collection */
    const isLastVisibleOfCollection = isRootLastChild && !isExpended;

    return (
      <div className={cn("relative h-full select-none", className)}>
        <Horizontal
          lavel={lavel}
          isExpended={isExpended}
          isLastChild={isLastChild}
          isLastVisibleOfCollection={isLastVisibleOfCollection}
        />
        {Array.from({
          length: lavel,
        }).map((_, index) => (
          <Vertical
            key={index}
            index={index}
            isFullHeight={
              (isLastChild && !isExpended && !index) ||
              isLastVisibleOfCollection
            }
          />
        ))}
        {children}
      </div>
    );
  }
);

interface HorizontalProps {
  lavel: number;
  isLastChild?: boolean;
  isExpended?: boolean;
  isLastVisibleOfCollection?: boolean;
}

const Horizontal = ({
  lavel,
  isLastChild,
  isExpended,
  isLastVisibleOfCollection,
}: HorizontalProps) => {
  const singleStepLineWidth = leftSpace;
  const fullStepLineWidth = leftSpace * 2 * (lavel - 1) + singleStepLineWidth;
  const extraPaddingWidth = isLastChild && !isExpended ? 0 : 2;
  const width =
    (isLastVisibleOfCollection ? fullStepLineWidth : singleStepLineWidth) -
    extraPaddingWidth;

  return (
    <span
      className="inline-block absolute w-5 h-0.5 bg-input -left-1 top-1/2 -translate-x-full -translate-y-1/2"
      style={{
        width,
      }}
    />
  );
};

interface VerticalProps {
  index: number;
  isFullHeight?: boolean;
}

const Vertical = ({ index, isFullHeight }: VerticalProps) => {
  const spaceSize = leftSpace + leftSpace * 2 * index + 4;
  return (
    <span
      className={cn("inline-block absolute w-0.5 h-full bg-input top-0", {
        "h-1/2": isFullHeight,
      })}
      style={{
        left: -spaceSize,
      }}
    />
  );
};
export default RequestListItemLine;
