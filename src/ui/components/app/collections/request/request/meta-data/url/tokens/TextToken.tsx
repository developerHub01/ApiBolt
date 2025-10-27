import {
  memo,
  useEffect,
  useState,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TokenDragHandler from "@/components/app/collections/request/request/meta-data/url/TokenDragHandler";
import ChangeTokenType from "@/components/app/collections/request/request/meta-data/url/tokens/ChangeTokenType";
import { useAppDispatch } from "@/context/redux/hooks";
import {
  requestUrlDeleteToken,
  requestUrlUpdateToken,
} from "@/context/redux/request-url/request-url-thunk";
import FlexibleHightButtonLikeDiv from "@/components/ui/flexible-hight-button-like-div";

interface TextTokenProps {
  id: string;
  value: string;
}

const TextToken = memo(({ id, value }: TextTokenProps) => {
  const dispatch = useAppDispatch();
  const [valueState, setValue] = useState<string>(value);

  useEffect(() => {
    if (value === valueState) return;
    setValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleKeydown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (["Enter", "?"].includes(e.key)) return e.preventDefault();
  };

  const handleBlur = (e: FocusEvent<HTMLHeadingElement>) => {
    const newValue = e.target.innerText.trim();
    setValue(newValue);
    if (newValue === valueState) return;

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
          className="outline-none cursor-text border-b w-full min-w-12 max-w-96 text-center wrap-break-word break-all whitespace-normal font-normal"
          onKeyDown={handleKeydown}
          onBlur={handleBlur}
          onPaste={handlePaste}
        >
          {valueState}
        </p>
      </FlexibleHightButtonLikeDiv>
      <ChangeTokenType id={id} type={"text"} />
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

export default TextToken;
