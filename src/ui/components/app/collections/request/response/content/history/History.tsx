import { ScrollArea } from "@/components/ui/scroll-area";
import HistoryItem from "@/components/app/collections/request/response/content/history/HistoryItem";

const History = () => {
  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
      <div className="flex flex-col">
        {Array.from({ length: 100 }, (_, index) => (
          <HistoryItem key={index} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default History;
