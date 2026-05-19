import {
  ComponentProps,
  memo,
  useCallback,
  useState,
  type DragEvent,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { useTabsView } from "@/context/tabs-view/TabsViewProvider";
import { useTabsItem } from "@/context/tabs-view/TabsItemProvider";
import TabsView from "@/components/ui/tabs-view/TabsView";

interface Props extends ComponentProps<"div"> {}

const TabsItem = memo(({ className = "", ...props }: Props) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const {
    isTabListOpen,
    handleMoveTab,
    handleRemove,
    selectedTab,
    handleChangeSelectedTab,
    handleExpendParentsOnSelectedChangeTabsData,
  } = useTabsView();
  const { id, index, tabDetails } = useTabsItem();

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

    handleMoveTab({
      id: draggedId,
      index,
    });
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleCloseBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleRemove({
      id,
      type: "current",
    });
  };

  const handleClick = useCallback(async () => {
    handleChangeSelectedTab(id);

    if (selectedTab === id) return;
    handleExpendParentsOnSelectedChangeTabsData(id);
  }, [
    handleChangeSelectedTab,
    handleExpendParentsOnSelectedChangeTabsData,
    id,
    selectedTab,
  ]);

  if (!tabDetails) return null;

  /* children represent is it a folder or request | if children at least empty array then folder. so for that we will asign a [] in children if it is a folder to represent */
  const children = tabDetails.method ? undefined : (tabDetails.children ?? []);

  const method = tabDetails.method;
  const name = tabDetails.name ?? (method ? "Request" : "Folder");

  return (
    <div
      key={id}
      data-tab-id={id}
      data-active={selectedTab === id}
      className={cn(
        "h-9 w-fit min-w-32 max-w-52 shrink-0 cursor-pointer px-1 group relative",
        "before:content-[''] before:absolute before:inset-0 before:bg-transparent before:border-y-2 before:border-y-transparent before:pointer-events-none",
        "after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-0.5 after:bg-border",
        {
          /* active tab style */
          "bg-accent/80 hover:bg-accent/60": selectedTab === id,
          /* active tab border color */
          "bg-transparent hover:bg-accent/60": selectedTab !== id,
          "before:border-y-green-500": selectedTab === id && method === "get",
          "before:border-y-blue-500": selectedTab === id && method === "post",
          "before:border-y-yellow-500": selectedTab === id && method === "put",
          "before:border-y-orange-500":
            selectedTab === id && method === "patch",
          "before:border-y-red-500": selectedTab === id && method === "delete",
          "before:border-y-primary": selectedTab === id && !method,
        },
        className,
      )}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      {...props}
    >
      <div
        className={cn(
          "w-full h-full shrink-0 flex-1 flex gap-2 items-center justify-center px-1 ring-2",
          {
            "ring-primary/50": isDragging,
            "ring-transparent": !isDragging,
          },
        )}
      >
        <TabsView.Type
          haveChildren={Boolean(children)}
          isShort={true}
          method={method}
        />
        <motion.div
          className={cn(
            "flex-1",
            "cursor-pointer flex items-center transition-all duration-300 overflow-hidden",
            {
              "flex-1": isTabListOpen,
            },
          )}
          style={{
            transformOrigin: "left",
          }}
          key={id}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <p className="w-full text-xs truncate line-clamp-1">{name}</p>
        </motion.div>
        <Tooltip>
          <TooltipTrigger asChild>
            <TabsView.CloseButton onClick={handleCloseBtnClick} />
          </TooltipTrigger>
          <TooltipContent align="end" side="bottom" variant={"secondary"}>
            <TabsView.ShortcutText />
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
});

export default TabsItem;
