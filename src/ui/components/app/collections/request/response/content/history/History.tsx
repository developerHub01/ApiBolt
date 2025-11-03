import { ScrollArea } from "@/components/ui/scroll-area";
import HistoryItem from "@/components/app/collections/request/response/content/history/HistoryItem";
import { useAppSelector } from "@/context/redux/hooks";
import {
  selectHistoryMetaCount,
  selectHistoryMetaListIsLoading,
} from "@/context/redux/history/selectors/history";
import HistorySkeleton from "@/components/app/collections/request/response/content/history/skeleton/HistorySkeleton";
import { useHistory } from "@/context/history/HistoryProvider";
import SearchHistory from "@/components/app/collections/request/response/content/history/SearchHistory";
import Empty from "@/components/ui/empty";

const History = () => {
  const isLoading = useAppSelector(selectHistoryMetaListIsLoading);
  const metaCount = useAppSelector(selectHistoryMetaCount);
  const { metaList } = useHistory();

  if (isLoading) return <HistorySkeleton />;

  return (
    <section className="flex-1 flex flex-col gap-2">
      {Boolean(metaCount) && <SearchHistory />}
      <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
        {metaCount ? (
          <>
            {!metaList.length ? (
              <Empty
                label="No history matched"
                animationSrc="./lottie/no-search-item-available.lottie"
                showFallback
                innerClassName="w-56"
              />
            ) : (
              <div className="flex flex-col divide-y divide-border/50">
                {metaList.map((meta) => (
                  <HistoryItem key={meta.id} {...meta} />
                ))}
              </div>
            )}
          </>
        ) : (
          <Empty
            label="No history available."
            description="There is no history for the request. History will only appear after seding any http request"
            showFallback
          />
        )}
      </ScrollArea>
    </section>
  );
};

export default History;
