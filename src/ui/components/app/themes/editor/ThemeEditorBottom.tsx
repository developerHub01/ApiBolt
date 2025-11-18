import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  applyTestTheme,
  applyThemeInApp,
} from "@/context/redux/theme/thunks/theme";
import { useThemeEditor } from "@/context/theme/theme-editor/ThemeEditorProvider";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ThemeEditorBottom = () => {
  const dispatch = useAppDispatch();
  const { haveError } = useThemeEditor();

  const handleApplyTest = async () => {
    const { success, message } = await dispatch(applyTestTheme()).unwrap();
    if (success) toast.success(message);
    else toast.error(message);
  };
  const handleApplyMain = async () => {
    const { success, message } = await dispatch(applyThemeInApp()).unwrap();
    if (success) toast.success(message);
    else toast.error(message);
  };

  return (
    <div className="flex items-center gap-2">
      <Link to={"https://jsonplaceholder.typicode.com/"} target="_blank">
        <Button variant={"link"} className="pl-0">
          Upload theme in marketplace
        </Button>
      </Link>
      <Button
        className="ml-auto"
        disabled={haveError}
        onClick={handleApplyMain}
        variant={"secondary"}
      >
        Restore Current Theme
      </Button>
      <Button disabled={haveError} onClick={handleApplyTest}>
        Preview Theme
      </Button>
    </div>
  );
};

export default ThemeEditorBottom;
