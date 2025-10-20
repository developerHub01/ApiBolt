import { memo } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  isEnabled?: boolean;
  haveChanges?: boolean;
  handleCancel?: () => void;
  handleReset?: () => void;
  handlePrimaryAction?: () => void;
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
    handlePrimaryAction,
  }: Props) => {
    return (
      <div className="flex justify-end gap-2">
        <Button onClick={handleCancel} variant={"destructive"} size={"sm"}>
          {cancelLabel}
        </Button>
        {haveChanges && (
          <Button onClick={handleReset} variant={"secondary"} size={"sm"}>
            {resetLabel}
          </Button>
        )}
        <Button
          disabled={!isEnabled}
          onClick={handlePrimaryAction}
          variant={"default"}
          size={"sm"}
        >
          {primaryActionLabel}
        </Button>
      </div>
    );
  }
);

export default CookieEditorBottomAction;
