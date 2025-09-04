import {
  memo,
  useEffect,
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
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectRequestUrlTokenById } from "@/context/redux/request-url/request-url-selector";
import {
  requestUrlDeleteToken,
  requestUrlUpdateToken,
} from "@/context/redux/request-url/request-url-thunk";

interface TextTokenProps {
  id: string;
}

const TextToken = memo(({ id }: TextTokenProps) => {
  const dispatch = useAppDispatch();
  const tokenValue = useAppSelector(selectRequestUrlTokenById(id)) ?? "text";
  const [value, setValue] = useState<string>(tokenValue);

  useEffect(() => {
    if (tokenValue === value) return;
    setValue(tokenValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenValue]);

  const handleKeydown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.code === "Enter") return e.preventDefault();
  };

  const handleBlur = (e: FocusEvent<HTMLHeadingElement>) => {
    const newValue = e.target.innerText.trim();
    setValue(newValue);

    if (newValue === value) return;

    dispatch(
      requestUrlUpdateToken({
        id,
        value: newValue,
      })
    );
  };

  const handlePaste = (e: ClipboardEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleDelete = () => dispatch(requestUrlDeleteToken(id));

  return (
    <div className="flex p-0 gap-0">
      <TokenDragHandler />
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
        onClick={handleDelete}
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
