import {
  useEffect,
  useState,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { useAppDispatch } from "@/context/redux/hooks";
import { updateHttpStatus } from "@/context/redux/http-status/thunk/http-status";
import { RefreshCw as ResetIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { Button } from "@/components/ui/button";

const REASON_MAX_LENGTH = 40;
const DESCRIPTION_MAX_LENGTH = 120;

interface SettingHttpEditableContentProps {
  type: "reason" | "description";
  code: string;
  value: string;
  editedValue: string;
}

const SettingHttpEditableContent = ({
  type,
  code,
  value,
  editedValue,
}: SettingHttpEditableContentProps) => {
  const dispatch = useAppDispatch();
  const [valueState, setValueState] = useState<string>(
    (editedValue || value).slice(
      0,
      type === "description" ? DESCRIPTION_MAX_LENGTH : REASON_MAX_LENGTH
    )
  );

  useEffect(
    () =>
      setValueState(
        (editedValue || value).slice(
          0,
          type === "description" ? DESCRIPTION_MAX_LENGTH : REASON_MAX_LENGTH
        )
      ),
    [editedValue, type, value]
  );

  const handleUpdate = (value: string | null) => {
    const filteredValue =
      value?.slice(
        0,
        type === "description" ? DESCRIPTION_MAX_LENGTH : REASON_MAX_LENGTH
      ) || null;
    dispatch(
      updateHttpStatus({
        code,
        [type === "reason" ? "editedReason" : "editedDescription"]:
          filteredValue,
      })
    );

    setValueState(filteredValue || editedValue);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) =>
    handleUpdate(e.target.innerText.trim());

  const handleKeydown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (["Enter", "?", "Tab"].includes(e.key)) e.preventDefault();
    if (["Enter"].includes(e.key)) handleUpdate(valueState);

    setValueState(
      valueState.slice(
        0,
        type === "description" ? DESCRIPTION_MAX_LENGTH : REASON_MAX_LENGTH
      )
    );
  };

  const handlePaste = (e: ClipboardEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="w-full h-full group flex items-center">
      <div className="flex-1 border-b border-transparent focus-within:border-primary py-0.5">
        <p
          contentEditable
          suppressContentEditableWarning
          className="w-full outline-none cursor-text leading-relaxed"
          onKeyDown={handleKeydown}
          onBlur={handleBlur}
          onPaste={handlePaste}
          data-value={valueState}
          tabIndex={0}
        >
          {valueState}
        </p>
      </div>
      {editedValue !== value && editedValue && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"iconXs"}
                variant={"secondary"}
                onClick={() => handleUpdate(null)}
                className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-100"
              >
                <ResetIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" variant={"secondary"}>
              <p>Reset {type}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default SettingHttpEditableContent;
