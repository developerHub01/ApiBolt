import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  applyTestTheme,
  applyThemeInApp,
} from "@/context/redux/theme/thunks/theme";
import { useThemeEditor } from "@/context/theme/theme-editor/ThemeEditorProvider";
import useCustomToast from "@/hooks/ui/use-custom-toast";
import ExternalLink from "@/components/ux/ExternalLink";
import { handleChangeThemePreviewMode } from "@/context/redux/theme/theme-slice";

const ThemeEditorBottom = () => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const { haveError } = useThemeEditor();

  const handleApplyTest = async () => {
    const { success, message } = await dispatch(applyTestTheme()).unwrap();
    toast({
      type: success ? "success" : "error",
      title: success ? "Apply success" : "Appy error",
      description: message,
    });
    if (success) dispatch(handleChangeThemePreviewMode(true));
  };

  const handleApplyMain = async () => {
    const { success, message } = await dispatch(applyThemeInApp()).unwrap();
    toast({
      type: success ? "success" : "error",
      title: success ? "Main Apply success" : "Main Apply error",
      description: message,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <ExternalLink to={"https://jsonplaceholder.typicode.com/"}>
        <Button variant={"link"} className="pl-0">
          Upload theme in marketplace
        </Button>
      </ExternalLink>
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
