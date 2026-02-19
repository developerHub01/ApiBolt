import {
  ClipboardEvent,
  FocusEvent,
  KeyboardEvent,
  memo,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { selectPathParams } from "@/context/redux/request-response/selectors/path-params";
import { updatePathParams } from "@/context/redux/request-response/thunks/path-params";
import { Separator } from "@/components/ui/separator";

interface Props {
  id: string;
  value: string;
}

const PathVariableToken = memo(({ value: key }: Props) => {
  const dispatch = useAppDispatch();
  const pathParams = useAppSelector(selectPathParams);
  const [prevValue, setPrevValue] = useState(pathParams[key]?.value ?? "");
  const [value, setValue] = useState(pathParams[key]?.value ?? "");

  if (prevValue !== (pathParams[key]?.value ?? "")) {
    setValue(pathParams[key]?.value ?? "");
    setPrevValue(pathParams[key]?.value ?? "");
  }

  const handleKeydown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (["Enter", "?", " "].includes(e.key)) return e.preventDefault();
  };

  const handleBlur = (e: FocusEvent<HTMLHeadingElement>) => {
    const newValue = e.target.innerText.trim();
    setValue(newValue);
    if (newValue === value) return;

    dispatch(
      updatePathParams({
        paramId: key,
        payload: {
          value: newValue,
        },
      }),
    );
  };

  const handlePaste = (e: ClipboardEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <ButtonLikeDiv
      variant={"secondary"}
      className={cn("w-fit h-auto min-w-40 flex rounded-md py-0")}
    >
      <div className="w-fit min-w-9 text-center wrap-break-word break-all whitespace-normal font-normal py-2">
        <p className="w-full">:{key}</p>
      </div>
      <Separator orientation="vertical" />
      <div className="w-full min-w-9 text-center wrap-break-word break-all whitespace-normal font-normal py-2">
        <p
          contentEditable
          suppressContentEditableWarning
          className="outline-none cursor-text border-b w-full"
          onKeyDown={handleKeydown}
          onBlur={handleBlur}
          onPaste={handlePaste}
        >
          {value}
        </p>
      </div>
    </ButtonLikeDiv>
  );
});

export default PathVariableToken;
