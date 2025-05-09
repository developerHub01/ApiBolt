import Empty from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useRequestResponse,
  type CookieInterface,
} from "@/context/request/RequestResponseProvider";
import CookieList from "@/components/app/request-panel/request/response/content/cookies/CookieList";

const Cookies = () => {
  const { response } = useRequestResponse();
  const cookies = response?.cookies as Array<CookieInterface>;

  return (
    <ScrollArea className="h-full">
      {!cookies || !cookies.length ? (
        <Empty label="No cookies found" />
      ) : (
        <CookieList cookies={cookies} />
      )}
    </ScrollArea>
  );
};

export default Cookies;
