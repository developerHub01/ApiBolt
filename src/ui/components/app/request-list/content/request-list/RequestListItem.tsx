import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import RequestFolderProvider, {
  useRequestFolder,
} from "@/context/request-list/RequestFolderProvider";
import { ChevronRight as ArrowIcon } from "lucide-react";
import ItemCTA from "@/components/app/request-list/content/request-list/item-cta/ItemCTA";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import {
  useRequestList,
  type RequestListItemInterface,
} from "@/context/request-list/RequestListProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface RequestListItemProps extends RequestListItemInterface {
  type: "folder" | "request";
  lavel: number;
}

const RequestListItem = ({ id, lavel = 0 }: { id: string; lavel: number }) => {
  const { listData } = useRequestList();

  const props = listData[id];

  if (!props) return null;

  return (
    <RequestFolderProvider>
      <RequestListItemContent
        {...props}
        type={props.children ? "folder" : "request"}
        lavel={lavel}
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
  lavel,
}: RequestListItemProps) => {
  const {
    isRenameActive,
    handleChangeName,
    handleRenameAction,
  } = useRequestFolder();
  const { createSingleRequest, handleToggleOpenFolder, handleIsFolderOpen } =
    useRequestList();
  const [nameState, setNameState] = useState(name ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const isExpend = handleIsFolderOpen(id);

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
    if (e.code === "Enter") handleChangeName(id, nameState.trim() || name);
  };

  const handleAddRequest = () => createSingleRequest(id);

  const handleDblClick = () => {
    handleRenameAction();
  };

  return (
    <>
      <div
        className="hover:bg-accent/50 focus-within:bg-accent/50 duration-100 transition-all px-2 py-0.5 flex gap-1 items-start justify-between cursor-pointer select-none group"
        style={{
          paddingLeft: (lavel + 1) * 8,
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
              onClick={() => handleToggleOpenFolder(id)}
            >
              <ArrowIcon size={18} />
            </button>
          ) : (
            <div className="w-9 flex justify-end items-center pl-1">
              <RequestMethodTag method={method ?? "get"} className="w-full" />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
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
                  "w-full h-full outline-0 focus:bg-background px-1 rounded-md text-sm",
                  {
                    "bg-background cursor-text": isRenameActive,
                    "bg-transparent cursor-pointer": !isRenameActive,
                  }
                )}
              />
            ) : (
              <input
                value={name}
                readOnly
                onDoubleClick={handleDblClick}
                className="w-full h-full outline-0 px-1 rounded-md text-sm p-1 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer select-none"
              />
            )}
            <ItemCTA type={type} id={id} />
          </div>
        </div>
      </div>
      {isExpend && (
        <div className="w-full select-text cursor-text">
          {!Array.isArray(children) || !children.length ? (
            <div
              className="text-xs text-muted-foreground p-1"
              style={{
                paddingLeft: (lavel + 1) * 10 + 15,
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
              {children.map((id) => (
                <RequestListItem key={id} id={id} lavel={lavel + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RequestListItem;
