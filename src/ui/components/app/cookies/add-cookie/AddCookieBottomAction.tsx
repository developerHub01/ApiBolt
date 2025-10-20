import {
  handleChangeIsAddCookieOption,
  handleResetAddCookieDetails,
} from "@/context/redux/cookies/cookies-slice";
import {
  selectAddCookieEnabled,
  selectAddCookieHaveChanges,
} from "@/context/redux/cookies/selectors/cookies-selector";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import CookieEditorBottomAction from "@/components/app/cookies/cookie-editor/CookieEditorBottomAction";
import { addCookie } from "@/context/redux/cookies/thunk/cookies-thunk";
import { toast } from "sonner";

const AddCookieBottomAction = () => {
  const dispatch = useAppDispatch();
  const isEnabled = useAppSelector(selectAddCookieEnabled);
  const haveChanges = useAppSelector(selectAddCookieHaveChanges);
  const handleCancel = () => dispatch(handleChangeIsAddCookieOption(false));
  const handleReset = () => dispatch(handleResetAddCookieDetails());
  const handleAdd = async () => {
    const response = await dispatch(addCookie()).unwrap();
    if (response) toast.success("Cookie added successfully.");
    else toast.error("Something went wrong, cant add cookie.");
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
