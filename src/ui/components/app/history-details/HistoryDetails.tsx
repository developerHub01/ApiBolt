import { memo, useCallback } from "react";
import {
  AnimatedDialog,
  AnimatedDialogContentWrapper,
  AnimatedDialogLoader,
} from "@/components/ui/animated-dialog";
import { selectIsHistoryItemOpen } from "@/context/redux/history/selectors/history";
import { changeOpenedHistory } from "@/context/redux/history/thunks/history";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import HistoryTop from "@/components/app/history-details/HistoryTop";
import HistoryContent from "@/components/app/history-details/HistoryContent";
import HistoryBottom from "@/components/app/history-details/HistoryBottom";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";
import { selectHistoryDetailsLoading } from "@/context/redux/status/selectors/history";

const HistoryDetails = memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsHistoryItemOpen);
  const { meta } = useHistoryDetails();
  const isLoading = useAppSelector(selectHistoryDetailsLoading);

  const handleClose = useCallback(
    () => dispatch(changeOpenedHistory()),
    [dispatch]
  );

  return (
    <AnimatedDialog isOpen={Boolean(isOpen && meta)} onClose={handleClose}>
      <AnimatedDialogContentWrapper className="max-w-4xl">
        <HistoryTop />
        <HistoryContent />
        <HistoryBottom />
        <AnimatedDialogLoader isLoading={isLoading} />
      </AnimatedDialogContentWrapper>
    </AnimatedDialog>
  );
});

export default HistoryDetails;
