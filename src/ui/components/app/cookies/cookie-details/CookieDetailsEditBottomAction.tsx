import {
  handleChangeIsEditing,
  handleResetEditing,
  handleSaveEditCookie,
} from "@/context/redux/cookies/cookies-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import CookieEditorBottomAction from "@/components/app/cookies/cookie-editor/CookieEditorBottomAction";
import { selectUpdateCookieHaveChanges } from "@/context/redux/cookies/selectors/cookies-selector";
// import { saveEditingCookie } from "@/context/redux/cookies/thunk/cookies-thunk";

const CookieDetailsEditBottomAction = () => {
  const dispatch = useAppDispatch();
  const handleCancel = () => dispatch(handleChangeIsEditing({ value: false }));
  const haveChanges = useAppSelector(selectUpdateCookieHaveChanges);
  const handleReset = () => dispatch(handleResetEditing());
  const handleSave = () => dispatch(handleSaveEditCookie());

  return (
    <CookieEditorBottomAction
      isEnabled={haveChanges}
      haveChanges={haveChanges}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handlePrimaryAction={handleSave}
    />
  );
};

export default CookieDetailsEditBottomAction;
