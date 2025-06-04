import Empty from "@/components/ui/empty";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CookieList from "@/components/app/request-panel/request/response/content/cookies/CookieList";
import { useAppSelector } from "@/context/redux/hooks";
import type { CookieInterface } from "@/context/redux/request-response/request-response-slice";

const Cookies = () => {
  const response = useAppSelector(
    (state) => state.requestResponse.response[state.tabSidebar.selectedTab!]
  );

  if (!response) return null;

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
