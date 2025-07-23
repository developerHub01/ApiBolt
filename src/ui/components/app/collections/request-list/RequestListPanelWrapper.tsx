import { memo, useCallback, useEffect, useRef } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import RequestListPanel from "@/components/app/collections/request-list/RequestListPanel";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import useIsSmallDevice from "@/hooks/use-is-small-device";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { handleToggleRequestList } from "@/context/redux/request-response/request-response-slice";

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
    if (isSmallDevice) return;
    dispath(handleToggleRequestList(false));
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
      className="backdrop-blur-xs w-full"
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
    return (
      <AnimatePresence>
        {!isCollapsed && (
          <section
            className="absolute w-full h-full top-0 left-0 z-50 flex overflow-hidden"
            onClick={handleCollapse}
          >
            {/* ✅ Backdrop */}
            <motion.div
              className="bg-background/20 absolute top-0 left-0 w-full h-full"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  /* total 0.6 s */
                  delay: 0.1,
                  duration: 0.5,
                  ease: "linear",
                },
              }}
              transition={{
                duration: 0.1,
                ease: "linear",
              }}
            />

            {/* ✅ Sliding Panel */}
            <motion.div
              className={cn("w-full backdrop-blur-2xl h-full border-r-2")}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "40vw",
              }}
              initial={{
                opacity: 0,
                x: -100,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -100,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: "anticipate",
              }}
            >
              <RequestListPanel />
            </motion.div>
          </section>
        )}
      </AnimatePresence>
    );
  }
);

export default RequestListPanelWrapper;
