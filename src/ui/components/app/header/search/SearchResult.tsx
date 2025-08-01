import { memo } from "react";
import type { RequestListItemInterface } from "@/types/request-response.types";
import EmptyBox from "@/components/app/header/search/EmptyBox";
import EmptySearchTermBox from "@/components/app/header/search/EmptySearchTermBox";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchResultItem from "@/components/app/header/search/SearchResultItem";

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
        <div className="h-full min-h-0 max-h-96 w-full">
          {list.map((data) => (
            <SearchResultItem {...data} selectedTab={selectedTab} />
          ))}
        </div>
      </ScrollArea>
    );
  }
);

SearchResult.displayName = "SearchResult";

export default SearchResult;
