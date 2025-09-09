import {
  memo,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectRequestUrlTokenPort } from "@/context/redux/request-url/request-url-selector";
import { requestUrlUpdateOriginToken } from "@/context/redux/request-url/request-url-thunk";
import { isValidPort } from "@/utils/request-url.utils";
import { cn } from "@/lib/utils";

const isInvalidPort = (port: string): boolean => !isValidPort(port);

const allowedKeys = new Set([
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
  "Enter",
]);

const PortToken = memo(() => {
  const dispatch = useAppDispatch();
  const port = useAppSelector(selectRequestUrlTokenPort);
  const [portState, setPortState] = useState<string>(port);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (port === portState) return;
    setPortState(port);
    setIsError(isInvalidPort(port));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [port]);

  const handleChangePort = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPortState(value);
    setIsError(isInvalidPort(value));
  };

  const handleBlurPort = (e: FocusEvent<HTMLInputElement>) =>
    handleUpdate(e.target.value);

  const handleKeydown = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (["Enter"].includes(e.key)) return handleUpdate(portState);
    if (allowedKeys.has(e.key)) return;
    // block non-numeric
    if (!/^[0-9]$/.test(e.key)) return e.preventDefault();
  };

  const handleUpdate = (value: string) => {
    const haveError = isInvalidPort(value);
    setIsError(haveError);
    if (value === port || haveError) return;

    dispatch(
      requestUrlUpdateOriginToken({
        id: "port",
        value,
      })
    );
  };

  return (
    <ButtonLikeDiv
      variant={"secondary"}
      className={cn("w-28 ring ring-transparent", {
        "ring-destructive": isError,
      })}
    >
      <input
        placeholder="Port eg. 3000"
        className="w-full border-0 border-b font-normal"
        value={portState}
        onChange={handleChangePort}
        onKeyDown={handleKeydown}
        onBlur={handleBlurPort}
      />
    </ButtonLikeDiv>
  );
});

export default PortToken;
