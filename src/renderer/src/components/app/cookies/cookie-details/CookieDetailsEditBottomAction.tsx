import { useCallback } from "react";
import {
  handleChangeIsEditing,
  handleResetEditing,
} from "@/context/redux/cookies/cookies-slice";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import CookieEditorBottomAction from "@/components/app/cookies/cookie-editor/CookieEditorBottomAction";
import { selectUpdateCookieHaveChanges } from "@/context/redux/cookies/selectors/cookies";
import { saveEditingCookie } from "@/context/redux/cookies/thunks/cookies";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const CookieDetailsEditBottomAction = () => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const handleCancel = () => dispatch(handleChangeIsEditing({ value: false }));
  const haveChanges = useAppSelector(selectUpdateCookieHaveChanges);
  const handleReset = useCallback(
    () => dispatch(handleResetEditing()),
    [dispatch],
  );
  const handleSave = useCallback(async () => {
    const response = await dispatch(saveEditingCookie()).unwrap();
    toast({
      type: response ? "success" : "error",
      title: response ? "Save success" : "Save error",
      description: response
        ? "Cookie updated successfully"
        : "Failed to update cookie. Please try again.",
    });
  }, [dispatch, toast]);

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
