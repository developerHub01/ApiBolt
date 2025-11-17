import { Button } from "@/components/ui/button";
import { useThemeEditor } from "@/context/theme/theme-editor/ThemeEditorProvider";

const ThemeEditorBottom = () => {
  const { haveError } = useThemeEditor();
  
  return (
    <div className="flex">
      <Button className="ml-auto" disabled={haveError}>
        Apply for preview
      </Button>
    </div>
  );
};

export default ThemeEditorBottom;
