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
import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";

interface RequestListItemProps extends RequestListItemInterface {
  type: "folder" | "request";
}

const RequestListItem = ({ id }: { id: string }) => {
  const { listData } = useRequestList();

  const props = listData[id];

  if (!props) return null;

  return (
    <RequestFolderProvider>
      <RequestListItemContent
        {...props}
        type={props.children ? "folder" : "request"}
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
}: RequestListItemProps) => {
  const { isRenameActive, isExpend, handleToggleExpend, handleChangeName } =
    useRequestFolder();
  const [nameState, setNameState] = useState(name ?? "");

  useEffect(() => {
    if (name === nameState) return;
    setNameState(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNameState(e.target.value);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    handleChangeName(id, e.target.value);
  };

  return (
    <div className="hover:bg-accent/50 focus-within:bg-accent/50 duration-100 transition-all px-2 py-0.5 flex gap-1 items-start justify-between cursor-pointer select-none group">
      <div className="h-7 flex items-center">
        {type === "folder" ? (
          <button
            className={cn(
              "p-1 aspect-square cursor-pointer duration-100 transition-all",
              {
                "rotate-90": isExpend,
                "rotate-0": !isExpend,
              }
            )}
            onClick={handleToggleExpend}
          >
            <ArrowIcon size={18} />
          </button>
        ) : (
          <div className="w-12 flex justify-end items-center">
            <RequestMethodTag method={method ?? "get"} />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="w-full text-sm h-7">
          <input
            value={nameState}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn("w-full h-full outline-0 focus:bg-background px-1 rounded-md", {
              "bg-background": isRenameActive,
              "bg-transparent cursor-pointer": !isRenameActive,
            })}
          />
        </div>
        {isExpend && (
          <div className="w-full select-text cursor-text">
            {!Array.isArray(children) || !children.length ? (
              <div className="text-xs text-muted-foreground p-1">
                This folder is empty. <br />
                <Button variant={"link"} size={"sm"} className="px-0 text-sx">
                  Add a request
                </Button>{" "}
                to start working.
              </div>
            ) : (
              <div>
                {children.map((id) => (
                  <RequestListItem key={id} id={id} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <ItemCTA type={type} />
    </div>
  );
};

export default RequestListItem;
