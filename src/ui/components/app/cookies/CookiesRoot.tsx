import {
  AnimatedDialogBottom,
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import LoadCookies from "@/components/app/cookies/LoadCookies";
import CookiesContent from "@/components/app/cookies/CookiesContent";
import CookiesSkeleton from "@/components/app/cookies/CookiesSkeleton";
import { selectCookiesIsLoading } from "@/context/redux/status/selectors/cookies";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";
import { useAppSelector } from "@/context/redux/hooks";

const CookiesRoot = () => {
  const isLoading = useAppSelector(selectCookiesIsLoading);
  const showSkeleton = useShowSkeleton(isLoading);

  return (
    <>
      <AnimatedDialogTop>
        <div className="p-2 text-lg font-medium">Cookies</div>
      </AnimatedDialogTop>
      <AnimatedDialogContent>
        <AnimatedDialogContentScroll>
          {showSkeleton ? <CookiesSkeleton /> : <CookiesContent />}
        </AnimatedDialogContentScroll>
      </AnimatedDialogContent>
      <AnimatedDialogBottom>
        <p className="line-clamp-1 text-center max-w-lg text-sm">
          Cookies saved in the current project
        </p>
      </AnimatedDialogBottom>
      <LoadCookies />
    </>
  );
};

export default CookiesRoot;
