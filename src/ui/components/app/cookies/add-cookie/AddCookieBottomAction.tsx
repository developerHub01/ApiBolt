import {
  handleChangeIsAddCookieOption,
  handleResetAddCookieDetails,
} from "@/context/redux/cookies/cookies-slice";
import {
  selectAddCookieEnabled,
  selectAddCookieHaveChanges,
} from "@/context/redux/cookies/selectors/cookies";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import CookieEditorBottomAction from "@/components/app/cookies/cookie-editor/CookieEditorBottomAction";
import { addCookie } from "@/context/redux/cookies/thunks/cookies";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const AddCookieBottomAction = () => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const isEnabled = useAppSelector(selectAddCookieEnabled);
  const haveChanges = useAppSelector(selectAddCookieHaveChanges);
  const handleCancel = () => dispatch(handleChangeIsAddCookieOption(false));
  const handleReset = () => dispatch(handleResetAddCookieDetails());
  const handleAdd = async () => {
    const response = await dispatch(addCookie()).unwrap();
    toast({
      type: response ? "success" : "error",
      title: response ? "Add success" : "Add error",
      description: response
        ? "Cookie added successfully"
        : "Failed to add cookie. Please try again.",
    });
  };

  return (
    <CookieEditorBottomAction
      isEnabled={isEnabled}
      haveChanges={haveChanges}
      handleCancel={handleCancel}
      handleReset={handleReset}
      handlePrimaryAction={handleAdd}
      primaryActionLabel="Add"
    />
  );
};

export default AddCookieBottomAction;
