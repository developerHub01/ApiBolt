import { memo } from "react";
import type { RequestListItemInterface } from "@shared/types/request-response.types";
import EmptyBox from "@/components/app/header/search/EmptyBox";
import EmptySearchTermBox from "@/components/app/header/search/EmptySearchTermBox";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchResultItem from "@/components/app/header/search/SearchResultItem";
import { cn } from "@/lib/utils";

interface SearchResultProps {
  searchTerm: string;
  list: Array<RequestListItemInterface>;
  selectedTab?: string | null;
}

const SearchResult = memo(
  ({ list, searchTerm, selectedTab }: SearchResultProps) => {
    if (!searchTerm) return <EmptySearchTermBox />;

    if (!list || !list.length) return <EmptyBox />;

    return (
      <ScrollArea className="w-full h-full min-h-0">
        <div className="h-full min-h-0 max-h-96 w-full flex flex-col">
          {list.map((data, index) => (
            <SearchResultItem
              key={data.id}
              {...data}
              selectedTab={selectedTab}
              className={cn({
                "border-0": index + 1 === list.length
              })}
            />
          ))}
        </div>
      </ScrollArea>
    );
  }
);

SearchResult.displayName = "SearchResult";

export default SearchResult;
