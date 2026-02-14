import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { RequestListItemInterface } from "@shared/types/request-response.types";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeSelectedTab } from "@/context/redux/request-response/request-response-slice";
import { expendParentsOnSelectedChangeTabsData } from "@/context/redux/request-response/thunks/tab-list";
import CollectionTabType from "@/components/app/tab-sidebar/CollectionTabType";

interface Props extends RequestListItemInterface {
  selectedTab?: string | null;
  className?: string;
}

const SearchResultItem = ({
  id,
  selectedTab,
  method,
  children,
  name,
  className = "",
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
        "w-full h-9 cursor-pointer px-3 shrink-0 border-b border-accent",
        {
          "bg-accent hover:bg-accent/80": selectedTab === id,
          "bg-transparent hover:bg-accent/50": selectedTab !== id,
          "border-green-500": selectedTab === id && method === "get",
          "border-blue-500": selectedTab === id && method === "post",
          "border-yellow-500": selectedTab === id && method === "put",
          "border-orange-500": selectedTab === id && method === "patch",
          "border-red-500": selectedTab === id && method === "delete",
          "border-primary": selectedTab === id && !method,
        },
        className,
      )}
      onClick={handleClick}
    >
      <div className="w-full h-full flex items-center gap-2 px-1">
        {(children || method) && (
          <CollectionTabType
            haveChildren={Boolean(children)}
            isShort={true}
            method={method}
            isFlexibleSize={false}
          />
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
