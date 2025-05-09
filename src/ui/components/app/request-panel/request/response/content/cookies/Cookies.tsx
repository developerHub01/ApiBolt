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

  console.log(cookies);

  if (!cookies || !cookies.length) return <Empty label="No cookies found" />;

  return (
    <ScrollArea className="h-full">
      <CookieList cookies={cookies} />
    </ScrollArea>
  );
};

export default Cookies;
