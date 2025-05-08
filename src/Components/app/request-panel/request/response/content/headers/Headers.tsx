import Empty from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import HeaderContent from "@/components/app/request-panel/request/response/content/headers/HeaderContent";

const Headers = () => {
  const { response } = useRequestResponse();
  const headers = response?.headers as Record<string, string>;

  return (
    <ScrollArea className="h-full">
      {headers ? (
        <HeaderContent headers={headers} />
      ) : (
        <Empty label="No headers found" />
      )}
    </ScrollArea>
  );
};
Headers.displayName = "Headers";

export default Headers;