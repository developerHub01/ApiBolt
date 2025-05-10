import Empty from "@/components/ui/empty";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  useRequestResponse,
  type CookieInterface,
} from "@/context/request/RequestResponseProvider";
import CookieList from "@/components/app/request-panel/request/response/content/cookies/CookieList";

const Cookies = () => {
  const { response } = useRequestResponse();
  const cookies = response?.cookies as Array<CookieInterface>;

  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden">
      <div className="w-full h-full pb-3">
        {!cookies || !cookies.length ? (
          <Empty label="No cookies found" />
        ) : (
          <CookieList cookies={cookies} />
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Cookies;
