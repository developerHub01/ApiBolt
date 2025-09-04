import {
  memo,
  useState,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TokenDragHandler from "@/components/app/collections/request/request/meta-data/url/TokenDragHandler";
import type { DragControls } from "motion/react";

interface TextTokenProps {
  id: string;
  onDelete: (id: string) => void;
  controls: DragControls;
}

const TextToken = memo(({ id, onDelete, controls }: TextTokenProps) => {
  const [value, setValue] = useState<string>("text");

  const handleKeydown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.code === "Enter") return e.preventDefault();
  };

  const handleBlur = (e: FocusEvent<HTMLHeadingElement>) => {
    setValue(e.target.innerText.trim());
  };

  const handlePaste = (e: ClipboardEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="flex p-0 gap-0">
      <TokenDragHandler controls={controls} />
      <FlexibleHightButtonLikeDiv className="flex-1 rounded-none">
        <p
          contentEditable
          suppressContentEditableWarning
          className="outline-none cursor-text border-b w-full min-w-12 text-center break-words break-all whitespace-normal"
          onKeyDown={handleKeydown}
          onBlur={handleBlur}
          onPaste={handlePaste}
        >
          {value}
        </p>
      </FlexibleHightButtonLikeDiv>
      <Button
        variant={"secondary"}
        className="rounded-l-none h-full"
        onClick={() => onDelete(id)}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
});

interface FlexibleHightButtonLikeDivProps {
  className?: string;
  children: React.ReactNode;
}

const FlexibleHightButtonLikeDiv = ({
  className = "",
  children,
}: FlexibleHightButtonLikeDivProps) => {
  return (
    <ButtonLikeDiv
      variant={"secondary"}
      className={cn("min-h-9 h-auto", className)}
    >
      {children}
    </ButtonLikeDiv>
  );
};

export default TextToken;
