import {
  memo,
  useCallback,
  useState,
  type DragEvent,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleMoveTab } from "@/context/redux/request-response/request-response-slice";
import {
  changeSelectedTab,
  expendParentsOnSelectedChangeTabsData,
  removeTab,
} from "@/context/redux/request-response/thunks/tab-list";
import { selectRequestOrFolderById } from "@/context/redux/request-response/selectors/request-list";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import CollectionTabType from "@/components/app/tab-sidebar/CollectionTabType";
import ShortcutText from "@/components/app/tab-sidebar/ShortcutText";
import TabCloseButton from "@/components/app/tab-sidebar/TabCloseButton";

interface Props {
  id: string;
  index: number;
}

const TabItem = memo(({ id, index }: Props) => {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isTabHovering, setIsTabHovering] = useState<boolean>(false);

  const tabDetails =
    useAppSelector(state => selectRequestOrFolderById(state, id)) ?? {};
  const { isTabListOpen } = useTabSidebar();
  const selectedTab = useAppSelector(selectSelectedTab);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragging(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedId = e.dataTransfer.getData("text/plain");

    setIsDragging(false);
    if (draggedId === id) return;

    dispatch(
      handleMoveTab({
        id: draggedId,
        index,
      }),
    );
  };

  const handleDragLeave = () => setIsDragging(false);

  /* children represent is it a folder or request | if children at least empty array then folder. so for that we will asign a [] in children if it is a folder to represent */
  const children = tabDetails.method ? undefined : (tabDetails.children ?? []);

  const method = useAppSelector(
    state => state.requestResponse.requestList[id]?.method ?? tabDetails.method,
  );
  const name = useAppSelector(
    state =>
      state.requestResponse.requestList[id]?.name ?? tabDetails.name ?? "",
  );

  const handleCloseBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(
      removeTab({
        id,
        type: "current",
      }),
    );
  };

  const handleClick = useCallback(async () => {
    dispatch(changeSelectedTab(id));

    if (selectedTab === id) return;
    dispatch(expendParentsOnSelectedChangeTabsData(id));
  }, [dispatch, id, selectedTab]);

  if (!tabDetails) return null;

  return (
    <div
      key={id}
      data-tab-id={id}
      data-active={selectedTab === id}
      className={cn(
        "flex-1 cursor-pointer border-x-2 border-transparent group",
        {
          /* active tab style */
          "bg-accent/80 hover:bg-accent/60": selectedTab === id,
          /* active tab border color */
          "bg-transparent hover:bg-accent/60": selectedTab !== id,
          "border-green-500": selectedTab === id && method === "get",
          "border-blue-500": selectedTab === id && method === "post",
          "border-yellow-500": selectedTab === id && method === "put",
          "border-orange-500": selectedTab === id && method === "patch",
          "border-red-500": selectedTab === id && method === "delete",
          "border-primary": selectedTab === id && !method,
        },
      )}
      onMouseEnter={() => setIsTabHovering(true)}
      onMouseLeave={() => setIsTabHovering(false)}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <div
        className={cn(
          "w-full h-9 flex items-center justify-center px-1.5 ring-2",
          {
            "ring-primary/50": isDragging,
            "ring-transparent": !isDragging,
          },
        )}
      >
        <CollectionTabType
          haveChildren={Boolean(children)}
          isShort={!isTabListOpen}
          method={method}
          isFlexibleSize={false}
        />
        <motion.div
          className={cn(
            "cursor-pointer flex items-center transition-all duration-300",
            {
              "flex-1": isTabListOpen,
            },
          )}
          style={{
            transformOrigin: "left",
          }}
          key={id}
          animate={{
            opacity: isTabListOpen ? 1 : 0,
            width: isTabListOpen ? "100%" : "0px",
            paddingLeft: isTabListOpen ? "8px" : "0px",
            scaleX: isTabListOpen ? 1 : 0.8,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <input
            type="text"
            value={name}
            readOnly
            className="w-full h-full outline-0 rounded-md text-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer select-none pointer-events-none"
          />
        </motion.div>
        {isTabListOpen && (
          <AnimatePresence>
            {isTabHovering && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                }}
                transition={{
                  duration: 0.15,
                  ease: "easeInOut",
                }}
                className="flex justify-center items-center"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabCloseButton
                      onClick={handleCloseBtnClick}
                      className="relative translate-y-0 right-auto"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    align="end"
                    side="bottom"
                    variant={"secondary"}
                  >
                    <ShortcutText />
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
});

export default TabItem;
