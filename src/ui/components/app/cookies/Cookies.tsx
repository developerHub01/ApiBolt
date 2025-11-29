import { memo, lazy, Suspense, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { AnimatedDialogContentWrapper } from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { selectIsCookiesOpen } from "@/context/redux/cookies/selectors/cookies";
import { handleChangeIsCookiesOpen } from "@/context/redux/cookies/cookies-slice";
import { selectCookiesError } from "@/context/redux/status/selectors/cookies";
import { handleChangeIsCookiesError } from "@/context/redux/status/status-slice";
import useCustomToast from "@/hooks/ui/use-custom-toast";
import CookiesFallback from "@/fallback/CookiesFallback";
const CookiesRoot = lazy(() => import("@/components/app/cookies/CookiesRoot"));

const Cookies = memo(() => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const isCookiesOpen = useAppSelector(selectIsCookiesOpen);
  const cookiesError = useAppSelector(selectCookiesError);

  useEffect(() => {
    if (!cookiesError) return;
    toast({
      type: "error",
      title: "Cookie error",
      description: cookiesError,
    });
    dispatch(handleChangeIsCookiesError());
  }, [cookiesError, dispatch, toast]);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsCookiesOpen(false)),
    [dispatch]
  );

  return (
    <AnimatedDialog isOpen={isCookiesOpen} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-w-3xl">
        <Suspense fallback={<CookiesFallback />}>
          <CookiesRoot />
        </Suspense>
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
});

export default Cookies;
