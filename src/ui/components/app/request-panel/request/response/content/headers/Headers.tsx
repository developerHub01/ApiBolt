import Empty from "@/components/ui/empty";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import HeaderContent from "@/components/app/request-panel/request/response/content/headers/HeaderContent";
import { useAppSelector } from "@/context/redux/hooks";

const Headers = () => {
  const response = useAppSelector(
    (state) => state.requestResponse.response[state.requestResponse.selectedTab!]
  );

  if (!response) return null;

  const headers = response?.headers as Record<string, string>;

  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden">
      <div className="w-full h-full pb-3">
        {headers ? (
          <HeaderContent headers={headers} />
        ) : (
          <Empty label="No headers found" />
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
Headers.displayName = "Headers";

export default Headers;
