import { memo, lazy, Suspense, useCallback } from "react";
import {
  AnimatedDialog,
  AnimatedDialogContentWrapper,
} from "@/components/ui/animated-dialog";
import { selectIsHistoryItemOpen } from "@/context/redux/history/selectors/history";
import { changeOpenedHistory } from "@/context/redux/history/thunks/history";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import HistoryDetailsFallback from "@/fallback/HistoryDetailsFallback";
const HistoryDetailsRoot = lazy(
  () => import("@/components/app/history-details/HistoryDetailsRoot")
);

const HistoryDetails = memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsHistoryItemOpen);
  const { meta } = useHistoryDetails();

  const handleClose = useCallback(
    () => dispatch(changeOpenedHistory()),
    [dispatch]
  );

  return (
    <AnimatedDialog isOpen={Boolean(isOpen && meta)} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-w-4xl">
        <Suspense fallback={<HistoryDetailsFallback />}>
          <HistoryDetailsRoot />
        </Suspense>
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
});

export default HistoryDetails;
