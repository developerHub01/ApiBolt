import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import HistoryItem from "@/components/app/collections/request/response/content/history/HistoryItem";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  selectMetaList,
  selectMetaListIsLoading,
} from "@/context/redux/history/selectors/history";
import HistorySkeleton from "@/components/app/collections/request/response/content/history/skeleton/HistorySkeleton";
import { loadRequestHistoryMeta } from "@/context/redux/history/thunks/history";

const History = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectMetaListIsLoading);
  const metaList = useAppSelector(selectMetaList);

  useEffect(() => {
    dispatch(loadRequestHistoryMeta());
  }, [dispatch]);

  if (isLoading) return <HistorySkeleton />;

  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
      <div className="flex flex-col divide-y divide-border/40">
        {metaList.map((meta) => (
          <HistoryItem key={meta.id} {...meta} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default History;
