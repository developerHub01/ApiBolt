import { memo, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  AnimatedDialogBottom,
  AnimatedDialogContent,
  AnimatedDialogContentWrapper,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { selectIsCookiesOpen } from "@/context/redux/cookies/selectors/cookies-selector";
import { handleChangeIsCookiesOpen } from "@/context/redux/cookies/cookies-slice";
import LoadCookies from "@/components/app/cookies/LoadCookies";
import CookiesContent from "@/components/app/cookies/CookiesContent";
import CookiesSkeleton from "@/components/app/cookies/CookiesSkeleton";
import {
  selectCookiesError,
  selectCookiesIsLoading,
} from "@/context/redux/status/selectors/cookies";
import { toast } from "sonner";

const Cookies = memo(() => {
  const dispatch = useAppDispatch();
  const isCookiesOpen = useAppSelector(selectIsCookiesOpen);
  const isLoading = useAppSelector(selectCookiesIsLoading);
  const cookiesError = useAppSelector(selectCookiesError);

  useEffect(() => {
    if (!cookiesError) return;
    toast.error(cookiesError);
  }, [cookiesError]);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsCookiesOpen(false)),
    [dispatch]
  );

  return (
    <>
      <AnimatedDialog isOpen={isCookiesOpen} onClose={handleClose}>
        <AnimatedDialogContentWrapper className="max-w-3xl">
          <AnimatedDialogTop>
            <div className="px-4 py-2 text-lg">Cookies</div>
          </AnimatedDialogTop>
          <AnimatedDialogContent>
            {isLoading ? <CookiesSkeleton /> : <CookiesContent />}
          </AnimatedDialogContent>
          <AnimatedDialogBottom>
            <p className="line-clamp-1 text-center max-w-lg text-sm">
              Cookies details which are saved in current project
            </p>
          </AnimatedDialogBottom>
          <LoadCookies />
        </AnimatedDialogContentWrapper>
      </AnimatedDialog>
    </>
  );
});

export default Cookies;
