import {
  handleChangeIsAddCookieOption,
  handleResetAddCookieDetails,
} from "@/context/redux/cookies/cookies-slice";
import {
  selectAddCookieEnabled,
  selectAddCookieHaveChanges,
} from "@/context/redux/cookies/selectors/cookies-selector";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import CookieEditorBottomAction from "../cookie-editor/CookieEditorBottomAction";

const AddCookieBottomAction = () => {
  const dispatch = useAppDispatch();
  const isEnabled = useAppSelector(selectAddCookieEnabled);
  const haveChanges = useAppSelector(selectAddCookieHaveChanges);
  const handleCancel = () => dispatch(handleChangeIsAddCookieOption(false));
  const handleReset = () => dispatch(handleResetAddCookieDetails());

  return (
    <CookieEditorBottomAction
      isEnabled={isEnabled}
      haveChanges={haveChanges}
      handleCancel={handleCancel}
      handleReset={handleReset}
      primaryActionLabel="Add"
    />
  );
};

export default AddCookieBottomAction;
