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
import { X as CloseIcon } from "lucide-react";
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

interface Props {
  id: string;
  index: number;
}

const TabItem = memo(({ id, index }: Props) => {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState<boolean>(false);

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
        "h-9 w-fit min-w-32 max-w-52 shrink-0 cursor-pointer px-1 border-y-2 border-transparent group relative",
        {
          /* active tab style */
          "bg-accent/80 hover:bg-accent/60": selectedTab === id,
          /* active tab border color */
          "bg-transparent hover:bg-accent/60": selectedTab !== id,
          "border-y-green-500": selectedTab === id && method === "get",
          "border-y-blue-500": selectedTab === id && method === "post",
          "border-y-yellow-500": selectedTab === id && method === "put",
          "border-y-orange-500": selectedTab === id && method === "patch",
          "border-y-red-500": selectedTab === id && method === "delete",
          "border-y-primary": selectedTab === id && !method,

          "border-l-2 border-l-border": index,
        },
      )}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
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
        <CollectionTabType
          haveChildren={Boolean(children)}
          isShort={false}
          method={method}
        />
        <motion.div
          className={cn(
            "shrink-0 flex-1",
            "cursor-pointer flex items-center transition-all duration-300",
            {
              "flex-1": isTabListOpen,
            },
          )}
          style={{ transformOrigin: "left" }}
          key={id}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <p className="w-full text-sm line-clamp-1">{name}</p>
        </motion.div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"iconXs"}
              variant={"secondary"}
              onClick={handleCloseBtnClick}
              className="absolute top-1/2 -translate-y-1/2 right-1 opacity-0 group-hover:opacity-100"
            >
              <CloseIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="end" side="bottom" variant={"secondary"}>
            <ShortcutText />
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
});

export default TabItem;
