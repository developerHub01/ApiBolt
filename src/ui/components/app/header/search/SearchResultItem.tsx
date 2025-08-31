import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type {
  RequestListItemInterface,
  THTTPMethods,
} from "@/types/request-response.types";
import { FolderClosed as FolderIcon } from "lucide-react";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeSelectedTab } from "@/context/redux/request-response/request-response-slice";
import { expendParentsOnSelectedChangeTabsData } from "@/context/redux/request-response/thunks/tab-list";

interface Props extends RequestListItemInterface {
  selectedTab?: string | null;
}

const SearchResultItem = ({
  id,
  selectedTab,
  method,
  children,
  name,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(handleChangeSelectedTab(id));

    if (selectedTab === id) return;
    dispatch(expendParentsOnSelectedChangeTabsData(id));
  }, [dispatch, id, selectedTab]);

  return (
    <div
      className={cn(
        "w-full h-8 cursor-pointer px-1 border-x-2 border-transparent rounded-sm",
        {
          "bg-accent hover:bg-accent/80": selectedTab === id,
          "bg-transparent hover:bg-accent/50": selectedTab !== id,
          "border-green-500": selectedTab === id && method === "get",
          "border-blue-500": selectedTab === id && method === "post",
          "border-yellow-500": selectedTab === id && method === "put",
          "border-orange-500": selectedTab === id && method === "patch",
          "border-red-500": selectedTab === id && method === "delete",
          "border-primary": selectedTab === id && !method,
        }
      )}
      onClick={handleClick}
    >
      <div className="w-full h-full flex items-center gap-2 px-1">
        {(children || method) && (
          <div className="flex justify-center items-center w-12 flex-shrink-0">
            {children && <FolderIcon size={16} />}
            {method && (
              <RequestMethodTag
                method={method as THTTPMethods}
                shortCut={true}
                className={"w-full"}
              />
            )}
          </div>
        )}
        <div className="flex items-center w-full min-w-0">
          <span className="w-full text-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer select-none">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
