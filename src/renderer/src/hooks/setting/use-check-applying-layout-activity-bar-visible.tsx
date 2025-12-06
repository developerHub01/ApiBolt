import { useAppSelector } from "@/context/redux/hooks";
import { selectActiveProjectId } from "@/context/redux/project/selectors/project";
import {
  selectActivityBarVisibleGlobal,
  selectActivityBarVisibleLocal,
} from "@/context/redux/setting/selectors/setting";

const useCheckApplyingLayoutActivityBarVisible = () => {
  const activeProjectId = useAppSelector(selectActiveProjectId);
  const activityBarVisibleGlobal = useAppSelector(
    selectActivityBarVisibleGlobal,
  );
  const activityBarVisibleLocal = useAppSelector(selectActivityBarVisibleLocal);

  let activityBarVisible =
    (!activeProjectId
      ? activityBarVisibleGlobal
      : (activityBarVisibleLocal ?? activityBarVisibleGlobal)) ?? 1;

  if (activityBarVisible === -1) activityBarVisible = 1;

  return Boolean(activityBarVisible);
};

export default useCheckApplyingLayoutActivityBarVisible;
