import { memo, useCallback } from "react";
import {
  AnimatedDialog,
  AnimatedDialogContentWrapper,
} from "@/components/ui/animated-dialog";
import { selectIsHistoryItemOpen } from "@/context/redux/history/selectors/history";
import { changeOpenedHistory } from "@/context/redux/history/thunks/history";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import HistoryTop from "@/components/app/history-details/HistoryTop";
import HistoryContent from "@/components/app/history-details/HistoryContent";
import HistoryBottom from "@/components/app/history-details/HistoryBottom";
import { useHistoryDetails } from "@/context/history/HistoryDetailsProvider";

const HistoryDetails = memo(() => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsHistoryItemOpen);
  const { meta } = useHistoryDetails();

  const handleClose = useCallback(
    () => dispatch(changeOpenedHistory()),
    [dispatch]
  );

  return (
    <>
      <AnimatedDialog isOpen={Boolean(isOpen && meta)} onClose={handleClose}>
        <AnimatedDialogContentWrapper className="max-w-3xl">
          <HistoryTop />
          <HistoryContent />
          <HistoryBottom />
        </AnimatedDialogContentWrapper>
      </AnimatedDialog>
    </>
  );
});

export default HistoryDetails;
