import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  applyTestTheme,
  applyThemeInApp,
} from "@/context/redux/theme/thunks/theme";
import { useThemeEditor } from "@/context/theme/theme-editor/ThemeEditorProvider";

const ThemeEditorBottom = () => {
  const dispatch = useAppDispatch();
  const { haveError } = useThemeEditor();

  const handleApplyTest = () => dispatch(applyTestTheme());
  const handleApplyMain = () => dispatch(applyThemeInApp());

  return (
    <div className="flex items-center gap-2">
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
