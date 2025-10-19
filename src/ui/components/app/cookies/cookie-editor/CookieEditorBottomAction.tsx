import { memo } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  isEnabled?: boolean;
  haveChanges?: boolean;
  handleCancel?: () => void;
  handleReset?: () => void;
  cancelLabel?: string;
  resetLabel?: string;
  primaryActionLabel?: string;
}

const CookieEditorBottomAction = memo(
  ({
    isEnabled,
    haveChanges,
    cancelLabel = "Cancel",
    resetLabel = "Reset",
    primaryActionLabel = "save",
    handleCancel,
    handleReset,
  }: Props) => {
    return (
      <div className="flex justify-end gap-2">
        <Button onClick={handleCancel} variant={"destructive"}>
          {cancelLabel}
        </Button>
        {haveChanges && (
          <Button onClick={handleReset} variant={"secondary"}>
            {resetLabel}
          </Button>
        )}
        <Button
          disabled={!isEnabled}
          onClick={handleCancel}
          variant={"default"}
        >
          {primaryActionLabel}
        </Button>
      </div>
    );
  }
);

export default CookieEditorBottomAction;
