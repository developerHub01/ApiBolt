import { memo, lazy, Suspense, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { AnimatedDialogContentWrapper } from "@/components/ui/animated-dialog";
import { AnimatedDialog } from "@/components/ui/animated-dialog";
import { selectIsLocalPasswordOpen } from "@/context/redux/local-password/selectors/local-password";
import { handleChangeIsLocalPasswordOpen } from "@/context/redux/local-password/local-password-slice";
import LocalPasswordFallback from "@/fallback/LocalPasswordFallback";
import LocalPasswordProvider from "@/context/local-password/LocalPasswordProvider";
const LocalPasswordRoot = lazy(
  () => import("@/components/app/local-password/LocalPasswordRoot"),
);

const LocalPassword = memo(() => {
  const dispatch = useAppDispatch();
  const isLocalPasswordOpen = useAppSelector(selectIsLocalPasswordOpen);

  const handleClose = useCallback(
    () => dispatch(handleChangeIsLocalPasswordOpen(false)),
    [dispatch],
  );

  return (
    <AnimatedDialog isOpen={isLocalPasswordOpen} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-w-md">
        <Suspense fallback={<LocalPasswordFallback />}>
          <LocalPasswordProvider>
            <LocalPasswordRoot />
          </LocalPasswordProvider>
        </Suspense>
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
});

export default LocalPassword;
