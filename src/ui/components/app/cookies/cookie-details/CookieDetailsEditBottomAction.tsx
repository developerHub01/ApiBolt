import {
  handleChangeIsEditing,
  handleResetEditing,
} from "@/context/redux/cookies/cookies-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import CookieEditorBottomAction from "@/components/app/cookies/cookie-editor/CookieEditorBottomAction";
import { selectUpdateCookieHaveChanges } from "@/context/redux/cookies/selectors/cookies";
import { saveEditingCookie } from "@/context/redux/cookies/thunks/cookies";
import { toast } from "sonner";

const CookieDetailsEditBottomAction = () => {
  const dispatch = useAppDispatch();
  const handleCancel = () => dispatch(handleChangeIsEditing({ value: false }));
  const haveChanges = useAppSelector(selectUpdateCookieHaveChanges);
  const handleReset = () => dispatch(handleResetEditing());
  const handleSave = async () => {
    const response = await dispatch(saveEditingCookie()).unwrap();
    if (response) toast.success("Cookie updated successfully.");
    else toast.error("Something went wrong, cant update cookie.");
  };

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
