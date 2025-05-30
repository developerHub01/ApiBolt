import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import RequestFolderProvider, {
  useRequestFolder,
} from "@/context/request-list/RequestFolderProvider";
import { ChevronRight as ArrowIcon } from "lucide-react";
import ItemCTA from "@/components/app/request-list/content/request-list/item-cta/ItemCTA";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import { useRequestList } from "@/context/request-list/RequestListProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import type { RequestListItemInterface } from "@/context/redux/request-list-slice";
import { handleChangeSelectedTab } from "@/context/redux/tab-sidebar-slice";

interface RequestListItemProps extends RequestListItemInterface {
  type: "folder" | "request";
  lavel: number;
  index: number;
}

const RequestListItem = ({
  id,
  lavel = 0,
  index = 0,
}: {
  id: string;
  lavel: number;
  index: number;
}) => {
  const requestDetails = useAppSelector(
    (state) => state.requestList.requestList[id]
  );

  if (!requestDetails) return null;

  return (
    <RequestFolderProvider>
      <RequestListItemContent
        {...requestDetails}
        type={requestDetails.children ? "folder" : "request"}
        lavel={lavel}
        index={index}
      />
    </RequestFolderProvider>
  );
};

const RequestListItemContent = ({
  id,
  type,
  name,
  method,
  children,
  parent,
  lavel,
  index,
}: RequestListItemProps) => {
  const dispatch = useAppDispatch();
  const {
    isRenameActive,
    handleChangeName,
    handleRenameAction,
    isContextMenuOpen,
    handleToggleContextMenu,
  } = useRequestFolder();
  const { createSingleRequest, handleToggleOpenFolder, handleMoveRequest } =
    useRequestList();
  const [nameState, setNameState] = useState<string>(name ?? "");
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isExpend = useAppSelector((state) =>
    state.requestList.openFolderList.includes(id)
  );

  useEffect(() => {
    if (name === nameState) return;
    setNameState(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (isRenameActive) {
      inputRef.current?.focus();
    }
  }, [isRenameActive]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNameState(e.target.value);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return setNameState(name);
    handleChangeName(id, e.target.value);
    window.getSelection()?.removeAllRanges();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      window.getSelection()?.removeAllRanges();
      handleChangeName(id, nameState.trim() || name);
    }
  };

  const handleAddRequest = () => createSingleRequest(id);

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

    (async () =>
      await handleMoveRequest(draggedId, children ? id : parent, index))();
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleArrowButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleToggleOpenFolder(id);
  };

  const handleNameDoubleClick = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    handleRenameAction();
  };

  const handleRequestClick = () => dispatch(handleChangeSelectedTab(id));

  return (
    <>
      <div
        className="hover:bg-accent/50 focus-within:bg-accent/50 duration-100 transition-all px-2"
        onContextMenu={() => handleToggleContextMenu(true)}
        onClick={handleRequestClick}
      >
        <div
          className={cn(
            "pr-0.5 py-0.5 flex gap-1 items-start justify-between cursor-pointer select-none group ring-2 rounded-md",
            {
              "ring-primary/50": isDragging,
              "ring-transparent": !isDragging,
            }
          )}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          draggable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          /**
           * level wise padding will increase and if not 0 then 8 will add
           *
           * for example level 0
           * = 0 * 8 + 0 * 8 = 0 so that root folder or request don't get extra padding
           * if level 1
           * = 1 * 8 + 1 * 8 = 16
           * for level 2
           * = 2 * 8 + 1 * 8 = 24
           */
          style={{
            paddingLeft: lavel * 8 + Number(Boolean(lavel)) * 8,
          }}
        >
          <div className="h-7 flex items-center">
            {type === "folder" ? (
              <button
                className={cn(
                  "p-0.5 aspect-square cursor-pointer duration-100 transition-all",
                  {
                    "rotate-90": isExpend,
                    "rotate-0": !isExpend,
                  }
                )}
                onClick={handleArrowButtonClick}
              >
                <ArrowIcon size={18} />
              </button>
            ) : (
              <div className="w-10 flex justify-end items-center pl-1">
                <RequestMethodTag
                  method={method ?? "get"}
                  shortCut={true}
                  className="w-full"
                />
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-0.5">
            <div className="w-full text-sm h-7 flex justify-between items-center gap-1">
              {isRenameActive ? (
                <input
                  value={nameState}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  id={`request_list_item_input_${id}`}
                  ref={inputRef}
                  className={cn(
                    "w-full h-full outline-0 focus:bg-background px-1 rounded-md text-sm ring-1 ring-primary/80",
                    {
                      "bg-background cursor-text": isRenameActive,
                      "bg-transparent cursor-pointer": !isRenameActive,
                    }
                  )}
                />
              ) : (
                <input
                  id={`request_list_item_${id}`}
                  value={name}
                  readOnly
                  onDoubleClick={handleNameDoubleClick}
                  className="w-full h-full outline-0 px-1 rounded-md text-sm p-1 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer select-none"
                />
              )}

              <AnimatePresence>
                {(isHovering || isContextMenuOpen) && (
                  <ItemCTA type={type} id={id} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      {isExpend && (
        <div className="w-full select-text cursor-text">
          {!Array.isArray(children) || !children.length ? (
            <div
              className="text-xs text-muted-foreground p-1"
              style={{
                paddingLeft: (lavel + 1) * 10 + 20,
              }}
            >
              This folder is empty. <br />
              <Button
                variant={"link"}
                size={"sm"}
                className="px-0 text-xs!"
                onClick={handleAddRequest}
              >
                Add a request
              </Button>{" "}
              to start working.
            </div>
          ) : (
            <div>
              {children.map((id, index) => (
                <RequestListItem
                  key={id}
                  id={id}
                  lavel={lavel + 1}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RequestListItem;
