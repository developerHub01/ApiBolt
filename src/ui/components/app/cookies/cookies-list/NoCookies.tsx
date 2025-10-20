import Empty from "@/components/ui/empty";
import {
  selectCookiesCount,
  selectIsAddOptionOpen,
  selectSelectedCookieKey,
} from "@/context/redux/cookies/selectors/cookies-selector";
import { useAppSelector } from "@/context/redux/hooks";

const NoCookies = () => {
  const cookiesCount = useAppSelector(selectCookiesCount);
  const isAddOptionOpen = useAppSelector(selectIsAddOptionOpen);
  const selectedCookieKey = useAppSelector(selectSelectedCookieKey);

  if (isAddOptionOpen || selectedCookieKey) return null;

  return (
    <Empty
      label={cookiesCount ? "Cookies" : "No Cookies"}
      description={
        cookiesCount
          ? "Showing cookies saved in the project"
          : "It seems like, no cookies saved in the project."
      }
      animationSrc="./lottie/cookie.json"
      showFallback
      innerClassName="w-56"
      className="h-full"
      key="no-cookies"
    />
  );
};

export default NoCookies;
