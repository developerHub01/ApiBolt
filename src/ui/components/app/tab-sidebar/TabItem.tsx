import {
  memo,
  useCallback,
  useState,
  type DragEvent,
  type MouseEvent,
} from "react";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FolderClosed as FolderIcon, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  handleChangeSelectedTab,
  handleMoveTab,
  handleRemoveTab,
} from "@/context/redux/request-response/request-response-slice";
import type { THTTPMethods } from "@/types/request-response.types";
import { expendParentsOnSelectedChangeTabsData } from "@/context/redux/request-response/thunks/tab-list";
import { selectRequestOrFolderById } from "@/context/redux/request-response/selectors/request-list";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";

const TabItem = memo(({ id, index }: { id: string; index: number }) => {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isTabHovering, setIsTabHovering] = useState<boolean>(false);

  const tabDetails = useAppSelector(selectRequestOrFolderById(id)) ?? {};
  const { isTabListHovering } = useTabSidebar();
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
      })
    );
  };

  const handleDragLeave = () => setIsDragging(false);

  /* children represent is it a folder or request | if children at least empty array then folder. so for that we will asign a [] in children if it is a folder to represent */
  const children = tabDetails.method ? undefined : (tabDetails.children ?? []);

  const method = useAppSelector(
    (state) =>
      state.requestResponse.requestList[id]?.method ?? tabDetails.method
  );
  const name = useAppSelector(
    (state) => state.requestResponse.requestList[id]?.name ?? tabDetails.name
  );

  const handleCloseBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(handleRemoveTab(id));
  };

  const handleClick = useCallback(async () => {
    dispatch(handleChangeSelectedTab(id));

    if (selectedTab === id) return;
    dispatch(expendParentsOnSelectedChangeTabsData(id));
  }, [dispatch, id, selectedTab]);

  if (!tabDetails) return null;

  return (
    <div
      key={id}
      data-active={selectedTab === id}
      className={cn(
        "w-full h-9 cursor-pointer px-1 border-x-2 border-transparent",
        {
          /* active tab style */
          "bg-accent hover:bg-accent/80": selectedTab === id,
          /* active tab border color */
          "bg-transparent hover:bg-accent/50": selectedTab !== id,
          "border-green-500": selectedTab === id && method === "get",
          "border-blue-500": selectedTab === id && method === "post",
          "border-yellow-500": selectedTab === id && method === "put",
          "border-orange-500": selectedTab === id && method === "patch",
          "border-red-500": selectedTab === id && method === "delete",
          "border-primary": selectedTab === id && !method,
        }
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
          "w-full h-full flex items-center justify-center px-1 ring-2",
          {
            "ring-primary/50": isDragging,
            "ring-transparent": !isDragging,
          }
        )}
      >
        {(children || method) && (
          <div
            className={cn("flex justify-center items-center", {
              "w-11": isTabListHovering,
              "w-8": !isTabListHovering,
            })}
          >
            {children && <FolderIcon size={20} />}
            {method && (
              <RequestMethodTag
                method={method as THTTPMethods}
                shortCut={true}
                shortCutSizeForAll={isTabListHovering ? undefined : 3}
                className={"w-full"}
              />
            )}
          </div>
        )}
        <motion.div
          className={cn(
            "cursor-pointer flex items-center transition-all duration-300",
            {
              "flex-1": isTabListHovering,
            }
          )}
          style={{ transformOrigin: "left" }}
          key={id}
          animate={{
            opacity: isTabListHovering ? 1 : 0,
            width: isTabListHovering ? "100%" : "0px",
            paddingLeft: isTabListHovering ? "8px" : "0px",
            scaleX: isTabListHovering ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <input
            type="text"
            value={name}
            readOnly
            className="w-full h-full outline-0 rounded-md text-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer select-none pointer-events-none"
          />
        </motion.div>
        {isTabListHovering && (
          <AnimatePresence>
            {isTabHovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
              >
                <Button
                  size={"iconXs"}
                  variant={"ghost"}
                  onClick={handleCloseBtnClick}
                >
                  <CloseIcon />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
});

export default TabItem;
