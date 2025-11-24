import { memo, useEffect, useRef, type CSSProperties } from "react";
import type {
  ImperativePanelGroupHandle,
  ImperativePanelHandle,
} from "react-resizable-panels";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import useIsSmallDevice from "@/hooks/use-is-small-device";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { motion } from "motion/react";
import type { TLayoutSetting } from "@/types/setting.types";
import useCheckApplyingLayoutDirection from "@/hooks/setting/use-check-applying-layout-direction";

interface AppMainContentLayoutWrapperProps {
  children: React.ReactNode;
  leftPanel: React.ReactNode;
}

const ApiBoltResizableWrapper = memo(
  ({ children, leftPanel }: AppMainContentLayoutWrapperProps) => {
    const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full md:min-w-[450px] relative flex-1"
        style={{
          height: "auto",
        }}
        ref={panelGroupRef}
      >
        {leftPanel}
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <section className="flex w-full h-full">{children}</section>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
);

interface ApiBoltResizableLeftPanelProps {
  isCollapsed: boolean;
  handleCollapse: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

const ApiBoltResizableLeftPanel = memo(
  ({
    isCollapsed,
    handleCollapse,
    children,
    style = {},
    defaultSize = 30,
    minSize = 20,
    maxSize = 50,
  }: ApiBoltResizableLeftPanelProps) => {
    const isSmallDevice = useIsSmallDevice(1100);
    const resizablePanelRef = useRef<ImperativePanelHandle>(null);

    useEffect(() => {
      const panel = resizablePanelRef.current;
      if (!panel) return;

      if (isCollapsed) panel.collapse();
      else panel.expand();
    }, [isCollapsed]);

    if (isSmallDevice)
      return (
        <ApiBoltResizableLeftPanelSmallDeviceWrapper
          handleCollapse={handleCollapse}
          isCollapsed={isCollapsed}
        >
          {children}
        </ApiBoltResizableLeftPanelSmallDeviceWrapper>
      );

    return (
      <ResizablePanel
        collapsible
        defaultSize={defaultSize}
        minSize={minSize}
        maxSize={maxSize}
        className={cn("backdrop-blur-xs w-full bg-background/30 border-r-4", {
          // "border-r-4 border-l-0": layoutTypes === "ltr",
          // "border-l-4 border-r-0": layoutTypes === "rtl",
        })}
        style={{
          maxWidth: "50vw",
          ...style,
        }}
        ref={resizablePanelRef}
      >
        {isSmallDevice || children}
      </ResizablePanel>
    );
  }
);

interface ApiBoltResizableLeftPanelSmallDeviceWrapperProps {
  handleCollapse: () => void;
  isCollapsed: boolean;
  children: React.ReactNode;
}

const ApiBoltResizableLeftPanelSmallDeviceWrapper = memo(
  ({
    isCollapsed,
    handleCollapse,
    children,
  }: ApiBoltResizableLeftPanelSmallDeviceWrapperProps) => {
    const layoutTypes: TLayoutSetting = useCheckApplyingLayoutDirection();

    return (
      <AnimatedDialog
        isOpen={!isCollapsed}
        onClose={handleCollapse}
        className={cn("p-0 justify-start", {
          "justify-start": layoutTypes === "ltr",
          "justify-end": layoutTypes === "rtl",
        })}
      >
        <motion.div
          className={cn(
            "w-full backdrop-blur-lg h-full border-r-2 bg-background/70",
            {
              "border-r-2": layoutTypes === "ltr",
              "border-l-2": layoutTypes === "rtl",
            }
          )}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: "60vw",
          }}
          initial={{
            opacity: 0,
            x: layoutTypes === "ltr" ? -100 : 100,
            transition: {
              delay: 0.2,
            },
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: layoutTypes === "ltr" ? -100 : 100,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            ease: "anticipate",
          }}
        >
          {children}
        </motion.div>
      </AnimatedDialog>
    );
  }
);

export { ApiBoltResizableWrapper, ApiBoltResizableLeftPanel };
