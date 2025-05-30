import Empty from "@/components/ui/empty";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import HeaderContent from "@/components/app/request-panel/request/response/content/headers/HeaderContent";

const Headers = () => {
  const { response, selectedTab } = useRequestResponse();

  if (!response || !response[selectedTab]) return null;

  const headers = response[selectedTab]?.headers as Record<string, string>;

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
