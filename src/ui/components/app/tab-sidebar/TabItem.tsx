import { useState, type DragEvent } from "react";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import { Button } from "@/components/ui/button";
import { useRequestList } from "@/context/request-list/RequestListProvider";
import { useTabSidebar } from "@/context/tab-sidebar/TabSidebarProvider";
import { cn } from "@/lib/utils";
import type { TMethod } from "@/types";
import { FolderClosed as FolderIcon, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const TabItem = ({ id, index }: { id: string; index: number }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { handleGetRequestOrFolderDetails } = useRequestList();

  const tabDetails = handleGetRequestOrFolderDetails(id) ?? {};

  const {
    isTabListHovering,
    selectedTab,
    changeSelectedTab,
    removeTab,
    moveTab,
  } = useTabSidebar();
  const [isTabHovering, setIsTabHovering] = useState<boolean>(false);

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
    const draggedId = e.dataTransfer.getData("text/plain");

    setIsDragging(false);
    if (draggedId === id) return;

    moveTab(draggedId, index);
  };

  const handleDragLeave = () => setIsDragging(false);

  if (!tabDetails) return null;

  const { name, children, method } = tabDetails;

  return (
    <div
      key={id}
      className={cn("w-full h-8 cursor-pointer hover:bg-accent px-1", {
        "bg-accent": selectedTab === id,
        "bg-transparent": selectedTab !== id,
      })}
      onMouseEnter={() => setIsTabHovering(true)}
      onMouseLeave={() => setIsTabHovering(false)}
      onClick={() => changeSelectedTab(id)}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <div
        className={cn(
          "w-full h-full flex items-center justify-center cursor-pointer hover:bg-accent px-1 ring-2 rounded-md",
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
                method={method as TMethod}
                shortCut={true}
                shortCutSizeForAll={isTabListHovering ? undefined : 3}
                className={"w-full"}
              />
            )}
          </div>
        )}
        <motion.div
          className="flex-1 cursor-pointer flex items-center transition-all duration-300"
          style={{ transformOrigin: "left" }}
          animate={{
            opacity: isTabListHovering ? 1 : 0,
            width: isTabListHovering ? "100%" : "0px",
            paddingLeft: isTabListHovering ? "4px" : "0px",
            scaleX: isTabListHovering ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <input
            type="text"
            value={name}
            readOnly
            className="w-full h-full outline-0 rounded-md text-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer select-none"
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
                  onClick={() => removeTab(id)}
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
};

export default TabItem;
