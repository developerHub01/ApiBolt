import { ComponentProps, memo, ReactNode } from "react";
import { ScrollAreaInnerFlexView } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";
import TreeContentSkeleton from "@/components/ui/tree-view/TreeContentSkeleton";
import AutoScrollActiveWrapper from "@/components/ui/auto-scroll-active-wrapper";

interface Props extends ScrollAreaProps {
  showSkeleton?: boolean;
  innerClassName?: string;
  haveAutoActiveScroll?: boolean;
  skeletonEl?: ReactNode;
  restArea?: ReactNode;
}

const TreeContentWrapper = memo(
  ({
    showSkeleton = false,
    skeletonEl = <TreeContentSkeleton />,
    children,
    haveAutoActiveScroll = true,
    className = "",
    innerClassName = "",
    restArea,
    ...props
  }: Props) => {
    return (
      <ScrollAreaInnerFlexView
        className={cn(
          "flex-1 w-full min-h-0 text-sm [&>div>div]:w-full [&>div>div]:h-full",
          className,
        )}
        {...props}
      >
        {showSkeleton ? (
          skeletonEl
        ) : (
          <Wrapper
            className={innerClassName}
            haveAutoActiveScroll={haveAutoActiveScroll}
            restArea={restArea}
          >
            {children}
          </Wrapper>
        )}
      </ScrollAreaInnerFlexView>
    );
  },
);

interface WrapperProps extends ComponentProps<"div"> {
  haveAutoActiveScroll?: Props["haveAutoActiveScroll"];
  restArea?: Props["restArea"];
}

const Wrapper = ({
  haveAutoActiveScroll,
  children,
  className = "",
  restArea = null,
}: WrapperProps) => (
  <div className={cn("h-full flex flex-col w-full gap-0.5", className)}>
    {haveAutoActiveScroll ? (
      <AutoScrollActiveWrapper>{children}</AutoScrollActiveWrapper>
    ) : (
      children
    )}
    {restArea}
  </div>
);

export default TreeContentWrapper;
