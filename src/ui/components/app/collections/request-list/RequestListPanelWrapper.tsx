import { memo, useCallback, useEffect, useRef } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import RequestListPanel from "@/components/app/collections/request-list/RequestListPanel";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import useIsSmallDevice from "@/hooks/use-is-small-device";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import useCheckApplyingLayout from "@/hooks/setting/use-check-applying-layout";
import type { TLayoutSetting } from "@/types/setting.types";

const RequestListPanelWrapper = memo(() => {
  const dispath = useAppDispatch();
  const isSmallDevice = useIsSmallDevice();
  const resizablePanelRef = useRef<ImperativePanelHandle>(null);
  const requestListCollapsed = useAppSelector(
    (state) => state.requestResponse.requestListCollapsed
  );

  useEffect(() => {
    const panel = resizablePanelRef.current;
    if (!panel) return;

    if (requestListCollapsed) panel.collapse();
    else panel.expand();
  }, [requestListCollapsed]);

  /* when resize to desktop from mini devices it will expend the collapse to resolve collision */
  useEffect(() => {
    if (isSmallDevice) dispath(handleToggleRequestList(true));
    else dispath(handleToggleRequestList(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmallDevice]);

  const handleCollapse = useCallback(
    () => dispath(handleToggleRequestList(true)),
    [dispath]
  );

  if (isSmallDevice)
    return (
      <SmallDeviceListWrapper
        handleCollapse={handleCollapse}
        isCollapsed={requestListCollapsed}
      />
    );

  return (
    <ResizablePanel
      collapsible
      defaultSize={30}
      minSize={15}
      maxSize={40}
      className="backdrop-blur-xs w-full bg-background/30"
      style={{
        maxWidth: "40vw",
      }}
      ref={resizablePanelRef}
    >
      <RequestListPanel />
    </ResizablePanel>
  );
});

RequestListPanelWrapper.displayName = "Request list panel wrapper";

interface SmallDeviceListWrapperProps {
  handleCollapse: () => void;
  isCollapsed: boolean;
}

const SmallDeviceListWrapper = memo(
  ({ isCollapsed, handleCollapse }: SmallDeviceListWrapperProps) => {
    const layoutTypes: TLayoutSetting = useCheckApplyingLayout();

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
          className={cn("w-full backdrop-blur-lg h-full border-r-2", {
            "border-r-2": layoutTypes === "ltr",
            "border-l-2": layoutTypes === "rtl",
          })}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: "40vw",
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
          <RequestListPanel />
        </motion.div>
      </AnimatedDialog>
    );
  }
);

export default RequestListPanelWrapper;
